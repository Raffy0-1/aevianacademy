import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComingSoonBanner } from "@/components/ui/coming-soon-banner";

export default function ReferralPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Refer a Friend"
            title="Give $50, Get $50"
            description="Share your love for compounding live classes. Invite friends to book their trial class and earn tuition credits."
            align="center"
          />

          <ComingSoonBanner
            badge="Referral Rewards"
            title="Referral Program Coming Soon"
            description="Our dual-reward parent and student referral portal is launching shortly. You will be able to generate one-click invite links and automatically receive tuition credits on enrolled courses."
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
