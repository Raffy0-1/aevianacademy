"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Star } from "lucide-react";
import Image from "next/image";

export function HeroVideoPreview() {
  const [showFullModal, setShowFullModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (showFullModal) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowFullModal(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [showFullModal]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <>
      <div className="relative group">
        {/* Main Video Card Shell with Rich 3D Elevation Shadow */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-[#141F2B] p-2 sm:p-2.5 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.38),0_12px_24px_-8px_rgba(15,23,42,0.22),0_0_0_1px_rgba(255,255,255,0.08)] hover:shadow-[0_32px_65px_-15px_rgba(15,23,42,0.48),0_16px_32px_-8px_rgba(15,23,42,0.28)] transition-all duration-500">
          {/* Video Container - Cinematic 16:9 for clean first-frame fit */}
          <div className="relative aspect-[16/9.2] sm:aspect-video w-full overflow-hidden rounded-2xl bg-[#0F1722]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=1200&q=85"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
            >
              <source src="/videos/hero-class.mp4" type="video/mp4" />
              <source
                src="https://assets.mixkit.co/videos/47186/47186-720.mp4"
                type="video/mp4"
              />
            </video>

            {/* Dark gradient overlay for contrast */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-navy/40" />

            {/* Floating Top Badge 1: Clean Live Session (No blinking dot) */}
            <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 flex items-center rounded-full border border-white/20 bg-navy/85 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
              <span>Live Session</span>
            </div>

            {/* Floating Top Badge 2: Verified Rating */}
            <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/85 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold text-copper shadow-lg backdrop-blur-md">
              <Star className="h-3 w-3 fill-copper text-copper" />
              <span>4.98 ★</span>
              <span className="text-[10px] text-white/70 font-normal hidden sm:inline">(1,420+ Reviews)</span>
            </div>

            {/* Bottom Overlay: Tutor and Student Info */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-2.5 sm:right-2.5 flex items-center justify-between gap-2.5 rounded-xl border border-white/15 bg-navy/85 p-2 sm:p-2.5 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full border-2 border-copper shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                    alt="Dr. Nadia Farooq"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-navy bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">Dr. Nadia Farooq</h4>
                    <span className="rounded bg-copper/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-copper uppercase">
                      Cambridge Alum
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-light leading-tight mt-0.5">
                    1-on-1 with Aiden K. <span className="text-white font-medium">• Sydney, AU 🇦🇺</span>
                  </p>
                </div>
              </div>

              {/* Action Button: Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowFullModal(true)}
                  className="rounded-lg border border-white/20 bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Expand video modal"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary Pill */}
          <div className="mt-2 flex items-center justify-end px-3 py-0.5 text-xs text-slate-light">
            <Link
              href="/book-trial"
              className="text-white/85 hover:text-white font-semibold transition-colors cursor-pointer text-xs flex items-center gap-1 group/btn"
            >
              <span>Book now</span>
              <span className="transition-transform group-hover/btn:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal Portaled to Body (z-[100] over navbar) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showFullModal && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
                onClick={() => setShowFullModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl border border-white/20 bg-navy shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex shrink-0 items-center justify-between border-b border-navy-light px-4 sm:px-6 py-3 text-white bg-navy">
                    <div className="pr-4">
                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                        Aevian Academy — 1-on-1 Live Class Experience
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-light line-clamp-1">
                        Demonstrating our interactive curriculum, whiteboard, and live mentor dynamic.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowFullModal(false)}
                      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 hover:bg-copper text-white transition-all cursor-pointer shrink-0 shadow-sm"
                      aria-label="Close video (Esc)"
                      title="Close (Esc)"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Video Player — Height Constrained to Prevent Off-Screen Overflow */}
                  <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
                    <video
                      autoPlay
                      controls
                      playsInline
                      className="max-h-[55vh] sm:max-h-[62vh] w-full h-auto object-contain"
                    >
                      <source src="/videos/hero-class.mp4" type="video/mp4" />
                      <source
                        src="https://assets.mixkit.co/videos/47186/47186-720.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>

                  {/* Modal Footer CTA */}
                  <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 bg-navy-dark px-4 sm:px-6 py-3 border-t border-navy-light/60">
                    <div className="text-xs text-slate-light max-w-md">
                      Ready to experience this with your child? Your 1st 40-minute class is completely free.
                    </div>
                    <Link
                      href="/book-trial"
                      onClick={() => setShowFullModal(false)}
                      className="rounded-full bg-copper px-5 py-2 text-xs font-bold text-white hover:bg-copper-hover active:scale-[0.98] transition-all shadow-md shrink-0"
                    >
                      Book Your Free 40-Min Demo
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
