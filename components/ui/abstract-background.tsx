"use client";

import React from "react";

/**
 * High-visibility abstract architectural background overlay.
 * Renders radiant ambient glowing mesh spheres, a crisp architectural grid pattern,
 * and particle rings that create visual depth across all website pages and portals.
 */
export function AbstractBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Radiant Ambient Gradient Mesh Orbs */}
      <div className="absolute -top-32 -left-32 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-copper/40 via-amber-500/25 to-transparent blur-[90px] animate-pulse" />
      <div className="absolute top-1/4 -right-32 h-[750px] w-[750px] rounded-full bg-gradient-to-bl from-navy/35 via-indigo-900/25 to-transparent blur-[100px]" />
      <div className="absolute bottom-10 left-1/3 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-600/25 to-transparent blur-[95px]" />
      <div className="absolute -bottom-20 right-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-t from-copper/30 via-rose-500/20 to-transparent blur-[85px]" />

      {/* Architectural High-Contrast Line Grid & Dot Matrix Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-65"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="abstract-grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#1C2A38"
              strokeWidth="1.2"
              opacity="0.25"
            />
            <circle cx="60" cy="60" r="3" fill="#C86D51" opacity="0.65" />
            <circle cx="0" cy="0" r="1.5" fill="#1C2A38" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#abstract-grid-pattern)" />
      </svg>

      {/* Floating Animated Geometric Particle Rings */}
      <div className="absolute top-1/6 left-12 h-80 w-80 rounded-full border-2 border-dashed border-copper/30 animate-spin-slow" />
      <div className="absolute top-2/3 right-16 h-[400px] w-[400px] rounded-full border border-navy/30 animate-pulse" />
      <div className="absolute bottom-1/5 left-1/4 h-56 w-56 rounded-full border border-copper/25" />
    </div>
  );
}

