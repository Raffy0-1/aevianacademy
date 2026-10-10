"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Video, ArrowRight, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";

export interface TeacherData {
  id: string;
  name: string;
  title: string;
  subject: string;
  rating: string | number;
  reviewsCount?: number;
  years: string;
  institution: string;
  bio: string;
  headshot: string;
  videoUrl?: string;
  badge?: string;
}

interface TeacherCardProps {
  teacher: TeacherData;
  onWatchDemo?: (teacher: TeacherData) => void;
}

export function TeacherCard({ teacher, onWatchDemo }: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group w-full overflow-hidden rounded-[20px] bg-[#141F2B] border border-white/10 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.6)] hover:shadow-[0_20px_45px_-10px_rgba(200,109,81,0.3)] hover:border-copper/60 transition-all duration-300 flex flex-col justify-between">
      {/* Top Border Accent Tab (card-border-top from design) */}
      <div className="w-[55%] h-[4.5px] bg-gradient-to-r from-copper via-amber-500 to-copper mx-auto rounded-b-xl shadow-xs transition-all duration-300 group-hover:w-[70%]" />

      {/* Main Front Content */}
      <div className="p-5 pb-4 text-center">
        {/* Headshot Squircle Image Container (.img from design) */}
        <div className="relative w-24 h-28 sm:w-28 sm:h-32 mx-auto mt-2 rounded-[18px] overflow-hidden border-2 border-copper/40 bg-[#0F1722] shadow-md group-hover:scale-105 group-hover:border-copper transition-all duration-300">
          <Image
            src={teacher.headshot}
            alt={teacher.name}
            fill
            sizes="(max-width: 768px) 120px, 150px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Person Name (span from design) */}
        <span className="block font-display font-bold text-white text-center pt-3.5 text-base sm:text-lg tracking-tight leading-snug">
          {teacher.name}
        </span>

        {/* Job Title (<p class="job"> from design) */}
        <p className="block font-medium text-copper text-center pt-1 text-xs sm:text-sm">
          {teacher.title}
        </p>

        {/* Rating & Institution Micro-Pill */}
        <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-slate-light">
          <span className="flex items-center gap-1 text-copper font-bold">
            <Star className="h-3 w-3 fill-copper text-copper" />
            <span>{teacher.rating}</span>
          </span>
          <span>•</span>
          <span className="truncate max-w-[140px]">{teacher.institution}</span>
        </div>

        {/* Action Button (<button> from design) - reveals details on click */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 mx-auto flex items-center justify-center gap-1.5 rounded-xl bg-copper px-6 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-copper-hover active:scale-95 transition-all cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide Details" : "Click for Details"}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Details Revealed When Clicked */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#0F1722]/95 px-5 py-4 backdrop-blur-md text-left"
          >
            {/* Subject & Experience */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-white/95 truncate">
                {teacher.subject}
              </span>
              <span className="shrink-0 rounded bg-copper/20 px-2 py-0.5 text-[9px] font-bold text-copper uppercase">
                {teacher.years}
              </span>
            </div>

            {/* Teacher Bio */}
            <p className="text-xs text-slate-light leading-relaxed mb-3">
              {teacher.bio}
            </p>

            {/* Action buttons */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              {teacher.videoUrl && onWatchDemo ? (
                <button
                  type="button"
                  onClick={() => onWatchDemo(teacher)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-copper hover:text-copper-hover cursor-pointer"
                >
                  <Video className="h-3.5 w-3.5" />
                  <span>Watch Demo</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-light flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Vetted Faculty
                </span>
              )}

              <Link
                href="/book-trial"
                className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-copper transition-colors"
              >
                <span>Book Trial</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
