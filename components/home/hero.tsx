"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVideoPreview } from "@/components/home/hero-video-preview";
import { FlowStroke } from "@/components/ui/flow-stroke";

const categories = [
  { id: "exams", label: "Competitive Exams", highlight: "NAPLAN · ACARA · TOEFL · UK SAT", stats: "Selective Exam Mastery" },
  { id: "academics", label: "Core Academics", highlight: "Math · Sciences · Languages", stats: "1-on-1 Guidance" },
  { id: "communication", label: "Communication", highlight: "Spoken Fluency & Confidence", stats: "Interactive Practice" },
  { id: "islamic", label: "Islamic Foundations", highlight: "Quran Recitation & Tajweed", stats: "Structured Modules" },
  { id: "short-skills", label: "Writing & Logic", highlight: "Critical Thinking & Reading", stats: "Fast-Track Mastery" },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState("exams");
  const selectedCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section className="relative overflow-visible bg-cream/70 backdrop-blur-xs pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 border-b border-slate-border/50">
      {/* Subtle Architectural Grid Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(#1C2A38_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-copper/[0.03] blur-2xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Skiper19 Flow Stroke — Scroll-Linked Terracotta Ribbon */}
      <FlowStroke className="h-[2200px]" />

      <Container className="grid items-center gap-10 lg:gap-12 lg:grid-cols-12 relative z-10">
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          {/* 1. Genuine Architectural Eyebrow Badge (No blinking dot, no transparent orange wash) */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/90 dark:bg-navy-dark dark:border-slate-800 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-navy/90 dark:text-cream/90 shadow-2xs select-none w-fit mb-4">
            <span className="text-copper font-bold">{"//"}</span>
            <span>Live 1-on-1 International Tutoring · IB, Cambridge &amp; SAT</span>
          </div>

          {/* 2. Display Headline — Fixed Line-Height & Tracking (No text merging) */}
          <h1 className="text-3xl sm:text-4xl lg:text-[3.15rem] xl:text-[3.65rem] font-extrabold tracking-[-0.025em] text-navy leading-[1.22] sm:leading-[1.24] lg:leading-[1.25]">
            Connecting Students Worldwide with{" "}
            <span className="relative inline-block text-copper">
              Certified Master Educators
            </span>
          </h1>

          {/* 3. Subtitle — Disciplined, punchy copy under 20 words */}
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate font-normal">
            Personalized 1-on-1 instruction for IB, Cambridge, and SAT exams. Tailored to your student&apos;s exact pace with certified international faculty.
          </p>

          {/* 4. Interactive Curricula Selector — Architectural Double-Bezel Tabs */}
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/70 p-2 shadow-xs backdrop-blur-xs max-w-xl">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? "bg-navy text-white shadow-xs"
                      : "text-slate hover:text-navy hover:bg-cream-muted"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Dynamic Curriculum Telemetry Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2 text-xs text-slate font-medium"
              >
                <span className="flex items-center gap-1.5 text-copper font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-copper" />
                  {selectedCategory.highlight}
                </span>
                <span className="text-navy font-bold text-[11px] uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {selectedCategory.stats}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 5. Primary CTA Strip — Nested Island Button & Pill Action */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link href="/book-trial" className="group">
              <div className="inline-flex items-center gap-3 rounded-full bg-copper pl-5 pr-2 py-2 text-sm sm:text-base font-semibold text-white shadow-[0_4px_16px_rgba(200,109,81,0.3)] hover:shadow-[0_6px_22px_rgba(200,109,81,0.42)] hover:bg-copper-hover active:scale-[0.98] transition-all cursor-pointer">
                <span>Book Free 40-Min Trial</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </div>
            </Link>

            <Link href="/programs">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full gap-2 text-sm sm:text-base font-semibold border-slate-border/80 hover:border-copper/50 text-navy"
              >
                <Play className="h-3.5 w-3.5 text-copper fill-copper" />
                <span>Explore Curriculums</span>
              </Button>
            </Link>
          </div>

          {/* Micro Trust Indicator */}
          <p className="mt-3 text-xs text-slate font-medium flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Free 40-minute diagnostic session · No credit card required · Certified faculty</span>
          </p>

          {/* 6. High-End Machined Trust Metrics (Double-Bezel Architecture) */}
          <div className="mt-6 pt-4 border-t border-slate-border/50 flex flex-wrap items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-3 rounded-xl bg-white/50 border border-slate-200/60 py-1.5 px-3 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-cream">
                <Award className="h-4 w-4 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy leading-tight">99.4%</p>
                <p className="text-[11px] text-slate leading-tight">Parent Satisfaction</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white/50 border border-slate-200/60 py-1.5 px-3 shadow-2xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/15 text-copper">
                <Users className="h-4 w-4 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy leading-tight">5+ Countries</p>
                <p className="text-[11px] text-slate leading-tight">Global Master Faculty</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Live Class Broadcast Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="lg:col-span-5 relative"
        >
          <HeroVideoPreview />
        </motion.div>
      </Container>
    </section>
  );
}
