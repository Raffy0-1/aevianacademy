"use server";

import { prisma } from "@/lib/prisma";
import { TicketStatus, LeadStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export interface ContactTicketInput {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface SupportActionResult {
  success?: boolean;
  error?: string;
  ticketId?: string;
  data?: any;
}

/**
 * Creates a support ticket from Contact Us inquiries.
 * Automatically links to an existing user or registers a guest lead profile.
 */
export async function createContactTicket(
  input: ContactTicketInput
): Promise<SupportActionResult> {
  const { name, email, message, subject } = input;

  if (!email || !email.includes("@")) {
    return { error: "A valid email address is required." };
  }
  if (!name || name.trim().length < 2) {
    return { error: "Please provide your full name." };
  }
  if (!message || message.trim().length < 5) {
    return { error: "Please enter a detailed message." };
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanName = name.trim();
  const ticketSubject = subject?.trim() || "Website Contact Inquiry";

  try {
    // 1. Find or create user record to associate with SupportTicket
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: cleanName,
            role: Role.PARENT,
            parentProfile: { create: {} },
          },
        });
      } catch (e) {
        // Fallback: If user creation had race condition or constraint, fetch
        user = await prisma.user.findUnique({ where: { email: cleanEmail } });
      }
    }

    if (!user) {
      return { error: "Could not create user reference for ticket." };
    }

    // 2. Create the SupportTicket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: user.id,
        subject: ticketSubject,
        description: message.trim(),
        status: TicketStatus.OPEN,
        priority: "medium",
      },
    });

    // 3. Upsert Lead record for CRM tracking
    try {
      const existingLead = await prisma.lead.findFirst({
        where: { email: cleanEmail },
      });

      if (existingLead) {
        await prisma.lead.update({
          where: { id: existingLead.id },
          data: {
            notes: `[Contact Form: ${new Date().toLocaleDateString()}] ${message.trim()}\n---\n${existingLead.notes || ""}`,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.lead.create({
          data: {
            name: cleanName,
            email: cleanEmail,
            source: "Contact Form",
            status: LeadStatus.NEW,
            notes: message.trim(),
          },
        });
      }
    } catch (leadErr) {
      console.warn("Could not sync lead for contact inquiry:", leadErr);
    }

    revalidatePath("/dashboard/admin");
    return { success: true, ticketId: ticket.id };
  } catch (err: any) {
    console.error("createContactTicket error:", err);
    return { error: err?.message || "Failed to submit inquiry. Please try again." };
  }
}

/**
 * Admin action: Reply and update support ticket
 */
export async function replyToSupportTicket(
  ticketId: string,
  replyText: string,
  newStatus: TicketStatus = TicketStatus.IN_PROGRESS
): Promise<SupportActionResult> {
  try {
    await requireAuth([Role.ADMIN]);

    if (!ticketId) return { error: "Ticket ID is required." };

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: { user: true },
    });

    if (!ticket) return { error: "Ticket not found." };

    const updated = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: newStatus,
        description: `${ticket.description}\n\n[ADMIN REPLY - ${new Date().toLocaleDateString()}]: ${replyText.trim()}`,
      },
    });

    revalidatePath("/dashboard/admin");
    return { success: true, data: updated };
  } catch (err: any) {
    console.error("replyToSupportTicket error:", err);
    return { error: err?.message || "Failed to reply to ticket." };
  }
}
