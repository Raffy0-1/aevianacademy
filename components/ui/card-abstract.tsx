import React from "react";
import { cn } from "@/lib/utils";

interface CardAbstractProps {
  variant?: "concentric" | "orbit" | "grid" | "waves" | "compass";
  position?: "bottom-right" | "top-right" | "bottom-left" | "top-left" | "center";
  className?: string;
  theme?: "light" | "dark" | "auto";
}

/**
 * Minimal, subtle architectural watermark for card backgrounds.
 * Calibrated with low opacity and radial mask fade so it NEVER collides with text readability.
 */
export function CardAbstract({
  variant = "concentric",
  position = "bottom-right",
  className,
  theme = "auto",
}: CardAbstractProps) {
  const positionClasses = {
    "bottom-right": "bottom-0 right-0 translate-x-4 translate-y-4",
    "top-right": "top-0 right-0 translate-x-4 -translate-y-4",
    "bottom-left": "bottom-0 left-0 -translate-x-4 translate-y-4",
    "top-left": "top-0 left-0 -translate-x-4 -translate-y-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }[position];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 select-none overflow-hidden transition-opacity duration-500",
        positionClasses,
        // Extremely subtle calibrated opacity: 4-6% light, 8-12% dark
        theme === "dark"
          ? "opacity-15 text-copper"
          : theme === "light"
          ? "opacity-[0.06] text-navy dark:text-cream"
          : "opacity-[0.06] dark:opacity-[0.14] text-navy dark:text-copper",
        className
      )}
    >
      {variant === "concentric" && (
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-44 h-44 sm:w-52 sm:h-52 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
        >
          <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
          <circle cx="100" cy="46" r="2.5" fill="currentColor" />
          <circle cx="154" cy="100" r="2.5" fill="currentColor" />
          <circle cx="100" cy="180" r="2" fill="currentColor" />
        </svg>
      )}

      {variant === "orbit" && (
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-48 sm:w-56 sm:h-56 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]"
        >
          <ellipse cx="110" cy="110" rx="95" ry="45" transform="rotate(-30 110 110)" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="110" cy="110" rx="95" ry="45" transform="rotate(30 110 110)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="110" cy="110" r="16" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="110" cy="110" r="4" fill="currentColor" />
          <circle cx="180" cy="70" r="3" fill="currentColor" />
          <circle cx="40" cy="150" r="2.5" fill="currentColor" />
        </svg>
      )}

      {variant === "grid" && (
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 sm:w-48 sm:h-48 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
        >
          <defs>
            <pattern id="card-dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="180" height="180" fill="url(#card-dot-grid)" />
          <line x1="30" y1="90" x2="150" y2="90" stroke="currentColor" strokeWidth="1.2" />
          <line x1="90" y1="30" x2="90" y2="150" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="90" cy="90" r="3" fill="currentColor" />
          <rect x="70" y="70" width="40" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )}

      {variant === "waves" && (
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-36 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"
        >
          <path d="M 0 40 Q 50 10, 100 40 T 200 40" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 0 65 Q 50 35, 100 65 T 200 65" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M 0 90 Q 50 60, 100 90 T 200 90" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 0 115 Q 50 85, 100 115 T 200 115" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="100" cy="40" r="2.5" fill="currentColor" />
          <circle cx="150" cy="65" r="2.5" fill="currentColor" />
        </svg>
      )}

      {variant === "compass" && (
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-44 h-44 sm:w-52 sm:h-52 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]"
        >
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          <polygon points="100,45 106,94 155,100 106,106 100,155 94,106 45,100 94,94" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="4" fill="currentColor" />
        </svg>
      )}
    </div>
  );
}
