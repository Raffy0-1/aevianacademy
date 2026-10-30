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

/**
 * AuthCard: Shared presentation container for authentication pages.
 * Visual Direction: Sculpted Organic Minimalism.
 * Features large, softly overlapping architectural curves reminiscent of sculpted paper relief,
 * rendered purely with lightweight inline SVG and subtle ambient drop shadows.
 */
export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F5F0] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 z-10">
      {/* ========================================================
          SCULPTED ORGANIC MINIMALIST BACKGROUND
          Multi-layered curved surfaces with soft architectural relief shading.
          Opaque base ensures full replacement of the global layout background.
         ======================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Subtle multi-stage shadow filters simulating natural paper/relief depth */}
            <filter
              id="sculpted-shadow-deep"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="userSpaceOnUse"
            >
              <feDropShadow
                dx="-4"
                dy="14"
                stdDeviation="22"
                floodColor="#3A281E"
                floodOpacity="0.045"
              />
              <feDropShadow
                dx="-1"
                dy="4"
                stdDeviation="6"
                floodColor="#3A281E"
                floodOpacity="0.025"
              />
            </filter>

            <filter
              id="sculpted-shadow-mid"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="userSpaceOnUse"
            >
              <feDropShadow
                dx="-2"
                dy="10"
                stdDeviation="16"
                floodColor="#3A281E"
                floodOpacity="0.04"
              />
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="4"
                floodColor="#3A281E"
                floodOpacity="0.02"
              />
            </filter>

            <filter
              id="sculpted-shadow-soft"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="userSpaceOnUse"
            >
              <feDropShadow
                dx="2"
                dy="8"
                stdDeviation="12"
                floodColor="#3A281E"
                floodOpacity="0.03"
              />
            </filter>

            {/* Monochromatic Sculpted Palette Gradients */}
            {/* Layer 1: Warm Foundation Tone */}
            <linearGradient id="layer-base-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F7F3" />
              <stop offset="100%" stopColor="#F4F0E8" />
            </linearGradient>

            {/* Layer 2: Soft Cream / Warm Beige Ribbon */}
            <linearGradient id="layer-cream-grad" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="60%" stopColor="#F2ECE4" />
              <stop offset="100%" stopColor="#EAE2D8" />
            </linearGradient>

            {/* Layer 3: Subtle Pale Blush / Warm Sculpted Clay */}
            <linearGradient id="layer-blush-grad" x1="0%" y1="30%" x2="100%" y2="70%">
              <stop offset="0%" stopColor="#F5EEE7" />
              <stop offset="50%" stopColor="#EFE5DC" />
              <stop offset="100%" stopColor="#E7D9CD" />
            </linearGradient>

            {/* Layer 4: Warm Ivory Highlight Surface */}
            <linearGradient id="layer-ivory-grad" x1="20%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#FDFBF7" />
              <stop offset="70%" stopColor="#F7F3EC" />
              <stop offset="100%" stopColor="#EFEAE1" />
            </linearGradient>

            {/* Layer 5: Very Subtle Dusty Peach Accent Sweep */}
            <linearGradient id="layer-peach-grad" x1="80%" y1="0%" x2="10%" y2="100%">
              <stop offset="0%" stopColor="#FBF7F2" />
              <stop offset="45%" stopColor="#F2E6DC" />
              <stop offset="100%" stopColor="#EAD8CA" />
            </linearGradient>
          </defs>

          {/* Solid Base Canvas */}
          <rect width="1440" height="960" fill="url(#layer-base-grad)" />

          {/* ----------------------------------------------------
              WAVE 1: Broad, undulating upper wave (flowing from top-left)
             ---------------------------------------------------- */}
          <path
            d="M -100 -50 
               L 1550 -50 
               L 1550 420 
               C 1260 490, 1020 310, 780 370 
               C 540 430, 360 610, -100 480 
               Z"
            fill="url(#layer-cream-grad)"
            filter="url(#sculpted-shadow-deep)"
          />

          {/* ----------------------------------------------------
              WAVE 2: Sweeping diagonal sculpted relief (mid-depth)
             ---------------------------------------------------- */}
          <path
            d="M -80 260 
               C 220 230, 480 430, 760 380 
               C 1060 320, 1260 180, 1540 240 
               L 1540 850 
               C 1240 760, 1000 890, 680 810 
               C 380 740, 180 830, -80 760 
               Z"
            fill="url(#layer-blush-grad)"
            filter="url(#sculpted-shadow-mid)"
            opacity="0.9"
          />

          {/* ----------------------------------------------------
              WAVE 3: Asymmetrical lower foreground wave with gentle peach/sand warmth
             ---------------------------------------------------- */}
          <path
            d="M -60 620 
               C 240 590, 460 760, 820 670 
               C 1140 590, 1320 660, 1520 600 
               L 1520 1020 
               L -60 1020 
               Z"
            fill="url(#layer-peach-grad)"
            filter="url(#sculpted-shadow-deep)"
            opacity="0.85"
          />

          {/* ----------------------------------------------------
              WAVE 4: Soft ivory sculpted crest (creates crisp architectural fold)
             ---------------------------------------------------- */}
          <path
            d="M -100 780 
               C 280 720, 560 880, 940 790 
               C 1220 720, 1380 810, 1550 760 
               L 1550 1020 
               L -100 1020 
               Z"
            fill="url(#layer-ivory-grad)"
            filter="url(#sculpted-shadow-soft)"
          />

          {/* ----------------------------------------------------
              WAVE 5: Elegant counter-curve framing top-right edge
             ---------------------------------------------------- */}
          <path
            d="M 640 -50 
               C 840 90, 1060 70, 1280 20 
               C 1390 -5, 1480 30, 1550 60 
               L 1550 -50 
               Z"
            fill="url(#layer-ivory-grad)"
            filter="url(#sculpted-shadow-soft)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ========================================================
          AUTHENTICATION CARD
          Preserved structure, typography, branding, and full functionality.
          Enhanced with a refined shadow that sits naturally on sculpted relief.
         ======================================================== */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-[#E7DFD4]/80 bg-white/95 p-8 shadow-[0_20px_45px_-12px_rgba(45,35,26,0.08),0_4px_16px_rgba(45,35,26,0.03)] backdrop-blur-md">
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
