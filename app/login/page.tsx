"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().min(1, "Please enter your email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        setLoading(false);
      } else if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };


  return (
    <AuthCard
      title="Sign in to Aevian"
      subtitle="Welcome back. Sign in to access your dashboard."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <div className="rounded-md bg-danger/10 p-3 text-sm text-danger border border-danger/20 font-medium">
            {errorMsg}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <input
            id="email"
            type="text"
            disabled={loading}
            {...register("email")}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs text-meridian hover:underline hover:text-meridian/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            disabled={loading}
            {...register("password")}
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="copper"
          isLoading={loading}
          className="w-full mt-2"
        >
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}

