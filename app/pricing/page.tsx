import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { PricingPreview } from "@/components/home/pricing-preview";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PricingPreview />
      </main>
      <Footer />
    </>
  );
}
