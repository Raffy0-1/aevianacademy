import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  iconBgWhite?: boolean;
  lightText?: boolean;
}

export function BrandLogo({
  className = "",
  iconOnly = false,
  size = "md",
  iconBgWhite = false,
  lightText = false,
}: BrandLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Uploaded Aevian logo (1).svg */}
      {iconBgWhite ? (
        <div className="flex items-center justify-center rounded-full bg-white shadow-md shrink-0 p-2 w-12 h-12">
          <Image
            src="/aevian-logo.svg"
            alt="Aevian Academy Logo Icon"
            width={34}
            height={34}
            priority
            className="w-8 h-8 object-contain"
          />
        </div>
      ) : (
        <Image
          src="/aevian-logo.svg"
          alt="Aevian Academy Logo Icon"
          width={size === "lg" ? 56 : size === "sm" ? 32 : 40}
          height={size === "lg" ? 56 : size === "sm" ? 32 : 40}
          priority
          className={`${iconSizes[size]} object-contain shrink-0`}
        />
      )}

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-bold tracking-tight ${
              lightText ? "text-white" : "text-navy dark:text-cream"
            } ${textSizes[size]}`}
          >
            Aevian
          </span>
          <span className="font-display font-semibold text-[0.65em] tracking-[0.18em] uppercase text-copper -mt-0.5">
            Academy
          </span>
        </div>
      )}
    </div>
  );
}

