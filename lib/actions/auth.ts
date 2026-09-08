"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getDashboardPath } from "@/lib/auth";

// TODO(stage-3): Rate limiting on auth endpoints.
// TODO(stage-3): Email verification flow.

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.nativeEnum(Role),
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AuthActionResult = {
  error?: string;
  success?: boolean;
  redirectUrl?: string;
};

/**
 * Sign up a new user. Creates both a Supabase auth user and the
 * corresponding User + profile row in Prisma.
 */
export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    role: formData.get("role") as string,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password, name, role } = parsed.data;

  try {
    const supabase = await createClient();

    // Create Supabase auth user
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    });

    if (authError) {
      return { error: authError.message };
    }

    // Create Prisma User + profile
    try {
      const profileData: Record<string, object> = {};
      if (role === Role.PARENT) {
        profileData.parentProfile = { create: {} };
      } else if (role === Role.STUDENT) {
        profileData.studentProfile = { create: {} };
      } else if (role === Role.TEACHER) {
        profileData.teacherProfile = { create: {} };
      }

      await prisma.user.create({
        data: {
          email,
          name,
          role,
          ...profileData,
        },
      });
    } catch (e) {
      console.warn("Prisma user creation warning in signUp:", e);
    }

    return { success: true, redirectUrl: getDashboardPath(role) };
  } catch (err: any) {
    console.error("signUp error:", err);
    return { error: err?.message || "Failed to sign up. Please try again." };
  }
}

/**
 * Sign in an existing user.
 */
export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const rawEmail = (formData.get("email") as string || "").trim();
  const rawPassword = (formData.get("password") as string || "").trim();

  const parsed = signInSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;

  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    let roleStr = (authData?.user?.user_metadata?.role as string) || "PARENT";

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user?.role) {
        roleStr = user.role;
      }
    } catch (e) {
      console.warn("Prisma user lookup warning in signIn:", e);
    }

    return { success: true, redirectUrl: getDashboardPath(roleStr) };
  } catch (err: any) {
    console.error("signIn error:", err);
    return { error: err?.message || "Failed to sign in. Please check credentials or network connection." };
  }
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (e) {
    console.warn("signOut warning:", e);
  }
  redirect("/");
}

