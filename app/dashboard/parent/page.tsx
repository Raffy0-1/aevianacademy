import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ParentDashboardClient } from "@/components/dashboard/parent-dashboard-client";

export default async function ParentDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "PARENT") redirect("/dashboard");

  const parentProfile = user.parentProfile;
  if (!parentProfile) {
    return (
      <div className="p-16 text-center space-y-4">
        <h1 className="font-display text-3xl text-foreground">Profile Incomplete</h1>
        <p className="text-muted-foreground">
          Your parent profile has not been fully set up yet. Please contact support to complete your registration.
        </p>
      </div>
    );
  }

  // Fetch children and their data (Data ownership: strictly parentId = parentProfile.id)
  let children: any[] = [];
  let invoices: any[] = [];
  try {
    [children, invoices] = await Promise.all([
      prisma.studentProfile.findMany({
        where: { parentId: parentProfile.id },
        include: {
          user: true,
          enrollments: {
            include: { course: true },
          },
          bookings: {
            include: {
              teacher: { include: { user: true } },
              course: true,
            },
            orderBy: { scheduledAt: "desc" },
          },
        },
      }),
      prisma.invoice.findMany({
        where: { userId: user.id },
        orderBy: { issuedAt: "desc" },
      }),
    ]);
  } catch (e) {
    console.warn("Failed to fetch parent dashboard data:", e);
  }

  // Map database dates to ISO strings for client compatibility
  const mappedChildren = children.map((child) => ({
    id: child.id,
    user: {
      name: child.user?.name || "Student",
      email: child.user?.email || "",
    },
    gradeLevel: child.gradeLevel ? String(child.gradeLevel) : null,
    englishLevel: child.englishLevel ? child.englishLevel.replace(/_/g, " ") : "STANDARD",
    enrollments: (child.enrollments || []).map((e: any) => ({
      id: e.id,
      progressPercent: e.progressPercent || 0,
      status: e.status || "ACTIVE",
      course: { title: e.course?.title || "Course" },
    })),
    bookings: (child.bookings || []).map((b: any) => ({
      id: b.id,
      scheduledAt: b.scheduledAt ? b.scheduledAt.toISOString() : new Date().toISOString(),
      status: b.status,
      type: b.type,
      durationMinutes: b.durationMinutes,
      teacherNotes: b.teacherNotes || "",
      teacher: {
        user: { name: b.teacher?.user?.name || "Teacher" },
      },
      course: b.course ? { title: b.course.title } : null,
    })),
  }));

  const mappedInvoices = invoices.map((inv) => ({
    id: inv.id,
    amountCents: inv.amountCents,
    currency: inv.currency,
    status: inv.status,
    issuedAt: inv.issuedAt.toISOString(),
    pdfUrl: inv.pdfUrl || null,
  }));

  const mappedParent = {
    id: user.id,
    name: user.name,
    email: user.email,
    parentProfile: {
      id: parentProfile.id,
      phone: parentProfile.phone,
      country: parentProfile.country,
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, {user.name ? user.name.split(" ")[0] : "Parent"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Parent Dashboard — manage learning paths and track schedule updates.
        </p>
      </div>

      <ParentDashboardClient parentUser={mappedParent} childrenList={mappedChildren} initialInvoices={mappedInvoices} />
    </div>
  );
}

