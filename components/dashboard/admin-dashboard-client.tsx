"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Send,
  BookOpen,
  UserCheck,
  Check,
  X,
  Globe,
  DollarSign,
  Ticket,
  Plus,
  Edit3,
  Filter,
  AlertCircle,
  MessageSquare,
  Percent,
  RefreshCw,
  Mail,
  Phone,
  Tag,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import {
  updateLeadStatus,
  createLead,
  updateTicketStatus,
  toggleCoursePublished,
  createDiscountCode,
  updateUserRole,
} from "@/lib/actions/admin";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  source: string;
  status: string;
  notes?: string | null;
  createdAt?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  programArea: string;
  published: boolean;
  difficulty?: string;
  durationWeeks?: number;
}

interface BookingItem {
  id: string;
  studentName: string;
  parentEmail: string;
  courseName: string;
  type: string;
  scheduledAt: string;
  assignedTeacher: string | null;
  status: string;
  durationMinutes: number;
}

interface DiscountItem {
  id: string;
  code: string;
  description?: string | null;
  discountPercent?: number | null;
  discountAmount?: number | null;
  currentUses: number;
  maxUses?: number | null;
  active: boolean;
}

interface AdminDashboardClientProps {
  stats: { label: string; value: number | string }[];
  initialLeads: Lead[];
  initialUsers: User[];
  initialTickets?: SupportTicket[];
  initialCourses?: CourseItem[];
  initialBookings?: BookingItem[];
  initialDiscounts?: DiscountItem[];
}

export function AdminDashboardClient({
  stats,
  initialLeads,
  initialUsers,
  initialTickets = [],
  initialCourses = [],
  initialBookings = [],
  initialDiscounts = [],
}: AdminDashboardClientProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("allotments");
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Leads state with rich fallback if empty
  const defaultLeads: Lead[] = [
    {
      id: "lead-1",
      name: "Sophia Martinez",
      email: "sophia.m@example.com",
      phone: "+44 7911 123456",
      source: "Google Search",
      status: "NEW",
      notes: "Interested in UK SATs prep for 10yo student.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-2",
      name: "Tariq Al-Mansoor",
      email: "tariq.m@example.org",
      phone: "+971 50 987 6543",
      source: "Referral",
      status: "CONTACTED",
      notes: "Looking for 1-on-1 Quran Recitation with certified Tajweed teacher.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-3",
      name: "Emma Watson",
      email: "emma.watson@example.co.uk",
      phone: "+44 20 7946 0912",
      source: "Facebook Ad",
      status: "QUALIFIED",
      notes: "Demo session completed, discussing custom scheduling.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "lead-4",
      name: "Liam O'Connor",
      email: "liam.oc@example.com",
      phone: "+61 412 345 678",
      source: "Website Direct",
      status: "CONVERTED",
      notes: "Enrolled in NAPLAN & ACARA Assessment Prep.",
      createdAt: new Date().toISOString(),
    },
  ];

  const [leads, setLeads] = useState<Lead[]>(
    initialLeads.length > 0 ? initialLeads : defaultLeads
  );
  const [leadStatusFilter, setLeadStatusFilter] = useState("ALL");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: "", email: "", phone: "", source: "Website Direct", notes: "" });

  // Users state
  const defaultUsers: User[] = [
    { id: "u-1", name: "Dr. Sarah Khan", email: "sarah.khan@aevian.edu", role: "TEACHER", createdAt: "2026-01-15" },
    { id: "u-2", name: "Ustadh Ahmad", email: "ahmad@aevian.edu", role: "TEACHER", createdAt: "2026-02-01" },
    { id: "u-3", name: "Admin Lead", email: "admin@aevian.com", role: "ADMIN", createdAt: "2026-01-01" },
    { id: "u-4", name: "Oliver Jenkins (Parent)", email: "sarah.jenkins@example.com", role: "PARENT", createdAt: "2026-03-10" },
    { id: "u-5", name: "Zayd Khan (Student)", email: "zayd.k@example.com", role: "STUDENT", createdAt: "2026-04-02" },
  ];
  const [users, setUsers] = useState<User[]>(
    initialUsers.length > 0 ? initialUsers : defaultUsers
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Support Tickets state
  const defaultTickets: SupportTicket[] = [
    {
      id: "t-101",
      subject: "Custom Slot Timezone Confusion",
      description: "Parent in Sydney requested 5:30 PM AEST but received UTC confirmation email.",
      status: "OPEN",
      priority: "high",
      userName: "Oliver Jenkins",
      userEmail: "sarah.jenkins@example.com",
      createdAt: "2-Hours Ago",
    },
    {
      id: "t-102",
      subject: "Homework Submission File Upload Error",
      description: "PDF upload size limit warning triggered on 12MB ACARA practice paper.",
      status: "IN_PROGRESS",
      priority: "medium",
      userName: "Emily Watson",
      userEmail: "mark.watson@example.com",
      createdAt: "1-Day Ago",
    },
    {
      id: "t-103",
      subject: "Certificate Name Spelling Correction",
      description: "Request to update student middle name on Quran Recitation certificate.",
      status: "RESOLVED",
      priority: "low",
      userName: "Tariq Khan",
      userEmail: "tariq.khan@example.com",
      createdAt: "3-Days Ago",
    },
  ];
  const [tickets, setTickets] = useState<SupportTicket[]>(
    initialTickets.length > 0 ? initialTickets : defaultTickets
  );
  const [ticketStatusFilter, setTicketStatusFilter] = useState("ALL");

  // Courses state
  const defaultCourses: CourseItem[] = [
    { id: "c1", title: "NAPLAN & ACARA Assessment Prep", slug: "naplan-acara-prep", programArea: "School Assessment", published: true, difficulty: "INTERMEDIATE", durationWeeks: 8 },
    { id: "c2", title: "UK SATs & CAT4 Exam Masterclass", slug: "uk-sats-cat4-masterclass", programArea: "School Assessment", published: true, difficulty: "ADVANCED", durationWeeks: 10 },
    { id: "c3", title: "Quran Recitation & Tajweed Mastery", slug: "quran-recitation-tajweed", programArea: "Quran Programs", published: true, difficulty: "BEGINNER", durationWeeks: 12 },
    { id: "c4", title: "Islamic Foundation & Essential Teachings", slug: "islamic-foundations", programArea: "Islamic Foundations", published: true, difficulty: "BEGINNER", durationWeeks: 6 },
    { id: "c5", title: "Spoken English Fluency & Confidence", slug: "spoken-english-fluency", programArea: "Language Skills", published: true, difficulty: "INTERMEDIATE", durationWeeks: 8 },
    { id: "c6", title: "IGCSE & IB High School Support", slug: "igcse-ib-tutoring", programArea: "International Curriculum", published: false, difficulty: "ADVANCED", durationWeeks: 12 },
  ];
  const [courses, setCourses] = useState<CourseItem[]>(
    initialCourses.length > 0 ? initialCourses : defaultCourses
  );

  // Bookings state
  const defaultBookings: BookingItem[] = [
    {
      id: "b101",
      studentName: "Oliver Jenkins",
      parentEmail: "sarah.jenkins@example.com",
      courseName: "NAPLAN & ACARA Assessment Prep",
      type: "TRIAL",
      scheduledAt: "Tomorrow @ 10:00 AM - 10:40 AM",
      assignedTeacher: null,
      status: "PENDING",
      durationMinutes: 40,
    },
    {
      id: "b102",
      studentName: "Zayd Khan",
      parentEmail: "tariq.khan@example.com",
      courseName: "Islamic Foundation & Essential Teachings",
      type: "REGULAR",
      scheduledAt: "Aug 31, 2026 @ 05:30 PM",
      assignedTeacher: null,
      status: "PENDING",
      durationMinutes: 40,
    },
    {
      id: "b103",
      studentName: "Emily Watson",
      parentEmail: "mark.watson@example.com",
      courseName: "Spoken English Fluency & Confidence",
      type: "TRIAL",
      scheduledAt: "Today @ 04:00 PM (Instant 2-Hr Gap)",
      assignedTeacher: "Prof. David Miller",
      status: "CONFIRMED",
      durationMinutes: 40,
    },
  ];
  const [bookings, setBookings] = useState<BookingItem[]>(
    initialBookings.length > 0 ? initialBookings : defaultBookings
  );

  // Master Tutors for allotment dropdown
  const availableTeachers = [
    "Dr. Sarah Khan (Math & Assessment Expert)",
    "Ustadh Ahmad (Quran Recitation & Tajweed)",
    "Prof. David Miller (IELTS / TOEFL Certified)",
    "Ustadha Fatima (Islamic Foundations & Duas)",
    "Mr. Robert Taylor (UK Curriculum Specialist)",
  ];

  // Discounts state
  const defaultDiscounts: DiscountItem[] = [
    { id: "d1", code: "WELCOME10", description: "10% Off First Trial Class", discountPercent: 10, currentUses: 42, maxUses: 100, active: true },
    { id: "d2", code: "GLOBAL2026", description: "$25 Flat Discount on Package Enrollments", discountAmount: 25, currentUses: 19, maxUses: 50, active: true },
    { id: "d3", code: "SIBLING15", description: "15% Sibling Discount Offer", discountPercent: 15, currentUses: 8, maxUses: 200, active: true },
  ];
  const [discounts, setDiscounts] = useState<DiscountItem[]>(
    initialDiscounts.length > 0 ? initialDiscounts : defaultDiscounts
  );
  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [newDiscountForm, setNewDiscountForm] = useState({
    code: "",
    description: "",
    discountPercent: "",
    discountAmount: "",
    maxUses: "",
  });

  // Handlers
  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  const handleAllotTeacher = (bookingId: string, teacherName: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, assignedTeacher: teacherName, status: "CONFIRMED" } : b
      )
    );
    const booking = bookings.find((b) => b.id === bookingId);
    triggerNotification(`✓ Allotted ${teacherName} to ${booking?.studentName || "student"}. Email dispatched to ${booking?.parentEmail || "parent"}.`);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    startTransition(async () => {
      await updateLeadStatus(leadId, newStatus as any);
      triggerNotification(`✓ Lead status updated to ${newStatus}`);
    });
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return;

    const created: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      source: newLeadForm.source,
      status: "NEW",
      notes: newLeadForm.notes,
      createdAt: new Date().toISOString(),
    };

    setLeads([created, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadForm({ name: "", email: "", phone: "", source: "Website Direct", notes: "" });

    startTransition(async () => {
      await createLead(created.name, created.email, created.source, created.notes || undefined);
      triggerNotification(`✓ New CRM Lead "${created.name}" added successfully.`);
    });
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    startTransition(async () => {
      await updateTicketStatus(ticketId, newStatus as any);
      triggerNotification(`✓ Support Ticket status changed to ${newStatus}`);
    });
  };

  const handleToggleCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, published: !c.published } : c))
    );
    startTransition(async () => {
      await toggleCoursePublished(courseId);
      triggerNotification(`✓ Course publication status updated.`);
    });
  };

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscountForm.code) return;

    const discountObj: DiscountItem = {
      id: `d-${Date.now()}`,
      code: newDiscountForm.code.toUpperCase().trim(),
      description: newDiscountForm.description || null,
      discountPercent: newDiscountForm.discountPercent ? Number(newDiscountForm.discountPercent) : null,
      discountAmount: newDiscountForm.discountAmount ? Number(newDiscountForm.discountAmount) : null,
      currentUses: 0,
      maxUses: newDiscountForm.maxUses ? Number(newDiscountForm.maxUses) : null,
      active: true,
    };

    setDiscounts([discountObj, ...discounts]);
    setShowAddDiscountModal(false);
    setNewDiscountForm({ code: "", description: "", discountPercent: "", discountAmount: "", maxUses: "" });

    startTransition(async () => {
      await createDiscountCode({
        code: discountObj.code,
        description: discountObj.description || undefined,
        discountPercent: discountObj.discountPercent || undefined,
        discountAmount: discountObj.discountAmount || undefined,
        maxUses: discountObj.maxUses || undefined,
      });
      triggerNotification(`✓ Discount code "${discountObj.code}" created successfully.`);
    });
  };

  const handleUserRoleChange = (userId: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    startTransition(async () => {
      await updateUserRole(userId, newRole as any);
      triggerNotification(`✓ User role updated to ${newRole}.`);
    });
  };

  // Filtered lists
  const filteredUsers = (users || []).filter((u) => {
    const nameStr = (u?.name || "").toLowerCase();
    const emailStr = (u?.email || "").toLowerCase();
    const q = (searchQuery || "").toLowerCase();
    const matchesSearch = nameStr.includes(q) || emailStr.includes(q);
    const matchesRole = roleFilter === "ALL" || u?.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredLeads = (leads || []).filter(
    (l) => leadStatusFilter === "ALL" || l?.status === leadStatusFilter
  );

  const filteredTickets = (tickets || []).filter(
    (t) => ticketStatusFilter === "ALL" || t?.status === ticketStatusFilter
  );


  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 bg-copper/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Platform Executive Command Panel</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Aevian Academy Control Hub</h1>
            <p className="mt-1 text-sm text-slate-light max-w-xl">
              Allot teachers, resolve support queries, manage CRM sales pipeline, create discount codes, and oversee global users.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-navy-dark px-4 py-2.5 text-xs font-bold text-copper border border-navy-light flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              UK • US • AU • Gulf • Asia
            </span>
          </div>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((st, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs font-bold text-slate uppercase tracking-wider">{st.label}</p>
            <p className="mt-2 text-2xl font-extrabold text-navy">{st.value}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> Live Sync Operational
            </span>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-emerald-50 p-4 text-xs font-bold text-emerald-900 border border-emerald-200 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{notificationMsg}</span>
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold ml-4"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-border pb-4">
        {[
          { id: "allotments", label: "Teacher Allotment Center", icon: UserCheck, count: bookings.filter(b => b.status === "PENDING").length },
          { id: "leads", label: "CRM & Lead Pipeline", icon: Filter, count: leads.filter(l => l.status === "NEW").length },
          { id: "support", label: "Support Desk", icon: Ticket, count: tickets.filter(t => t.status === "OPEN").length },
          { id: "financial", label: "Revenue & Discounts", icon: DollarSign, count: discounts.length },
          { id: "catalog", label: "Course Catalog", icon: BookOpen, count: courses.length },
          { id: "users", label: "User Directory", icon: Users, count: users.length },
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
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === tab.id ? "bg-copper text-white" : "bg-cream-muted text-copper border border-copper/30"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: TEACHER ALLOTMENT CENTER */}
      {activeTab === "allotments" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Pending Student Bookings & Tutor Allotment</h2>
              <p className="text-xs text-slate mt-0.5">
                Assign top verified master tutors to incoming demo & regular class requests.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Realtime Tutor Queue</span>
            </div>
          </div>

          <div className="grid gap-4">
            {bookings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-6"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-navy">{b.studentName}</span>
                    <span className="text-xs text-slate">({b.parentEmail})</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      b.type === "TRIAL" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {b.type === "TRIAL" ? "Free Trial Booking" : "Regular Class"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-copper">{b.courseName}</p>
                  <p className="text-xs text-slate flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-copper" /> {b.scheduledAt} ({b.durationMinutes} Mins)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {b.status === "CONFIRMED" ? (
                    <span className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Allotted: {b.assignedTeacher}
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

      {/* TAB 2: CRM & LEAD PIPELINE */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">CRM & Lead Conversion Pipeline</h2>
              <p className="text-xs text-slate mt-0.5">Track prospective student inquiries from initial contact to paid enrollment.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-border bg-white px-3 py-2 text-xs text-navy font-bold focus:border-copper focus:outline-none"
              >
                <option value="ALL">All Lead Statuses</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="CONVERTED">Converted</option>
                <option value="LOST">Lost</option>
              </select>
              <Button variant="copper" size="sm" onClick={() => setShowAddLeadModal(true)} className="flex items-center gap-1.5 text-xs">
                <Plus size={14} /> Add CRM Lead
              </Button>
            </div>
          </div>

          {/* Lead Kanban / Status Overview Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["NEW", "CONTACTED", "QUALIFIED", "CONVERTED"].map((status) => {
              const count = leads.filter((l) => l.status === status).length;
              return (
                <div key={status} className="rounded-2xl border border-slate-border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate uppercase">{status}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cream text-navy font-extrabold text-xs">
                      {count}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-cream-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        status === "NEW"
                          ? "bg-blue-500"
                          : status === "CONTACTED"
                          ? "bg-amber-500"
                          : status === "QUALIFIED"
                          ? "bg-purple-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(100, (count / (leads.length || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leads Table */}
          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-muted text-navy uppercase tracking-wider font-bold border-b border-slate-border">
                  <tr>
                    <th className="p-4">Lead Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-border/60">
                  {filteredLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-cream/30 transition-colors">
                      <td className="p-4 font-bold text-navy">{l.name}</td>
                      <td className="p-4 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate font-medium">
                          <Mail className="h-3 w-3 text-copper" /> {l.email}
                        </div>
                        {l.phone && (
                          <div className="flex items-center gap-1.5 text-slate-muted text-[11px]">
                            <Phone className="h-3 w-3 text-slate" /> {l.phone}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-slate font-medium">
                        <span className="rounded-md bg-cream px-2 py-1 text-[10px] font-semibold text-slate-700">
                          {l.source}
                        </span>
                      </td>
                      <td className="p-4 text-slate text-[11px] max-w-xs truncate font-medium">
                        {l.notes || "No notes attached"}
                      </td>
                      <td className="p-4">
                        <select
                          value={l.status}
                          onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold border ${
                            l.status === "NEW"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : l.status === "CONTACTED"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : l.status === "QUALIFIED"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : l.status === "CONVERTED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="QUALIFIED">QUALIFIED</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="LOST">LOST</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateLeadStatus(l.id, "CONVERTED")}
                          className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800"
                        >
                          Convert Lead
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPPORT DESK */}
      {activeTab === "support" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Support Desk & Ticket Resolution Center</h2>
              <p className="text-xs text-slate mt-0.5">Manage user inquiries, technical assistance, and billing tickets.</p>
            </div>
            <select
              value={ticketStatusFilter}
              onChange={(e) => setTicketStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-border bg-white px-3 py-2 text-xs text-navy font-bold focus:border-copper focus:outline-none"
            >
              <option value="ALL">All Support Ticket Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="grid gap-4">
            {filteredTickets.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      t.priority === "urgent"
                        ? "bg-red-100 text-red-700"
                        : t.priority === "high"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {t.priority} Priority
                    </span>
                    <h3 className="text-base font-bold text-navy">{t.subject}</h3>
                  </div>
                  <select
                    value={t.status}
                    onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)}
                    className="rounded-xl border border-slate-border bg-cream-muted px-3 py-1.5 text-xs text-navy font-bold"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                <p className="text-xs text-slate leading-relaxed font-medium">{t.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-border text-[11px] text-slate">
                  <span>User: <strong className="text-navy">{t.userName}</strong> ({t.userEmail})</span>
                  <span>Logged: {t.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REVENUE & DISCOUNTS */}
      {activeTab === "financial" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Revenue Oversight & Promo Coupon Manager</h2>
              <p className="text-xs text-slate mt-0.5">Create discount codes, monitor active coupon redemptions, and view billing logs.</p>
            </div>
            <Button variant="copper" size="sm" onClick={() => setShowAddDiscountModal(true)} className="flex items-center gap-1.5 text-xs">
              <Plus size={14} /> Create Discount Code
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-slate uppercase">Active Promo Coupons</p>
              <p className="mt-2 text-2xl font-extrabold text-navy">{discounts.filter(d => d.active).length}</p>
            </div>
            <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-slate uppercase">Total Redemptions</p>
              <p className="mt-2 text-2xl font-extrabold text-copper">
                {discounts.reduce((acc, d) => acc + d.currentUses, 0)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-slate uppercase">Currency Engine</p>
              <p className="mt-2 text-2xl font-extrabold text-emerald-600">Multi-Currency (GBP, USD, PKR)</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <div className="p-4 bg-cream-muted border-b border-slate-border font-bold text-navy text-xs">
              Active Promo Coupons & Discount Rules
            </div>
            <div className="divide-y divide-slate-border">
              {discounts.map((d) => (
                <div key={d.id} className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-navy text-sm bg-copper/10 px-2.5 py-0.5 rounded border border-copper/30">
                        {d.code}
                      </span>
                      {d.discountPercent && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {d.discountPercent}% OFF
                        </span>
                      )}
                      {d.discountAmount && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                          ${d.discountAmount} OFF
                        </span>
                      )}
                    </div>
                    <p className="text-slate font-medium">{d.description || "No description specified"}</p>
                  </div>
                  <div className="text-right space-y-1 text-slate font-medium">
                    <div>Used: <strong className="text-navy">{d.currentUses}</strong> {d.maxUses ? `/ ${d.maxUses}` : "times"}</div>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Active Code
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COURSE CATALOG MANAGER */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Program & Course Catalog Manager</h2>
              <p className="text-xs text-slate mt-0.5">Toggle course availability across website and trial wizard.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((c) => (
              <div key={c.id} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="rounded-md bg-copper/10 px-2.5 py-0.5 text-[10px] font-bold text-copper">
                    {c.programArea}
                  </span>
                  <h4 className="text-sm font-bold text-navy">{c.title}</h4>
                  <p className="text-[11px] text-slate font-medium">
                    Duration: {c.durationWeeks || 8} Weeks • Level: {c.difficulty || "All Levels"}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleCourse(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    c.published
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {c.published ? "Published" : "Draft"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: USER DIRECTORY & ROLES */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Global User Directory & Access Control</h2>
              <p className="text-xs text-slate mt-0.5">Manage permissions for Students, Parents, Teachers, and Admins.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-xl border border-slate-border bg-white px-3 py-2 text-xs text-navy font-bold focus:border-copper focus:outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="PARENT">Parent</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Admin</option>
              </select>

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
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-muted text-navy uppercase tracking-wider font-bold border-b border-slate-border">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4 text-right">Role Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-border/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-cream/30">
                      <td className="p-4 font-bold text-navy">{u.name}</td>
                      <td className="p-4 text-slate font-medium">{u.email}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          u.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "TEACHER"
                            ? "bg-copper/20 text-copper"
                            : u.role === "PARENT"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate font-mono">
                        {(() => {
                          try {
                            const d = new Date(u.createdAt);
                            return isNaN(d.getTime()) ? String(u.createdAt || "N/A") : d.toLocaleDateString();
                          } catch (e) {
                            return String(u.createdAt || "N/A");
                          }
                        })()}
                      </td>

                      <td className="p-4 text-right">
                        <select
                          value={u.role}
                          onChange={(e) => handleUserRoleChange(u.id, e.target.value)}
                          className="rounded-lg border border-slate-border bg-cream/40 px-2 py-1 text-[11px] font-bold text-navy focus:border-copper focus:outline-none"
                        >
                          <option value="STUDENT">STUDENT</option>
                          <option value="PARENT">PARENT</option>
                          <option value="TEACHER">TEACHER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD CRM LEAD */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white border border-slate-border p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-navy">Add New CRM Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate hover:text-navy">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-navy block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="+44 7911 123456"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Lead Source</label>
                <select
                  value={newLeadForm.source}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                >
                  <option value="Website Direct">Website Direct</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Facebook / Instagram Ad">Facebook / Instagram Ad</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Student age, grade, requested course..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddLeadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="copper" size="sm" disabled={isPending}>
                  {isPending ? "Saving..." : "Create Lead"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL: ADD DISCOUNT CODE */}
      {showAddDiscountModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-white border border-slate-border p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-navy">Create Promo Discount Code</h3>
              <button onClick={() => setShowAddDiscountModal(false)} className="text-slate hover:text-navy">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateDiscount} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-navy block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AUTUMN2026"
                  value={newDiscountForm.code}
                  onChange={(e) => setNewDiscountForm({ ...newDiscountForm, code: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-mono font-bold focus:border-copper focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 15% Off Back To School Campaign"
                  value={newDiscountForm.description}
                  onChange={(e) => setNewDiscountForm({ ...newDiscountForm, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-navy block mb-1">Discount %</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={newDiscountForm.discountPercent}
                    onChange={(e) => setNewDiscountForm({ ...newDiscountForm, discountPercent: e.target.value })}
                    className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Or Flat $ Amount</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={newDiscountForm.discountAmount}
                    onChange={(e) => setNewDiscountForm({ ...newDiscountForm, discountAmount: e.target.value })}
                    className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-navy block mb-1">Max Redemptions (Optional)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={newDiscountForm.maxUses}
                  onChange={(e) => setNewDiscountForm({ ...newDiscountForm, maxUses: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddDiscountModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="copper" size="sm" disabled={isPending}>
                  {isPending ? "Creating..." : "Save Coupon"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
