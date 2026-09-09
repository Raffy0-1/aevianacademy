import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboardWrapper } from "@/components/dashboard/admin-dashboard-wrapper";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  let userCount = 0, courseCount = 0, enrollmentCount = 0, bookingCount = 0, leadCount = 0, ticketCount = 0;
  let leadsList: any[] = [];
  let usersList: any[] = [];
  let ticketsList: any[] = [];
  let coursesList: any[] = [];
  let bookingsList: any[] = [];
  let discountsList: any[] = [];
  let mediaList: any[] = [];

  try { userCount = await prisma.user.count(); } catch (e) { console.warn("Failed to fetch userCount:", e); }
  try { courseCount = await prisma.course.count(); } catch (e) { console.warn("Failed to fetch courseCount:", e); }
  try { enrollmentCount = await prisma.enrollment.count(); } catch (e) { console.warn("Failed to fetch enrollmentCount:", e); }
  try { bookingCount = await prisma.booking.count(); } catch (e) { console.warn("Failed to fetch bookingCount:", e); }
  try { leadCount = await prisma.lead.count(); } catch (e) { console.warn("Failed to fetch leadCount:", e); }
  try { ticketCount = await prisma.supportTicket.count(); } catch (e) { console.warn("Failed to fetch ticketCount:", e); }

  try { leadsList = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }); } catch (e) { console.warn("Failed to fetch leads:", e); }
  try { usersList = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 50 }); } catch (e) { console.warn("Failed to fetch users:", e); }
  try {
    ticketsList = await prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true, email: true } } },
    });
  } catch (e) { console.warn("Failed to fetch tickets:", e); }

  try {
    coursesList = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        difficulty: true,
        durationWeeks: true,
        programArea: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) { console.warn("Failed to fetch courses:", e); }

  try {
    bookingsList = await prisma.booking.findMany({
      orderBy: { scheduledAt: "desc" },
      take: 50,
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        teacher: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { title: true } },
      },
    });
  } catch (e) { console.warn("Failed to fetch bookings:", e); }

  try { discountsList = await prisma.discountCode.findMany({ orderBy: { validFrom: "desc" } }); } catch (e) { console.warn("Failed to fetch discounts:", e); }
  try { mediaList = await prisma.media.findMany({ orderBy: { createdAt: "desc" } }); } catch (e) { console.warn("Failed to fetch media:", e); }

  const stats = [
    { label: "Active Users", value: userCount },
    { label: "Course Modules", value: courseCount },
    { label: "Syllabus Enrollments", value: enrollmentCount },
    { label: "Live Bookings", value: bookingCount },
    { label: "CRM Leads", value: leadCount },
    { label: "Support Tickets", value: ticketCount },
  ];

  const safeIsoString = (val: any) => {
    if (!val) return new Date().toISOString();
    if (typeof val === "string") return val;
    if (val instanceof Date) return val.toISOString();
    try { return new Date(val).toISOString(); } catch (e) { return new Date().toISOString(); }
  };

  const mappedLeads = (leadsList || []).map((l) => ({
    id: l.id || `lead-${Math.random()}`,
    name: l.name || "Lead Name",
    email: l.email || "N/A",
    phone: l.phone || null,
    source: l.source || "Direct",
    status: l.status || "NEW",
    notes: l.notes || null,
    createdAt: safeIsoString(l.createdAt),
  }));

  const mappedUsers = (usersList || []).map((u) => ({
    id: u.id || `user-${Math.random()}`,
    name: u.name || "User",
    email: u.email || "N/A",
    role: u.role || "STUDENT",
    createdAt: safeIsoString(u.createdAt),
  }));

  const mappedTickets = (ticketsList || []).map((t) => ({
    id: t.id || `ticket-${Math.random()}`,
    subject: t.subject || "Support Inquiry",
    description: t.description || "",
    status: t.status || "OPEN",
    priority: t.priority || "medium",
    userName: t.user?.name || "Anonymous",
    userEmail: t.user?.email || "N/A",
    createdAt: safeIsoString(t.createdAt),
  }));

  const mappedCourses = (coursesList || []).map((c) => ({
    id: c.id || `course-${Math.random()}`,
    title: c.title || "Course Program",
    slug: c.slug || "course-program",
    programArea: c.programArea || "School Assessment",
    published: Boolean(c.published),
    difficulty: c.difficulty || "BEGINNER",
    durationWeeks: c.durationWeeks || 8,
  }));

  const mappedBookings = (bookingsList || []).map((b) => ({
    id: b.id || `booking-${Math.random()}`,
    studentName: b.student?.user?.name || "Student",
    parentEmail: b.student?.user?.email || "parent@example.com",
    courseName: b.course?.title || "1-on-1 Personalized Tutoring",
    type: b.type || "REGULAR",
    scheduledAt: safeIsoString(b.scheduledAt),
    assignedTeacher: b.teacher?.user?.name || null,
    status: b.status || "PENDING",
    durationMinutes: b.durationMinutes || 40,
  }));

  const mappedDiscounts = (discountsList || []).map((d) => ({
    id: d.id || `discount-${Math.random()}`,
    code: d.code || "PROMO",
    description: d.description || null,
    discountPercent: d.discountPercent || null,
    discountAmount: d.discountAmount ? d.discountAmount / 100 : null,
    currentUses: d.currentUses || 0,
    maxUses: d.maxUses || null,
    active: Boolean(d.active),
  }));

  const mappedMedia = (mediaList || []).map((m) => ({
    id: m.id,
    filename: m.filename,
    url: m.url,
    altText: m.altText || "Website Image Asset",
    mimeType: m.mimeType || "image/jpeg",
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Platform Administration
        </h1>
        <p className="mt-1 text-muted-foreground">
          Monitor growth trends, allot master tutors, manage CRM lead pipeline, and resolve support tickets.
        </p>
      </div>

      <AdminDashboardWrapper
        stats={stats}
        initialLeads={mappedLeads}
        initialUsers={mappedUsers}
        initialTickets={mappedTickets}
        initialCourses={mappedCourses}
        initialBookings={mappedBookings}
        initialDiscounts={mappedDiscounts}
        initialMedia={mappedMedia}
      />
    </div>
  );
}

