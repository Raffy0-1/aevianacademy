import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// In-memory sliding window rate limiter for Edge Runtime
const rateLimitStore = new Map<string, number[]>();
const LIMIT = 15; // Max 15 requests
const WINDOW = 60 * 1000; // per 1 minute window

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(key) || [];
  const activeTimestamps = timestamps.filter((time) => now - time < WINDOW);
  
  if (activeTimestamps.length >= LIMIT) {
    return true;
  }
  
  activeTimestamps.push(now);
  rateLimitStore.set(key, activeTimestamps);
  return false;
}

/**
 * Middleware: refreshes Supabase auth session on every request and
 * redirects unauthenticated users away from /dashboard/*.
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const ip = (request as any).ip || request.headers.get("x-forwarded-for") || "unknown";

  // Rate limit sensitive endpoints
  if (
    path === "/login" ||
    path === "/signup" ||
    path === "/book-trial" ||
    path.startsWith("/api/auth")
  ) {
    if (isRateLimited(`${ip}:${path}`)) {
      return new NextResponse("Too many requests. Please try again in a minute.", {
        status: 429,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    // If Supabase keys are not set yet or placeholder, allow access to public pages
    // and redirect dashboard pages to login
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }


  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — wrapped in try/catch to prevent edge runtime crashes
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.warn("Middleware auth refresh warning:", (err as Error)?.message);
  }

  // Redirect legacy /admin requests to /dashboard/admin
  if (path === "/admin" || path.startsWith("/admin/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/admin";
    return NextResponse.redirect(url);
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;

}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/book-trial",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
