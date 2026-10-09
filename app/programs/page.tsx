import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { programs } from "@/lib/data/programs";
import { ArrowRight, Clock, Target } from "lucide-react";

export const dynamic = "force-static";

const PROGRAM_PHOTOS: Record<string, string> = {
  "school-subject-tutoring": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  "international-curriculum-tutoring": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  "competitive-school-assessment": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  "ielts-preparation": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "sat-preparation": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
  "grammar-mastery": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
  "coding-for-kids-coming-soon": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  "quran-reading": "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
  "islamic-foundation-essential-teachings": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
};

const DEFAULT_PROGRAM_PHOTO = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <div className="space-y-4 max-w-3xl">
            <SectionHeading
              eyebrow="Aevian Programs"
              title="Global Online Learning for Students Worldwide"
              description="Empowering students worldwide through personalized 1-on-1 tutoring, elite academic curriculum mastery, and international standardized test preparation."
            />
          </div>

          <div className="mt-16 space-y-24">
            {programs.map((program) => (
              <section key={program.id} id={program.id} className="scroll-mt-24">
                <div className="mb-8 border-b border-border/60 pb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{program.title}</h2>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">{program.description}</p>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {program.courses.map((course) => {
                    const photoUrl = PROGRAM_PHOTOS[course.slug] || DEFAULT_PROGRAM_PHOTO;
                    return (
                      <div
                        key={course.slug}
                        className="group aevian-card h-full flex flex-col justify-between overflow-hidden p-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div>
                          {/* Photo Banner with Dark Gradient */}
                          <div className="relative h-44 w-full overflow-hidden bg-navy-dark">
                            <Image
                              src={photoUrl}
                              alt={course.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                            
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                              {course.badges.slice(0, 2).map((badge) => (
                                <Badge key={badge} className="bg-navy/85 backdrop-blur-md text-copper border border-white/10 text-[10px] font-semibold py-0.5">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-5">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-copper transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0 mt-2">
                          <div className="border-t border-border/60 pt-4 mb-4 space-y-1.5 text-xs text-muted-foreground">
                            <p className="flex items-center gap-1.5">
                              <Target className="h-3.5 w-3.5 text-copper flex-shrink-0" />
                              <span className="font-semibold text-foreground">Target: </span>
                              <span className="truncate">{course.targetStudents}</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-copper flex-shrink-0" />
                              <span className="font-semibold text-foreground">Duration: </span>
                              <span>{course.duration}</span>
                            </p>
                          </div>

                          <Link
                            href={`/programs/${course.slug}`}
                            className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-copper text-white px-4 py-2.5 text-xs font-semibold hover:bg-copper-hover transition-colors duration-200 shadow-sm"
                          >
                            <span>View Syllabus & Book Demo</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

