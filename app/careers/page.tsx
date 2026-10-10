import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoonBanner } from "@/components/ui/coming-soon-banner";

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Join the Faculty"
            title="Help us build education that compounds"
            description="We are a distributed team of engineers, curriculum developers, and elite educators passionate about replacing prerecorded course content with rigorous live classrooms."
          />

          <ComingSoonBanner
            badge="Careers & Openings"
            title="Open Positions Coming Soon"
            description="We are currently preparing our next hiring cycle for academic faculty mentors, curriculum specialists, and full-stack engineers. Register your email below to be the first to know when positions open."
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
