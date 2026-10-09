"use client";

import React from "react";

/**
 * Premium, calm architectural background.
 * Uses soft ambient gradient lighting and a high-precision subtle grid.
 * Floating constellation nodes removed per user request for a cleaner, high-end editorial aesthetic.
 */
export function AbstractBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Studio Ambient Gradient Lighting Orbs */}
      <div className="absolute -top-40 -left-40 h-[750px] w-[750px] rounded-full bg-gradient-to-br from-copper/15 via-amber-400/10 to-transparent blur-[140px] animate-float-slow" />
      <div className="absolute top-1/4 -right-40 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-navy/20 via-slate-600/10 to-transparent blur-[150px] animate-float-reverse" />
      <div className="absolute -bottom-32 left-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-copper/15 via-rose-400/5 to-transparent blur-[130px] animate-float-slow" />
      <div className="absolute top-2/3 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-t from-emerald-500/10 via-teal-700/5 to-transparent blur-[140px] animate-float-reverse" />

      {/* Elegant High-Precision Architectural Grid Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="fluid-architectural-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="#1C2A38"
              strokeWidth="0.8"
              opacity="0.12"
            />
            <circle cx="80" cy="80" r="1.5" fill="#C86D51" opacity="0.4" />
            <circle cx="0" cy="0" r="1" fill="#1C2A38" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fluid-architectural-grid)" />
      </svg>
    </div>
  );
}
