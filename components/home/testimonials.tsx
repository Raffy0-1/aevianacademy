import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data/testimonials";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title="Reviewed and trusted by international families"
            description="Verified qualitative outcomes across Cambridge, International Baccalaureate, and standardized test admissions."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
          <ScrollRevealStagger className="h-full flex flex-col">
            {testimonials.map((t, idx) => {
              const abstractVariants: ("waves" | "concentric" | "orbit")[] = ["waves", "concentric", "orbit"];
              const variant = abstractVariants[idx % abstractVariants.length];

              return (
                <div
                  key={t.name}
                  className="group relative h-full rounded-3xl border border-slate-200/90 bg-white/70 dark:bg-navy/70 dark:border-navy-light/50 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_12px_36px_-10px_rgba(28,42,56,0.12)] hover:border-copper/40 transition-all duration-300 flex flex-col"
                >
                  <figure className="relative flex-1 h-full rounded-[1.35rem] bg-gradient-to-br from-white via-cream/30 to-slate-50/50 dark:from-[#1C2A38] dark:via-[#16222E] dark:to-[#111A24] p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
                    {/* Subtle Minimal Watermark Safely in Corner Behind Text */}
                    <CardAbstract variant={variant} position="bottom-right" />

                    <div className="relative z-10">
                      {/* Star Rating Micro-Row */}
                      <div className="flex items-center gap-1 text-copper mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-copper text-copper" />
                        ))}
                      </div>

                      <blockquote className="font-display text-base sm:text-lg leading-relaxed text-navy dark:text-cream font-medium">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                    </div>

                    <figcaption className="relative z-10 mt-6 pt-4 border-t border-slate-200/70 dark:border-navy-light/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-navy dark:text-cream">{t.name}</span>
                        <span className="text-slate dark:text-slate-light"> · {t.role}</span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-copper uppercase tracking-wider bg-copper/10 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}
