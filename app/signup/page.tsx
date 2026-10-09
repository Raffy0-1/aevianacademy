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
import { signUp } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["STUDENT", "PARENT", "TEACHER"]),
});

type SignupFields = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "STUDENT",
    },
  });

  const onSubmit = async (data: SignupFields) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);

      const res = await signUp(formData);
      if (res?.error) {
        setErrorMsg(res.error);
        toast.error(res.error);
      } else {
        const success = "Account created successfully! Redirecting you to login...";
        setSuccessMsg(success);
        toast.success(success);
        setTimeout(() => {
          router.push("/login");
        }, 1800);
      }
    } catch (err: any) {
      const msg = "An unexpected error occurred. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const onError = (formErrors: any) => {
    scrollToFirstError(formErrors);
    toast.error("Please correct the highlighted fields.");
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Join Aevian Academy and start your personalized learning journey."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        {errorMsg && (
          <div className="rounded-xl bg-rose-500/10 p-3.5 text-xs text-rose-700 dark:text-rose-400 border border-rose-500/20 font-medium flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="rounded-xl bg-emerald-500/10 p-3.5 text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            disabled={loading}
            {...register("name")}
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-slate-border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name.message}</p>
          )}
        </div>

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
          <label
            htmlFor="password"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            Password (min. 8 characters)
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
            htmlFor="role"
            className="block text-xs font-bold uppercase tracking-wider text-navy dark:text-cream mb-1"
          >
            I am registering as a…
          </label>
          <select
            id="role"
            disabled={loading}
            {...register("role")}
            className="w-full rounded-xl border border-slate-border bg-white px-3.5 py-2.5 text-sm text-navy focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream disabled:opacity-50 font-medium"
          >
            <option value="STUDENT">Student (Access class schedules & homework)</option>
            <option value="PARENT">Parent (Monitor progress, attendance & reports)</option>
            <option value="TEACHER">Teacher (Faculty portal & student grading)</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.role.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="copper"
          isLoading={loading}
          className="w-full mt-2 h-11 shadow-sm font-semibold text-sm"
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}
