"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { submitHomework } from "@/lib/actions/homework";
import {
  BookOpen,
  Video,
  FileText,
  CheckSquare,
  Award,
  Trophy,
  Play,
  Download,
  Loader2,
  Calendar,
  Clock,
  Zap,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  order: number;
  videoUrl: string | null;
  durationMinutes: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Enrollment {
  id: string;
  progressPercent: number;
  status: string;
  course: {
    id: string;
    title: string;
    description: string;
    modules: Module[];
  };
}

interface StudentDashboardClientProps {
  studentProfileId: string;
  initialEnrollments: Enrollment[];
}

export function StudentDashboardClient({
  studentProfileId,
  initialEnrollments,
}: StudentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("schedule");
  const [enrollments] = useState<Enrollment[]>(initialEnrollments);

  // PDF Repository Data
  const pdfResources = [
    {
      id: "1",
      title: "NAPLAN & ACARA Strategy Guide 2026.pdf",
      subject: "Competitive Assessment",
      size: "2.4 MB",
      date: "Aug 28, 2026",
      desc: "Complete exam rubrics, time allocation tactics, and sample problem sets.",
    },
    {
      id: "2",
      title: "Quran Recitation Tajweed & Makharij Rules.pdf",
      subject: "Quran Recitation",
      size: "3.1 MB",
      date: "Aug 27, 2026",
      desc: "Visual diagrams of Makharij (articulation points) and essential Tajweed signs.",
    },
    {
      id: "3",
      title: "Islamic Essentials - Kalimas, Namaz & Daily Duas.pdf",
      subject: "Islamic Foundation",
      size: "1.8 MB",
      date: "Aug 25, 2026",
      desc: "Imaan ki Shartein, first 3 Kalimas with translation, Namaz steps, and morning/evening Duas.",
    },
    {
      id: "4",
      title: "TOEFL & Spoken English Fluency Toolkit.pdf",
      subject: "Communication Skills",
      size: "4.2 MB",
      date: "Aug 24, 2026",
      desc: "High-frequency vocabulary, sentence structures, and oral confidence exercises.",
    },
  ];

  // Upcoming 40-Min Classes Mock Data
  const upcomingClasses = [
    {
      id: "c1",
      title: "NAPLAN Math & Problem Solving",
      type: "1-on-1 Demo Class",
      time: "Today @ 04:00 PM - 04:40 PM",
      duration: "40 Minutes",
      teacher: "Allotted Master Tutor (Dr. Sarah Khan)",
      status: "CONFIRMED",
      isDemo: true,
      zoomUrl: "https://zoom.us/j/demo-aevian-101",
    },
    {
      id: "c2",
      title: "Islamic Foundations: Namaz & 3 Kalimas",
      type: "Regular 1-on-1 Class",
      time: "Tomorrow @ 06:00 PM - 06:40 PM",
      duration: "40 Minutes",
      teacher: "Allotted Tutor (Ustadh Ahmad)",
      status: "CONFIRMED",
      isDemo: false,
      zoomUrl: "https://zoom.us/j/demo-aevian-102",
    },
  ];

  // Homework State
  const [homeworkText, setHomeworkText] = useState("");
  const [submittingHw, setSubmittingHw] = useState(false);
  const [hwSuccess, setHwSuccess] = useState(false);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is the First Kalima of Islam?",
      options: ["Kalima Tayyaba", "Kalima Shahadat", "Kalima Tamjeed", "Kalima Tauheed"],
      correct: 0,
    },
    {
      id: 2,
      question: "What is the total duration of a standard Aevian 1-on-1 live session?",
      options: ["20 Minutes", "30 Minutes", "40 Minutes", "60 Minutes"],
      correct: 2,
    },
  ];

  const handleHomeworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingHw(true);
    setTimeout(() => {
      setSubmittingHw(false);
      setHwSuccess(true);
      setHomeworkText("");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 bg-copper/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Student Portal</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Welcome Back, Learner!</h1>
            <p className="mt-1 text-sm text-slate-light max-w-xl">
              Access your 40-minute 1-on-1 live classes, download PDF lecture notes, and track your recitation & academic progress.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/book-trial">
              <Button variant="copper" className="gap-2 shadow-md">
                <Zap className="h-4 w-4" /> Book Demo / Instant Class
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-border pb-4">
        {[
          { id: "schedule", label: "40-Min Schedule", icon: Calendar },
          { id: "pdf-notes", label: "PDF Lecture Notes", icon: Download },
          { id: "courses", label: "My Programs", icon: BookOpen },
          { id: "quizzes", label: "Quizzes & Homework", icon: CheckSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-navy text-white shadow-sm"
                : "bg-white text-slate hover:text-navy border border-slate-border hover:bg-cream-muted"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: 40-MIN CLASSES SCHEDULE */}
      {activeTab === "schedule" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Upcoming 1-on-1 Live Classes</h2>
              <p className="text-xs text-slate mt-0.5">Strict 40-minute individual sessions allotted by Aevian Admin.</p>
            </div>
            <span className="text-xs font-semibold text-copper bg-copper/10 px-3 py-1 rounded-full border border-copper/30">
              40-Min Session Guarantee
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {upcomingClasses.map((cls) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-bold text-navy">
                    {cls.type}
                  </span>
                  {cls.isDemo && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      1st Class Free Demo
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-navy">{cls.title}</h3>
                <p className="text-xs text-slate mt-1 flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-copper" /> {cls.time} ({cls.duration})
                </p>
                <p className="text-xs text-slate mt-1 font-medium">{cls.teacher}</p>

                <div className="mt-6 pt-4 border-t border-slate-border/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Allotted & Confirmed
                  </span>
                  <a href={cls.zoomUrl} target="_blank" rel="noreferrer">
                    <Button variant="copper" size="sm" className="gap-1.5 text-xs font-bold">
                      <Video className="h-3.5 w-3.5" /> Join Live Room
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PDF LECTURE NOTES & DOWNLOADS */}
      {activeTab === "pdf-notes" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Lecture Notes & PDF Downloads</h2>
            <p className="text-xs text-slate mt-0.5">
              Instant downloadable PDF handouts provided for your subjects and Quranic studies.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pdfResources.map((pdf) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm hover:border-copper/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-copper/10 px-2.5 py-1 text-[11px] font-bold text-copper">
                      {pdf.subject}
                    </span>
                    <span className="text-[11px] text-slate font-mono">{pdf.size}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-navy">{pdf.title}</h3>
                  <p className="mt-1.5 text-xs text-slate leading-relaxed">{pdf.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-border/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate font-mono">Added: {pdf.date}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs text-navy hover:bg-copper hover:text-white"
                    onClick={() => alert(`Downloading ${pdf.title}...`)}
                  >
                    <Download className="h-3.5 w-3.5" /> PDF Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MY PROGRAMS */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Enrolled Programs</h2>
            <p className="text-xs text-slate mt-0.5">Track your course progression and module completions.</p>
          </div>

          {enrollments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-border bg-cream/30 p-8 text-center">
              <BookOpen className="h-10 w-10 text-slate mx-auto mb-3" />
              <h3 className="text-base font-bold text-navy">No active courses yet</h3>
              <p className="text-xs text-slate mt-1 max-w-sm mx-auto">
                Book a 40-minute demo class to get started with our master tutors!
              </p>
              <a href="/book-trial" className="mt-4 inline-block">
                <Button variant="copper" size="sm">Book Demo Trial</Button>
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {enrollments.map((en) => (
                <div key={en.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-navy">{en.course.title}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      {en.progressPercent}% Completed
                    </span>
                  </div>
                  <p className="text-xs text-slate mt-1">{en.course.description}</p>
                  <div className="mt-4 h-2 w-full rounded-full bg-cream-muted overflow-hidden">
                    <div
                      className="h-full bg-copper rounded-full transition-all duration-500"
                      style={{ width: `${en.progressPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: QUIZZES & HOMEWORK */}
      {activeTab === "quizzes" && (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Interactive Quiz Box */}
          <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <Trophy className="h-5 w-5 text-copper" /> Quick Knowledge Check
            </h2>
            <p className="text-xs text-slate mt-1">Test your retention from recent sessions.</p>

            <div className="mt-5 space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="space-y-2 border-b border-slate-border/50 pb-4">
                  <p className="text-xs font-bold text-navy">{qIdx + 1}. {q.question}</p>
                  <div className="grid gap-2">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-xs font-medium cursor-pointer transition-all ${
                          selectedAnswers[q.id] === optIdx
                            ? "border-copper bg-copper/5 text-navy font-bold"
                            : "border-slate-border bg-white text-slate hover:bg-cream-muted"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`quiz-${q.id}`}
                          checked={selectedAnswers[q.id] === optIdx}
                          onChange={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className="text-copper focus:ring-copper"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <Button
                variant="copper"
                size="sm"
                onClick={() => {
                  let score = 0;
                  quizQuestions.forEach((q) => {
                    if (selectedAnswers[q.id] === q.correct) score += 50;
                  });
                  setQuizScore(score);
                }}
              >
                Submit Answers
              </Button>

              {quizScore !== null && (
                <div className="rounded-xl bg-emerald-50 p-4 text-xs text-emerald-800 font-bold border border-emerald-200">
                  🎉 Quiz Score: {quizScore} / 100 — Excellent job!
                </div>
              )}
            </div>
          </div>

          {/* Homework Submission Box */}
          <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <FileText className="h-5 w-5 text-copper" /> Submit Homework / Practice Notes
            </h2>
            <p className="text-xs text-slate mt-1">Upload homework text or questions for your master tutor.</p>

            <form onSubmit={handleHomeworkSubmit} className="mt-5 space-y-4">
              <textarea
                rows={5}
                value={homeworkText}
                onChange={(e) => setHomeworkText(e.target.value)}
                placeholder="Type your homework answers or paste questions here..."
                className="w-full rounded-xl border border-slate-border bg-cream/30 p-4 text-xs text-navy font-medium focus:border-copper focus:bg-white focus:outline-none"
              />

              <Button variant="copper" type="submit" isLoading={submittingHw} className="w-full">
                Submit Homework
              </Button>

              {hwSuccess && (
                <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 font-bold border border-emerald-200">
                  ✓ Homework successfully submitted to your tutor!
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
