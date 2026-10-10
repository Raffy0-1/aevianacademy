import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoonBanner } from "@/components/ui/coming-soon-banner";

export default function ScholarshipPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Financial Aid & Grants"
            title="Aevian Scholarship Program"
            description="We are committed to making elite online education accessible to talented students worldwide regardless of socioeconomic backgrounds."
          />

          <ComingSoonBanner
            badge="Scholarship & Aid"
            title="Scholarship Program Coming Soon"
            description="Applications for our upcoming fully funded scholarship cohorts and tuition assistance grants will open soon. Sign up below to receive application guidelines and launch dates."
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
