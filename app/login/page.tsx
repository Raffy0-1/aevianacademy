"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/toast";
import { scrollToFirstError } from "@/lib/utils/form-errors";
import { signIn } from "@/lib/actions/auth";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Clock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const toast = useToast();
  const searchParams = useSearchParams();
  const isExpired = searchParams?.get("expired") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await signIn(formData);
      if (res?.error) {
        setErrorMsg(res.error);
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success("Welcome back! Redirecting to your dashboard...");
        if (res?.redirectUrl) {
          window.location.href = res.redirectUrl;
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (err: any) {
      const msg = "An unexpected error occurred. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  const onError = (formErrors: any) => {
    scrollToFirstError(formErrors);
    toast.error("Please fill in all required fields accurately.");
  };

  return (
    <AuthCard
      title="Sign in to Aevian"
      subtitle="Welcome back. Sign in to access your student, teacher, or parent dashboard."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {/* Session Expired Notice */}
        {isExpired && (
          <div className="rounded-xl bg-amber-500/10 p-3.5 text-xs text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-amber-600" />
            <span>Your session has expired. Please sign in again to continue where you left off.</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="rounded-xl bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-400 border border-rose-500/20 font-medium flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            disabled={loading}
            {...register("email")}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream"
            >
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs text-copper hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <PasswordInput
            id="password"
            disabled={loading}
            {...register("password")}
            placeholder="••••••••"
            error={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="copper"
          isLoading={loading}
          className="w-full mt-2 h-11 shadow-sm font-semibold text-sm"
        >
          Sign in to Dashboard
        </Button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
