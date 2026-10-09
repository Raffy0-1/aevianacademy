import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/data/programs";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

// Curated high-resolution studio photography for academic courses
const COURSE_PHOTOS: Record<string, string> = {
  "mathematics-primary-secondary":
    "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80",
  "sciences-physics-chemistry-biology":
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  "ib-dp-myp-curriculum":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "cambridge-igcse-olevel":
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  "naplan-acara-masterclass":
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
  "uk-sats-cat4-prep":
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  "spoken-english-confidence":
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
  "quran-recitation-tajweed":
    "https://images.unsplash.com/photo-1584697964190-705b89368d01?auto=format&fit=crop&w=800&q=80",
};

const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

export function FeaturedCourses() {
  // Extract the first course from each program to showcase
  const featured = programs
    .map((p) => ({
      ...p.courses[0],
      categoryName: p.title,
    }))
    .slice(0, 4);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured Programs"
              title="A starting point for every level"
              description="Live 1-on-1 personalized tracks led by certified international faculty across global curricula."
            />
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper hover:underline transition-colors"
            >
              <span>Browse all programs</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <ScrollRevealStagger>
            {featured.map((course) => {
              const photoUrl = COURSE_PHOTOS[course.slug] || DEFAULT_PHOTO;

              return (
                <Link
                  key={course.slug}
                  href={`/programs/${course.slug}`}
                  className="group aevian-card h-full flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    {/* High-Resolution Media Header Banner */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-dark">
                      <Image
                        src={photoUrl}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                      
                      {/* Floating Badge on Photo */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-navy/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/20 shadow-xs">
                          {course.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 pb-2">
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {course.badges.slice(0, 2).map((badge, i) => (
                          <Badge key={i} className="text-[10px] font-semibold bg-copper/10 text-copper border-copper/20">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-navy group-hover:text-copper transition-colors line-clamp-2 dark:text-cream dark:group-hover:text-copper leading-snug">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate dark:text-slate-light font-medium line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex flex-col gap-1.5 text-xs text-slate border-t border-slate-border/50 pt-4 dark:border-navy-light/60 dark:text-slate-light">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy dark:text-cream">Target:</span>
                        <span>{course.targetStudents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy dark:text-cream">Duration:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="mt-2.5 flex items-center justify-end text-xs font-bold text-copper group-hover:translate-x-1 transition-transform">
                        <span>View Curriculum &rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollRevealStagger>
        </div>

        <div className="mt-12 flex justify-center">
          <ScrollReveal>
            <Link href="/programs">
              <Button variant="outline" size="lg" className="border-slate-border text-navy hover:border-copper hover:text-copper">
                View all programs
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
