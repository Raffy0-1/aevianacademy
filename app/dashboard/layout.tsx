import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Dashboard layout — shared shell for all role-based dashboards.
 * Verifies authentication and provides role-based routing.
 *
 * In Stage 1 this is a minimal shell. Stage 2 will add full navigation,
 * sidebar, and responsive layout.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background/70 backdrop-blur-sm relative z-10">
      {/* Stage 2 will add a full sidebar/nav shell here */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-xl text-foreground">
              Aevian
            </Link>
            <span className="rounded-sm bg-muted px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {user.role}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
