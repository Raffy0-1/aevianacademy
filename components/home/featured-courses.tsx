"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, RotateCcw, CheckCircle2, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/data/programs";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";

// Curated high-resolution studio photography for academic courses
const COURSE_PHOTOS: Record<string, string> = {
  "school-subject-tutoring":
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80",
  "competitive-school-assessment-prep":
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
  "ielts-preparation-masterclass":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "15-day-grammar-mastery":
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
};

const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

export function FeaturedCourses() {
  const [flippedSlugs, setFlippedSlugs] = useState<Record<string, boolean>>({});

  // Extract the first course from each program category to showcase 4 courses
  const featured = programs
    .map((p) => ({
      ...p.courses[0],
      categoryName: p.title,
    }))
    .slice(0, 4);

  const toggleFlip = (slug: string) => {
    setFlippedSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured Programs"
              title="A starting point for every level"
              description="Live 1-on-1 personalized tracks led by certified international faculty across global curricula."
            />
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:underline transition-colors"
            >
              <span>Browse all programs</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <ScrollRevealStagger className="h-full flex flex-col">
            {featured.map((course) => {
              const photoUrl = COURSE_PHOTOS[course.slug] || DEFAULT_PHOTO;
              const isFlipped = !!flippedSlugs[course.slug];

              return (
                <div
                  key={course.slug}
                  className="relative w-full h-[435px] [perspective:1000px] select-none"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative w-full h-full"
                  >
                    {/* ==================== FRONT FACE ==================== */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl border border-slate-200/80 bg-white/85 dark:bg-navy/70 dark:border-navy-light/50 p-2 shadow-2xs hover:shadow-xl hover:border-copper/40 transition-all duration-300 flex flex-col overflow-hidden [backface-visibility:hidden]">
                      <div className="relative rounded-[1.35rem] bg-gradient-to-br from-white via-cream/20 to-slate-50/40 dark:from-[#1C2A38] dark:via-[#16222E] dark:to-[#111A24] overflow-hidden flex flex-col h-full justify-between">
                        {/* Media Header Banner */}
                        <div className="relative h-36 w-full overflow-hidden bg-navy-dark shrink-0">
                          <Image
                            src={photoUrl}
                            alt={course.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />

                          {/* Floating Category Badge */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pr-3">
                            <span className="rounded-md bg-navy/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/20 shadow-xs truncate max-w-[210px]">
                              {course.categoryName}
                            </span>
                          </div>
                        </div>

                        {/* Symmetrical Core Card Body */}
                        <div className="relative p-4 sm:p-5 flex flex-col flex-1 justify-between">
                          <CardAbstract variant="concentric" position="bottom-right" />

                          <div className="relative z-10">
                            {/* Badges Row */}
                            <div className="h-6 mb-1.5 flex items-center gap-1.5 overflow-hidden">
                              {course.badges.slice(0, 2).map((badge, i) => (
                                <Badge
                                  key={i}
                                  className="text-[10px] font-semibold bg-copper/10 text-copper border-copper/20 shrink-0"
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>

                            {/* Title Block (Fixed 2-Line Height) */}
                            <div className="h-11 flex items-center mb-1">
                              <h3 className="text-sm sm:text-base font-bold text-navy hover:text-copper transition-colors line-clamp-2 dark:text-cream dark:hover:text-copper leading-tight">
                                {course.title}
                              </h3>
                            </div>

                            {/* Description (Fixed Height) */}
                            <p className="text-xs text-slate dark:text-slate-light leading-relaxed font-normal h-10 line-clamp-2">
                              {course.description}
                            </p>

                            {/* Meta Columns */}
                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-navy-light/60 grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  <Users className="h-3 w-3 text-copper" />
                                  <span>Target</span>
                                </span>
                                <span
                                  className="mt-0.5 block font-semibold text-[11px] text-navy dark:text-cream truncate"
                                  title={course.targetStudents}
                                >
                                  {course.targetStudents}
                                </span>
                              </div>
                              <div>
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  <Clock className="h-3 w-3 text-copper" />
                                  <span>Duration</span>
                                </span>
                                <span className="mt-0.5 block font-semibold text-[11px] text-navy dark:text-cream truncate">
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Bar: Flip Button & Curriculum Link */}
                          <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-100 dark:border-navy-light/60 flex items-center justify-between text-xs">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFlip(course.slug);
                              }}
                              className="inline-flex items-center gap-1 font-bold text-navy hover:text-copper dark:text-cream dark:hover:text-copper transition-colors cursor-pointer text-xs"
                              aria-label="Flip card for course details"
                            >
                              <span>More</span>
                              <ChevronRight className="h-3.5 w-3.5 text-copper" />
                            </button>

                            <Link
                              href={`/programs/${course.slug}`}
                              className="inline-flex items-center gap-1 font-bold text-copper hover:text-copper-hover transition-all hover:translate-x-0.5"
                            >
                              <span>Curriculum</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ==================== BACK FACE (REVEALED ON FLIP) ==================== */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl border border-copper/50 bg-[#141F2B] p-2 shadow-xl flex flex-col overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="relative rounded-[1.35rem] bg-gradient-to-br from-[#1C2A38] via-[#16222E] to-[#111A24] text-white p-5 flex flex-col justify-between h-full overflow-hidden">
                        <CardAbstract variant="compass" position="bottom-right" theme="dark" />

                        <div className="relative z-10 flex-1 flex flex-col justify-between">
                          {/* Header */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[10px] font-bold text-copper uppercase tracking-wider font-mono truncate max-w-[170px]">
                                {"//"} {course.categoryName}
                              </span>
                              <span className="rounded bg-copper/20 px-1.5 py-0.5 text-[9px] font-bold text-copper uppercase shrink-0">
                                {course.duration}
                              </span>
                            </div>

                            <h4 className="font-display text-sm sm:text-base font-bold text-white line-clamp-1 leading-snug">
                              {course.title}
                            </h4>

                            <p className="mt-1 text-[11px] text-slate-light line-clamp-1">
                              <span className="font-semibold text-white/90">Target:</span> {course.targetStudents}
                            </p>
                          </div>

                          {/* Key Milestones */}
                          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                            <div className="my-2 py-2 border-y border-white/10">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-copper mb-1.5">
                                Key Learning Milestones:
                              </span>
                              <ul className="space-y-1.5">
                                {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-1.5 text-[11px] leading-tight text-slate-light"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Aligned Curricula */}
                          {course.curriculumTags && course.curriculumTags.length > 0 && (
                            <div className="mb-2">
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                Aligned Curricula:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {course.curriculumTags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono font-medium text-slate-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Book Free Trial CTA */}
                          <Link
                            href="/book-trial"
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-copper px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-copper-hover transition-colors"
                          >
                            <span>Book Free 40-Min Trial</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        {/* Flip Back & Full Curriculum */}
                        <div className="relative z-10 pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => toggleFlip(course.slug)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-light hover:text-white transition-colors cursor-pointer"
                          >
                            <RotateCcw className="h-3 w-3 text-copper" />
                            <span>Back</span>
                          </button>

                          <Link
                            href={`/programs/${course.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-copper hover:text-copper-hover transition-colors"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </ScrollRevealStagger>
        </div>

        <div className="mt-12 flex justify-center">
          <ScrollReveal>
            <Link href="/programs">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-border text-navy hover:border-copper hover:text-copper cursor-pointer"
              >
                View all programs
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
