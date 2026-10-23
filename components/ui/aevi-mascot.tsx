"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, GraduationCap } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/social-icons";

/**
 * Aevian Academic Admissions Concierge
 * High-end floating advisory widget providing direct WhatsApp chat and trial booking.
 */
export function AeviMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Gentle initial teaser prompt after 3 seconds for first-time visitors
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 2800);

    const autoClose = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(false);
      }
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, [hasInteracted]);

  return (
    <aside
      aria-label="Aevian Academic Admissions Concierge"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Concierge Dialog Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-xl dark:border-navy-light/60 dark:bg-navy/95"
          >
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-navy-light/40">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-dark text-copper shadow-inner dark:from-navy-light dark:to-navy">
                  <GraduationCap className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-navy" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy dark:text-cream tracking-tight">
                    Admission Assistance
                  </h3>
                  <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    Chat directly on WhatsApp
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setHasInteracted(true);
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-navy transition-colors dark:hover:bg-navy-light/40 dark:hover:text-cream cursor-pointer"
                aria-label="Close admissions advisor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Counsel Message */}
            <p className="mt-3 text-xs leading-relaxed text-slate dark:text-slate-light">
              Unsure which curriculum track best fits your child? Connect with our Senior Academic Dean for diagnostic evaluation and a <strong>complimentary 40-minute trial session</strong>.
            </p>

            {/* Direct Action Links */}
            <div className="mt-4 flex items-center gap-2">
              <Link
                href="/book-trial"
                onClick={() => {
                  setIsOpen(false);
                  setHasInteracted(true);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-copper px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-copper-hover transition-all cursor-pointer"
              >
                <span>Book Free 40-Min Trial</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasInteracted(true)}
                title="Chat directly on WhatsApp"
                aria-label="Chat directly on WhatsApp"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white shadow-xs hover:scale-105 hover:shadow-md transition-all dark:border-navy-light/60 dark:bg-navy-light/40 cursor-pointer"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
            </div>

            {/* Pointer Chevron to Launcher */}
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-slate-200/80 bg-white/95 dark:border-navy-light/60 dark:bg-navy/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Concierge Badge Launcher */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        className="group relative flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/95 pl-3 pr-4 py-2.5 shadow-xl backdrop-blur-md hover:border-copper/50 hover:shadow-2xl transition-all cursor-pointer dark:border-navy-light dark:bg-navy/95 dark:hover:border-copper/50"
        aria-label="Open Admission Assistance"
      >
        {/* Prestige Monogram Seal / Shield */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-copper shadow-sm dark:bg-navy-light">
          <GraduationCap className="h-4.5 w-4.5 transition-transform group-hover:rotate-6" />
          {/* Live Active Beacon Dot */}
          <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        {/* Text Label */}
        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-bold text-navy dark:text-cream leading-tight tracking-tight">
            Admissions Desk
          </p>
          <p className="text-[10px] font-medium text-copper leading-tight">
            Ask Anything
          </p>
        </div>

        {/* Unread Indicator on Initial Render */}
        {!isOpen && !hasInteracted && (
          <span className="flex h-2 w-2 rounded-full bg-copper sm:hidden" />
        )}
      </motion.button>
    </aside>
  );
}
