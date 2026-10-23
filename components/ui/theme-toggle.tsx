"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeToggle } from "@/skiper26";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useThemeToggle({
    variant: "circle",
    start: "center",
    blur: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8.5 w-8.5 rounded-full border border-slate-200/50 bg-slate-100/50 dark:bg-navy-light/30 dark:border-navy-light/30 shrink-0",
          className
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "group relative flex h-8.5 w-8.5 items-center justify-center rounded-full border transition-all duration-200 cursor-pointer select-none shrink-0",
        // Light mode: seamless frosted slate/cream glass that blends with navbar
        "border-slate-200/70 bg-slate-100/70 text-slate-600 shadow-2xs hover:border-copper/40 hover:bg-white hover:text-copper",
        // Dark mode: soft navy-glass with copper hover
        "dark:border-navy-light/50 dark:bg-navy-light/40 dark:text-slate-300 dark:hover:border-copper/40 dark:hover:bg-navy-light/80 dark:hover:text-copper",
        "active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/40",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -30, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 30, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center pointer-events-none"
          >
            <Moon className="h-4 w-4 stroke-[1.8] text-copper group-hover:scale-105 transition-transform" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 30, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -30, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center pointer-events-none"
          >
            <Sun className="h-4 w-4 stroke-[1.8] text-slate-600 group-hover:text-copper group-hover:rotate-45 transition-all duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
