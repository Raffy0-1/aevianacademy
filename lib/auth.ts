import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Role, type User, type ParentProfile, type StudentProfile, type TeacherProfile } from "@prisma/client";

export type AuthUser = User & {
  parentProfile: ParentProfile | null;
  studentProfile: StudentProfile | null;
  teacherProfile: TeacherProfile | null;
};

/**
 * Get the currently authenticated user with their role-specific profile.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user: supabaseUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !supabaseUser?.email) return null;


    let user = await prisma.user.findUnique({
      where: { email: supabaseUser.email },
      include: {
        parentProfile: true,
        studentProfile: true,
        teacherProfile: true,
      },
    });

    // Auto-provision user + profile if user exists in Supabase Auth but not Prisma DB
    if (!user) {
      const rawRole = supabaseUser.user_metadata?.role as Role;
      const roleStr: Role = Object.values(Role).includes(rawRole) ? rawRole : Role.PARENT;
      const nameStr = (supabaseUser.user_metadata?.name as string) || supabaseUser.email.split("@")[0] || "User";

      const profileData: Record<string, object> = {};
      if (roleStr === Role.PARENT) profileData.parentProfile = { create: {} };
      else if (roleStr === Role.STUDENT) profileData.studentProfile = { create: {} };
      else if (roleStr === Role.TEACHER) profileData.teacherProfile = { create: {} };

      try {
        user = await prisma.user.create({
          data: {
            email: supabaseUser.email,
            name: nameStr,
            role: roleStr,
            ...profileData,
          },
          include: {
            parentProfile: true,
            studentProfile: true,
            teacherProfile: true,
          },
        });
      } catch (e) {
        console.error("Auto-provision user failed in database:", e);
        return null;
      }
    }

    return user;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}

/**
 * Enforce authentication and optional role authorization.
 * Throws an Error if unauthenticated or if user role is not allowed.
 */
export async function requireAuth(allowedRoles?: Role[]): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Authentication required.");
  }
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    throw new Error(`Forbidden: Requires role ${allowedRoles.join(", ")}`);
  }
  return user;
}


/**
 * Get the dashboard path for a given role.
 */
export function getDashboardPath(role: string): string {
  switch (role) {
    case "PARENT":
      return "/dashboard/parent";
    case "STUDENT":
      return "/dashboard/student";
    case "TEACHER":
      return "/dashboard/teacher";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/";
  }
}
