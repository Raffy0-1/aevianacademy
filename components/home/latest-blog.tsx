import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";
import { CardAbstract } from "@/components/ui/card-abstract";

// Fallback static blog posts for local development or build time
const fallbackPosts = [
  {
    slug: "spoken-fluency-vs-grammar",
    title: "Why Spoken Fluency Matters More Than Grammar Scores",
    excerpt: "Most language assessments reward written accuracy over conversational confidence. Here's why that's backwards — and what parents can do about it.",
    tags: ["education", "english", "fluency"],
    publishedAt: new Date("2026-07-01"),
  },
  {
    slug: "coding-before-calculus",
    title: "The Case for Teaching Coding Before Calculus",
    excerpt: "Computational thinking develops the same logical reasoning as advanced math — but with immediate, tangible feedback that keeps young learners engaged.",
    tags: ["coding", "education", "python", "stem"],
    publishedAt: new Date("2026-06-25"),
  },
  {
    slug: "choosing-online-tutor",
    title: "How to Choose the Right Online Tutor for Your Child",
    excerpt: "With hundreds of online tutoring platforms available, here are the five things that actually matter when selecting a tutor for your child.",
    tags: ["parenting", "education", "tips"],
    publishedAt: new Date("2026-06-20"),
  },
];

async function getLatestBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    
    if (posts.length > 0) {
      return posts.map(p => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        tags: p.tags,
        publishedAt: p.publishedAt || p.createdAt,
      }));
    }
  } catch (e) {
    console.warn("Could not load latest blog posts from database:", e);
  }
  
  return fallbackPosts;
}

export async function LatestBlog() {
  const posts = await getLatestBlogPosts();

  return (
    <section className="py-20 sm:py-28 bg-cream/50 dark:bg-navy/30 border-t border-slate-border/50 relative overflow-hidden">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              title="Academic Insights & Resources"
              description="Research, curriculum guides, and exam preparation strategies from Aevian master faculty."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-copper hover:underline transition-colors"
            >
              <span>Visit the blog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          <ScrollRevealStagger>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative rounded-3xl border border-slate-200/90 bg-white/70 dark:bg-navy/70 dark:border-navy-light/50 p-2 sm:p-2.5 shadow-2xs hover:shadow-xl hover:border-copper/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative flex-1 rounded-[1.35rem] bg-gradient-to-br from-white via-cream/30 to-slate-50/50 dark:from-[#1C2A38] dark:via-[#16222E] dark:to-[#111A24] p-6 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Minimal Geometric Watermark */}
                  <CardAbstract variant="grid" position="bottom-right" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-copper/10 px-2 py-0.5 text-[10px] font-semibold text-copper uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-navy dark:text-cream group-hover:text-copper line-clamp-2 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate dark:text-slate-light line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/60 dark:border-navy-light/60 flex items-center justify-between text-xs font-mono text-slate dark:text-slate-light">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans font-semibold text-copper group-hover:translate-x-1 transition-transform">
                      <span>Read article</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}
