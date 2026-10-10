"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVideoPreview } from "@/components/home/hero-video-preview";

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
    <section className="relative overflow-hidden bg-cream/70 backdrop-blur-xs pt-3 pb-8 sm:pt-4 sm:pb-10 lg:pt-5 lg:pb-12 border-b border-slate-border/50">
      {/* Background Subtle Geometric Glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-copper/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 h-[350px] w-[350px] rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <Container className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-extrabold tracking-tight text-navy leading-[1.12]">
            Connecting Students Worldwide with{" "}
            <span className="relative inline-block text-copper underline decoration-copper/30 underline-offset-8">
              Expert Teachers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 max-w-xl text-base sm:text-lg leading-relaxed text-slate">
            Empowering students globally through personalized 1-on-1 tutoring, competitive school assessment prep (NAPLAN, ACARA, TOEFL, UK SAT), communication skills, and Quranic recitation.
          </p>

          {/* Interactive Program Tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-1.5 shadow-xs border border-slate-border/60 max-w-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-navy text-white shadow-xs"
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-2.5 flex items-center gap-3.5 text-xs text-slate font-medium"
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
          <div className="mt-5 flex flex-wrap items-center gap-3.5">
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
          <div className="mt-6 pt-4 border-t border-slate-border/50 flex flex-wrap items-center gap-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-cream">
                <Award className="h-4.5 w-4.5 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">99.4%</p>
                <p className="text-xs text-slate">Parent Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-copper/10 text-copper">
                <Users className="h-4.5 w-4.5 text-copper" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">5+ Countries</p>
                <p className="text-xs text-slate">Global Master Faculty</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right High-Definition Live Class Video Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <HeroVideoPreview />
        </motion.div>
      </Container>
    </section>
  );
}

