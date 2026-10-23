import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-slate/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20 transition-all dark:bg-navy-dark dark:border-navy-light dark:text-cream disabled:opacity-50",
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
