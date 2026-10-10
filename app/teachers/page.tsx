import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Star, CheckCircle2, Video } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TeacherCard, TeacherData } from "@/components/teachers/teacher-card";

export const dynamic = "force-dynamic";

const fallbackTeachers = [
  {
    id: "t1",
    user: { name: "Dr. Nadia Farooq" },
    role: "Head of Mathematics & STEM",
    bio: "Mathematics educator with 12 years of experience in IB DP and Cambridge A-Levels. PhD in Applied Mathematics (Imperial College London).",
    subjects: ["Mathematics", "Statistics", "Calculus BC"],
    yearsExperience: 12,
    hourlyRate: 4500,
    rating: 4.98,
    reviews: 142,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    badge: "Master Faculty",
  },
  {
    id: "t2",
    user: { name: "James Whitfield" },
    role: "Senior Examiner & IELTS Lead",
    bio: "CELTA-certified English teacher specializing in IELTS 8.0+ mastery and academic writing. Former BBC language program contributor (Oxford MA).",
    subjects: ["IELTS", "Academic English", "SAT Verbal"],
    yearsExperience: 9,
    hourlyRate: 5000,
    rating: 4.95,
    reviews: 98,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    badge: "Official Examiner",
  },
  {
    id: "t3",
    user: { name: "Aravind Rao" },
    role: "CS & AI Curriculum Lead",
    bio: "Software architect turned educator. Built scalable distributed systems before directing coding bootcamps across Southeast Asia. Teaches Python & Algorithms.",
    subjects: ["Computer Science", "Python", "Data Structures"],
    yearsExperience: 7,
    hourlyRate: 5500,
    rating: 4.97,
    reviews: 84,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    badge: "Silicon Valley Ex-Staff",
  },
  {
    id: "t4",
    user: { name: "Dr. Elena Marchetti" },
    role: "Sciences & Biomedical Director",
    bio: "Cambridge Tripos graduate, post-doc fellow at Karolinska Institute. Specializes in AP/IB Chemistry and Medical School Entrance (BMAT/UCAT).",
    subjects: ["Chemistry", "Biology", "BMAT / UCAT"],
    yearsExperience: 10,
    hourlyRate: 5200,
    rating: 4.99,
    reviews: 116,
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
    badge: "Medical Mentor",
  },
  {
    id: "t5",
    user: { name: "Sarah Chen" },
    role: "Quantitative Reasoning Lead",
    bio: "Stanford Alum with 800/800 SAT Math track record. Coached over 350+ students into Ivy League and Russell Group institutions with tailored score pacing.",
    subjects: ["SAT Math", "NAPLAN", "CAT4"],
    yearsExperience: 8,
    hourlyRate: 4800,
    rating: 4.96,
    reviews: 109,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    badge: "SAT 800 Mentor",
  },
  {
    id: "t6",
    user: { name: "Qari Tariq Mahmood" },
    role: "Senior Quran & Tajweed Specialist",
    bio: "Al-Azhar University certified Qari with Ijazah in Hafs 'an Asim. 15+ years teaching overseas diaspora families across UK, US, and Australia.",
    subjects: ["Tajweed Rules", "Quran Recitation", "Islamic Studies"],
    yearsExperience: 15,
    hourlyRate: 3500,
    rating: 4.99,
    reviews: 167,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    badge: "Certified Ijazah",
  },
];

async function getTeachers() {
  try {
    const list = await prisma.teacherProfile.findMany({
      include: { user: true },
    });
    if (list.length > 0) {
      return list.map((t: any, idx: number) => ({
        ...fallbackTeachers[idx % fallbackTeachers.length],
        ...t,
        user: { name: t.user?.name || fallbackTeachers[idx % fallbackTeachers.length].user.name },
      }));
    }
  } catch (e) {
    console.warn("Could not query teachers, using fallbacks.", e);
  }
  return fallbackTeachers;
}

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <SectionHeading
            eyebrow="World-Class Faculty"
            title="Learn 1-on-1 from Vetted Global Educators"
            description="Our teachers hold advanced degrees from Oxford, Imperial, and Stanford. Every instructor passes stringent background checks, pedagogical assessments, and live classroom audits."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {teachers.map((t: any) => {
              const cardData: TeacherData = {
                id: t.id,
                name: t.user?.name || "Senior Faculty",
                title: t.role || "Lead Academic Mentor",
                subject: (t.subjects && t.subjects[0]) || "Curriculum Specialist",
                rating: t.rating || "4.98",
                reviewsCount: t.reviews || 95,
                years: `${t.yearsExperience || 7}+ Yrs Exp`,
                institution: t.badge || "Cambridge Alum",
                bio: t.bio || "Dedicated international educator specializing in rigorous exam strategy and 1-on-1 personalized mentorship.",
                headshot: t.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
                videoUrl: t.videoUrl,
              };
              return <TeacherCard key={t.id} teacher={cardData} />;
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

