import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2 } from "lucide-react";

export default function ParentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-4xl space-y-12">
          <SectionHeading
            eyebrow="Parents"
            title="Stay Connected to Your Child's Progress"
            description="We believe education is a partnership. Our platform provides complete transparency into your child's learning journey."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Attendance Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Get real-time notifications about class attendance and schedule changes directly to your dashboard.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Progress Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                View detailed milestone reports and understand exactly which curriculum objectives have been met.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Homework & Assignments</h3>
              <p className="mt-2 text-muted-foreground">
                See what homework is due, review completed assignments, and track grades for ongoing assessments.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Teacher Feedback</h3>
              <p className="mt-2 text-muted-foreground">
                Read regular feedback reports from expert teachers and communicate with them directly.
              </p>
            </div>
          </div>

          {/* Parent Testimonials & Reviews Section */}
          <div className="pt-8 space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold border border-gold/30">
                ★ 4.98 / 5 Average Rating from Over 450+ Families
              </span>
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                What Parents Say About Aevian Academy
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Real feedback from international families who have seen their children build academic confidence, achieve top exam scores, and fall in love with learning.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Review 1 */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified Parent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;My son was struggling with IB Physics HL concepts until we connected with Dr. Marchetti on Aevian. Within 3 months, his predicted grade jumped from a 4 to a 7. The progress reports after every session keep us completely informed without having to chase teachers.&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-meridian/10 text-meridian font-bold flex items-center justify-center text-sm">
                    SR
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Sarah Richardson</h4>
                    <p className="text-xs text-muted-foreground">Mother of Year 12 IB Student • London, UK</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified Parent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;Finding qualified native English teachers for Cambridge IGCSE in Dubai was difficult and expensive. Aevian Academy gave our daughter structured 1-on-1 tutoring with phenomenal feedback. She scored an A* in English and Literature!&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-copper/10 text-copper font-bold flex items-center justify-center text-sm">
                    TA
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Tariq Al-Mansoor</h4>
                    <p className="text-xs text-muted-foreground">Father of Grade 10 Student • Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified Parent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;The parent portal makes it effortless to monitor attendance, track homework feedback, and see which milestones my twin daughters have completed. It takes all the guesswork out of homeschooling enrichment.&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-meridian/10 text-meridian font-bold flex items-center justify-center text-sm">
                    EW
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Emily Wong</h4>
                    <p className="text-xs text-muted-foreground">Mother of Grade 7 & 8 Students • Singapore</p>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ✓ Verified Parent
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;My son took the SAT Prep course with Aevian’s instructors and improved his math score by 140 points on test day. The flexibility of scheduling around sports and high school activities was a lifesaver.&rdquo;
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">
                    DK
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">David Kowalski</h4>
                    <p className="text-xs text-muted-foreground">Father of Grade 11 SAT Aspirant • California, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
