import { Users, FileText, ShieldCheck, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

const features = [
  {
    icon: Users,
    title: "1-on-1 Individual Class (Primary Focus)",
    description:
      "Direct, uninterrupted 1-on-1 personalized mentorship where teachers tailor every single minute strictly to your learner's pace.",
  },
  {
    icon: FileText,
    title: "PDF Notes, Dashboard & Free Demo",
    description:
      "Lecture notes available in PDF format, dedicated Student & Parent dashboards, and your 1st class can be booked as a Free Demo.",
  },
  {
    icon: ShieldCheck,
    title: "150+ Vetted Master Educators",
    description:
      "Hand-picked international educators background-checked and allotted by our academic team for ideal subject alignment.",
  },
  {
    icon: Clock,
    title: "40-Min Slots, Custom & Instant Booking",
    description:
      "Standard 40-minute focused session slots, custom time slot requests requiring admin confirmation, or instant booking with a 2-hour gap.",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-slate-border/50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Aevian Advantage"
            title="Built around master teachers, structured paths & real growth"
            description="Most platforms scale by replacing teachers with pre-recorded videos. Aevian empowers master educators with small classes, better tools, and compounding learning paths."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-copper/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper transition-colors group-hover:bg-copper group-hover:text-white">
                  <feature.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {feature.description}
                </p>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}

