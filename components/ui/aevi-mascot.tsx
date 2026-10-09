"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";

/**
 * "Aevi" the Intelligent Owl-Bot Guide
 * Studio-grade animated vector mascot that assists visitors with booking and choosing paths.
 */
export function AeviMascot() {
  const [isOpen, setIsOpen] = useState(true);
  const [isWaving, setIsWaving] = useState(false);
  const [blink, setBlink] = useState(false);

  // Periodic eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="Aevi AI Assistant"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="mb-3 max-w-xs sm:max-w-sm rounded-2xl border border-slate-border/80 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-navy-light dark:bg-navy/95"
          >
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-slate-border/50 pb-2 dark:border-navy-light">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy dark:text-cream">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
                </span>
                <span>Aevi • Academic Guide</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate hover:bg-slate/10 hover:text-navy transition-colors dark:text-slate-light"
                aria-label="Close assistant message"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Bubble Message */}
            <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate dark:text-slate-light">
              👋 <strong>Need help choosing the right learning path?</strong> Match with a certified IB, IGCSE, or Assessment tutor for a <strong>free 40-minute demo class</strong>!
            </p>

            {/* CTA Buttons */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href="/book-trial"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-copper px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-copper-hover transition-colors"
              >
                <span>Book Free Demo</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20 transition-colors dark:text-emerald-400"
              >
                <MessageCircle className="h-3 w-3 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Little Triangle Pointer to Mascot */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-slate-border/80 bg-white/95 dark:border-navy-light dark:bg-navy/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Mascot Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsWaving(true)}
        onMouseLeave={() => setIsWaving(false)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-copper/50 bg-navy p-1 shadow-2xl transition-all hover:border-copper hover:shadow-copper/30 focus:outline-none"
        aria-label="Toggle Aevi Academic Guide"
      >
        {/* Soft Ambient Glow */}
        <span className="absolute -inset-1 rounded-2xl bg-copper/30 blur-md group-hover:bg-copper/50 transition-all" />

        {/* Studio-Grade Vector Owl-Bot ("Aevi") */}
        <svg
          viewBox="0 0 100 100"
          className="relative h-14 w-14 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mortarboard Academic Cap */}
          <path
            d="M 50 12 L 85 24 L 50 36 L 15 24 Z"
            fill="#C86D51"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Cap Skull Cap */}
          <path d="M 28 29 L 28 40 C 28 48 72 48 72 40 L 72 29 Z" fill="#1C2A38" />
          {/* Golden Tassel */}
          <path d="M 50 24 L 20 32 L 20 44" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="45" r="3" fill="#D97706" />

          {/* Owl-Bot Head & Body Container */}
          <rect
            x="20"
            y="35"
            width="60"
            height="55"
            rx="22"
            fill="#1C2A38"
            stroke="#C86D51"
            strokeWidth="2.5"
          />

          {/* Golden Crest Plate */}
          <rect x="30" y="65" width="40" height="20" rx="10" fill="#2A3C4E" />
          {/* Logo Glyph on Chest */}
          <circle cx="50" cy="75" r="4" fill="#C86D51" />

          {/* Futuristic Visor Eyes Plate */}
          <rect
            x="26"
            y="43"
            width="48"
            height="20"
            rx="8"
            fill="#111A24"
            stroke="#2A3C4E"
            strokeWidth="1.5"
          />

          {/* Left Eye */}
          <ellipse
            cx="38"
            cy="53"
            rx="5.5"
            ry={blink ? "0.5" : "5.5"}
            fill="#38BDF8"
            className="transition-all duration-150"
          />
          {!blink && <circle cx="40" cy="51" r="1.8" fill="#FFFFFF" />}

          {/* Right Eye */}
          <ellipse
            cx="62"
            cy="53"
            rx="5.5"
            ry={blink ? "0.5" : "5.5"}
            fill="#38BDF8"
            className="transition-all duration-150"
          />
          {!blink && <circle cx="64" cy="51" r="1.8" fill="#FFFFFF" />}

          {/* Cute Geometric Golden Beak */}
          <polygon points="46,57 54,57 50,63" fill="#D97706" />

          {/* Waving Right Wing */}
          <motion.path
            d={isWaving ? "M 78 52 C 88 42, 92 48, 86 64 Z" : "M 78 52 C 84 56, 84 68, 78 72 Z"}
            fill="#C86D51"
            animate={isWaving ? { rotate: [0, -15, 15, -10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />

          {/* Left Wing */}
          <path d="M 22 52 C 16 56, 16 68, 22 72 Z" fill="#C86D51" />
        </svg>

        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[9px] font-bold text-white shadow-md">
            1
          </span>
        )}
      </motion.button>
    </aside>
  );
}
