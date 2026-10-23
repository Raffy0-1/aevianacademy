import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 select-none cursor-pointer",
  {
    variants: {
      variant: {
        copper:
          "bg-copper text-white hover:bg-copper-hover shadow-[0_2px_10px_rgba(200,109,81,0.28)] hover:shadow-[0_4px_18px_rgba(200,109,81,0.38)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
        navy:
          "bg-navy text-white hover:bg-navy-light shadow-[0_2px_10px_rgba(28,42,56,0.2)] hover:shadow-[0_4px_18px_rgba(28,42,56,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
        primary:
          "bg-copper text-white hover:bg-copper-hover shadow-[0_2px_10px_rgba(200,109,81,0.28)] hover:shadow-[0_4px_18px_rgba(200,109,81,0.38)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
        gold:
          "bg-copper text-white hover:bg-copper-hover shadow-[0_2px_10px_rgba(200,109,81,0.28)] hover:shadow-[0_4px_18px_rgba(200,109,81,0.38)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
        outline:
          "border border-slate-border/80 bg-white/70 hover:bg-white text-navy dark:bg-navy/60 dark:text-cream hover:border-copper/50 shadow-xs backdrop-blur-xs",
        ghost: "hover:bg-copper/5 text-navy dark:text-cream hover:text-copper",
        link: "text-copper underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs font-semibold",
        lg: "h-12 px-7 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "copper",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

