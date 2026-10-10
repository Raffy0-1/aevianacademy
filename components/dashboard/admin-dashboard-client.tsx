"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
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
  Layers,
  ChevronRight,
  ExternalLink,
  Lock,
  CreditCard,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import {
  updateLeadStatus,
  createLead,
  updateTicketStatus,
  toggleCoursePublished,
  updateUserRole,
} from "@/lib/actions/admin";
import { replyToSupportTicket } from "@/lib/actions/support";

// ─── Interfaces ──────────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  source: string;
  status: string;
  notes?: string | null;
  createdAt?: string;
  isClient?: boolean;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ParentItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  children: {
    id: string;
    name: string;
    email: string;
    courses: string[];
  }[];
  createdAt: string;
}

interface StudentItem {
  id: string;
  name: string;
  email: string;
  gradeLevel: string;
  englishLevel: string;
  parentName: string | null;
  parentEmail: string | null;
  enrollments: {
    courseTitle: string;
    progressPercent: number;
    status: string;
  }[];
  createdAt: string;
}

interface TeacherProfileItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string;
  subjects: string[];
  yearsExperience: number;
  hourlyRate: number;
  courseCount: number;
  availabilitySlots: number;
}

interface SubscriberItem {
  id: string;
  subscriberName: string;
  subscriberEmail: string;
  studentName: string;
  packageName: string;
  subscribedDate: string;
  lastActiveDate: string;
  monthlyFee: number;
  status: string;
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
  initialUsers: UserItem[];
  initialParents?: ParentItem[];
  initialStudents?: StudentItem[];
  initialTeachers?: TeacherProfileItem[];
  initialSubscribers?: SubscriberItem[];
  initialTickets?: SupportTicket[];
  initialCourses?: CourseItem[];
  initialBookings?: BookingItem[];
  initialMedia?: MediaItem[];
}

export function AdminDashboardClient({
  stats,
  initialLeads,
  initialUsers,
  initialParents = [],
  initialStudents = [],
  initialTeachers = [],
  initialSubscribers = [],
  initialTickets = [],
  initialCourses = [],
  initialBookings = [],
  initialMedia = [],
}: AdminDashboardClientProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("teachers");
  const [teacherSubTab, setTeacherSubTab] = useState<"allotments" | "directory">("allotments");
  const [parentsSubTab, setParentsSubTab] = useState<"sheet" | "enquiries">("sheet");
  const [revenueSubTab, setRevenueSubTab] = useState<"overview" | "subscribers">("overview");
  const [leadsFilter, setLeadsFilter] = useState<"ALL" | "LEADS" | "CLIENTS">("ALL");
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website Direct",
    notes: "",
  });

  // Users state
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Parents & Students state
  const [parents, setParents] = useState<ParentItem[]>(initialParents);
  const [students, setStudents] = useState<StudentItem[]>(initialStudents);
  const [parentSearch, setParentSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  // Teachers state
  const [teacherProfiles, setTeacherProfiles] = useState<TeacherProfileItem[]>(initialTeachers);
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  // Subscribers & Revenue state
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>(initialSubscribers);

  // Tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [ticketStatusFilter, setTicketStatusFilter] = useState("ALL");
  const [activeReplyTicket, setActiveReplyTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");

  // Media state
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [newMediaForm, setNewMediaForm] = useState({ filename: "", url: "", altText: "" });

  // Courses state
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);

  const toast = useToast();

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    toast.success(msg);
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  // CSV Exporter helper
  const exportToCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((e) =>
          e.map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`).join(",")
        ),
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification(`✓ Exported ${filename} sheet to your downloads.`);
  };

  // ─── Handlers ────────────────────────────────────────────────────────

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

    const newObj: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone || null,
      source: newLeadForm.source,
      status: "NEW",
      notes: newLeadForm.notes || null,
      createdAt: new Date().toISOString(),
    };

    setLeads([newObj, ...leads]);
    setShowAddLeadModal(false);
    setNewLeadForm({ name: "", email: "", phone: "", source: "Website Direct", notes: "" });

    startTransition(async () => {
      await createLead(newObj.name, newObj.email, newObj.source, newObj.notes || undefined);
      triggerNotification(`✓ Added prospective lead "${newObj.name}" to pipeline.`);
    });
  };

  /**
   * User role change restricted to PARENT <-> STUDENT only.
   */
  const handleUserRoleChange = (userId: string, newRole: string) => {
    if (newRole !== "PARENT" && newRole !== "STUDENT") {
      toast.error("Role switching is strictly limited between PARENT and STUDENT.");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole as any);
      if (res.error) {
        toast.error(res.error);
      } else {
        triggerNotification(`✓ User role updated to ${newRole}.`);
      }
    });
  };

  const handleTicketStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
    startTransition(async () => {
      await updateTicketStatus(ticketId, newStatus as any);
      triggerNotification(`✓ Ticket status updated to ${newStatus}.`);
    });
  };

  const handleSendTicketReply = () => {
    if (!activeReplyTicket || !replyText.trim()) return;

    const currentTicket = activeReplyTicket;
    startTransition(async () => {
      const res = await replyToSupportTicket(currentTicket.id, replyText, "IN_PROGRESS" as any);
      if (res.error) {
        toast.error(res.error);
      } else {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === currentTicket.id
              ? {
                  ...t,
                  status: "IN_PROGRESS",
                  description: `${t.description}\n\n[ADMIN REPLY]: ${replyText}`,
                }
              : t
          )
        );
        triggerNotification(`✓ Reply sent for ticket #${currentTicket.id.slice(-6)}.`);
        setActiveReplyTicket(null);
        setReplyText("");
      }
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

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaForm.filename || !newMediaForm.url) return;

    const mediaObj: MediaItem = {
      id: `media-${Date.now()}`,
      filename: newMediaForm.filename,
      url: newMediaForm.url,
      altText: newMediaForm.altText || "Website Image Asset",
      mimeType: "image/jpeg",
    };

    setMediaList([mediaObj, ...mediaList]);
    setNewMediaForm({ filename: "", url: "", altText: "" });
    triggerNotification(`✓ Media asset "${mediaObj.filename}" added.`);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    triggerNotification(`✓ Media item removed.`);
  };

  // ─── Filtered Lists & Calculations ─────────────────────────────────

  const availableTeachers = users
    .filter((u) => u.role === "TEACHER")
    .map((t) => t.name);

  // Revenue Calculations
  const calculatedSubsRevenue = subscribers.reduce((acc, s) => acc + (s.monthlyFee || 0), 0);
  const calculatedTutoringRevenue = bookings
    .filter((b) => b.type !== "TRIAL")
    .reduce((acc, b) => acc + 45, 0);
  const totalCalculatedRevenue = calculatedSubsRevenue + calculatedTutoringRevenue;

  // Leads & Clients Logic:
  // Combine users who signed up on website + manual CRM leads
  // If user or lead has active non-trial subscription, they are classified as Client!
  const subscriberEmails = new Set(subscribers.map((s) => s.subscriberEmail.toLowerCase()));
  const paidBookingEmails = new Set(
    bookings.filter((b) => b.type !== "TRIAL").map((b) => b.parentEmail.toLowerCase())
  );

  const websiteUserLeads: Lead[] = users
    .filter((u) => u.role === "PARENT" || u.role === "STUDENT")
    .map((u) => {
      const emailLower = u.email.toLowerCase();
      const isSubscribedClient = subscriberEmails.has(emailLower) || paidBookingEmails.has(emailLower);
      return {
        id: `usr-${u.id}`,
        name: u.name,
        email: u.email,
        phone: null,
        source: "Website Signup",
        status: isSubscribedClient ? "CLIENT" : "NEW",
        notes: `Registered account as ${u.role}.`,
        createdAt: u.createdAt,
        isClient: isSubscribedClient,
      };
    });

  // Combine unique leads
  const combinedLeads = [...websiteUserLeads];
  leads.forEach((l) => {
    const isSubscribedClient =
      l.status === "CONVERTED" ||
      subscriberEmails.has(l.email.toLowerCase()) ||
      paidBookingEmails.has(l.email.toLowerCase());
    if (!combinedLeads.some((cl) => cl.email.toLowerCase() === l.email.toLowerCase())) {
      combinedLeads.push({
        ...l,
        isClient: isSubscribedClient,
        status: isSubscribedClient ? "CLIENT" : l.status,
      });
    }
  });

  const filteredCombinedLeads = combinedLeads.filter((l) => {
    if (leadsFilter === "CLIENTS") return l.isClient || l.status === "CLIENT" || l.status === "CONVERTED";
    if (leadsFilter === "LEADS") return !l.isClient && l.status !== "CLIENT" && l.status !== "CONVERTED";
    return true;
  });

  const totalClientsCount = combinedLeads.filter(
    (l) => l.isClient || l.status === "CLIENT" || l.status === "CONVERTED"
  ).length;
  const totalLeadsOnlyCount = combinedLeads.length - totalClientsCount;

  // Parents filter
  const filteredParents = parents.filter((p) => {
    const q = parentSearch.toLowerCase();
    const matchesParent = p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
    const matchesChild = p.children.some((c) => c.name.toLowerCase().includes(q) || c.courses.some(cs => cs.toLowerCase().includes(q)));
    return matchesParent || matchesChild;
  });

  // Students filter
  const filteredStudents = students.filter((s) => {
    const q = studentSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.parentName && s.parentName.toLowerCase().includes(q))
    );
  });

  // Users filter
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Tickets filter
  const filteredTickets = tickets.filter((t) => {
    if (ticketStatusFilter === "ALL") return true;
    return t.status === ticketStatusFilter;
  });

  // ─── Sidebar Navigation Items ──────────────────────────────────────

  const navSections = [
    {
      id: "teachers",
      label: "Manage Teachers",
      icon: GraduationCap,
      badge: teacherProfiles.length || availableTeachers.length || undefined,
    },
    {
      id: "parents",
      label: "Manage Parents",
      icon: Heart,
      badge: parents.length || undefined,
    },
    {
      id: "students",
      label: "Manage Students",
      icon: User,
      badge: students.length || undefined,
    },
    {
      id: "leads",
      label: "Leads",
      icon: Filter,
      badge: combinedLeads.length || undefined,
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: DollarSign,
      badge: `$${totalCalculatedRevenue}`,
    },
    {
      id: "support",
      label: "Support & Tickets",
      icon: MessageSquare,
      badge: tickets.filter((t) => t.status === "OPEN").length || undefined,
    },
    {
      id: "users",
      label: "User Directory",
      icon: Users,
      badge: users.length || undefined,
    },
    {
      id: "content",
      label: "Content & Media",
      icon: ImageIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Ribbon */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map((st, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card p-4 shadow-sm hover:border-gold/40 transition-all"
          >
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{st.label}</p>
            <p className="mt-1 text-xl font-extrabold text-foreground">{st.value}</p>
          </div>
        ))}
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-xs font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{notificationMsg}</span>
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-emerald-700 dark:text-emerald-300 hover:underline font-bold ml-4"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Admin Workspace: Sidebar + Content Panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Sleek Admin Left Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 rounded-2xl border border-border bg-card p-3 shadow-sm lg:sticky lg:top-6 space-y-1">
          <div className="px-3 py-2.5 mb-2 border-b border-border/60">
            <div className="flex items-center gap-2 text-xs font-extrabold tracking-wider text-muted-foreground uppercase">
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span>Admin Sections</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navSections.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? "bg-navy text-white shadow-sm dark:bg-gold dark:text-navy font-bold"
                      : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-gold dark:text-navy" : "text-muted-foreground"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono shrink-0 ${
                        isActive
                          ? "bg-white/20 text-white dark:bg-navy/20 dark:text-navy"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 w-full min-w-0">
          {/* ========================================================= */}
          {/* 1. MANAGE TEACHERS SECTION */}
          {/* ========================================================= */}
          {activeTab === "teachers" && (
            <div className="space-y-6">
              {/* Header & Sub-tabs */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Manage Teachers</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Oversee verified master tutors, slot allotments, and student class scheduling.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportToCSV(
                          "Aevian_Teacher_Allotments.csv",
                          ["Booking ID", "Student", "Parent Email", "Course", "Scheduled At", "Status", "Allotted Teacher"],
                          bookings.map((b) => [
                            b.id,
                            b.studentName,
                            b.parentEmail,
                            b.courseName,
                            b.scheduledAt,
                            b.status,
                            b.assignedTeacher || "Unassigned",
                          ])
                        )
                      }
                      className="text-xs flex items-center gap-1.5"
                    >
                      <FileSpreadsheet size={13} /> Export Allotments CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportToCSV(
                          "Aevian_Teachers_Directory.csv",
                          ["Name", "Email", "Experience (Years)", "Hourly Rate ($)", "Subjects"],
                          teacherProfiles.map((t) => [
                            t.name,
                            t.email,
                            t.yearsExperience,
                            t.hourlyRate,
                            t.subjects.join("; "),
                          ])
                        )
                      }
                      className="text-xs flex items-center gap-1.5"
                    >
                      <Download size={13} /> Export Teachers CSV
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <button
                    onClick={() => setTeacherSubTab("allotments")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      teacherSubTab === "allotments"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Teacher Slot Allotments
                  </button>
                  <button
                    onClick={() => setTeacherSubTab("directory")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      teacherSubTab === "directory"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Faculty Roster & Profiles
                  </button>
                </div>
              </div>

              {/* Sub-tab A: Teacher Allotments */}
              {teacherSubTab === "allotments" && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {bookings.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                        <UserCheck className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-bold text-foreground">No pending booking allotments found.</p>
                        <p className="text-xs text-muted-foreground mt-1">Student trial and regular class requests will appear here.</p>
                      </div>
                    ) : (
                      bookings.map((b) => (
                        <div
                          key={b.id}
                          className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-wrap items-center justify-between gap-4"
                        >
                          <div className="space-y-1 max-w-xl">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-foreground">{b.studentName}</span>
                              <span className="text-xs text-muted-foreground">({b.parentEmail})</span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  b.type === "TRIAL"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                }`}
                              >
                                {b.type === "TRIAL" ? "Free Demo Trial" : "Regular Class"}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-gold">{b.courseName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                              <Clock className="h-3 w-3 text-gold" /> {b.scheduledAt} ({b.durationMinutes} Mins)
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            {b.status === "CONFIRMED" ? (
                              <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Allotted: {b.assignedTeacher}
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) handleAllotTeacher(b.id, e.target.value);
                                  }}
                                  defaultValue=""
                                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground font-semibold focus:border-gold focus:outline-none"
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
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Sub-tab B: Faculty Directory */}
              {teacherSubTab === "directory" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {teacherProfiles.length === 0 && users.filter((u) => u.role === "TEACHER").length === 0 ? (
                    <div className="sm:col-span-2 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                      <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-bold text-foreground">No faculty profiles found.</p>
                    </div>
                  ) : (
                    (teacherProfiles.length > 0 ? teacherProfiles : users.filter((u) => u.role === "TEACHER").map((u) => ({
                      id: u.id,
                      userId: u.id,
                      name: u.name,
                      email: u.email,
                      bio: "Experienced subject instructor.",
                      subjects: ["General Curriculum"],
                      yearsExperience: 5,
                      hourlyRate: 50,
                      courseCount: 1,
                      availabilitySlots: 4,
                    }))).map((t) => (
                      <div key={t.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-bold text-gold text-sm">
                              {t.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-foreground">{t.name}</h3>
                              <p className="text-[11px] text-muted-foreground">{t.email}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold">
                            Active Faculty
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2">{t.bio}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                          <span className="text-muted-foreground">Rate: <strong>${t.hourlyRate}/hr</strong> • {t.yearsExperience} yrs exp</span>
                          <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">
                            {t.subjects[0] || "Tutor"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. MANAGE PARENTS SECTION */}
          {/* ========================================================= */}
          {activeTab === "parents" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Manage Parents</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Parent details roster with enrolled student children and active enquiries desk.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      exportToCSV(
                        "Aevian_Parents_With_Children.csv",
                        ["Parent Name", "Parent Email", "Phone", "Country", "Enrolled Children", "Enrolled Courses", "Joined Date"],
                        parents.map((p) => [
                          p.name,
                          p.email,
                          p.phone || "N/A",
                          p.country || "Global",
                          p.children.map((c) => c.name).join("; ") || "None",
                          p.children.flatMap((c) => c.courses).join("; ") || "None",
                          p.createdAt,
                        ])
                      )
                    }
                    className="text-xs flex items-center gap-1.5"
                  >
                    <FileSpreadsheet size={13} /> Export Parents & Children Sheet
                  </Button>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <button
                    onClick={() => setParentsSubTab("sheet")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      parentsSubTab === "sheet"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Parents & Enrolled Children Sheet
                  </button>
                  <button
                    onClick={() => setParentsSubTab("enquiries")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      parentsSubTab === "enquiries"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Parent Enquiries & Communications
                  </button>
                </div>
              </div>

              {/* Sub-tab A: Parents & Children Sheet */}
              {parentsSubTab === "sheet" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      placeholder="Search parent name, email, or student child..."
                      value={parentSearch}
                      onChange={(e) => setParentSearch(e.target.value)}
                      className="w-full max-w-sm rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                    />
                    <span className="text-xs font-semibold text-muted-foreground">
                      Total Parents: {filteredParents.length}
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-muted text-foreground uppercase tracking-wider font-bold border-b border-border">
                          <tr>
                            <th className="p-3.5">Parent Name & Contact</th>
                            <th className="p-3.5">Respective Child (Enrolled Student)</th>
                            <th className="p-3.5">Child Enrolled Programs</th>
                            <th className="p-3.5">Joined Date</th>
                            <th className="p-3.5 text-right">Direct Contact</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {filteredParents.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-muted-foreground font-medium">
                                No parent accounts found.
                              </td>
                            </tr>
                          ) : (
                            filteredParents.map((p) => (
                              <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                                <td className="p-3.5 space-y-0.5">
                                  <div className="font-bold text-foreground">{p.name}</div>
                                  <div className="text-muted-foreground text-[11px] flex items-center gap-1">
                                    <Mail size={11} className="text-gold" /> {p.email}
                                  </div>
                                </td>
                                <td className="p-3.5">
                                  {p.children.length === 0 ? (
                                    <span className="text-muted-foreground italic text-[11px]">No child registered yet</span>
                                  ) : (
                                    <div className="space-y-1">
                                      {p.children.map((c) => (
                                        <div key={c.id} className="flex items-center gap-1.5 font-bold text-foreground">
                                          <User size={12} className="text-gold shrink-0" />
                                          <span>{c.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </td>
                                <td className="p-3.5">
                                  {p.children.flatMap((c) => c.courses).length === 0 ? (
                                    <span className="text-muted-foreground text-[11px]">None</span>
                                  ) : (
                                    <div className="flex flex-wrap gap-1">
                                      {p.children.flatMap((c) => c.courses).map((course, idx) => (
                                        <span
                                          key={idx}
                                          className="bg-gold/10 text-gold text-[10px] font-semibold px-2 py-0.5 rounded border border-gold/20"
                                        >
                                          {course}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </td>
                                <td className="p-3.5 text-muted-foreground font-mono text-[11px]">
                                  {p.createdAt.slice(0, 10)}
                                </td>
                                <td className="p-3.5 text-right space-x-1.5">
                                  <a
                                    href={`mailto:${p.email}`}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
                                  >
                                    <Mail size={12} /> Email
                                  </a>
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

              {/* Sub-tab B: Parent Enquiries Desk */}
              {parentsSubTab === "enquiries" && (
                <div className="space-y-4">
                  {tickets.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                      <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-bold text-foreground">No active parent inquiries or tickets found.</p>
                    </div>
                  ) : (
                    tickets.map((t) => (
                      <div key={t.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded-full">
                              Parent Enquiry #{t.id.slice(-6)}
                            </span>
                            <h3 className="text-sm font-bold text-foreground mt-1">{t.subject}</h3>
                            <p className="text-xs text-muted-foreground">
                              From: <strong className="text-foreground">{t.userName}</strong> ({t.userEmail})
                            </p>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground">{t.createdAt.slice(0, 10)}</span>
                        </div>

                        <p className="text-xs text-foreground/80 bg-muted/60 p-3 rounded-lg border border-border/50 font-medium">
                          &quot;{t.description}&quot;
                        </p>

                        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                          <Button
                            size="sm"
                            onClick={() => {
                              setActiveReplyTicket(t);
                              setReplyText("");
                            }}
                            className="bg-navy text-white dark:bg-gold dark:text-navy text-xs"
                          >
                            Reply to Enquiry
                          </Button>
                          <a
                            href={`mailto:${t.userEmail}?subject=Re: ${encodeURIComponent(t.subject)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted text-foreground"
                          >
                            <Mail size={12} /> Send Email
                          </a>
                          <a
                            href={`https://wa.me/?text=Hello ${encodeURIComponent(t.userName)}, this is Aevian Academy following up on your inquiry: ${encodeURIComponent(t.subject)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/10"
                          >
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. MANAGE STUDENTS SECTION */}
          {/* ========================================================= */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Manage Students</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Student roster, syllabus completion progress, and parent linkage oversight.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      exportToCSV(
                        "Aevian_Students_Roster.csv",
                        ["Student Name", "Email", "Grade Level", "English Level", "Parent Name", "Parent Email", "Enrolled Courses", "Joined"],
                        students.map((s) => [
                          s.name,
                          s.email,
                          s.gradeLevel,
                          s.englishLevel,
                          s.parentName || "Unassigned",
                          s.parentEmail || "Unassigned",
                          s.enrollments.map((e) => e.courseTitle).join("; ") || "None",
                          s.createdAt,
                        ])
                      )
                    }
                    className="text-xs flex items-center gap-1.5"
                  >
                    <FileSpreadsheet size={13} /> Export Students CSV
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <input
                    type="text"
                    placeholder="Search student name, email, or guardian..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full max-w-sm rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-gold focus:outline-none"
                  />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Enrolled Students: {filteredStudents.length}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted text-foreground uppercase tracking-wider font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Student</th>
                        <th className="p-3.5">Grade & Language Level</th>
                        <th className="p-3.5">Linked Parent</th>
                        <th className="p-3.5">Course Progress</th>
                        <th className="p-3.5">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground font-medium">
                            No student profiles found.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                            <td className="p-3.5 space-y-0.5">
                              <div className="font-bold text-foreground">{s.name}</div>
                              <div className="text-muted-foreground text-[11px]">{s.email}</div>
                            </td>
                            <td className="p-3.5">
                              <div className="font-semibold text-foreground">{s.gradeLevel}</div>
                              <span className="text-[10px] text-muted-foreground font-mono">{s.englishLevel}</span>
                            </td>
                            <td className="p-3.5">
                              {s.parentName ? (
                                <div className="space-y-0.5">
                                  <div className="font-semibold text-foreground">{s.parentName}</div>
                                  <div className="text-[11px] text-muted-foreground">{s.parentEmail}</div>
                                </div>
                              ) : (
                                <span className="text-muted-foreground italic text-[11px]">Direct registration</span>
                              )}
                            </td>
                            <td className="p-3.5">
                              {s.enrollments.length === 0 ? (
                                <span className="text-muted-foreground text-[11px]">No active course</span>
                              ) : (
                                <div className="space-y-1">
                                  {s.enrollments.map((en, idx) => (
                                    <div key={idx} className="space-y-0.5">
                                      <div className="text-[11px] font-semibold text-foreground truncate max-w-[180px]">
                                        {en.courseTitle}
                                      </div>
                                      <div className="w-24 bg-muted rounded-full h-1.5 overflow-hidden">
                                        <div
                                          className="bg-gold h-1.5 rounded-full"
                                          style={{ width: `${en.progressPercent}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="p-3.5 text-muted-foreground font-mono text-[11px]">
                              {s.createdAt.slice(0, 10)}
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

          {/* ========================================================= */}
          {/* 4. LEADS SECTION (formerly CRM & Leads) */}
          {/* ========================================================= */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Leads</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Website account signups are tracked as Leads. When signed up to any non-trial subscription, they become Clients.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        exportToCSV(
                          "Aevian_Leads_Report.csv",
                          ["Name", "Email", "Phone", "Source", "Classification (Lead/Client)", "Status", "Date"],
                          combinedLeads.map((l) => [
                            l.name,
                            l.email,
                            l.phone || "",
                            l.source,
                            l.isClient ? "Client" : "Lead",
                            l.status,
                            l.createdAt || "",
                          ])
                        )
                      }
                      className="text-xs flex items-center gap-1.5"
                    >
                      <FileSpreadsheet size={13} /> Export Leads CSV
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowAddLeadModal(true)}
                      className="bg-navy text-white dark:bg-gold dark:text-navy text-xs flex items-center gap-1.5"
                    >
                      <Plus size={13} /> Add Lead
                    </Button>
                  </div>
                </div>

                {/* Lead vs Client Metric Ribbon */}
                <div className="grid gap-3 sm:grid-cols-3 pt-2 border-t border-border/50">
                  <div className="rounded-xl bg-muted/60 p-3.5 border border-border/50">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">Total Pipeline Inquiries</p>
                    <p className="text-xl font-extrabold text-foreground mt-0.5">{combinedLeads.length}</p>
                  </div>
                  <div className="rounded-xl bg-purple-500/10 p-3.5 border border-purple-500/20">
                    <p className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase">Prospective Leads</p>
                    <p className="text-xl font-extrabold text-purple-700 dark:text-purple-300 mt-0.5">{totalLeadsOnlyCount}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-3.5 border border-emerald-500/20">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Converted Clients (Subscribed)</p>
                    <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">{totalClientsCount}</p>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLeadsFilter("ALL")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      leadsFilter === "ALL"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All ({combinedLeads.length})
                  </button>
                  <button
                    onClick={() => setLeadsFilter("LEADS")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      leadsFilter === "LEADS"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Prospective Leads ({totalLeadsOnlyCount})
                  </button>
                  <button
                    onClick={() => setLeadsFilter("CLIENTS")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      leadsFilter === "CLIENTS"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Active Clients ({totalClientsCount})
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted text-foreground uppercase tracking-wider font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Name</th>
                        <th className="p-3.5">Contact</th>
                        <th className="p-3.5">Source</th>
                        <th className="p-3.5">Classification</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredCombinedLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground font-medium">
                            No records found matching criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredCombinedLeads.map((l) => (
                          <tr key={l.id} className="hover:bg-muted/40 transition-colors">
                            <td className="p-3.5 font-bold text-foreground">{l.name}</td>
                            <td className="p-3.5 space-y-0.5">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Mail size={12} className="text-gold" /> {l.email}
                              </div>
                              {l.phone && (
                                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                                  <Phone size={11} /> {l.phone}
                                </div>
                              )}
                            </td>
                            <td className="p-3.5">
                              <span className="bg-muted text-foreground text-[10px] font-semibold px-2 py-0.5 rounded">
                                {l.source}
                              </span>
                            </td>
                            <td className="p-3.5">
                              {l.isClient ? (
                                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                                  <CheckCircle size={11} /> Client (Subscribed)
                                </span>
                              ) : (
                                <span className="bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                                  <Zap size={11} /> Lead (Prospective)
                                </span>
                              )}
                            </td>
                            <td className="p-3.5">
                              <select
                                value={l.status}
                                onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value)}
                                className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold text-foreground focus:border-gold focus:outline-none"
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="QUALIFIED">QUALIFIED</option>
                                <option value="CLIENT">CLIENT</option>
                                <option value="CONVERTED">CONVERTED</option>
                                <option value="LOST">LOST</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateLeadStatus(l.id, "CONVERTED")}
                                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
                              >
                                Convert to Client
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

          {/* ========================================================= */}
          {/* 5. REVENUE SECTION (Discount section removed) */}
          {/* ========================================================= */}
          {activeTab === "revenue" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Revenue Analytics</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Total platform income calculated across all services, plus active subscription ledger.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      exportToCSV(
                        "Aevian_Subscribers_Revenue_Sheet.csv",
                        ["Subscriber Name", "Email", "Student Child", "Subscribed Package", "Monthly Fee ($)", "Subscribed Date", "Last Active Date", "Status"],
                        subscribers.map((s) => [
                          s.subscriberName,
                          s.subscriberEmail,
                          s.studentName,
                          s.packageName,
                          s.monthlyFee,
                          s.subscribedDate.slice(0, 10),
                          s.lastActiveDate.slice(0, 10),
                          s.status,
                        ])
                      )
                    }
                    className="text-xs flex items-center gap-1.5"
                  >
                    <FileSpreadsheet size={13} /> Export Active Subscribers CSV
                  </Button>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <button
                    onClick={() => setRevenueSubTab("overview")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      revenueSubTab === "overview"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Total Revenue Overview
                  </button>
                  <button
                    onClick={() => setRevenueSubTab("subscribers")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      revenueSubTab === "subscribers"
                        ? "bg-navy text-white dark:bg-gold dark:text-navy"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Active Subscribers ({subscribers.length})
                  </button>
                </div>
              </div>

              {/* Sub-tab A: Total Revenue Overview */}
              {revenueSubTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase">Total Calculated Revenue</span>
                      <p className="text-3xl font-extrabold text-foreground">${totalCalculatedRevenue.toLocaleString()}</p>
                      <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp size={12} /> Live stream from all website services
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase">Curriculum Subscription MRR</span>
                      <p className="text-3xl font-extrabold text-foreground">${calculatedSubsRevenue.toLocaleString()}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">From {subscribers.length} enrolled student packages</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase">1-on-1 Tutoring Bookings</span>
                      <p className="text-3xl font-extrabold text-foreground">${calculatedTutoringRevenue.toLocaleString()}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">From regular private tuition sessions</p>
                    </div>
                  </div>

                  {/* Income Streams Breakdown */}
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-foreground">Services Revenue Breakdown</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>Monthly Curriculum Subscriptions</span>
                          <span>${calculatedSubsRevenue.toLocaleString()} ({Math.round((calculatedSubsRevenue / (totalCalculatedRevenue || 1)) * 100)}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gold h-2 rounded-full"
                            style={{ width: `${Math.round((calculatedSubsRevenue / (totalCalculatedRevenue || 1)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>Live 1-on-1 Tutoring Sessions</span>
                          <span>${calculatedTutoringRevenue.toLocaleString()} ({Math.round((calculatedTutoringRevenue / (totalCalculatedRevenue || 1)) * 100)}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-navy dark:bg-slate-300 h-2 rounded-full"
                            style={{ width: `${Math.round((calculatedTutoringRevenue / (totalCalculatedRevenue || 1)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab B: Active Subscribers */}
              {revenueSubTab === "subscribers" && (
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted text-foreground uppercase tracking-wider font-bold border-b border-border">
                        <tr>
                          <th className="p-3.5">Subscriber</th>
                          <th className="p-3.5">Student Child</th>
                          <th className="p-3.5">Subscribed Package</th>
                          <th className="p-3.5">Subscribed Date</th>
                          <th className="p-3.5">Current Active Date</th>
                          <th className="p-3.5">Monthly Fee</th>
                          <th className="p-3.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {subscribers.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-muted-foreground font-medium">
                              No active subscribers currently recorded.
                            </td>
                          </tr>
                        ) : (
                          subscribers.map((s) => (
                            <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                              <td className="p-3.5 space-y-0.5">
                                <div className="font-bold text-foreground">{s.subscriberName}</div>
                                <div className="text-[11px] text-muted-foreground">{s.subscriberEmail}</div>
                              </td>
                              <td className="p-3.5 font-semibold text-foreground">{s.studentName}</td>
                              <td className="p-3.5">
                                <span className="bg-gold/10 text-gold text-[10px] font-bold px-2 py-0.5 rounded border border-gold/20">
                                  {s.packageName}
                                </span>
                              </td>
                              <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                                {s.subscribedDate.slice(0, 10)}
                              </td>
                              <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                                {s.lastActiveDate.slice(0, 10)}
                              </td>
                              <td className="p-3.5 font-bold text-foreground">
                                ${s.monthlyFee}/mo
                              </td>
                              <td className="p-3.5">
                                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                  {s.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. SUPPORT & TICKETS SECTION */}
          {/* ========================================================= */}
          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Support & Tickets</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tickets created from the Contact Us page and member dashboards appear here in real time.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={ticketStatusFilter}
                      onChange={(e) => setTicketStatusFilter(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground font-semibold focus:border-gold focus:outline-none"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredTickets.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
                    <Ticket className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-bold text-foreground">No support tickets found.</p>
                    <p className="text-xs text-muted-foreground mt-1">Inquiries submitted via Contact Us will surface here.</p>
                  </div>
                ) : (
                  filteredTickets.map((t) => (
                    <div key={t.id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                              t.status === "OPEN"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : t.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}
                          >
                            {t.status}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground font-semibold">
                            #{t.id.slice(-6)}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">{t.createdAt.slice(0, 10)}</span>
                      </div>

                      <h3 className="text-sm font-bold text-foreground">{t.subject}</h3>
                      <p className="text-xs text-muted-foreground">
                        User: <strong className="text-foreground">{t.userName}</strong> ({t.userEmail})
                      </p>

                      <div className="text-xs text-foreground/90 bg-muted/50 p-3.5 rounded-lg border border-border/50 whitespace-pre-wrap font-medium">
                        {t.description}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/50 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setActiveReplyTicket(t);
                              setReplyText("");
                            }}
                            className="bg-navy text-white dark:bg-gold dark:text-navy text-xs"
                          >
                            Reply to Ticket
                          </Button>
                          <a
                            href={`mailto:${t.userEmail}?subject=Re: Ticket ${t.id.slice(-6)} - ${encodeURIComponent(t.subject)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted text-foreground"
                          >
                            <Mail size={12} /> Email User
                          </a>
                        </div>

                        <select
                          value={t.status}
                          onChange={(e) => handleTicketStatusChange(t.id, e.target.value)}
                          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground focus:border-gold focus:outline-none"
                        >
                          <option value="OPEN">Mark OPEN</option>
                          <option value="IN_PROGRESS">Mark IN PROGRESS</option>
                          <option value="RESOLVED">Mark RESOLVED</option>
                          <option value="CLOSED">Mark CLOSED</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. USER DIRECTORY & STRICT ROLE CONTROL */}
          {/* ========================================================= */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Global User Directory</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Teacher and Admin roles are locked. Role switching is restricted between PARENT and STUDENT to correct signup selection mistakes.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground font-semibold focus:border-gold focus:outline-none"
                    >
                      <option value="ALL">All Roles</option>
                      <option value="STUDENT">Student</option>
                      <option value="PARENT">Parent</option>
                      <option value="TEACHER">Teacher</option>
                      <option value="ADMIN">Admin</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Search name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted text-foreground uppercase tracking-wider font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Name</th>
                        <th className="p-3.5">Email</th>
                        <th className="p-3.5">Current Role</th>
                        <th className="p-3.5">Joined Date</th>
                        <th className="p-3.5 text-right">Role Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                          <td className="p-3.5 font-bold text-foreground">{u.name}</td>
                          <td className="p-3.5 text-muted-foreground">{u.email}</td>
                          <td className="p-3.5">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                u.role === "ADMIN"
                                  ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                                  : u.role === "TEACHER"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                  : u.role === "PARENT"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3.5 text-muted-foreground font-mono text-[11px]">{u.createdAt.slice(0, 10)}</td>
                          <td className="p-3.5 text-right">
                            {/* STRICT ROLE CONTROL: Teacher & Admin are locked! Only Parent <-> Student allowed */}
                            {u.role === "ADMIN" || u.role === "TEACHER" ? (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                                <Lock size={11} className="text-gold" /> System Protected
                              </span>
                            ) : (
                              <select
                                value={u.role}
                                onChange={(e) => handleUserRoleChange(u.id, e.target.value)}
                                className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-bold text-foreground focus:border-gold focus:outline-none"
                              >
                                <option value="PARENT">PARENT</option>
                                <option value="STUDENT">STUDENT</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. CONTENT & MEDIA EDITOR */}
          {/* ========================================================= */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Content & Media Editor</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Control course catalog publication state and media asset library.
                  </p>
                </div>

                {/* Media Form */}
                <form onSubmit={handleAddMedia} className="grid gap-3 sm:grid-cols-3 text-xs pt-2">
                  <input
                    type="text"
                    placeholder="Filename (e.g. math-tutoring.jpg)"
                    value={newMediaForm.filename}
                    onChange={(e) => setNewMediaForm({ ...newMediaForm, filename: e.target.value })}
                    className="rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newMediaForm.url}
                    onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                    className="rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Alt Text"
                      value={newMediaForm.altText}
                      onChange={(e) => setNewMediaForm({ ...newMediaForm, altText: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                    />
                    <Button type="submit" size="sm" className="bg-navy text-white dark:bg-gold dark:text-navy">
                      Add Asset
                    </Button>
                  </div>
                </form>

                <div className="grid gap-3 sm:grid-cols-3 pt-2">
                  {mediaList.length === 0 ? (
                    <div className="sm:col-span-3 p-6 text-center text-xs text-muted-foreground bg-muted/40 rounded-xl border border-dashed border-border">
                      No media assets uploaded yet.
                    </div>
                  ) : (
                    mediaList.map((m) => (
                      <div key={m.id} className="rounded-lg border border-border overflow-hidden bg-card p-2.5 space-y-2">
                        <img src={m.url} alt={m.altText} className="h-28 w-full object-cover rounded-md" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground truncate max-w-[140px]">{m.filename}</span>
                          <button onClick={() => handleDeleteMedia(m.id)} className="text-red-500 font-bold hover:underline">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Course Catalog Published Toggle */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-foreground">Course Catalog Manager</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {courses.map((c) => (
                    <div key={c.id} className="rounded-xl border border-border bg-background p-4 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-gold/10 text-gold text-[10px] font-bold px-2 py-0.5 rounded">
                          {c.programArea}
                        </span>
                        <button
                          onClick={() => handleToggleCourse(c.id)}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            c.published
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {c.published ? "Published" : "Draft"}
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-foreground">{c.title}</h4>
                      <p className="text-[11px] text-muted-foreground">{c.durationWeeks} Weeks • {c.difficulty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD LEAD */}
      {/* ========================================================= */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-card border border-border p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Add New Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Vance"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="robert@example.com"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Phone (Optional)</label>
                <input
                  type="text"
                  placeholder="+44 7911 123456"
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-foreground block mb-1">Notes</label>
                <textarea
                  rows={3}
                  placeholder="Inquiry interests, syllabus, or grade level..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddLeadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-navy text-white dark:bg-gold dark:text-navy">
                  Save Lead
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: REPLY TO TICKET */}
      {/* ========================================================= */}
      {activeReplyTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl bg-card border border-border p-6 w-full max-w-lg shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Reply to Ticket #{activeReplyTicket.id.slice(-6)}</h3>
                <p className="text-xs text-muted-foreground">{activeReplyTicket.subject}</p>
              </div>
              <button onClick={() => setActiveReplyTicket(null)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-foreground/80 bg-muted/50 p-3 rounded-lg border border-border/50 max-h-36 overflow-y-auto whitespace-pre-wrap">
              <strong>User Message:</strong> {activeReplyTicket.description}
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-foreground block">Admin Response</label>
              <textarea
                rows={4}
                required
                placeholder="Type your official reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-lg border border-border bg-background p-2.5 text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setActiveReplyTicket(null)}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSendTicketReply}
                disabled={!replyText.trim() || isPending}
                className="bg-navy text-white dark:bg-gold dark:text-navy"
              >
                Send & Mark In Progress
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
