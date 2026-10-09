"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Star, Play, X, Award, CheckCircle2, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Teacher {
  id: string;
  name: string;
  title: string;
  subject: string;
  rating: string;
  reviewsCount: number;
  years: string;
  institution: string;
  bio: string;
  headshot: string;
  videoUrl: string;
}

const teachers: Teacher[] = [
  {
    id: "t-nadia",
    name: "Dr. Nadia Farooq",
    title: "Lead Math Faculty",
    subject: "IB Higher Level Mathematics & Calculus",
    rating: "4.98",
    reviewsCount: 320,
    years: "7+ Yrs Exp",
    institution: "Ex-Cambridge Researcher",
    bio: "Specializes in analytical problem solving, calculus proofs, and demystifying complex exam questions for high-achieving IB students.",
    headshot: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-studying-online-with-a-laptop-42998-large.mp4",
  },
  {
    id: "t-james",
    name: "James Whitfield",
    title: "Senior English & SAT Chair",
    subject: "IGCSE Literature & SAT Verbal Prep",
    rating: "4.96",
    reviewsCount: 280,
    years: "8+ Yrs Exp",
    institution: "Oxford Alum • CELTA",
    bio: "Passionate essayist helping students construct persuasive academic arguments and master critical reading passages.",
    headshot: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "t-aravind",
    name: "Aravind Rao",
    title: "Computer Science Head",
    subject: "Python, AI & Algorithmic Problem Solving",
    rating: "4.99",
    reviewsCount: 410,
    years: "9+ Yrs Exp",
    institution: "Stanford CS MS • Ex-Google",
    bio: "Industry engineer training students in computational logic, recursion, data structures, and competition coding.",
    headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-studying-online-with-a-laptop-42998-large.mp4",
  },
  {
    id: "t-elena",
    name: "Dr. Elena Marchetti",
    title: "Physics & Science Specialist",
    subject: "AP & IB Physics HL",
    rating: "4.97",
    reviewsCount: 260,
    years: "10+ Yrs Exp",
    institution: "Imperial College London PhD",
    bio: "Transforms physics from memorization into tangible intuition using visual diagrams, mechanics modeling, and past-paper drills.",
    headshot: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];

export function TeacherSpotlight() {
  const [activeVideoTeacher, setActiveVideoTeacher] = useState<Teacher | null>(null);

  return (
    <section className="border-y border-slate-border/50 bg-cream/70 backdrop-blur-xs py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Master Faculty"
          title="Trained educators reviewed and trusted by global families"
          description="Every Aevian educator undergoes a rigorous 5-stage vetting process, live peer observation, and background checks."
        />

        {/* Master Faculty Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="group relative overflow-hidden rounded-2xl bg-navy text-white shadow-xl border border-navy-light flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-copper/60"
            >
              <div>
                {/* High-Resolution Headshot Photo Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-navy-dark">
                  <Image
                    src={teacher.headshot}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-copper border border-white/10 shadow-sm">
                    <Star className="h-3 w-3 fill-copper text-copper" />
                    <span>{teacher.rating}</span>
                  </div>

                  {/* Institution Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-white/10">
                      {teacher.institution}
                    </span>
                  </div>

                  {/* Hover Trigger: "Play Intro Video" */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-navy/40 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => setActiveVideoTeacher(teacher)}
                      className="flex items-center gap-2 rounded-full bg-copper px-4 py-2 text-xs font-bold text-white shadow-xl hover:bg-copper-hover hover:scale-105 transition-all"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Play Intro Video</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">{teacher.name}</h3>
                  <p className="text-xs font-semibold text-copper mt-0.5">{teacher.title}</p>
                  <p className="mt-2.5 text-xs text-slate-light leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="mt-4 pt-4 border-t border-navy-light/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-light truncate pr-2">
                    {teacher.subject}
                  </span>
                  <Badge variant="copper" className="text-[10px] uppercase font-mono shrink-0">
                    {teacher.years}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveVideoTeacher(teacher)}
                    className="inline-flex items-center gap-1 font-semibold text-copper hover:underline text-[11px]"
                  >
                    <Video className="h-3 w-3" />
                    <span>Watch Demo</span>
                  </button>
                  <Link
                    href="/book-trial"
                    className="text-[11px] font-semibold text-white/80 hover:text-white"
                  >
                    Book Trial &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Teacher Intro Video Modal */}
      <AnimatePresence>
        {activeVideoTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-navy shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-navy-light px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-copper">
                    <Image
                      src={activeVideoTeacher.headshot}
                      alt={activeVideoTeacher.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{activeVideoTeacher.name} • Faculty Introduction</h3>
                    <p className="text-xs text-copper">{activeVideoTeacher.institution} • {activeVideoTeacher.subject}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoTeacher(null)}
                  className="rounded-full p-1.5 text-slate-light hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                >
                  <source src={activeVideoTeacher.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-navy-dark px-6 py-4">
                <p className="text-xs text-slate-light max-w-md">
                  Request a live 40-minute demo class with {activeVideoTeacher.name} or one of our matched master educators.
                </p>
                <Link
                  href="/book-trial"
                  onClick={() => setActiveVideoTeacher(null)}
                  className="rounded-xl bg-copper px-5 py-2.5 text-xs font-bold text-white hover:bg-copper-hover transition-colors shadow-md"
                >
                  Schedule Demo with Faculty
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
