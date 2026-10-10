"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { VantaRingsBackground } from "@/components/ui/vanta-rings-background";
import { ArrowRight, Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden border-t border-slate-border/50">
      <VantaRingsBackground className="py-20 sm:py-28">
        <Container className="relative z-10 flex flex-col items-center">
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-navy/80 p-8 sm:p-12 text-center text-white shadow-2xl backdrop-blur-xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-3.5 py-1 text-xs font-semibold text-copper mb-4">
              <Mail className="h-3.5 w-3.5 text-copper" />
              <span>Aevian Academic Digest</span>
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight text-white leading-tight">
              One thoughtful email a month. <span className="text-copper">Zero noise.</span>
            </h2>

            <p className="mt-3.5 max-w-lg mx-auto text-sm sm:text-base text-slate-light leading-relaxed">
              Curriculum syllabi, exam strategies (NAPLAN, ACARA, SAT), and teacher spotlights delivered straight to your inbox.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to the Aevian Academic Digest!");
              }}
              className="mt-8 flex w-full max-w-md mx-auto flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="parent@example.com"
                className="h-12 flex-1 rounded-xl border border-white/20 bg-navy-dark/90 px-4 text-sm text-white placeholder:text-slate-light/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/40 transition-all"
              />
              <Button variant="copper" size="lg" type="submit" className="h-12 px-6 font-bold shadow-md cursor-pointer">
                Subscribe
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-light">
              <span>Ready for your child&apos;s first class?</span>
              <Link
                href="/book-trial"
                className="inline-flex items-center gap-1 font-semibold text-copper hover:text-copper-hover transition-colors"
              >
                <span>Book Free 40-Min Demo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </VantaRingsBackground>
    </section>
  );
}
