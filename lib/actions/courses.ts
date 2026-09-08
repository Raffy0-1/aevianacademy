"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Difficulty, ProgramArea, Role } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  programArea: z.nativeEnum(ProgramArea),
  ageRangeMin: z.number().int().min(3).max(25).default(5),
  ageRangeMax: z.number().int().min(3).max(25).default(18),
  difficulty: z.nativeEnum(Difficulty),
  durationWeeks: z.number().int().min(1).default(8),
  teacherId: z.string().min(1, "Teacher is required"),
  published: z.boolean().default(false),
});

const updateCourseSchema = createCourseSchema.partial().extend({
  courseId: z.string().min(1),
});

export type CourseActionResult = {
  error?: string;
  success?: boolean;
  courseId?: string;
};

/**
 * Get all published courses, optionally filtered.
 */
export async function getCourses(filters?: {
  programArea?: ProgramArea;
  difficulty?: Difficulty;
  search?: string;
}) {
  return prisma.course.findMany({
    where: {
      published: true,
      ...(filters?.programArea ? { programArea: filters.programArea } : {}),
      ...(filters?.difficulty ? { difficulty: filters.difficulty } : {}),
      ...(filters?.search
        ? {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" as const } },
              { description: { contains: filters.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    include: {
      teacher: { include: { user: true } },
      modules: { include: { lessons: true }, orderBy: { order: "asc" } },
      reviews: true,
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get a single course by slug.
 */
export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      teacher: { include: { user: true } },
      modules: {
        include: { lessons: true },
        orderBy: { order: "asc" },
      },
      reviews: {
        include: { student: { include: { user: true } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { enrollments: true } },
    },
  });
}

/**
 * Create a new course (admin/teacher).
 */
export async function createCourse(
  data: z.infer<typeof createCourseSchema>
): Promise<CourseActionResult> {
  const parsed = createCourseSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await requireAuth([Role.TEACHER, Role.ADMIN]);
    const course = await prisma.course.create({ data: parsed.data });
    return { success: true, courseId: course.id };
  } catch (e: any) {
    console.error("Failed to create course:", e);
    return { error: e?.message || "Failed to create course." };
  }
}

/**
 * Update an existing course.
 */
export async function updateCourse(
  data: z.infer<typeof updateCourseSchema>
): Promise<CourseActionResult> {
  const parsed = updateCourseSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { courseId, ...updateData } = parsed.data;

  try {
    await requireAuth([Role.TEACHER, Role.ADMIN]);

    await prisma.course.update({
      where: { id: courseId },
      data: updateData,
    });
    return { success: true };
  } catch (e: any) {
    console.error("Failed to update course:", e);
    return { error: e?.message || "Failed to update course." };
  }
}
