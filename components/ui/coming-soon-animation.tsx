"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ComingSoonAnimation({ className = "" }: { className?: string }) {
  const [blink, setBlink] = useState(false);

  // Natural periodic eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative mx-auto flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] sm:max-w-[400px] h-auto overflow-visible drop-shadow-xl"
      >
        <defs>
          {/* Signboard Golden Yellow Gradient */}
          <linearGradient id="signboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* T-Shirt Brand Blue / Indigo Gradient */}
          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Soft Tablet Screen Gradient */}
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.4" />
          </linearGradient>

          {/* Tablet Drop Shadow */}
          <filter id="tabletGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#1E293B" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* ========================================================
            1. TABLET / SCREEN FRAME (IN BACKGROUND)
           ======================================================== */}
        <g filter="url(#tabletGlow)">
          {/* Outer Tablet Body */}
          <rect
            x="65"
            y="95"
            width="270"
            height="335"
            rx="24"
            fill="url(#screenGradient)"
            stroke="#94A3B8"
            strokeWidth="2.5"
            className="dark:fill-[#141F2B] dark:stroke-[#2A3C4E]"
          />

          {/* Camera / Sensor Notch */}
          <circle cx="200" cy="112" r="3.5" fill="#94A3B8" className="dark:fill-[#475569]" />
          <line
            x1="180"
            y1="112"
            x2="190"
            y2="112"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
            className="dark:stroke-[#334155]"
          />
        </g>

        {/* ========================================================
            2. FLOATING CONFETTI & SPIRAL RIBBONS (BACKGROUND LAYER)
           ======================================================== */}
        {/* Spiral 1: Top Left */}
        <motion.path
          d="M 105 52 C 112 36, 126 38, 120 54 C 114 66, 128 76, 138 64"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="dark:stroke-[#94A3B8]"
          animate={{
            rotate: [0, 12, -8, 0],
            y: [0, -5, 2, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "120px", originY: "50px" }}
        />

        {/* Spiral 2: Top Center Behind Board */}
        <motion.path
          d="M 188 32 C 180 18, 196 12, 204 24 C 210 34, 198 44, 212 40"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="dark:stroke-[#94A3B8]"
          animate={{
            rotate: [0, -14, 10, 0],
            y: [0, -6, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ originX: "200px", originY: "30px" }}
        />

        {/* Spiral 3: Top Right */}
        <motion.path
          d="M 268 45 C 275 30, 290 34, 282 48 C 276 60, 292 68, 298 56"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="dark:stroke-[#94A3B8]"
          animate={{
            rotate: [0, 15, -12, 0],
            y: [0, -4, 3, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ originX: "282px", originY: "48px" }}
        />

        {/* Spiral 4: Mid Left */}
        <motion.path
          d="M 42 245 C 32 258, 48 268, 54 282 C 60 294, 42 305, 36 292"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="dark:stroke-[#94A3B8]"
          animate={{
            rotate: [0, -10, 12, 0],
            y: [0, -7, 0],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          style={{ originX: "46px", originY: "275px" }}
        />

        {/* Spiral 5: Mid Right */}
        <motion.path
          d="M 358 220 C 370 232, 354 246, 365 260 C 374 272, 358 282, 348 272"
          stroke="#1E293B"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="dark:stroke-[#94A3B8]"
          animate={{
            rotate: [0, 14, -10, 0],
            y: [0, -5, 2, 0],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{ originX: "360px", originY: "250px" }}
        />

        {/* Golden Diamond Particle Left */}
        <motion.polygon
          points="56,310 60,304 64,310 60,316"
          fill="#F59E0B"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Golden Diamond Particle Right */}
        <motion.polygon
          points="344,310 348,304 352,310 348,316"
          fill="#F59E0B"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Blue Star Dot Top Left */}
        <motion.circle
          cx="62"
          cy="195"
          r="3"
          fill="#6366F1"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />

        {/* Copper Star Dot Top Right */}
        <motion.circle
          cx="338"
          cy="175"
          r="3"
          fill="#C86D51"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 1.2 }}
        />

        {/* ========================================================
            3. CHARACTER BODY & HEAD (MID LAYER)
           ======================================================== */}
        <g id="character-body">
          {/* Torso / T-Shirt Body */}
          <path
            d="M 148 270 
               L 182 270 
               Q 200 278 218 270 
               L 252 270 
               L 262 430 
               L 138 430 
               Z"
            fill="url(#shirtGradient)"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Left Sleeve */}
          <path
            d="M 148 270 L 122 280 L 128 335 L 154 322 Z"
            fill="url(#shirtGradient)"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right Sleeve */}
          <path
            d="M 252 270 L 278 280 L 272 335 L 246 322 Z"
            fill="url(#shirtGradient)"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* T-Shirt Fold Crease Lines */}
          <path
            d="M 152 305 L 158 360"
            stroke="#3730A3"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 248 305 L 242 360"
            stroke="#3730A3"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Neck */}
          <path
            d="M 184 235 L 184 272 Q 200 280 216 272 L 216 235 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Head Shape */}
          <path
            d="M 172 200 
               C 172 238, 228 238, 228 200 
               C 228 178, 172 178, 172 200 Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Left Ear */}
          <path
            d="M 172 198 C 166 198, 166 210, 172 212"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Right Ear */}
          <path
            d="M 228 198 C 234 198, 234 210, 228 212"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Dark Stylized Tousled Hair */}
          <path
            d="M 166 195 
               C 160 170, 175 145, 202 148 
               C 224 150, 236 168, 232 192 
               C 230 180, 220 174, 210 177 
               C 198 180, 194 190, 185 190 
               C 178 190, 172 185, 166 195 Z"
            fill="#1E1B4B"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Facial Features */}
          {/* Eyebrows */}
          <path
            d="M 191 190 Q 197 187 202 191"
            stroke="#1E293B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 210 191 Q 215 187 221 190"
            stroke="#1E293B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Eyes (With Blink State) */}
          {blink ? (
            <>
              <line x1="193" y1="197" x2="200" y2="197" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="212" y1="197" x2="219" y2="197" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="196.5" cy="197" r="2.5" fill="#1E293B" />
              <circle cx="215.5" cy="197" r="2.5" fill="#1E293B" />
            </>
          )}

          {/* Nose */}
          <path
            d="M 206 199 Q 204 206 208 206"
            stroke="#1E293B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Cheerful Smile */}
          <path
            d="M 198 214 Q 206 222 214 214"
            stroke="#1E293B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Soft Cheeks Blush */}
          <ellipse cx="188" cy="207" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.6" />
          <ellipse cx="224" cy="207" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.6" />
        </g>

        {/* ========================================================
            4. ANIMATED SIGNBOARD & HOLDING ARMS (FLOATING TOGETHER)
           ======================================================== */}
        <motion.g
          animate={{
            y: [0, -9, 0],
            rotate: [-0.6, 0.6, -0.6],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "200px", originY: "135px" }}
        >
          {/* Left Arm (Going up from sleeve to bottom of sign) */}
          <path
            d="M 128 335 
               C 114 280, 102 215, 108 148 
               L 134 146 
               C 130 205, 140 270, 154 322 
               Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Left Hand Holding Left Edge of Board */}
          {/* Finger curves wrapping over the board */}
          <path
            d="M 108 148 
               C 106 128, 126 124, 134 146
               Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Thumb detail */}
          <path
            d="M 132 144 C 136 136, 146 140, 144 148"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right Arm (Going up from sleeve to bottom of sign) */}
          <path
            d="M 272 335 
               C 286 280, 298 215, 292 148 
               L 266 146 
               C 270 205, 260 270, 246 322 
               Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right Hand Holding Right Edge of Board */}
          <path
            d="M 292 148 
               C 294 128, 274 124, 266 146
               Z"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Thumb detail */}
          <path
            d="M 268 144 C 264 136, 254 140, 256 148"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* --- THE SIGNBOARD ITSELF --- */}
          {/* Board Drop Shadow */}
          <rect
            x="84"
            y="64"
            width="232"
            height="86"
            rx="18"
            fill="#000000"
            opacity="0.08"
          />

          {/* Board Surface */}
          <rect
            x="82"
            y="60"
            width="236"
            height="86"
            rx="18"
            fill="url(#signboardGradient)"
            stroke="#1E293B"
            strokeWidth="2.5"
          />

          {/* Inner Highlight Border on Board */}
          <rect
            x="86"
            y="64"
            width="228"
            height="78"
            rx="14"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* "Coming Soon" Typography */}
          <text
            x="200"
            y="114"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="30"
            fontWeight="800"
            fontFamily="var(--font-display), 'Comic Sans MS', cursive, sans-serif"
            letterSpacing="-0.02em"
            style={{
              textShadow: "0 2px 4px rgba(180, 83, 9, 0.45)",
              fontStyle: "italic",
            }}
          >
            Coming Soon
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
