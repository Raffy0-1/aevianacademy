import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$79",
    period: "/ month",
    description: "Ideal for single subject focus & weekly guidance",
    features: [
      "1 live 1-on-1 class per week",
      "Real-time learning path dashboard",
      "Homework & assignment feedback",
      "Direct teacher messaging",
    ],
    highlighted: false,
  },
  {
    name: "Growth (Most Popular)",
    price: "$149",
    period: "/ month",
    description: "Two core subjects, steady momentum & exam track",
    features: [
      "2 live 1-on-1 classes per week",
      "Real-time learning path dashboard",
      "Detailed assignment feedback & grading",
      "Priority scheduling & exam prep materials",
      "Monthly parent progress consultation",
    ],
    highlighted: true,
  },
  {
    name: "Immersion Mastery",
    price: "$259",
    period: "/ month",
    description: "Multi-subject intensive track for top IB/IGCSE results",
    features: [
      "4 live 1-on-1 classes per week",
      "Comprehensive diagnostic assessment",
      "Priority 24/7 educator availability",
      "Bi-weekly parent review sessions",
      "SAT / IB Exam strategy workshops",
    ],
    highlighted: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-28 bg-cream/70 backdrop-blur-xs border-b border-slate-border/50 relative">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Transparent Tuition"
            title="Simple monthly investment with zero hidden fees"
            description="All plans include personalized 1-on-1 instruction, certified master educators, and full parent portal telemetry."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 items-stretch">
          <ScrollRevealStagger>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "group relative rounded-3xl p-2 sm:p-2.5 transition-all duration-300 flex flex-col justify-between h-full",
                  plan.highlighted
                    ? "border-2 border-copper bg-copper/5 shadow-[0_16px_40px_-10px_rgba(200,109,81,0.22)] -translate-y-1 sm:-translate-y-2"
                    : "border border-slate-200/90 bg-white/70 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_12px_36px_-10px_rgba(28,42,56,0.1)] hover:border-copper/40"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-copper px-4 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
                    Most Popular
                  </span>
                )}

                <div
                  className={cn(
                    "rounded-[1.35rem] p-7 flex-1 flex flex-col justify-between relative overflow-hidden",
                    plan.highlighted
                      ? "bg-gradient-to-br from-[#1C2A38] via-[#16222E] to-[#111A24] text-white"
                      : "bg-gradient-to-br from-white via-cream/30 to-slate-50/50 text-navy"
                  )}
                >
                  {/* Subtle Minimal Corner Watermark */}
                  <CardAbstract
                    variant="orbit"
                    position="bottom-right"
                    theme={plan.highlighted ? "dark" : "auto"}
                  />

                  <div className="relative z-10">
                    <p
                      className={cn(
                        "font-mono text-xs font-bold uppercase tracking-wider",
                        plan.highlighted ? "text-copper" : "text-slate"
                      )}
                    >
                      {plan.name}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight">
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          plan.highlighted ? "text-slate-light" : "text-slate"
                        )}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "mt-2.5 text-xs sm:text-sm leading-relaxed",
                        plan.highlighted ? "text-slate-light" : "text-slate"
                      )}
                    >
                      {plan.description}
                    </p>

                    <div
                      className={cn(
                        "mt-6 pt-5 border-t",
                        plan.highlighted ? "border-white/10" : "border-slate-200/70"
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider mb-3.5",
                          plan.highlighted ? "text-white/80" : "text-navy"
                        )}
                      >
                        What&apos;s included:
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                            <Check
                              size={16}
                              className="text-copper shrink-0 mt-0.5"
                            />
                            <span
                              className={plan.highlighted ? "text-white/90" : "text-slate"}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href="/book-trial" className="mt-8 block">
                    <Button
                      variant={plan.highlighted ? "copper" : "outline"}
                      size="lg"
                      className="w-full justify-center rounded-full font-semibold shadow-xs"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>

        <ScrollReveal>
          <p className="mt-12 text-center text-sm text-slate">
            Need a custom multi-child schedule or institutional group tutoring?{" "}
            <Link href="/contact" className="font-semibold text-copper hover:underline inline-flex items-center gap-1">
              <span>Contact our academic team</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
