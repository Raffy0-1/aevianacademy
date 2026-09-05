"use client";

import React from "react";

/**
 * Minimal abstract background overlay.
 * Renders low-intensity ambient glowing meshes, subtle geometric grid lines,
 * and particle rings (3%–6% opacity) creating a refined visual depth across pages.
 */
export function AbstractBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-40">
      {/* Ambient Gradient Mesh Spheres */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-copper/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-navy/15 blur-[140px]" />
      <div className="absolute -bottom-40 left-1/4 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[130px]" />

      {/* Subtle Geometric Grid Lines Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="abstract-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-navy dark:text-cream"
            />
            <circle cx="60" cy="60" r="1.5" fill="currentColor" className="text-copper" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#abstract-grid)" />
      </svg>

      {/* Minimal Floating Particle Rings */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full border border-copper/10 animate-pulse" />
      <div className="absolute top-2/3 right-12 h-96 w-96 rounded-full border border-navy/10 animate-pulse" />
    </div>
  );
}
