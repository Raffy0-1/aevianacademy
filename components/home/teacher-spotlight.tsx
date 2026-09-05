import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Star, Award } from "lucide-react";

const teachers = [
  { name: "Nadia Farooq", title: "Lead Math Faculty", subject: "IB Higher Level Mathematics", rating: "4.98", years: "7+ Yrs Exp", bio: "Ex-Cambridge researcher specializing in analytical problem solving and calculus mastery." },
  { name: "James Whitfield", title: "Senior English Instructor", subject: "IGCSE Literature & SAT Prep", rating: "4.96", years: "6+ Yrs Exp", bio: "Passionate educator dedicated to building persuasive writing and critical reasoning skills." },
  { name: "Aravind Rao", title: "Computer Science Head", subject: "Python, AI & Data Structures", rating: "4.99", years: "8+ Yrs Exp", bio: "Software engineer and educator training future tech leaders in algorithmic thinking." },
  { name: "Elena Marchetti", title: "Physics Master", subject: "AP & IB Physics HL", rating: "4.97", years: "9+ Yrs Exp", bio: "Specialist in intuitive conceptual physics, lab experiments, and exam strategies." },
];

export function TeacherSpotlight() {
  return (
    <section className="border-y border-slate-border/50 bg-cream/70 backdrop-blur-xs py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Master Faculty"
          title="Trained educators reviewed and trusted by global families"
          description="Every Aevian educator undergoes a rigorous 5-stage vetting process, peer observation, and background checks."
        />
        
        {/* Cards Matching Moodboard Teacher Spotlight Design */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="relative overflow-hidden rounded-2xl bg-navy text-white p-6 shadow-xl border-t-4 border-t-copper flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/20 text-copper border border-copper/30 font-bold text-lg">
                    {teacher.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-navy-dark px-2.5 py-1 text-xs font-semibold text-copper border border-navy-light">
                    <Star className="h-3.5 w-3.5 fill-copper text-copper" />
                    <span>{teacher.rating}</span>
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-bold text-white tracking-tight">{teacher.name}</h3>
                <p className="text-xs font-semibold text-copper mt-0.5">{teacher.title}</p>
                <p className="mt-2 text-xs text-slate-light leading-relaxed">{teacher.bio}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-light flex items-center justify-between">
                <span className="text-xs font-medium text-slate-light">{teacher.subject}</span>
                <Badge variant="copper" className="text-[10px] uppercase font-mono">{teacher.years}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

