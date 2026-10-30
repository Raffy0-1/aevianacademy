"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoonAnimation } from "@/components/ui/coming-soon-animation";

interface ComingSoonBannerProps {
  badge?: string;
  title: string;
  description: string;
  estimatedDate?: string;
}

export function ComingSoonBanner({
  badge = "Feature In Progress",
  title,
  description,
  estimatedDate = "Launching Soon",
}: ComingSoonBannerProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-border/70 bg-gradient-to-b from-[#FCFBF8] via-[#FAF7F2] to-[#F4EEE4] dark:from-navy dark:via-navy-dark dark:to-navy-darker p-8 sm:p-12 text-center shadow-xl backdrop-blur-md">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-copper/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Dynamic Vector Coming Soon Animation */}
      <div className="relative mx-auto flex items-center justify-center">
        <ComingSoonAnimation className="w-full max-w-[340px] sm:max-w-[380px]" />
      </div>

      {/* Status Badge */}
      <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-navy shadow-2xs">
        <span className="text-copper font-bold">{"//"}</span>
        <span>{badge}</span>
      </div>

      {/* Title & Description */}
      <h2 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-navy dark:text-cream tracking-tight">
        {title}
      </h2>
      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate dark:text-slate-light max-w-lg mx-auto">
        {description}
      </p>

      {/* Notification Signup Form */}
      <div className="mt-8 max-w-md mx-auto">
        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>Thank you! We will notify you as soon as this launches.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates..."
              className="h-11 flex-1 rounded-xl border border-slate-border/80 bg-white dark:bg-navy-dark px-3.5 text-xs sm:text-sm text-navy dark:text-white placeholder:text-slate/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30 transition-all shadow-xs"
            />
            <Button
              type="submit"
              variant="copper"
              size="default"
              className="h-11 gap-2 text-xs sm:text-sm font-bold shadow-md cursor-pointer shrink-0"
            >
              <Bell className="h-4 w-4" />
              <span>Notify Me</span>
            </Button>
          </form>
        )}
      </div>

      {/* Bottom Navigation Link */}
      <div className="mt-8 pt-5 border-t border-slate-border/50 dark:border-navy-light/40 flex items-center justify-center gap-2 text-xs font-medium text-slate dark:text-slate-light">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-copper hover:text-copper-hover font-semibold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <span>•</span>
        <Link
          href="/programs"
          className="text-slate hover:text-navy dark:hover:text-white transition-colors"
        >
          Explore Live Programs
        </Link>
      </div>
    </div>
  );
}
