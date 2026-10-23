"use client";

import { Container } from "@/components/ui/container";
import { VantaFogBackground } from "@/components/ui/vanta-fog-background";

const stats = [
  { value: "5,000+", label: "Students taught worldwide", highlight: "Global Reach" },
  { value: "150+", label: "Vetted master educators", highlight: "Top 3% Acceptance" },
  { value: "4.98 / 5", label: "Average class rating", highlight: "Verified Parents" },
  { value: "5+ Countries", label: "Global curriculum alignment", highlight: "UK, AU, US & more" },
];

export function Stats() {
  return (
    <section className="relative border-b border-slate-border/50">
      <VantaFogBackground className="py-12 sm:py-16">
        <Container>
          <div className="relative rounded-2xl border border-white/60 bg-white/45 dark:bg-navy/60 dark:border-navy-light/40 p-6 sm:p-8 shadow-lg backdrop-blur-md">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 dark:bg-navy dark:border-slate-700 px-2.5 py-0.5 text-[10px] font-semibold text-navy dark:text-cream tracking-wide mb-2 shadow-2xs">
                    <span className="h-1 w-1 rounded-full bg-copper" />
                    <span>{stat.highlight}</span>
                  </span>
                  <p className="font-display text-2xl font-black text-navy sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate dark:text-slate-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </VantaFogBackground>
    </section>
  );
}
