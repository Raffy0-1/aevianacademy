"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2, MessageCircle } from "lucide-react";

import { useToast } from "@/components/ui/toast";
import { scrollToFirstError } from "@/lib/utils/form-errors";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFields = z.infer<typeof contactSchema>;

import { createContactTicket } from "@/lib/actions/support";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFields) => {
    setLoading(true);
    setSuccessMsg(null);
    try {
      const res = await createContactTicket({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: "General Contact & Inquiry",
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        const msg = "Thank you! Your ticket and inquiry have been received. Our administrative team will get back to you shortly.";
        setSuccessMsg(msg);
        setTicketId(res.ticketId || null);
        toast.success("Support ticket registered successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onError = (formErrors: any) => {
    scrollToFirstError(formErrors);
    toast.error("Please provide your name, valid email, and a message.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Info Side */}
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contact Us"
              title="Get in touch with Aevian Academy"
              description="Have questions about matching teachers, syllabus contents, trial bookings, or pricing tiers? Drop us a line or connect directly on WhatsApp."
            />

            <div className="space-y-4 text-sm">
              <a
                href="mailto:aevianacademy@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-gold"
              >
                <Mail className="text-gold h-5 w-5 shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Official Email</div>
                  <span className="font-semibold text-foreground">aevianacademy@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+923704942300"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-gold"
              >
                <Phone className="text-gold h-5 w-5 shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <span className="font-semibold text-foreground">+92 370 4942300</span>
                </div>
              </a>

              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-gold"
              >
                <MessageCircle className="text-gold h-5 w-5 shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <span className="font-semibold text-foreground">+92 370 4942300</span>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
              {successMsg && (
                <div className="rounded-lg bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 space-y-1">
                  <p className="font-semibold">{successMsg}</p>
                  {ticketId && (
                    <p className="text-xs text-muted-foreground font-mono">
                      Tracking Reference ID: <span className="font-bold text-foreground">{ticketId}</span>
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  disabled={loading}
                  {...register("name")}
                  placeholder="Jane Doe"
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-danger">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  disabled={loading}
                  {...register("email")}
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  disabled={loading}
                  {...register("message")}
                  placeholder="Tell us what you're looking for..."
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-danger">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending message...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
