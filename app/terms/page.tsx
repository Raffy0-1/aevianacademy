import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-3xl space-y-8">
          <h1 className="font-display text-4xl text-foreground">Terms of Service</h1>
          <p className="font-mono text-xs uppercase text-muted-foreground">
            Last Updated: July 2026
          </p>

          <div className="prose prose-slate max-w-none text-base leading-relaxed text-foreground space-y-6">
            <p>
              By accessing Aevian Academy services, you agree to comply with and be
              bound by the following terms and conditions.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              1. Class Rescheduling & Cancellations
            </h2>
            <p>
              To maintain teacher availability and scheduling consistency, any regular lesson rescheduling or cancellations must be completed at least 24 hours prior to the scheduled start time. Cancellations inside 24 hours are charged at the full standard rate.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              2. User Code of Conduct
            </h2>
            <p>
              Students and teachers must treat all members of Aevian classrooms with respect. Disruptive, hostile, or harassing behavior during live sessions will result in immediate suspension without refund.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              3. Questions & Contact Information
            </h2>
            <p>
              For questions regarding these Terms of Service or billing policies, please reach out to our team at{" "}
              <a href="mailto:aevianacademy@gmail.com" className="text-gold font-medium hover:underline">
                aevianacademy@gmail.com
              </a>{" "}
              or WhatsApp / Phone at{" "}
              <a href="https://wa.me/923704942300" target="_blank" rel="noopener noreferrer" className="text-gold font-medium hover:underline">
                +92 370 4942300 (03704942300)
              </a>.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
