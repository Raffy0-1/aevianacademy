"use client";

import React, { useRef, useState, useEffect } from "react";

interface VantaFogBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Bespoke Ethereal Ambient Mist Background
 * High-performance, zero-dependency alternative to legacy Three.js Vanta Fog.
 * Silky smooth 60fps CSS ambient mesh with zero WebGL overhead and zero console errors.
 */
export function VantaFogBackground({ className = "", children }: VantaFogBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        return;
      }
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({
        x: Math.round(xPercent * 20),
        y: Math.round(yPercent * 20),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-cream-ivory dark:bg-navy-dark ${className}`}
    >
      {/* Drifting Ethereal Light Blooms */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      >
        {/* Soft Copper Sunlight Bloom */}
        <div className="absolute -top-20 left-1/3 h-[320px] w-[320px] rounded-full bg-copper/10 dark:bg-copper/15 blur-[90px] animate-pulse" style={{ animationDuration: "8s" }} />
        {/* Warm Cream / Sage Mist Bloom */}
        <div className="absolute -bottom-20 right-1/4 h-[340px] w-[340px] rounded-full bg-amber-200/25 dark:bg-navy-light/40 blur-[100px] animate-pulse" style={{ animationDuration: "11s" }} />
        {/* Subtle Slate Horizon Bloom */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 h-[260px] w-[260px] rounded-full bg-slate-300/20 dark:bg-navy/50 blur-[80px]" />
      </div>

      {/* Harmonic Waveform / Horizon Contours (SVG) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40 dark:opacity-25">
        <svg
          viewBox="0 0 1200 400"
          className="h-full w-full select-none"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 200 C 300 120, 600 280, 900 160 C 1050 100, 1150 220, 1200 190"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="text-copper/40"
          />
          <path
            d="M 0 260 C 250 320, 550 180, 850 290 C 1000 340, 1120 230, 1200 270"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-400/30 dark:text-cream/20"
          />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
