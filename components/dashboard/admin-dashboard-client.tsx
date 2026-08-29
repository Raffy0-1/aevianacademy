"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Briefcase,
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Send,
  BookOpen,
  UserCheck,
  Check,
  X,
  Sliders,
  Globe,
  Award,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface PendingBooking {
  id: string;
  studentName: string;
  parentEmail: string;
  courseName: string;
  bookingMode: "standard" | "custom" | "instant";
  requestedDate: string;
  requestedTime: string;
  assignedTeacher: string | null;
  status: "PENDING_ALLOTMENT" | "CONFIRMED" | "REJECTED";
}

interface AdminDashboardClientProps {
  stats: { label: string; value: number | string }[];
  initialLeads: Lead[];
  initialUsers: User[];
}

export function AdminDashboardClient({
  stats,
  initialLeads,
  initialUsers,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("allotments");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // Pending Bookings for Admin Allotment
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([
    {
      id: "b101",
      studentName: "Oliver Jenkins",
      parentEmail: "sarah.jenkins@example.com",
      courseName: "NAPLAN & ACARA Assessment Prep",
      bookingMode: "standard",
      requestedDate: "Tomorrow",
      requestedTime: "10:00 AM - 10:40 AM (40 Mins)",
      assignedTeacher: null,
      status: "PENDING_ALLOTMENT",
    },
    {
      id: "b102",
      studentName: "Zayd Khan",
      parentEmail: "tariq.khan@example.com",
      courseName: "Islamic Foundation & Essential Teachings",
      bookingMode: "custom",
      requestedDate: "Aug 31, 2026",
      requestedTime: "05:30 PM (Custom Time Requested)",
      assignedTeacher: null,
      status: "PENDING_ALLOTMENT",
    },
    {
      id: "b103",
      studentName: "Emily Watson",
      parentEmail: "mark.watson@example.com",
      courseName: "TOEFL & Spoken English Fluency",
      bookingMode: "instant",
      requestedDate: "Today",
      requestedTime: "Immediate (2-Hour Notice Gap)",
      assignedTeacher: null,
      status: "PENDING_ALLOTMENT",
    },
  ]);

  // Master Tutors List for Allotment
  const availableTeachers = [
    "Dr. Sarah Khan (Math & Assessment Expert)",
    "Ustadh Ahmad (Quran Recitation & Tajweed)",
    "Prof. David Miller (IELTS / TOEFL Certified)",
    "Ustadha Fatima (Islamic Foundations & Duas)",
  ];

  // Course Catalog Controls State
  const [catalogCourses, setCatalogCourses] = useState([
    { id: "c1", title: "NAPLAN & ACARA Assessment Prep", category: "School Assessment", active: true },
    { id: "c2", title: "UK SATs & CAT4 Exam Masterclass", category: "School Assessment", active: true },
    { id: "c3", title: "Quran Recitation & Tajweed Mastery", category: "Quran Recitation", active: true },
    { id: "c4", title: "Islamic Foundation & Essential Teachings", category: "Islamic Foundations", active: true },
    { id: "c5", title: "Spoken English Fluency & Confidence", category: "Communication Skills", active: true },
    { id: "c6", title: "Reading Comprehension & Writing", category: "Short Skills", active: true },
  ]);

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Allot Teacher Handler
  const handleAllotTeacher = (bookingId: string, teacherName: string) => {
    setPendingBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, assignedTeacher: teacherName, status: "CONFIRMED" }
          : b
      )
    );
    const booking = pendingBookings.find((b) => b.id === bookingId);
    setNotificationMsg(
      `✓ Allotted ${teacherName} to ${booking?.studentName}. Confirmation email sent to ${booking?.parentEmail}!`
    );
  };

  // Toggle Course Active Status
  const handleToggleCourse = (courseId: string) => {
    setCatalogCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, active: !c.active } : c))
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Admin Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 bg-copper/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Full Admin Command Panel</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Aevian Platform Control Center</h1>
            <p className="mt-1 text-sm text-slate-light max-w-xl">
              Allot teachers, approve custom slot requests, manage catalog courses, and oversee users across 5+ countries.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="rounded-xl bg-navy-dark px-4 py-2 text-xs font-bold text-copper border border-navy-light">
              5K–10K Active Learners
            </span>
          </div>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate uppercase tracking-wider">Students Taught</p>
          <p className="mt-2 text-2xl font-extrabold text-navy">5K – 10K</p>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> Active Global Reach
          </span>
        </div>

        <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate uppercase tracking-wider">Vetted Master Tutors</p>
          <p className="mt-2 text-2xl font-extrabold text-copper">150+</p>
          <span className="text-[10px] text-slate font-semibold mt-1 block">Certified Faculty</span>
        </div>

        <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate uppercase tracking-wider">Countries Represented</p>
          <p className="mt-2 text-2xl font-extrabold text-navy">5+</p>
          <span className="text-[10px] text-slate font-semibold mt-1 block">UK, US, AU, Gulf, Asia</span>
        </div>

        <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate uppercase tracking-wider">Session Slot Duration</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">40 Mins</p>
          <span className="text-[10px] text-slate font-semibold mt-1 block">Individual 1-on-1 Focus</span>
        </div>
      </div>

      {/* Action Notification Toast */}
      {notificationMsg && (
        <div className="rounded-xl bg-emerald-50 p-4 text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center justify-between">
          <span>{notificationMsg}</span>
          <button onClick={() => setNotificationMsg(null)} className="text-emerald-600 hover:text-emerald-900 font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-border pb-4">
        {[
          { id: "allotments", label: "Teacher Allotment Center", icon: UserCheck },
          { id: "custom-slots", label: "Custom & Instant Bookings", icon: Zap },
          { id: "catalog", label: "Program & Course Manager", icon: BookOpen },
          { id: "users", label: "User Directory", icon: Users },
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

      {/* TAB 1: TEACHER ALLOTMENT CENTER */}
      {activeTab === "allotments" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Pending Student Bookings & Teacher Allotment</h2>
            <p className="text-xs text-slate mt-0.5">
              Assign top verified master tutors to incoming demo & regular class requests.
            </p>
          </div>

          <div className="grid gap-4">
            {pendingBookings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-navy">{b.studentName}</span>
                    <span className="text-xs text-slate">({b.parentEmail})</span>
                    {b.bookingMode === "instant" && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                        Instant Booking Priority
                      </span>
                    )}
                    {b.bookingMode === "custom" && (
                      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
                        Custom Slot Request
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-copper">{b.courseName}</p>
                  <p className="text-xs text-slate flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-copper" /> {b.requestedDate} @ {b.requestedTime}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {b.status === "CONFIRMED" ? (
                    <span className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
                      ✓ Allotted to: {b.assignedTeacher}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <select
                        onChange={(e) => {
                          if (e.target.value) handleAllotTeacher(b.id, e.target.value);
                        }}
                        defaultValue=""
                        className="rounded-xl border border-slate-border bg-cream/40 px-3 py-2 text-xs text-navy font-bold focus:border-copper focus:outline-none"
                      >
                        <option value="" disabled>Allot Master Tutor...</option>
                        {availableTeachers.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOM & INSTANT BOOKINGS */}
      {activeTab === "custom-slots" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Custom Slot & Instant Booking Queue</h2>
            <p className="text-xs text-slate mt-0.5">Approve free-time requests and dispatch confirmation emails.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <Send className="h-4 w-4 text-copper" /> Custom Slot Approvals
              </h3>
              <p className="text-xs text-slate">
                Parents can comfortably request custom free-time slots. Approving dispatches an automatic confirmation email to the booker.
              </p>
              <div className="rounded-xl bg-cream-muted p-4 border border-slate-border text-xs space-y-2">
                <p className="font-bold text-navy">Sample Custom Request: Zayd Khan</p>
                <p className="text-slate">Requested: Aug 31, 2026 @ 05:30 PM</p>
                <Button variant="copper" size="sm" onClick={() => setNotificationMsg("✓ Custom slot approved! Confirmation email dispatched to parent.")}>
                  Approve & Dispatch Confirmation Email
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" /> Instant Booking Queue
              </h3>
              <p className="text-xs text-slate">
                Urgent class requests with a minimum 2-hour notice gap from current system clock.
              </p>
              <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-xs space-y-2">
                <p className="font-bold text-amber-900">Sample Instant Request: Emily Watson</p>
                <p className="text-amber-800">Gap: Minimum 2 Hours • Extra Fee Applied (+£15)</p>
                <Button variant="copper" size="sm" onClick={() => setNotificationMsg("✓ Instant class dispatched to available tutor room.")}>
                  Dispatch Immediate Master Tutor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROGRAM & COURSE CATALOG MANAGER */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Program & Course Catalog Manager</h2>
              <p className="text-xs text-slate mt-0.5">Toggle course availability across website and trial wizard.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {catalogCourses.map((c) => (
              <div key={c.id} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <span className="rounded-md bg-copper/10 px-2.5 py-0.5 text-[10px] font-bold text-copper">
                    {c.category}
                  </span>
                  <h4 className="text-sm font-bold text-navy mt-2">{c.title}</h4>
                </div>

                <button
                  onClick={() => handleToggleCourse(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    c.active
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {c.active ? "Active" : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USER DIRECTORY */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">User Directory</h2>
              <p className="text-xs text-slate mt-0.5">Manage accounts for Students, Parents, Teachers, and Admins.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-border bg-white pl-9 pr-4 py-2 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-muted text-navy uppercase tracking-wider font-bold border-b border-slate-border">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-border/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-cream/30">
                      <td className="p-4 font-bold text-navy">{u.name}</td>
                      <td className="p-4 text-slate font-medium">{u.email}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-navy/10 px-2.5 py-1 text-[10px] font-bold text-navy">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate font-mono">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
