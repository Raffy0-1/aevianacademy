"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/toast";
import { scrollToFirstError } from "@/lib/utils/form-errors";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFields = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFields>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetFields) => {
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const msg = "Password has been reset successfully! Redirecting you to login...";
      setSuccessMsg(msg);
      toast.success(msg);
      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (err: any) {
      const msg = "Failed to update password. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onError = (formErrors: any) => {
    scrollToFirstError(formErrors);
    toast.error("Please ensure your passwords match and are at least 8 characters.");
  };

  return (
    <AuthCard
      title="Create new password"
      subtitle="Enter a new, strong password to secure your account."
      footerText="Remembered your password?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {successMsg && (
          <div className="rounded-xl bg-emerald-500/10 p-3.5 text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-xl bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-400 border border-rose-500/20 font-medium flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            New password
          </label>
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            Confirm new password
          </label>
          <PasswordInput
            id="confirmPassword"
            disabled={loading}
            {...register("confirmPassword")}
            placeholder="••••••••"
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-rose-600 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="copper"
          isLoading={loading}
          className="w-full mt-2 h-11 shadow-sm font-semibold text-sm"
        >
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}
