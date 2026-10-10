import { Users, FileText, ShieldCheck, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

// Minimal abstract geometric designs for card backgrounds
function OrbitalPattern() {
  return (
    <svg
      className="absolute -top-10 -right-10 w-44 h-44 pointer-events-none stroke-copper/30 dark:stroke-copper/25 transition-transform duration-700 group-hover:scale-105"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="160" cy="40" r="30" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="160" cy="40" r="65" strokeWidth="1" />
      <circle cx="160" cy="40" r="100" strokeWidth="0.75" strokeDasharray="4 4" />
      <circle cx="160" cy="40" r="135" strokeWidth="0.75" />
    </svg>
  );
}

function LatticePattern() {
  return (
    <svg
      className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none stroke-navy/20 dark:stroke-cream/15 transition-transform duration-700 group-hover:scale-105"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M40 90 L90 60 L140 90 L90 120 Z" strokeWidth="1" />
      <path d="M40 110 L90 80 L140 110 L90 140 Z" strokeWidth="0.75" strokeDasharray="3 3" />
      <path d="M40 130 L90 100 L140 130 L90 160 Z" strokeWidth="0.75" />
      <line x1="90" y1="60" x2="90" y2="120" strokeWidth="0.75" />
    </svg>
  );
}

function CrestPattern() {
  return (
    <svg
      className="absolute -top-8 -right-8 w-40 h-40 pointer-events-none stroke-copper/30 dark:stroke-copper/25 transition-transform duration-700 group-hover:scale-105"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M90 20 C125 35 150 45 150 85 C150 125 90 160 90 160 C90 160 30 125 30 85 C30 45 55 35 90 20 Z" strokeWidth="1" />
      <path d="M90 40 C115 52 132 60 132 90 C132 120 90 145 90 145 C90 145 48 120 48 90 C48 60 65 52 90 40 Z" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="90" cy="90" r="14" strokeWidth="0.75" />
    </svg>
  );
}

function CadencePattern() {
  return (
    <svg
      className="absolute -bottom-8 -right-8 w-40 h-40 pointer-events-none stroke-navy/20 dark:stroke-cream/15 transition-transform duration-700 group-hover:scale-105"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="120" cy="120" r="65" strokeWidth="0.75" strokeDasharray="4 4" />
      <circle cx="120" cy="120" r="45" strokeWidth="1" />
      <circle cx="120" cy="120" r="25" strokeWidth="0.75" />
      <line x1="120" y1="55" x2="120" y2="75" strokeWidth="1.25" />
      <line x1="185" y1="120" x2="165" y2="120" strokeWidth="1.25" />
    </svg>
  );
}

const features = [
  {
    icon: Users,
    title: "1-on-1 Individual Class (Primary Focus)",
    description:
      "Direct, uninterrupted 1-on-1 personalized mentorship where teachers tailor every single minute strictly to your learner's pace.",
    pattern: OrbitalPattern,
  },
  {
    icon: FileText,
    title: "PDF Notes, Dashboard & Free Demo",
    description:
      "Lecture notes available in PDF format, dedicated Student & Parent dashboards, and your 1st class can be booked as a Free Demo.",
    pattern: LatticePattern,
  },
  {
    icon: ShieldCheck,
    title: "150+ Vetted Master Educators",
    description:
      "Hand-picked international educators background-checked and allotted by our academic team for ideal subject alignment.",
    pattern: CrestPattern,
  },
  {
    icon: Clock,
    title: "40-Min Slots, Custom & Instant Booking",
    description:
      "Standard 40-minute focused session slots, custom time slot requests requiring admin confirmation, or instant booking with a 2-hour gap.",
    pattern: CadencePattern,
  },
];

export function Features() {
  return (
    <section className="py-16 lg:py-24 bg-cream/70 backdrop-blur-xs border-b border-slate-border/50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Aevian Advantage"
            title="Built around master teachers, structured paths & real growth"
            description="Most platforms scale by replacing teachers with pre-recorded videos. Aevian empowers master educators with small classes, better tools, and compounding learning paths."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <ScrollRevealStagger>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAF8F4] via-[#F5EFE5] to-[#EFE7D8] dark:from-[#182533] dark:via-[#141F2B] dark:to-[#0F1722] border border-[#E3D9CC] dark:border-navy-light/60 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_18px_38px_-10px_rgba(28,42,56,0.14)] hover:border-copper/50 transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Minimal abstract background watermark (ensures 100% text clarity) */}
                <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500 overflow-hidden">
                  <feature.pattern />
                </div>

                {/* Content Layer */}
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper transition-all duration-300 group-hover:bg-copper group-hover:text-white group-hover:scale-105 shadow-xs">
                    <feature.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy dark:text-cream tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate dark:text-slate-light">
                    {feature.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-slate-border/50 dark:border-navy-light/40 flex items-center text-xs font-semibold text-copper group-hover:translate-x-1 transition-transform">
                  <span>Explore Advantage &rarr;</span>
                </div>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}

