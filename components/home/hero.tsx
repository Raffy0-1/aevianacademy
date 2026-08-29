"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, CheckCircle2, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const categories = [
  { id: "exams", label: "Competitive Exams & Curriculums", highlight: "NAPLAN, ACARA, TOEFL, UK SAT", stats: "Selective Exam Mastery" },
  { id: "communication", label: "Communication Skills", highlight: "Spoken Fluency & Confidence", stats: "Interactive Practice" },
  { id: "islamic", label: "Islamic Foundation Courses", highlight: "Kalimas, Namaz, Azan & Duas", stats: "Quran Recitation & Tajweed" },
  { id: "short-skills", label: "Short Skills", highlight: "Writing & Reading Skills", stats: "Structured Modules" },
  { id: "academics", label: "Core Academics", highlight: "Math, Sciences & Languages", stats: "1-on-1 Guidance" },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState("exams");
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const selectedCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section className="relative overflow-hidden bg-cream py-16 lg:py-24 border-b border-slate-border/50">
      {/* Background Subtle Geometric Glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-copper/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <Container className="grid items-center gap-12 lg:grid-cols-12">
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-copper/30 bg-copper/10 px-3.5 py-1.5 text-xs font-semibold text-copper">
            <Sparkles className="h-3.5 w-3.5 text-copper" />
            <span>The Learning Path Strategy</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.08]">
            Connecting Students Worldwide with{" "}
            <span className="relative inline-block text-copper underline decoration-copper/30 underline-offset-8">
              Expert Teachers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            Empowering students globally through personalized 1-on-1 tutoring, competitive school assessment prep (NAPLAN, ACARA, TOEFL, UK SAT), communication skills, and Quranic recitation.
          </p>

          {/* Interactive Program Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-xl bg-white p-1.5 shadow-sm border border-slate-border/60 max-w-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-navy text-white shadow-sm"
                    : "text-slate hover:text-navy hover:bg-cream-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tab Detail Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-4 flex items-center gap-4 text-xs text-slate font-medium"
            >
              <span className="flex items-center gap-1.5 text-copper font-semibold">
                <CheckCircle2 className="h-4 w-4 text-copper" />
                {selectedCategory.highlight}
              </span>
              <span className="text-slate-border">•</span>
              <span className="text-navy font-semibold">{selectedCategory.stats}</span>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/book-trial">
              <Button variant="copper" size="lg" className="gap-2 text-base shadow-md">
                <span>Book Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                <Play className="h-4 w-4 text-copper" />
                <span>Explore Programs</span>
              </Button>
            </Link>
          </div>

          {/* Trust Metrics */}
          <div className="mt-10 pt-8 border-t border-slate-border/50 flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-cream">
                <Award className="h-5 w-5 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">99.4%</p>
                <p className="text-xs text-slate">Parent Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10 text-copper">
                <Users className="h-5 w-5 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">5+ Countries</p>
                <p className="text-xs text-slate">Global Master Faculty</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Interactive Learning Path Widget (Moodboard Concept) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-2xl border border-navy-light overflow-hidden">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-copper/20 blur-2xl rounded-full pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy-light pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-copper">
                  Student Progress Model
                </p>
                <h3 className="text-lg font-bold text-white mt-0.5">The Learning Path</h3>
              </div>
              <span className="rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30">
                Live Interactive
              </span>
            </div>

            {/* Interactive SVG Path Illustration (Mirroring Moodboard Geometric Path) */}
            <div className="my-6 relative py-4">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 320 160" fill="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="40" x2="320" y2="40" stroke="#2A3C4E" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="320" y2="80" stroke="#2A3C4E" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="320" y2="120" stroke="#2A3C4E" strokeDasharray="4 4" />

                {/* Animated Geometric Flowing Path */}
                <path
                  d="M 20 130 C 60 130, 80 90, 120 90 C 160 90, 180 30, 230 30 C 270 30, 290 50, 300 50"
                  stroke="#C86D51"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="animate-pulse-path"
                />

                {/* Interactive Node 1: Foundation */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(1)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle cx="20" cy="130" r="9" fill="#1C2A38" stroke="#C86D51" strokeWidth="3" />
                  <circle cx="20" cy="130" r="4" fill="#C86D51" />
                </g>

                {/* Interactive Node 2: Critical Thinking */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(2)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle cx="120" cy="90" r="9" fill="#1C2A38" stroke="#C86D51" strokeWidth="3" />
                  <circle cx="120" cy="90" r="4" fill="#C86D51" />
                </g>

                {/* Interactive Node 3: Mastery Level */}
                <g
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNode(3)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle cx="230" cy="30" r="11" fill="#C86D51" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="230" cy="30" r="4" fill="#FFFFFF" />
                </g>
              </svg>

              {/* Dynamic Tooltip */}
              <AnimatePresence>
                {hoveredNode !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-2 right-4 bg-white text-navy px-3.5 py-2 rounded-lg text-xs shadow-lg border border-slate-border font-semibold"
                  >
                    {hoveredNode === 1 && "Stage 1: Diagnostic Assessment & Core Prep"}
                    {hoveredNode === 2 && "Stage 2: Critical Thinking & Problem Solving (90%)"}
                    {hoveredNode === 3 && "Stage 3: Advanced Academic Mastery (96%)"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Achievement Metrics Cards (From Moodboard) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl bg-navy-dark p-3 border border-navy-light/60">
                <p className="text-xs text-slate-light font-medium">Critical Thinking</p>
                <p className="mt-1 text-lg font-bold text-copper">90%</p>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-navy-light overflow-hidden">
                  <div className="h-full bg-copper rounded-full w-[90%]" />
                </div>
              </div>

              <div className="rounded-xl bg-navy-dark p-3 border border-navy-light/60">
                <p className="text-xs text-slate-light font-medium">Exam Mastery</p>
                <p className="mt-1 text-lg font-bold text-white">96%</p>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-navy-light overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[96%]" />
                </div>
              </div>

              <div className="rounded-xl bg-navy-dark p-3 border border-navy-light/60">
                <p className="text-xs text-slate-light font-medium">Progress Rate</p>
                <p className="mt-1 text-lg font-bold text-copper">2.4x</p>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-navy-light overflow-hidden">
                  <div className="h-full bg-copper rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Floating Live Badge */}
            <div className="mt-5 flex items-center justify-between text-xs text-slate-light">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live 1-on-1 Tutoring Session Active</span>
              </span>
              <span className="text-copper font-medium">Learn More &rarr;</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

