import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// AEVIAN BRAND DESIGN SYSTEM
// Palette based on Brand Identity Exploration Moodboard:
//   navy      #1C2A38  Deep Slate Navy — primary headlines, brand icon left stem, dark cards
//   copper    #C86D51  Terracotta Rust / Warm Copper — signature accent, logo right leg, primary buttons
//   cream     #FAF7F2  Warm Ivory Cream — light mode ground surface
//   slate     #5A6B7C  Muted Slate — secondary body text, borders
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1C2A38",
          dark: "#111A24",
          light: "#2A3C4E",
        },
        copper: {
          DEFAULT: "#C86D51",
          hover: "#B65B40",
          light: "#F5EAE6",
        },
        meridian: {
          DEFAULT: "#C86D51",
          hover: "#B65B40",
          light: "#F5EAE6",
        },
        gold: {
          DEFAULT: "#D97706",
          hover: "#B45309",
          light: "#FEF3C7",
        },
        danger: {
          DEFAULT: "#E11D48",
          hover: "#BE123C",
          light: "#FFE4E6",
        },
        success: {
          DEFAULT: "#059669",
          hover: "#047857",
          light: "#D1FAE5",
        },
        cream: {
          DEFAULT: "#FAF7F2",
          card: "#FFFFFF",
          muted: "#F0EAE1",
        },
        slate: {
          DEFAULT: "#5A6B7C",
          light: "#8B9BB0",
          border: "#E2D9CD",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(28, 42, 56, 0.04)",
        xs: "0 1px 3px 0 rgba(28, 42, 56, 0.06), 0 1px 2px -1px rgba(28, 42, 56, 0.04)",
        card: "0 4px 24px -4px rgba(28, 42, 56, 0.06)",
        floating: "0 12px 36px -10px rgba(28, 42, 56, 0.12)",
        copper: "0 4px 18px rgba(200, 109, 81, 0.32)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulsePath: {
          "0%, 100%": { opacity: "0.4", strokeDashoffset: "0" },
          "50%": { opacity: "1", strokeDashoffset: "20" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "pulse-path": "pulsePath 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spinSlow 12s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

