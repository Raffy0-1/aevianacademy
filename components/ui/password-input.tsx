"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-slate-border bg-white px-3.5 py-2.5 pr-10 text-sm text-navy placeholder:text-slate/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-navy dark:text-slate-light dark:hover:text-cream transition-colors p-0.5 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
