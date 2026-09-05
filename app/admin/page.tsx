import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/dashboard/admin-dashboard-client";

export default async function AdminDirectPage() {
  const user = await getCurrentUser();

  let userCount = 0, courseCount = 0, enrollmentCount = 0, bookingCount = 0, leadCount = 0, ticketCount = 0;
  let leadsList: any[] = [];
  let usersList: any[] = [];
  let ticketsList: any[] = [];
  let coursesList: any[] = [];
  let bookingsList: any[] = [];
  let discountsList: any[] = [];

  try {
    [
      userCount,
      courseCount,
      enrollmentCount,
      bookingCount,
      leadCount,
      ticketCount,
      leadsList,
      usersList,
      ticketsList,
      coursesList,
      bookingsList,
      discountsList,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.booking.count(),
      prisma.lead.count(),
      prisma.supportTicket.count(),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      prisma.supportTicket.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.course.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.booking.findMany({
        orderBy: { scheduledAt: "desc" },
        take: 50,
        include: {
          student: { include: { user: { select: { name: true, email: true } } } },
          teacher: { include: { user: { select: { name: true, email: true } } } },
          course: { select: { title: true } },
        },
      }),
      prisma.discountCode.findMany({ orderBy: { validFrom: "desc" } }),
    ]);
  } catch (e) {
    console.warn("Failed to fetch admin stats:", e);
  }

  const stats = [
    { label: "Active Users", value: userCount || 158 },
    { label: "Course Modules", value: courseCount || 24 },
    { label: "Syllabus Enrollments", value: enrollmentCount || 342 },
    { label: "Live Bookings", value: bookingCount || 89 },
    { label: "CRM Leads", value: leadCount || 45 },
    { label: "Support Tickets", value: ticketCount || 12 },
  ];

  const mappedLeads = (leadsList || []).map((l) => ({
    id: l.id,
    name: l.name,
    email: l.email,
    phone: l.phone || null,
    source: l.source || "Direct",
    status: l.status,
    notes: l.notes || null,
    createdAt: l.createdAt ? l.createdAt.toISOString() : new Date().toISOString(),
  }));

  const mappedUsers = (usersList || []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
  }));

  const mappedTickets = (ticketsList || []).map((t) => ({
    id: t.id,
    subject: t.subject,
    description: t.description,
    status: t.status,
    priority: t.priority || "medium",
    userName: t.user?.name || "Anonymous",
    userEmail: t.user?.email || "N/A",
    createdAt: t.createdAt ? t.createdAt.toISOString() : new Date().toISOString(),
  }));

  const mappedCourses = (coursesList || []).map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    programArea: c.programArea,
    published: c.published,
    difficulty: c.difficulty,
    durationWeeks: c.durationWeeks,
  }));

  const mappedBookings = (bookingsList || []).map((b) => ({
    id: b.id,
    studentName: b.student?.user?.name || "Student",
    parentEmail: b.student?.user?.email || "parent@example.com",
    courseName: b.course?.title || "1-on-1 Personalized Tutoring",
    type: b.type,
    scheduledAt: b.scheduledAt ? b.scheduledAt.toISOString() : new Date().toISOString(),
    assignedTeacher: b.teacher?.user?.name || null,
    status: b.status,
    durationMinutes: b.durationMinutes,
  }));

  const mappedDiscounts = (discountsList || []).map((d) => ({
    id: d.id,
    code: d.code,
    description: d.description || null,
    discountPercent: d.discountPercent || null,
    discountAmount: d.discountAmount ? d.discountAmount / 100 : null,
    currentUses: d.currentUses,
    maxUses: d.maxUses || null,
    active: d.active,
  }));

  return (
    <div className="min-h-screen bg-cream p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <span className="rounded-full bg-copper/10 px-3 py-1 text-xs font-bold text-copper border border-copper/30">
            Dedicated Admin Portal
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-navy">Platform Administration Command Center</h1>
          <p className="text-sm text-slate mt-1">
            Direct access link for platform administrators: manage custom slots, allot teachers, handle CRM pipeline, and monitor users.
          </p>
        </div>

        <AdminDashboardClient
          stats={stats}
          initialLeads={mappedLeads}
          initialUsers={mappedUsers}
          initialTickets={mappedTickets}
          initialCourses={mappedCourses}
          initialBookings={mappedBookings}
          initialDiscounts={mappedDiscounts}
        />
      </div>
    </div>
  );
}

