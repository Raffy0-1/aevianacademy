import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { programs, Course } from "@/lib/data/programs";
import { ProgramPricing } from "@/components/programs/program-pricing";
import { CheckCircle, ArrowLeft } from "lucide-react";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: { slug: string }[] = [];
  programs.forEach(p => {
    p.courses.forEach(c => {
      paths.push({ slug: c.slug });
    });
  });
  return paths;
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let course: Course | null = null;
  let categoryName = "";

  for (const p of programs) {
    const found = p.courses.find(c => c.slug === slug);
    if (found) {
      course = found;
      categoryName = p.title;
      break;
    }
  }

  if (!course) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12">
        <Container className="mb-6">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-border bg-white px-4 py-2 text-xs font-semibold text-navy transition-all duration-200 hover:-translate-x-1 hover:border-copper hover:text-copper hover:shadow-sm dark:bg-navy dark:border-navy-light dark:text-cream dark:hover:text-copper"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to All Programs</span>
          </Link>
        </Container>
        <Container className="grid gap-10 lg:grid-cols-3">
          {/* Main Course Info (Left 2 columns) */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{categoryName}</Badge>
                {course.badges.map(b => <Badge key={b}>{b}</Badge>)}
                {course.curriculumTags.map(t => <Badge key={t}>{t}</Badge>)}
              </div>
              <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <p><span className="font-medium text-foreground">Target Audience:</span> {course.targetStudents}</p>
                <p><span className="font-medium text-foreground">Duration:</span> {course.duration}</p>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">Learning Outcomes</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground bg-card p-4 rounded-lg border border-border">
                    <CheckCircle size={18} className="text-meridian mt-0.5 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Enrollment Card (Right 1 column) */}
          <div className="lg:col-span-1">
            <ProgramPricing pricing={course.pricing} courseId={course.slug} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
