"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BookingType, BookingStatus, Role } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const createBookingSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  teacherId: z.string().min(1, "Teacher is required"),
  courseId: z.string().optional(),
  type: z.nativeEnum(BookingType),
  scheduledAt: z.union([z.string(), z.date()]).transform((s) => new Date(s)),
  durationMinutes: z.number().int().min(15).max(120).default(30),
});

const updateBookingStatusSchema = z.object({
  bookingId: z.string().min(1),
  status: z.nativeEnum(BookingStatus),
  teacherNotes: z.string().optional(),
});

export type BookingActionResult = {
  error?: string;
  success?: boolean;
  bookingId?: string;
};

/**
 * Create a new booking (trial or regular).
 */
export async function createBooking(
  data: z.infer<typeof createBookingSchema>
): Promise<BookingActionResult> {
  const parsed = createBookingSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    const user = await requireAuth();
    if (user.role === Role.STUDENT && user.studentProfile?.id !== parsed.data.studentId) {
      return { error: "Forbidden: Cannot create booking for another student." };
    }

    const booking = await prisma.booking.create({
      data: {
        studentId: parsed.data.studentId,
        teacherId: parsed.data.teacherId,
        courseId: parsed.data.courseId || null,
        type: parsed.data.type,
        scheduledAt: parsed.data.scheduledAt,
        durationMinutes: parsed.data.durationMinutes,
        status: BookingStatus.PENDING,
      },
    });

    return { success: true, bookingId: booking.id };
  } catch (e: any) {
    console.error("Failed to create booking:", e);
    return { error: e?.message || "Failed to create booking." };
  }
}

/**
 * Update the status of an existing booking.
 */
export async function updateBookingStatus(
  data: z.infer<typeof updateBookingStatusSchema>
): Promise<BookingActionResult> {
  const parsed = updateBookingStatusSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await requireAuth([Role.TEACHER, Role.ADMIN]);

    await prisma.booking.update({
      where: { id: parsed.data.bookingId },
      data: {
        status: parsed.data.status,
        teacherNotes: parsed.data.teacherNotes,
      },
    });

    return { success: true };
  } catch (e: any) {
    console.error("Failed to update booking:", e);
    return { error: e?.message || "Failed to update booking." };
  }
}

/**
 * Get bookings for a student, teacher, or all (admin).
 */
export async function getBookings(filters?: {
  studentId?: string;
  teacherId?: string;
  status?: BookingStatus;
}) {
  const user = await requireAuth();
  if (user.role === Role.STUDENT && filters?.studentId && user.studentProfile?.id !== filters.studentId) {
    throw new Error("Forbidden: Cannot view bookings of another student.");
  }
  if (user.role === Role.TEACHER && filters?.teacherId && user.teacherProfile?.id !== filters.teacherId) {
    throw new Error("Forbidden: Cannot view bookings of another teacher.");
  }

  return prisma.booking.findMany({
    where: {
      ...(filters?.studentId ? { studentId: filters.studentId } : {}),
      ...(filters?.teacherId ? { teacherId: filters.teacherId } : {}),
      ...(filters?.status ? { status: filters.status } : {}),
    },
    include: {
      student: { include: { user: true } },
      teacher: { include: { user: true } },
      course: true,
    },
    orderBy: { scheduledAt: "desc" },
  });
}
