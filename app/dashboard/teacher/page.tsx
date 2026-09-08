import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { TeacherDashboardClient } from "@/components/dashboard/teacher-dashboard-client";

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "TEACHER") redirect("/dashboard");

  const teacherProfile = user.teacherProfile;
  if (!teacherProfile) {
    return (
      <div className="p-16 text-center space-y-4">
        <h1 className="font-display text-3xl text-foreground">Profile Incomplete</h1>
        <p className="text-muted-foreground">
          Your teacher profile has not been fully set up yet. Please contact administration to complete your onboarding.
        </p>
      </div>
    );
  }

  let bookings: any[] = [];
  let availability: any[] = [];
  let homeworkSubmissions: any[] = [];

  try {
    [bookings, availability, homeworkSubmissions] = await Promise.all([
      prisma.booking.findMany({
        where: { teacherId: teacherProfile.id },
        include: {
          student: { include: { user: true } },
          course: true,
        },
        orderBy: { scheduledAt: "desc" },
      }),
      prisma.availability.findMany({
        where: { teacherId: teacherProfile.id },
        orderBy: { dayOfWeek: "asc" },
      }),
      prisma.homeworkSubmission.findMany({
        where: {
          homework: {
            lesson: {
              module: {
                course: {
                  teacherId: teacherProfile.id,
                },
              },
            },
          },
        },
        include: {
          student: { include: { user: true } },
          homework: { include: { lesson: { include: { module: { include: { course: true } } } } } },
        },
        orderBy: { submittedAt: "desc" },
      }),
    ]);
  } catch (e) {
    console.warn("Failed to fetch teacher dashboard data:", e);
  }

  // Map database dates/relations for client compatibility
  const mappedBookings = (bookings || []).map((b) => ({
    id: b.id,
    scheduledAt: b.scheduledAt ? b.scheduledAt.toISOString() : new Date().toISOString(),
    status: b.status,
    type: b.type,
    durationMinutes: b.durationMinutes,
    student: {
      id: b.student?.id || "student-1",
      user: {
        name: b.student?.user?.name || "Student",
        email: b.student?.user?.email || "",
      },
    },
    course: b.course ? { title: b.course.title } : null,
  }));

  const mappedAvailability = (availability || []).map((a) => ({
    id: a.id,
    dayOfWeek: a.dayOfWeek,
    startTime: a.startTime,
    endTime: a.endTime,
  }));

  const mappedSubmissions = (homeworkSubmissions || []).map((sub) => ({
    id: sub.id,
    studentName: sub.student?.user?.name || "Student",
    courseTitle: sub.homework?.lesson?.module?.course?.title || "Course",
    homeworkTitle: sub.homework?.title || "Assignment",
    submittedAt: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "",
    text: sub.text || "",
    fileUrl: sub.fileUrl || null,
    grade: sub.grade || "",
    feedback: sub.feedback || "",
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, {user.name ? user.name.split(" ")[0] : "Teacher"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Teacher Dashboard — manage assigned 1-on-1 sessions, grade student homework, and update slot availability.
        </p>
      </div>

      <TeacherDashboardClient
        teacherProfileId={teacherProfile.id}
        initialBookings={mappedBookings}
        initialAvailability={mappedAvailability}
        initialSubmissions={mappedSubmissions}
      />
    </div>
  );
}
