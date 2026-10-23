"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  ShieldCheck,
  Clock,
  ArrowRight,
  Target,
  CheckCircle2,
  TrendingUp,
  Award,
  Video,
  FileCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-cream/70 backdrop-blur-xs border-b border-slate-border/50 relative overflow-hidden">
      {/* Subtle Architectural Grid Lines */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(#1C2A38_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Aevian Advantage"
            title="Engineered around master teachers, structured paths & measurable growth"
            description="Most online platforms scale by replacing educators with pre-recorded video playlists. Aevian empowers accredited international faculty with live 1-on-1 focus, diagnostic tools, and compounding learning paths."
          />
        </ScrollReveal>

        {/* High-End Asymmetrical Bento Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento Tile 1: Flagship Anchor (Col-span 12 md:col-span-7 lg:col-span-8) */}
          <div className="md:col-span-7 lg:col-span-8 group relative rounded-3xl border border-slate-200/90 bg-white/80 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(28,42,56,0.12)] hover:border-copper/40 transition-all duration-300 flex flex-col">
            <div className="relative flex-1 rounded-[1.35rem] bg-gradient-to-br from-white via-cream/40 to-slate-50/50 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              <CardAbstract variant="orbit" position="top-right" />

              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10 text-copper shadow-2xs group-hover:bg-copper group-hover:text-white transition-all duration-300">
                    <Users size={24} strokeWidth={1.8} />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-navy shadow-2xs">
                    <span className="text-copper font-bold">//</span>
                    <span>Flagship Mentorship</span>
                  </span>
                </div>

                <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-navy tracking-tight leading-snug">
                  1-on-1 Individual Focus — Zero Group Dilution
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate max-w-xl">
                  Uninterrupted, private mentorship where master teachers adapt every explanation, problem set, and pacing decision strictly to your child&apos;s cognitive curve.
                </p>
              </div>

              {/* Interactive Telemetry Mockup Inside Card */}
              <div className="mt-6 pt-5 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-copper text-xs font-semibold">
                    <Video className="h-3.5 w-3.5" />
                    <span>Live 1-on-1 Video</span>
                  </div>
                  <p className="mt-1 font-display text-lg font-bold text-navy">100% Focus</p>
                  <p className="text-[11px] text-slate">Zero distractions</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Grade Growth</span>
                  </div>
                  <p className="mt-1 font-display text-lg font-bold text-navy">+1.8 Grades</p>
                  <p className="text-[11px] text-slate">Avg IB/IGCSE gain</p>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-navy text-xs font-semibold">
                    <Target className="h-3.5 w-3.5 text-copper" />
                    <span>Pacing Mode</span>
                  </div>
                  <p className="mt-1 font-display text-lg font-bold text-navy">Adaptive</p>
                  <p className="text-[11px] text-slate">Customized weekly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Tile 2: Faculty Rigor (Col-span 12 md:col-span-5 lg:col-span-4) */}
          <div className="md:col-span-5 lg:col-span-4 group relative rounded-3xl border border-slate-200/90 bg-white/80 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(28,42,56,0.12)] hover:border-copper/40 transition-all duration-300 flex flex-col">
            <div className="relative flex-1 rounded-[1.35rem] bg-gradient-to-br from-[#1C2A38] via-[#16222E] to-[#111A24] text-white p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
              <CardAbstract variant="compass" position="bottom-right" theme="dark" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-copper">
                    <ShieldCheck size={22} strokeWidth={1.8} />
                  </div>
                  <span className="rounded-lg bg-white/10 border border-white/20 px-3 py-1 text-xs font-mono font-semibold text-white tracking-wider uppercase">
                    <span className="text-copper font-bold mr-1.5">//</span>Top 3% Vetted
                  </span>
                </div>

                <h3 className="mt-5 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                  150+ Certified International Educators
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-light leading-relaxed">
                  Subject specialists background-checked, pedagogically evaluated, and aligned with UK, Australian, and US school standards.
                </p>
              </div>

              {/* 5-Stage Vetting Protocol Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="h-3.5 w-3.5 text-copper shrink-0" />
                  <span>Subject Mastery & Exam Board Certified</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="h-3.5 w-3.5 text-copper shrink-0" />
                  <span>Live Peer Observation & Background Check</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Tile 3: Precision Booking (Col-span 12 md:col-span-5 lg:col-span-4) */}
          <div className="md:col-span-5 lg:col-span-4 group relative rounded-3xl border border-slate-200/90 bg-white/80 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(28,42,56,0.12)] hover:border-copper/40 transition-all duration-300 flex flex-col">
            <div className="relative flex-1 rounded-[1.35rem] bg-gradient-to-br from-white via-cream/40 to-slate-50/50 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
              <CardAbstract variant="concentric" position="bottom-right" />

              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-copper/10 text-copper shadow-2xs group-hover:bg-copper group-hover:text-white transition-all duration-300">
                  <Clock size={22} strokeWidth={1.8} />
                </div>

                <h3 className="mt-5 text-lg sm:text-xl font-bold text-navy tracking-tight leading-snug">
                  40-Min Focused Slots & Instant Rescheduling
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate leading-relaxed">
                  Engineered around maximum attention span. Lock in fixed weekly slots or book instant make-up sessions with 2 hours notice.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate font-medium">
                <span className="flex items-center gap-1.5 text-navy font-semibold">
                  <Clock className="h-3.5 w-3.5 text-copper" />
                  <span>Timezone Aware</span>
                </span>
                <span className="text-copper font-bold">Zero Hassle</span>
              </div>
            </div>
          </div>

          {/* Bento Tile 4: Compounding Dashboard & Notes (Col-span 12 md:col-span-7 lg:col-span-8) */}
          <div className="md:col-span-7 lg:col-span-8 group relative rounded-3xl border border-slate-200/90 bg-white/80 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(28,42,56,0.12)] hover:border-copper/40 transition-all duration-300 flex flex-col">
            <div className="relative flex-1 rounded-[1.35rem] bg-gradient-to-br from-white via-cream/40 to-slate-50/50 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              <CardAbstract variant="grid" position="bottom-right" />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-copper/10 text-copper shadow-2xs group-hover:bg-copper group-hover:text-white transition-all duration-300">
                    <FileText size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-xl sm:text-2xl font-bold text-navy tracking-tight leading-snug">
                    PDF Notes, Parent Portal & Real-Time Analytics
                  </h3>
                  <p className="mt-2 text-sm text-slate leading-relaxed">
                    Every live session generates structured PDF lesson notes and educator feedback delivered straight to your portal. Parents stay fully informed without chasing updates.
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <Link href="/book-trial">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:text-copper-hover group-hover:translate-x-1 transition-all">
                        <span>Book a Free Diagnostic Demo</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Micro Dashboard Preview Card */}
                <div className="sm:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-copper/15 text-copper flex items-center justify-center text-[10px] font-bold">
                        P
                      </div>
                      <span className="text-xs font-bold text-navy">Parent Feed</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="rounded-xl bg-slate-50 p-2.5 text-xs">
                      <p className="font-semibold text-navy text-[11px]">Math Session 12 · Completed</p>
                      <p className="text-[10px] text-slate mt-0.5">&ldquo;Mastered quadratic inequalities with 95% accuracy.&rdquo;</p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate px-1">
                      <span className="flex items-center gap-1 text-copper font-medium">
                        <FileCheck className="h-3 w-3" />
                        <span>PDF Notes ready</span>
                      </span>
                      <span className="font-semibold text-navy">Download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
