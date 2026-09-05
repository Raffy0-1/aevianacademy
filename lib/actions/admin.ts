"use server";

import { prisma } from "@/lib/prisma";
import { LeadStatus, TicketStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type AdminActionResult = {
  success?: boolean;
  error?: string;
  data?: any;
};

/**
 * Update CRM Lead status and notes
 */
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
  notes?: string
): Promise<AdminActionResult> {
  try {
    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { error: "Failed to update lead status." };
  }
}

/**
 * Create a new CRM Lead
 */
export async function createLead(
  name: string,
  email: string,
  source: string = "Website Direct",
  notes?: string
): Promise<AdminActionResult> {
  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        source,
        notes,
        status: LeadStatus.NEW,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: lead };
  } catch (error) {
    console.error("Failed to create lead:", error);
    return { error: "Failed to create lead." };
  }
}

/**
 * Update Support Ticket Status
 */
export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
): Promise<AdminActionResult> {
  try {
    const updated = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update ticket status:", error);
    return { error: "Failed to update ticket status." };
  }
}

/**
 * Toggle Course Published status
 */
export async function toggleCoursePublished(
  courseId: string
): Promise<AdminActionResult> {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { published: true },
    });

    if (!course) return { error: "Course not found." };

    const updated = await prisma.course.update({
      where: { id: courseId },
      data: { published: !course.published },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to toggle course published:", error);
    return { error: "Failed to toggle course published status." };
  }
}

/**
 * Create a new Discount Code / Coupon
 */
export async function createDiscountCode(data: {
  code: string;
  description?: string;
  discountPercent?: number;
  discountAmount?: number;
  currency?: string;
  maxUses?: number;
}): Promise<AdminActionResult> {
  try {
    const discount = await prisma.discountCode.create({
      data: {
        code: data.code.toUpperCase().trim(),
        description: data.description,
        discountPercent: data.discountPercent,
        discountAmount: data.discountAmount ? Math.round(data.discountAmount * 100) : null,
        currency: data.currency || "USD",
        maxUses: data.maxUses || null,
        active: true,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: discount };
  } catch (error) {
    console.error("Failed to create discount code:", error);
    return { error: "Failed to create discount code. Code may already exist." };
  }
}

/**
 * Update User Role
 */
export async function updateUserRole(
  userId: string,
  role: Role
): Promise<AdminActionResult> {
  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    revalidatePath("/admin");
    revalidatePath("/dashboard/admin");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { error: "Failed to update user role." };
  }
}
