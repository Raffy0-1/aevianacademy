"use client";

import React from "react";

/**
 * Premium, minimal, subtle architectural background.
 * Uses soft ambient gradient lighting, a delicate micro-grid, and consistent abstract geometric watermarks.
 * Opacity is strictly calibrated (3% to 6%) to create sophisticated depth without interfering with reading.
 */
export function AbstractBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Studio Ambient Gradient Lighting Orbs */}
      <div className="absolute -top-40 -left-40 h-[750px] w-[750px] rounded-full bg-gradient-to-br from-copper/12 via-amber-400/8 to-transparent blur-[140px] animate-float-slow" />
      <div className="absolute top-1/4 -right-40 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-navy/15 via-slate-600/8 to-transparent blur-[150px] animate-float-reverse" />
      <div className="absolute top-1/2 left-[-10%] h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-copper/10 via-amber-500/5 to-transparent blur-[130px] animate-float-slow" />
      <div className="absolute -bottom-32 right-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-t from-navy/20 via-copper/8 to-transparent blur-[140px] animate-float-reverse" />

      {/* Elegant High-Precision Architectural Dot/Grid Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-35 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="fluid-architectural-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#1C2A38"
              strokeWidth="0.6"
              opacity="0.08"
              className="dark:stroke-[#94A3B8]"
            />
            <circle cx="64" cy="64" r="1.2" fill="#C86D51" opacity="0.3" />
            <circle cx="0" cy="0" r="0.8" fill="#1C2A38" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fluid-architectural-grid)" />
      </svg>

      {/* ========================================================
          SUBTLE ARCHITECTURAL WATERMARKS (CONSISTENT BACKGROUND ART)
         ======================================================== */}
      {/* 1. Celestial / Compass Orbit Watermark (Top Right Flank) */}
      <svg
        width="620"
        height="620"
        viewBox="0 0 620 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-20 -right-24 w-[480px] sm:w-[620px] h-auto opacity-[0.045] dark:opacity-[0.08] text-navy dark:text-copper [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      >
        <circle cx="310" cy="310" r="90" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="310" cy="310" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="310" cy="310" r="270" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="310" cy="310" r="305" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
        <line x1="310" y1="0" x2="310" y2="620" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
        <line x1="0" y1="310" x2="620" y2="310" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
        <circle cx="310" cy="130" r="4" fill="currentColor" />
        <circle cx="490" cy="310" r="4" fill="currentColor" />
        <circle cx="220" cy="400" r="3" fill="currentColor" />
      </svg>

      {/* 2. Geometric Harmonic Curves Watermark (Center Left Flank) */}
      <svg
        width="540"
        height="540"
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/3 -left-32 w-[420px] sm:w-[540px] h-auto opacity-[0.04] dark:opacity-[0.07] text-copper [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      >
        <path d="M 0 120 C 180 80, 270 240, 540 180" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 0 180 C 180 140, 270 300, 540 240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 0 240 C 180 200, 270 360, 540 300" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 0 300 C 180 260, 270 420, 540 360" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
        <circle cx="270" cy="270" r="70" stroke="currentColor" strokeWidth="1" />
        <circle cx="270" cy="270" r="3" fill="currentColor" />
      </svg>

      {/* 3. Global Longitude / Golden Ratio Arc (Lower Right Flank) */}
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-12 -right-20 w-[380px] sm:w-[500px] h-auto opacity-[0.04] dark:opacity-[0.08] text-navy dark:text-cream [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      >
        <ellipse cx="250" cy="250" rx="220" ry="110" transform="rotate(-25 250 250)" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="250" cy="250" rx="220" ry="110" transform="rotate(35 250 250)" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="250" cy="250" r="40" stroke="currentColor" strokeWidth="1" />
        <circle cx="250" cy="250" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
