import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Smile } from "lucide-react";

export default function ReferralPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-3xl space-y-12 text-center flex flex-col items-center">
          <SectionHeading
            eyebrow="Refer a Friend"
            title="Give $50, Get $50"
            description="Share your love for compounding live classes. Invite friends to book their trial class and earn tuition credits."
            align="center"
          />

          <div className="grid gap-6 sm:grid-cols-2 text-left w-full">
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
              <Gift size={20} className="text-copper" />
              <h3 className="text-lg font-medium text-foreground">For your friends</h3>
              <p className="text-sm text-muted-foreground">
                They will receive a $50 tuition credit towards their first course enrollment when they sign up.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 space-y-2">
              <Smile size={20} className="text-gold" />
              <h3 className="text-lg font-medium text-foreground">For you</h3>
              <p className="text-sm text-muted-foreground">
                You will receive a $50 tuition credit applied to your parent ledger once they enroll in a regular schedule.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="text-lg font-medium text-foreground mb-4">Your Referral Link</h3>
            <div className="flex gap-2">
              <input
                readOnly
                value="https://aevian.com/refer?code=MOCK_REF"
                className="flex-1 h-11 rounded-md border border-border bg-muted px-3 text-xs text-muted-foreground font-mono focus:outline-none"
              />
              <Button variant="primary">Copy</Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
