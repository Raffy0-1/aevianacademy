"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Video, ArrowRight, ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { CardAbstract } from "@/components/ui/card-abstract";

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
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative group w-full h-[395px] [perspective:1000px] select-none">
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* ==================== FRONT FACE ==================== */}
        <div className="absolute inset-0 w-full h-full rounded-[20px] bg-[#141F2B] border border-white/10 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.6)] hover:shadow-[0_20px_45px_-10px_rgba(200,109,81,0.3)] hover:border-copper/60 transition-colors duration-300 flex flex-col justify-between overflow-hidden p-5 [backface-visibility:hidden]">
          {/* Corner Watermark */}
          <CardAbstract variant="compass" position="top-right" theme="dark" />

          {/* Top Border Accent Tab */}
          <div className="w-[55%] h-[4.5px] bg-gradient-to-r from-copper via-amber-500 to-copper mx-auto rounded-b-xl shadow-xs transition-all duration-300 group-hover:w-[70%]" />

          {/* Core Profile Info */}
          <div className="relative z-10 text-center flex flex-col items-center flex-1 justify-center my-auto">
            {/* Headshot Squircle Container */}
            <div className="relative w-24 h-28 sm:w-28 sm:h-30 rounded-[18px] overflow-hidden border-2 border-copper/40 bg-[#0F1722] shadow-md group-hover:scale-105 group-hover:border-copper transition-all duration-300">
              <Image
                src={teacher.headshot}
                alt={teacher.name}
                fill
                sizes="(max-width: 768px) 120px, 150px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Name */}
            <span className="block font-display font-bold text-white text-center pt-3 text-base sm:text-lg tracking-tight leading-snug">
              {teacher.name}
            </span>

            {/* Job Title */}
            <p className="block font-medium text-copper text-center pt-0.5 text-xs sm:text-sm">
              {teacher.title}
            </p>

            {/* Rating & Institution */}
            <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] text-slate-light">
              <span className="flex items-center gap-1 text-copper font-bold">
                <Star className="h-3 w-3 fill-copper text-copper" />
                <span>{teacher.rating}</span>
              </span>
              <span>•</span>
              <span className="truncate max-w-[130px]">{teacher.institution}</span>
            </div>
          </div>

          {/* Flip to Details Trigger */}
          <div className="relative z-10 pt-2">
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-copper px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-copper-hover active:scale-95 transition-all cursor-pointer"
              aria-label={`View details for ${teacher.name}`}
            >
              <span>Click for Details</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* ==================== BACK FACE (REVEALED ON FLIP) ==================== */}
        <div className="absolute inset-0 w-full h-full rounded-[20px] bg-[#141F2B] border border-copper/50 shadow-[0_16px_40px_-8px_rgba(200,109,81,0.25)] flex flex-col justify-between overflow-hidden p-5 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* Subtle Watermark */}
          <CardAbstract variant="orbit" position="bottom-right" theme="dark" />

          {/* Top Border Accent Tab */}
          <div className="w-[60%] h-[4.5px] bg-gradient-to-r from-copper via-amber-500 to-copper mx-auto rounded-b-xl shadow-xs" />

          <div className="relative z-10 flex-1 flex flex-col justify-between pt-2">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-copper uppercase tracking-wider font-mono">
                  {"//"} Faculty Dossier
                </span>
                <span className="rounded bg-copper/20 px-2 py-0.5 text-[9px] font-bold text-copper uppercase">
                  {teacher.years}
                </span>
              </div>

              <h4 className="mt-1 font-display text-base font-bold text-white leading-tight">
                {teacher.name}
              </h4>

              <p className="mt-0.5 text-xs font-medium text-copper leading-tight">
                {teacher.subject}
              </p>

              <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-light">
                <Star className="h-3 w-3 fill-copper text-copper shrink-0" />
                <span className="font-semibold text-white">{teacher.rating}</span>
                <span>•</span>
                <span className="truncate">{teacher.institution}</span>
              </div>
            </div>

            {/* Bio text */}
            <div className="my-2 py-2 border-y border-white/10">
              <p className="text-xs text-slate-light leading-relaxed line-clamp-4">
                {teacher.bio}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-2 pt-1">
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
                className="inline-flex items-center gap-1 rounded-lg bg-copper px-3 py-1.5 text-xs font-bold text-white hover:bg-copper-hover transition-colors shadow-xs"
              >
                <span>Book Trial</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Flip Back Button */}
          <div className="relative z-10 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-1.5 text-xs font-semibold text-slate-light hover:bg-white/15 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="h-3 w-3 text-copper" />
              <span>Back to Profile</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
