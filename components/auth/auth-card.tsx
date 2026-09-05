import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream/50 backdrop-blur-sm px-4 py-12 sm:px-6 lg:px-8 relative z-10">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-border bg-white p-8 shadow-xl">
        <div className="text-center flex flex-col items-center">
          <Link href="/" aria-label="Aevian Academy Home">
            <BrandLogo size="lg" />
          </Link>
          <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-navy">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-slate">{subtitle}</p>
          )}
        </div>

        <div className="mt-8">{children}</div>

        {footerText && footerLinkText && footerLinkHref && (
          <p className="mt-6 text-center text-sm text-slate">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-semibold text-copper hover:underline transition-colors"
            >
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

