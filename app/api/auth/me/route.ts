import { NextResponse } from "next/server";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        dashboardUrl: getDashboardPath(user.role),
      },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
}
