import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
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
    <section className="py-20 lg:py-28 bg-cream/70 backdrop-blur-xs border-b border-slate-border/50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Transparent Tuition"
            title="Simple monthly plans with no hidden fees"
            description="All plans include live interactive instruction, dedicated educator support, and our proprietary Learning Path analytics."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <ScrollRevealStagger>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-lg",
                  plan.highlighted
                    ? "bg-navy text-white border-2 border-copper relative copper-glow"
                    : "bg-white text-navy border border-slate-border hover:border-copper/40"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-copper px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <p className={cn("font-mono text-xs font-semibold uppercase tracking-wider", plan.highlighted ? "text-copper" : "text-slate")}>
                  {plan.name}
                </p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-display">{plan.price}</span>
                  <span className={cn("text-sm", plan.highlighted ? "text-slate-light" : "text-slate")}>{plan.period}</span>
                </p>
                <p className={cn("mt-2 text-xs leading-relaxed", plan.highlighted ? "text-slate-light" : "text-slate")}>{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs font-medium">
                      <Check size={16} className={plan.highlighted ? "text-copper shrink-0 mt-0.5" : "text-copper shrink-0 mt-0.5"} />
                      <span className={plan.highlighted ? "text-cream" : "text-navy"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book-trial" className="mt-8">
                  <Button
                    variant={plan.highlighted ? "copper" : "outline"}
                    className="w-full justify-center"
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
        <ScrollReveal>
          <p className="mt-10 text-center text-sm text-slate">
            Need a custom schedule or institutional group tutoring?{" "}
            <Link href="/contact" className="font-semibold text-copper hover:underline">
              Contact our academic team &rarr;
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}

