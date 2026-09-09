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
  Download,
  Image as ImageIcon,
  FileSpreadsheet,
  MessageCircle,
  User,
  GraduationCap,
  Heart,
  Sliders,
  Calendar,
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

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string;
  mimeType: string;
}

interface AdminDashboardClientProps {
  stats: { label: string; value: number | string }[];
  initialLeads: Lead[];
  initialUsers: User[];
  initialTickets?: SupportTicket[];
  initialCourses?: CourseItem[];
  initialBookings?: BookingItem[];
  initialDiscounts?: DiscountItem[];
  initialMedia?: MediaItem[];
}

export function AdminDashboardClient({
  stats,
  initialLeads,
  initialUsers,
  initialTickets = [],
  initialCourses = [],
  initialBookings = [],
  initialDiscounts = [],
  initialMedia = [],
}: AdminDashboardClientProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("allotments");
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [leadStatusFilter, setLeadStatusFilter] = useState("ALL");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({ name: "", email: "", phone: "", source: "Website Direct", notes: "" });

  // Users state
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Support Tickets / Parent Enquiries state
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [parentReplyText, setParentReplyText] = useState<{ [ticketId: string]: string }>({});

  // Media & Images state
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [newMediaForm, setNewMediaForm] = useState({ filename: "", url: "", altText: "" });

  // Courses state
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);

  // Bookings state
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  // Discounts state
  const [discounts, setDiscounts] = useState<DiscountItem[]>(initialDiscounts);

  const teacherUsers = users.filter((u) => u.role === "TEACHER");
  const availableTeachers = teacherUsers.map((t) => t.name);
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

  // CSV Exporter helper
  const exportToCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification(`✓ Exported ${filename} sheet to your downloads folder.`);
  };

  const handleAllotTeacher = (bookingId: string, teacherName: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, assignedTeacher: teacherName, status: "CONFIRMED" } : b
      )
    );
    const booking = bookings.find((b) => b.id === bookingId);
    triggerNotification(`✓ Allotted ${teacherName} to ${booking?.studentName || "student"}. Session confirmation recorded.`);
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

  const handleParentReply = (ticketId: string, channel: "portal" | "email" | "whatsapp") => {
    const reply = parentReplyText[ticketId] || "Response sent from admin portal.";
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: "RESOLVED" } : t))
    );
    setParentReplyText((prev) => ({ ...prev, [ticketId]: "" }));
    if (channel === "whatsapp") {
      window.open(`https://wa.me/923704942300?text=${encodeURIComponent(reply)}`, "_blank");
    } else if (channel === "email") {
      window.open(`mailto:aevianacademy@gmail.com?subject=Aevian%20Academy%20Support%20Reply&body=${encodeURIComponent(reply)}`, "_blank");
    }
    triggerNotification(`✓ Replied to parent via ${channel.toUpperCase()}: "${reply}"`);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaForm.url) return;

    const newMedia: MediaItem = {
      id: `m-${Date.now()}`,
      filename: newMediaForm.filename || "website-image.jpg",
      url: newMediaForm.url,
      altText: newMediaForm.altText || "Website Image Asset",
      mimeType: "image/jpeg",
    };

    setMediaList([newMedia, ...mediaList]);
    setNewMediaForm({ filename: "", url: "", altText: "" });
    triggerNotification(`✓ Image asset "${newMedia.filename}" added to media library.`);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    triggerNotification(`✓ Image removed from media library.`);
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
              Allot teachers, manage website content & media assets, export CSV sheets, handle parent enquiries, and oversee global users.
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
              <TrendingUp size={12} /> Live Operational Control
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
          { id: "allotments", label: "Teacher Allotments", icon: UserCheck },
          { id: "leads", label: "CRM & Leads", icon: Filter },
          { id: "teachers", label: "Teacher Manager", icon: GraduationCap },
          { id: "parents", label: "Parent Enquiries", icon: Heart },
          { id: "students", label: "Student Manager", icon: User },
          { id: "content", label: "Content & Media Editor", icon: ImageIcon },
          { id: "financial", label: "Revenue & Discounts", icon: DollarSign },
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

      {/* TAB 1: TEACHER ALLOTMENTS & DUAL SLOT GRID */}
      {activeTab === "allotments" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Teacher Slot Allotment Grid</h2>
              <p className="text-xs text-slate mt-0.5">
                Assign verified master tutors to student requests based on teacher availability slots.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportToCSV(
                  "Aevian_Bookings_Allotments.csv",
                  ["ID", "Student", "Parent Email", "Course", "Scheduled Date/Time", "Status", "Assigned Teacher"],
                  bookings.map((b) => [b.id, b.studentName, b.parentEmail, b.courseName, b.scheduledAt, b.status, b.assignedTeacher || "None"])
                )
              }
              className="flex items-center gap-1.5 text-xs"
            >
              <FileSpreadsheet size={14} /> Export Bookings CSV
            </Button>
          </div>

          <div className="grid gap-4">
            {bookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <UserCheck className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No session bookings requiring allotment found.</p>
                <p className="text-xs text-slate mt-1">Bookings submitted by students or parents will appear here in real time.</p>
              </div>
            ) : (
              bookings.map((b) => (
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
                          {availableTeachers.length === 0 ? (
                            <option value="" disabled>No registered teachers found</option>
                          ) : (
                            availableTeachers.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CRM & LEADS WITH CSV EXPORT */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">CRM Sales Pipeline & Lead Exporter</h2>
              <p className="text-xs text-slate mt-0.5">Track prospective inquiries and download complete lead detail sheets.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  exportToCSV(
                    "Aevian_CRM_Leads_Sheet.csv",
                    ["ID", "Name", "Email", "Phone", "Source", "Status", "Notes"],
                    leads.map((l) => [l.id, l.name, l.email, l.phone || "", l.source, l.status, l.notes || ""])
                  )
                }
                className="flex items-center gap-1.5 text-xs"
              >
                <FileSpreadsheet size={14} /> Download Leads CSV Sheet
              </Button>
              <Button variant="copper" size="sm" onClick={() => setShowAddLeadModal(true)} className="flex items-center gap-1.5 text-xs">
                <Plus size={14} /> Add Lead
              </Button>
            </div>
          </div>

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
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate font-bold">
                        No CRM leads found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((l) => (
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
                          {l.notes || "No notes"}
                        </td>
                        <td className="p-4">
                          <select
                            value={l.status}
                            onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                            className="rounded-lg px-2.5 py-1 text-[11px] font-bold border bg-cream/40"
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEACHER MANAGER & CV DOWNLOAD */}
      {activeTab === "teachers" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Teacher Profile & CV Manager</h2>
              <p className="text-xs text-slate mt-0.5">Control faculty tags, profile details, and download uploaded teacher CVs.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportToCSV(
                  "Aevian_Teachers_Sheet.csv",
                  ["ID", "Name", "Email", "Role", "Joined Date"],
                  users.filter((u) => u.role === "TEACHER").map((u) => [u.id, u.name, u.email, u.role, u.createdAt])
                )
              }
              className="flex items-center gap-1.5 text-xs"
            >
              <FileSpreadsheet size={14} /> Download Teachers CSV
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {users.filter((u) => u.role === "TEACHER").length === 0 ? (
              <div className="sm:col-span-2 rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <GraduationCap className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No teacher profiles registered yet.</p>
                <p className="text-xs text-slate mt-1">Users given the TEACHER role will appear here automatically.</p>
              </div>
            ) : (
              users.filter((u) => u.role === "TEACHER").map((t) => (
                <div key={t.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center font-bold text-copper text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy">{t.name}</h3>
                        <p className="text-[11px] text-slate">{t.email}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      Verified Master Tutor
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-border text-xs">
                    <span className="text-slate font-medium">Faculty CV Document:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Downloading CV for ${t.name}... (Sample CV PDF Generated)`)}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <Download size={12} /> Download CV PDF
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PARENT MANAGER & ENQUIRIES */}
      {activeTab === "parents" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Parent Manager & Enquiry Desk</h2>
              <p className="text-xs text-slate mt-0.5">Receive parent complaints/requests and reply portal-to-portal, email, or WhatsApp.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportToCSV(
                  "Aevian_Parents_Sheet.csv",
                  ["ID", "Name", "Email", "Role", "Joined"],
                  users.filter((u) => u.role === "PARENT").map((u) => [u.id, u.name, u.email, u.role, u.createdAt])
                )
              }
              className="flex items-center gap-1.5 text-xs"
            >
              <FileSpreadsheet size={14} /> Download Parents CSV
            </Button>
          </div>

          <div className="grid gap-4">
            {tickets.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <Heart className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No active parent enquiries or tickets found.</p>
              </div>
            ) : (
              tickets.map((t) => (
                <div key={t.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                        Parent Enquiry
                      </span>
                      <h3 className="text-base font-bold text-navy mt-1">{t.subject}</h3>
                      <p className="text-xs text-slate">Parent: <strong className="text-navy">{t.userName}</strong> ({t.userEmail})</p>
                    </div>
                    <span className="text-xs font-mono text-slate-muted">{t.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate bg-cream-muted p-3 rounded-xl border border-slate-border">
                    &quot;{t.description}&quot;
                  </p>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Type reply message to parent..."
                      value={parentReplyText[t.id] || ""}
                      onChange={(e) => setParentReplyText({ ...parentReplyText, [t.id]: e.target.value })}
                      className="w-full rounded-xl border border-slate-border p-2.5 text-xs text-navy font-medium focus:border-copper focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <Button variant="copper" size="sm" onClick={() => handleParentReply(t.id, "portal")}>
                        Reply Portal-to-Portal
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleParentReply(t.id, "email")}>
                        <Mail size={12} className="mr-1" /> Send Email
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleParentReply(t.id, "whatsapp")}>
                        <MessageCircle size={12} className="mr-1 text-emerald-600" /> Send WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: STUDENT MANAGER */}
      {activeTab === "students" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Student Manager & Progress Oversight</h2>
              <p className="text-xs text-slate mt-0.5">Overview of registered students, parent linkage, and enrollment sheets.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                exportToCSV(
                  "Aevian_Students_Sheet.csv",
                  ["ID", "Name", "Email", "Role", "Joined Date"],
                  users.filter((u) => u.role === "STUDENT").map((u) => [u.id, u.name, u.email, u.role, u.createdAt])
                )
              }
              className="flex items-center gap-1.5 text-xs"
            >
              <FileSpreadsheet size={14} /> Download Students CSV Sheet
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-muted text-navy uppercase font-bold border-b border-slate-border">
                <tr>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-border/60">
                {users.filter((u) => u.role === "STUDENT").length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate font-bold">
                      No student accounts found.
                    </td>
                  </tr>
                ) : (
                  users.filter((u) => u.role === "STUDENT").map((s) => (
                    <tr key={s.id} className="hover:bg-cream/30">
                      <td className="p-4 font-bold text-navy">{s.name}</td>
                      <td className="p-4 text-slate">{s.email}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          Active Learner
                        </span>
                      </td>
                      <td className="p-4 text-slate font-mono">{s.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: WEBSITE CONTENT & MEDIA EDITOR */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Website Content & Media Asset Editor</h2>
            <p className="text-xs text-slate mt-0.5">Edit program titles/fees and manage uploaded image library.</p>
          </div>

          {/* Media Library */}
          <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-navy flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-copper" /> Image & Media Asset Library
            </h3>

            <form onSubmit={handleAddMedia} className="grid gap-3 sm:grid-cols-3 text-xs">
              <input
                type="text"
                placeholder="Filename (e.g. math-class.jpg)"
                value={newMediaForm.filename}
                onChange={(e) => setNewMediaForm({ ...newMediaForm, filename: e.target.value })}
                className="rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
              />
              <input
                type="text"
                placeholder="Image URL (Unsplash / Cloudinary)"
                value={newMediaForm.url}
                onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                className="rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Alt Text"
                  value={newMediaForm.altText}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, altText: e.target.value })}
                  className="w-full rounded-xl border border-slate-border p-2.5 text-navy font-medium focus:border-copper focus:outline-none"
                />
                <Button type="submit" variant="copper" size="sm">
                  Add Image
                </Button>
              </div>
            </form>

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              {mediaList.length === 0 ? (
                <div className="sm:col-span-3 p-6 text-center text-xs font-bold text-slate bg-cream/30 rounded-xl border border-dashed border-slate-border">
                  No media assets uploaded yet. Use the form above to add custom image URLs.
                </div>
              ) : (
                mediaList.map((m) => (
                  <div key={m.id} className="rounded-xl border border-slate-border overflow-hidden bg-cream-muted p-3 space-y-2">
                    <img src={m.url} alt={m.altText} className="h-32 w-full object-cover rounded-lg" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-navy truncate max-w-[150px]">{m.filename}</span>
                      <button onClick={() => handleDeleteMedia(m.id)} className="text-red-600 font-bold hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Program Catalog Editor */}
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.length === 0 ? (
              <div className="sm:col-span-2 rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <BookOpen className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No course programs cataloged.</p>
              </div>
            ) : (
              courses.map((c) => (
                <div key={c.id} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-copper/10 px-2.5 py-0.5 text-[10px] font-bold text-copper">
                      {c.programArea}
                    </span>
                    <button
                      onClick={() => handleToggleCourse(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        c.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {c.published ? "Published" : "Draft"}
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-navy">{c.title}</h4>
                  <p className="text-xs text-slate">Duration: {c.durationWeeks} Weeks • Level: {c.difficulty}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 7: REVENUE & DISCOUNTS */}
      {activeTab === "financial" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Revenue & Discount Code Manager</h2>
              <p className="text-xs text-slate mt-0.5">Create promo codes and track active redemptions.</p>
            </div>
            <Button variant="copper" size="sm" onClick={() => setShowAddDiscountModal(true)} className="flex items-center gap-1.5 text-xs">
              <Plus size={14} /> Create Discount Code
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-border">
              {discounts.length === 0 ? (
                <div className="p-8 text-center text-xs font-bold text-slate">
                  No active discount codes created yet. Click &apos;Create Discount Code&apos; above to generate one.
                </div>
              ) : (
                discounts.map((d) => (
                  <div key={d.id} className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono font-extrabold text-navy text-sm bg-copper/10 px-2.5 py-0.5 rounded border border-copper/30">
                        {d.code}
                      </span>
                      <p className="text-slate font-medium">{d.description || "No description"}</p>
                    </div>
                    <div className="text-right text-slate font-medium">
                      Used: <strong className="text-navy">{d.currentUses}</strong> times
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: USER DIRECTORY & ROLES */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-navy">Global User Directory & Access Control</h2>
              <p className="text-xs text-slate mt-0.5">Manage permissions for Students, Parents, Teachers, and Admins.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
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

              <input
                type="text"
                placeholder="Search user name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-slate-border bg-white px-4 py-2 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-border bg-white overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-muted text-navy uppercase font-bold border-b border-slate-border">
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
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-bold bg-navy/10 text-navy">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate font-mono">{u.createdAt}</td>
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
