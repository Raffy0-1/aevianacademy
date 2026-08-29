import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { TeacherSpotlight } from "@/components/home/teacher-spotlight";
import { AudienceBenefits } from "@/components/home/audience-benefits";
import { Testimonials } from "@/components/home/testimonials";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Faq } from "@/components/home/faq";
import { LatestBlog } from "@/components/home/latest-blog";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <FeaturedCourses />
        <TeacherSpotlight />
        <AudienceBenefits />
        <Testimonials />
        <PricingPreview />
        <Faq />
        <LatestBlog />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
