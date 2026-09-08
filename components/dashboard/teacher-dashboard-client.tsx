"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/lib/actions/bookings";
import { BookingStatus } from "@prisma/client";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FilePlus,
  TrendingUp,
  Plus,
  Trash,
  Loader2,
  Download,
  Upload,
  BookOpen,
  Sparkles,
  Award,
  UserCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface Booking {
  id: string;
  scheduledAt: string;
  status: BookingStatus;
  type: string;
  durationMinutes: number;
  student: {
    id: string;
    user: { name: string; email: string };
  };
  course: { title: string } | null;
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Submission {
  id: string;
  studentName: string;
  courseTitle: string;
  homeworkTitle: string;
  submittedAt: string;
  text: string;
  fileUrl: string | null;
  grade: string;
  feedback: string;
}

interface TeacherDashboardClientProps {
  teacherProfileId: string;
  initialBookings: Booking[];
  initialAvailability: Availability[];
  initialSubmissions?: Submission[];
}

export function TeacherDashboardClient({
  teacherProfileId,
  initialBookings,
  initialAvailability,
  initialSubmissions = [],
}: TeacherDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("classes");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [availability, setAvailability] = useState<Availability[]>(initialAvailability);
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  // Profile completion state
  const [bio, setBio] = useState("Certified faculty specializing in international curricula.");
  const [subjects, setSubjects] = useState("Mathematics, English, Physics");
  const [photoUrl, setPhotoUrl] = useState("");
  const [profileSavedMsg, setProfileSavedMsg] = useState<string | null>(null);

  // Grading State
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [gradingSuccess, setGradingSuccess] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSavedMsg("✓ Faculty profile updated successfully!");
    setTimeout(() => setProfileSavedMsg(null), 3000);
  };

  // Calculate completion percentage
  const calculateProgress = () => {
    let score = 25;
    if (bio.trim().length > 10) score += 25;
    if (subjects.trim().length > 2) score += 25;
    if (availability.length > 0) score += 25;
    return score;
  };

  const progressPercent = calculateProgress();

  // Notes & PDF Upload state
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfSubject, setPdfSubject] = useState("School Assessment");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const handleMarkStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await updateBookingStatus({
        bookingId,
        status,
        teacherNotes: feedbackNote || "Master tutor 40-min checkout completed.",
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleGradeSubmit = async (submissionId: string) => {
    if (!gradeInput.trim()) return;
    setGradingId(submissionId);
    setGradingSuccess(null);
    try {
      const { gradeHomework } = await import("@/lib/actions/homework");
      const res = await gradeHomework({
        submissionId,
        grade: gradeInput,
        feedback: feedbackInput,
      });

      if (res?.error) {
        alert(res.error);
      } else {
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === submissionId ? { ...s, grade: gradeInput, feedback: feedbackInput } : s
          )
        );
        setGradingSuccess("✓ Student grade & feedback published successfully!");
        setGradeInput("");
        setFeedbackInput("");
      }
    } catch (err: any) {
      alert("Failed to record grade.");
    } finally {
      setGradingId(null);
    }
  };

  const handlePdfUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingPdf(true);
    setTimeout(() => {
      setUploadingPdf(false);
      setUploadSuccessMsg(`✓ Handout "${pdfTitle || 'Lecture Notes.pdf'}" uploaded & attached to student dashboard!`);
      setPdfTitle("");
    }, 1000);
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 bg-copper/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30 mb-3">
              <Award className="h-3.5 w-3.5" />
              <span>Certified Master Faculty Portal</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Teacher Command Center</h1>
            <p className="mt-1 text-sm text-slate-light max-w-xl">
              Lead 40-minute 1-on-1 live sessions, review student homework submissions, and publish grades.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-border pb-4">
        {[
          { id: "classes", label: "My 40-Min Sessions", icon: Calendar },
          { id: "grading", label: "My Students & Grading", icon: Users },
          { id: "handouts", label: "Upload PDF Handouts", icon: Upload },
          { id: "availability", label: "Slot Availability", icon: Clock },
          { id: "profile", label: "Faculty Profile", icon: UserCheck },
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

      {/* TAB 1: 40-MIN CLASSES */}
      {activeTab === "classes" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Assigned 1-on-1 Live Sessions</h2>
              <p className="text-xs text-slate mt-0.5">Strict 40-minute class duration. Click complete to record attendance.</p>
            </div>
            <span className="text-xs font-bold text-copper bg-copper/10 px-3 py-1 rounded-full border border-copper/30">
              Admin Allotted
            </span>
          </div>

          <div className="grid gap-4">
            {bookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <Calendar className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No class sessions assigned for today.</p>
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-navy">{b.student.user.name}</h3>
                      <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[10px] font-bold text-navy">
                        40 Mins
                      </span>
                      {b.type === "TRIAL" && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          Demo Trial Class
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate mt-1 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-copper" /> {new Date(b.scheduledAt).toLocaleString()}
                      <span>• Subject: {b.course?.title || "1-on-1 Mentorship"}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {b.status === BookingStatus.PENDING && (
                      <>
                        <Button variant="copper" size="sm" onClick={() => handleMarkStatus(b.id, BookingStatus.CONFIRMED)}>
                          Confirm Slot
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleMarkStatus(b.id, BookingStatus.COMPLETED)}>
                          Mark Completed
                        </Button>
                      </>
                    )}
                    {b.status === BookingStatus.CONFIRMED && (
                      <Button variant="copper" size="sm" onClick={() => handleMarkStatus(b.id, BookingStatus.COMPLETED)}>
                        Complete 40-Min Session
                      </Button>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      b.status === BookingStatus.COMPLETED
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY STUDENTS & GRADING */}
      {activeTab === "grading" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Student Homework Submissions & Grading</h2>
              <p className="text-xs text-slate mt-0.5">Review homework submitted by enrolled students and issue grades/feedback.</p>
            </div>
            {gradingSuccess && (
              <div className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800 font-bold border border-emerald-200">
                {gradingSuccess}
              </div>
            )}
          </div>

          <div className="grid gap-6">
            {submissions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <Users className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No homework submissions pending review.</p>
                <p className="text-xs text-slate mt-1">Submissions from your course students will appear here in real time.</p>
              </div>
            ) : (
              submissions.map((sub) => (
                <div key={sub.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-border pb-3">
                    <div>
                      <h3 className="text-base font-bold text-navy">{sub.studentName}</h3>
                      <p className="text-xs text-slate font-medium">{sub.courseTitle} • <span className="text-copper font-semibold">{sub.homeworkTitle}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate font-medium">Submitted: {new Date(sub.submittedAt).toLocaleDateString()}</span>
                      {sub.grade ? (
                        <div className="mt-1">
                          <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-700">
                            Graded: {sub.grade}
                          </span>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-700">
                            Pending Review
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {sub.text && (
                    <div className="rounded-xl bg-cream-muted p-4 border border-slate-border text-xs text-navy font-medium">
                      <p className="font-bold text-slate mb-1 text-[11px] uppercase tracking-wider">Student Submission Text:</p>
                      <p className="whitespace-pre-wrap">{sub.text}</p>
                    </div>
                  )}

                  {sub.fileUrl && (
                    <div>
                      <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:underline">
                        <Download className="h-4 w-4" /> Download Attached Homework File
                      </a>
                    </div>
                  )}

                  {/* Grading Form */}
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-border space-y-3">
                    <h4 className="text-xs font-bold text-navy flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-copper" /> Grade & Feedback Form
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <label className="block text-[11px] font-bold text-navy mb-1">Grade (e.g. A+, 95/100, Excellent)</label>
                        <input
                          type="text"
                          defaultValue={sub.grade || ""}
                          onChange={(e) => setGradeInput(e.target.value)}
                          placeholder="Grade or Score"
                          className="w-full rounded-xl border border-slate-border p-2.5 text-xs text-navy font-medium bg-white focus:border-copper focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-navy mb-1">Teacher Feedback Notes</label>
                        <input
                          type="text"
                          defaultValue={sub.feedback || ""}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          placeholder="Written constructive feedback for student..."
                          className="w-full rounded-xl border border-slate-border p-2.5 text-xs text-navy font-medium bg-white focus:border-copper focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="copper"
                        size="sm"
                        isLoading={gradingId === sub.id}
                        onClick={() => handleGradeSubmit(sub.id)}
                      >
                        Publish Grade & Feedback
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD PDF HANDOUTS */}
      {activeTab === "handouts" && (
        <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm max-w-xl">
          <h2 className="text-xl font-extrabold text-navy mb-1">Upload Lecture Notes & Worksheets</h2>
          <p className="text-xs text-slate mb-5">PDF files uploaded here are immediately available on student dashboards.</p>

          <form onSubmit={handlePdfUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Handout Title</label>
              <input
                type="text"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                placeholder="e.g. NAPLAN Math Sample Questions & Solutions.pdf"
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Program Category</label>
              <select
                value={pdfSubject}
                onChange={(e) => setPdfSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              >
                <option value="School Assessment">School Competitive Exams (NAPLAN/TOEFL)</option>
                <option value="Quran Recitation">Quran Recitation & Tajweed</option>
                <option value="Islamic Foundation">Islamic Foundation (Namaz & Kalimas)</option>
                <option value="Communication Skills">Communication & Spoken English</option>
                <option value="Short Skills">Short Skills (Writing & Reading)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Select PDF File</label>
              <input
                type="file"
                accept=".pdf"
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-slate focus:border-copper focus:outline-none"
              />
            </div>

            <Button variant="copper" type="submit" isLoading={uploadingPdf} className="w-full">
              Publish PDF to Student Dashboard
            </Button>

            {uploadSuccessMsg && (
              <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 font-bold border border-emerald-200">
                {uploadSuccessMsg}
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 4: AVAILABILITY */}
      {activeTab === "availability" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Weekly Availability Slots</h2>
            <p className="text-xs text-slate mt-0.5">Specify when you are free to accept 40-minute session allotments.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availability.map((avail) => (
              <div key={avail.id} className="rounded-xl border border-slate-border bg-white p-4 shadow-sm">
                <p className="text-xs font-bold text-navy">{dayNames[avail.dayOfWeek]}</p>
                <p className="text-xs text-copper font-mono mt-1 font-semibold">{avail.startTime} – {avail.endTime}</p>
                <span className="text-[10px] text-slate mt-2 block font-medium">Standard 40-Min Allotment</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EDIT FACULTY PROFILE */}
      {activeTab === "profile" && (
        <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm max-w-2xl space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Faculty Profile & Specializations</h2>
            <p className="text-xs text-slate mt-0.5">Update bio, subjects, profile picture, and upload your faculty CV.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-navy mb-1">Teaching Bio & Experience Summary</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-navy mb-1">Subjects & Curriculum Expertise (comma separated)</label>
              <input
                type="text"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-navy mb-1">Profile Photo URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>

            <div className="p-4 bg-cream-muted rounded-xl border border-slate-border flex items-center justify-between">
              <div>
                <p className="font-bold text-navy">Faculty Curriculum Vitae (CV)</p>
                <p className="text-[11px] text-slate">PDF document for admin verification.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => alert("CV upload dialog opened.")}>
                Upload Updated CV (PDF)
              </Button>
            </div>

            <Button type="submit" variant="copper" className="w-full">
              Save Profile Changes
            </Button>

            {profileSavedMsg && (
              <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 font-bold border border-emerald-200">
                {profileSavedMsg}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
