import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoonBanner } from "@/components/ui/coming-soon-banner";

export default function AffiliatePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Partnership & Creators"
            title="Aevian Affiliate Program"
            description="Recommend premium online education to your network and community while earning high-converting partner commissions."
          />

          <ComingSoonBanner
            badge="Partner Network"
            title="Affiliate Program Coming Soon"
            description="Our dedicated partner and affiliate dashboard with real-time conversion tracking, custom links, and automated payouts is launching soon. Join the waiting list below."
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
