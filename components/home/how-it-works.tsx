import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Book a free diagnostic trial",
    description:
      "Tell us your child's age, exam board, and specific subject weaknesses. We match a certified international educator in minutes.",
  },
  {
    number: "02",
    title: "Meet your master faculty live",
    description:
      "A complete 40-minute live interactive class. The teacher assesses cognitive pacing and prepares an in-depth diagnostic report.",
  },
  {
    number: "03",
    title: "Follow structured course milestones",
    description:
      "Enroll in the tailored learning track with a weekly schedule that fits your family's timezone and exam deadlines.",
  },
  {
    number: "04",
    title: "Measure compounding progress",
    description:
      "Lesson notes, graded assignments, and quantitative past-paper mastery analytics sync directly to your parent portal.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-slate-border/50 bg-cream/60 dark:bg-navy/40 backdrop-blur-xs py-20 sm:py-28 relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="From initial diagnostic to top exam percentiles"
            description="Our proven 4-stage pedagogical framework designed to turn academic friction into consistent momentum."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <ScrollRevealStagger className="h-full flex flex-col">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="group relative h-full rounded-3xl border border-slate-200/80 bg-white/80 dark:bg-navy/70 dark:border-navy-light/50 p-2 sm:p-2.5 shadow-2xs hover:shadow-lg hover:border-copper/40 transition-all duration-300 flex flex-col"
              >
                <div className="relative flex-1 h-full rounded-[1.35rem] bg-gradient-to-br from-white via-cream/25 to-slate-50/40 dark:from-[#1C2A38] dark:via-[#16222E] dark:to-[#111A24] p-6 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Minimal Corner Geometric Watermark */}
                  <CardAbstract variant="concentric" position="top-right" />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-xl bg-copper/10 font-mono text-xs font-bold text-copper dark:bg-copper/20">
                      {step.number}
                    </span>
                    <h3 className="mt-4 text-base sm:text-lg font-bold text-navy dark:text-cream tracking-tight leading-snug min-h-[3.25rem] flex items-center">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate dark:text-slate-light font-normal flex-1">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/60 flex items-center justify-between text-[11px] font-semibold text-slate dark:text-slate-light">
                    <span>Stage {idx + 1}</span>
                    <span className="text-copper group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/book-trial"
            className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-copper-hover active:scale-[0.98] transition-all"
          >
            <span>Book Your Free 40-Min Diagnostic Trial</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
