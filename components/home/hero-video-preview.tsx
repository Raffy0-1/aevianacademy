"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Maximize2, X, Star } from "lucide-react";
import Image from "next/image";

export function HeroVideoPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showFullModal, setShowFullModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="relative group">
        {/* Main Video Card Shell with Rich 3D Elevation Shadow (No Orange Glow) */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-[#141F2B] p-2 sm:p-2.5 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.38),0_12px_24px_-8px_rgba(15,23,42,0.22),0_0_0_1px_rgba(255,255,255,0.08)] hover:shadow-[0_32px_65px_-15px_rgba(15,23,42,0.48),0_16px_32px_-8px_rgba(15,23,42,0.28)] transition-all duration-500">
          {/* Video Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0F1722]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
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

            {/* Floating Top Badge 1: Live Status */}
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-navy/85 px-3 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Live 1-on-1 Class in Session</span>
            </div>

            {/* Floating Top Badge 2: Verified Rating */}
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/85 px-3 py-1 text-[11px] font-bold text-copper shadow-lg backdrop-blur-md">
              <Star className="h-3 w-3 fill-copper text-copper" />
              <span>4.98 ★</span>
              <span className="text-[10px] text-white/70 font-normal">(1,420+ Reviews)</span>
            </div>

            {/* Bottom Overlay: Tutor and Student Info */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-navy/85 p-2.5 sm:p-3 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border-2 border-copper shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                    alt="Dr. Nadia Farooq"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-navy bg-emerald-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white leading-tight">Dr. Nadia Farooq</h4>
                    <span className="rounded bg-copper/20 px-1.5 py-0.5 text-[9px] font-bold text-copper uppercase">
                      Cambridge Alum
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-light leading-tight mt-0.5">
                    1-on-1 with Aiden K. <span className="text-white font-medium">• Sydney, AU 🇦🇺</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Sound & Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="rounded-lg border border-white/20 bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFullModal(true)}
                  className="rounded-lg border border-white/20 bg-white/10 p-1.5 sm:p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Expand video modal"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary Pill */}
          <div className="mt-2 flex items-center justify-between px-2.5 py-1 text-xs text-slate-light">
            <span className="flex items-center gap-1.5 text-copper font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HD 1080p Studio Broadcast Quality</span>
            </span>
            <button
              type="button"
              onClick={() => setShowFullModal(true)}
              className="text-white/80 hover:text-white font-medium transition-colors cursor-pointer text-xs"
            >
              Full demo &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {showFullModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-navy shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-navy-light px-6 py-4 text-white">
                <div>
                  <h3 className="text-base font-bold">Aevian Academy — 1-on-1 Live Class Experience</h3>
                  <p className="text-xs text-slate-light">
                    Demonstrating our interactive curriculum, whiteboard, and live mentor dynamic.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFullModal(false)}
                  className="rounded-full p-1.5 text-slate-light hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                >
                  <source src="/videos/hero-class.mp4" type="video/mp4" />
                  <source
                    src="https://assets.mixkit.co/videos/47186/47186-720.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-dark px-6 py-4">
                <div className="text-xs text-slate-light">
                  Ready to experience this with your child? Your 1st 40-minute class is completely free.
                </div>
                <a
                  href="/book-trial"
                  className="rounded-xl bg-copper px-5 py-2.5 text-xs font-bold text-white hover:bg-copper-hover transition-colors shadow-md"
                >
                  Book Your Free 40-Min Demo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
