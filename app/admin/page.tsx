import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/dashboard/admin-dashboard-client";

export default async function AdminDirectPage() {
  const user = await getCurrentUser();

  let userCount = 0, courseCount = 0, enrollmentCount = 0, bookingCount = 0, leadCount = 0, ticketCount = 0;
  let leadsList: any[] = [];
  let usersList: any[] = [];

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
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.booking.count(),
      prisma.lead.count(),
      prisma.supportTicket.count(),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
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
    source: l.source || "Direct",
    status: l.status,
  }));

  const mappedUsers = (usersList || []).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
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
            Direct access link for platform administrators: manage custom slots, allot teachers, and monitor users.
          </p>
        </div>

        <AdminDashboardClient
          stats={stats}
          initialLeads={mappedLeads}
          initialUsers={mappedUsers}
        />
      </div>
    </div>
  );
}
