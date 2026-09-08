import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { StudentDashboardClient } from "@/components/dashboard/student-dashboard-client";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "STUDENT") redirect("/dashboard");

  const studentProfile = user.studentProfile;
  if (!studentProfile) {
    return (
      <div className="p-16 text-center space-y-4">
        <h1 className="font-display text-3xl text-foreground">Profile Incomplete</h1>
        <p className="text-muted-foreground">
          Your student profile has not been fully set up yet. Please contact support to complete your registration.
        </p>
      </div>
    );
  }

  // Query student data: enrollments, bookings, and homework submissions
  let enrollments: any[] = [];
  let bookings: any[] = [];
  let homeworkSubmissions: any[] = [];

  try {
    [enrollments, bookings, homeworkSubmissions] = await Promise.all([
      prisma.enrollment.findMany({
        where: { studentId: studentProfile.id },
        include: {
          course: {
            include: {
              modules: {
                include: { lessons: true },
                orderBy: { order: "asc" },
              },
            },
          },
        },
        orderBy: { startedAt: "desc" },
      }),
      prisma.booking.findMany({
        where: { studentId: studentProfile.id },
        include: {
          teacher: { include: { user: true } },
          course: true,
        },
        orderBy: { scheduledAt: "asc" },
      }),
      prisma.homeworkSubmission.findMany({
        where: { studentId: studentProfile.id },
        include: {
          homework: true,
        },
        orderBy: { submittedAt: "desc" },
      }),
    ]);
  } catch (e) {
    console.warn("Failed to fetch student dashboard data:", e);
  }

  // Map database dates/relations for client compatibility
  const mappedEnrollments = (enrollments || []).map((e) => ({
    id: e.id,
    progressPercent: e.progressPercent || 0,
    status: e.status || "ACTIVE",
    course: {
      id: e.course?.id || "course-1",
      title: e.course?.title || "Course",
      description: e.course?.description || "",
      modules: (e.course?.modules || []).map((m: any) => ({
        id: m.id,
        title: m.title,
        order: m.order,
        lessons: (m.lessons || []).map((l: any) => ({
          id: l.id,
          title: l.title,
          order: l.order,
          videoUrl: l.videoUrl,
          durationMinutes: l.durationMinutes,
        })),
      })),
    },
  }));

  const mappedBookings = (bookings || []).map((b) => ({
    id: b.id,
    title: b.course?.title || "1-on-1 Personalized Session",
    type: b.type === "TRIAL" ? "1-on-1 Demo Class" : "Regular 1-on-1 Class",
    time: b.scheduledAt ? new Date(b.scheduledAt).toLocaleString() : "Scheduled",
    duration: `${b.durationMinutes || 40} Minutes`,
    teacherName: b.teacher?.user?.name || "Allotted Master Tutor",
    status: b.status,
    isDemo: b.type === "TRIAL",
  }));

  const mappedHomework = (homeworkSubmissions || []).map((h) => ({
    id: h.id,
    title: h.homework?.title || "Homework Submission",
    submittedAt: h.submittedAt ? new Date(h.submittedAt).toLocaleDateString() : "",
    grade: h.grade || "Pending Grade",
    feedback: h.feedback || "Tutor review in progress",
    text: h.text || "",
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, {user.name ? user.name.split(" ")[0] : "Student"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Student Dashboard — resume your lessons, complete quizzes, and track your 1-on-1 sessions.
        </p>
      </div>

      <StudentDashboardClient
        studentProfileId={studentProfile.id}
        initialEnrollments={mappedEnrollments}
        initialBookings={mappedBookings}
        initialHomework={mappedHomework}
      />
    </div>
  );
}
