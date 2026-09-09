import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-3xl space-y-8">
          <h1 className="font-display text-4xl text-foreground">Privacy Policy</h1>
          <p className="font-mono text-xs uppercase text-muted-foreground">
            Last Updated: July 2026
          </p>

          <div className="prose prose-slate max-w-none text-base leading-relaxed text-foreground space-y-6">
            <p>
              At Aevian, we take the privacy of our students and parents seriously.
              This policy explains how we collect, use, and protect your information
              across our web platform.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              1. Information We Collect
            </h2>
            <p>
              We collect contact information from parents (name, email, phone) and basic educational indicators from students (grade level, date of birth, English level) during trial scheduling and portal registration.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              2. Student Safety & Video Recordings
            </h2>
            <p>
              Our live sessions are hosted in small groups and recorded to let parents review progress and to perform quality assurance checks. These recordings are securely stored and accessible only to matching parents, teachers, and admins.
            </p>
            <p>
              We do not share student profiles or live recording feeds with external third-party advertisers.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              3. Contact Us Regarding Your Privacy
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding your personal data or privacy preferences, please contact our support team at{" "}
              <a href="mailto:aevianacademy@gmail.com" className="text-gold font-medium hover:underline">
                aevianacademy@gmail.com
              </a>{" "}
              or via Phone / WhatsApp at{" "}
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
