"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { EnrollmentStatus, Role } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const enrollStudentSchema = z.object({
  studentId: z.string().min(1),
  courseId: z.string().min(1),
});

const updateProgressSchema = z.object({
  enrollmentId: z.string().min(1),
  progressPercent: z.number().int().min(0).max(100),
});

export type EnrollmentActionResult = {
  error?: string;
  success?: boolean;
  enrollmentId?: string;
};

/**
 * Direct manual enrollment of a student (Admin only).
 * Paid enrollments are created via Safepay webhook integration.
 */
export async function enrollStudent(
  data: z.infer<typeof enrollStudentSchema>
): Promise<EnrollmentActionResult> {
  const parsed = enrollStudentSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await requireAuth([Role.ADMIN]);
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: parsed.data.studentId,
        courseId: parsed.data.courseId,
        status: EnrollmentStatus.ACTIVE,
      },
    });
    return { success: true, enrollmentId: enrollment.id };
  } catch (e: any) {
    console.error("Failed to enroll student:", e);
    return { error: e?.message || "Failed to enroll student." };
  }
}

/**
 * Get all enrollments for a student.
 */
export async function getEnrollmentsForStudent(studentId: string) {
  const user = await requireAuth();
  if (user.role === Role.STUDENT && user.studentProfile?.id !== studentId) {
    throw new Error("Forbidden: Access denied to other student enrollments.");
  }

  return prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          teacher: { include: { user: true } },
          modules: { include: { lessons: true }, orderBy: { order: "asc" } },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });
}

/**
 * Update enrollment progress.
 */
export async function updateProgress(
  data: z.infer<typeof updateProgressSchema>
): Promise<EnrollmentActionResult> {
  const parsed = updateProgressSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await requireAuth([Role.STUDENT, Role.TEACHER, Role.ADMIN]);

    const updateData: Record<string, unknown> = {
      progressPercent: parsed.data.progressPercent,
    };

    if (parsed.data.progressPercent === 100) {
      updateData.status = EnrollmentStatus.COMPLETED;
      updateData.completedAt = new Date();
    }

    await prisma.enrollment.update({
      where: { id: parsed.data.enrollmentId },
      data: updateData,
    });
    return { success: true };
  } catch (e: any) {
    console.error("Failed to update progress:", e);
    return { error: e?.message || "Failed to update progress." };
  }
}

/**
 * Get all enrollments for a course (teacher/admin view).
 */
export async function getEnrollmentsForCourse(courseId: string) {
  await requireAuth([Role.TEACHER, Role.ADMIN]);

  return prisma.enrollment.findMany({
    where: { courseId },
    include: {
      student: { include: { user: true } },
    },
    orderBy: { startedAt: "desc" },
  });
}
