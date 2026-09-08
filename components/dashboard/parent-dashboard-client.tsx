"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateProfile, updateParentProfile } from "@/lib/actions/profiles";
import { updateBookingStatus } from "@/lib/actions/bookings";
import { BookingStatus } from "@prisma/client";
import {
  User,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Send,
} from "lucide-react";

interface Child {
  id: string;
  user: { name: string; email: string };
  gradeLevel: string | null;
  englishLevel: string;
  enrollments: {
    id: string;
    progressPercent: number;
    status: string;
    course: { title: string };
  }[];
  bookings: {
    id: string;
    scheduledAt: string;
    status: BookingStatus;
    type: string;
    durationMinutes: number;
    teacherNotes: string | null;
    teacher: { user: { name: string } };
    course: { title: string } | null;
  }[];
}

interface Invoice {
  id: string;
  amountCents: number;
  currency: string;
  status: string;
  issuedAt: string;
  pdfUrl: string | null;
}

interface ParentDashboardClientProps {
  parentUser: {
    id: string;
    name: string;
    email: string;
    parentProfile: { id: string; phone: string | null; country: string | null } | null;
  };
  childrenList: Child[];
  initialInvoices?: Invoice[];
}

export function ParentDashboardClient({
  parentUser,
  childrenList,
  initialInvoices = [],
}: ParentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [children, setChildren] = useState<Child[]>(childrenList);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [parentName, setParentName] = useState(parentUser.name);
  const [parentPhone, setParentPhone] = useState(parentUser.parentProfile?.phone || "");
  const [parentCountry, setParentCountry] = useState(parentUser.parentProfile?.country || "");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setProfileMsg(null);
    try {
      await updateProfile({
        userId: parentUser.id,
        name: parentName,
      });

      if (parentUser.parentProfile) {
        await updateParentProfile({
          parentProfileId: parentUser.parentProfile.id,
          phone: parentPhone,
          country: parentCountry,
        });
      }
      setProfileMsg("Profile updated successfully!");
    } catch (err) {
      setProfileMsg("Failed to update profile details.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this class slot?")) return;
    try {
      await updateBookingStatus({
        bookingId,
        status: BookingStatus.CANCELLED,
      });
      setChildren((prev) =>
        prev.map((c) => ({
          ...c,
          bookings: c.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: BookingStatus.CANCELLED } : b
          ),
        }))
      );
    } catch (err) {
      alert("Failed to cancel slot.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 bg-copper/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper border border-copper/30 mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Parent Control Center</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Parent Dashboard: {parentUser.name}</h1>
            <p className="mt-1 text-sm text-slate-light max-w-xl">
              Monitor your children&apos;s 40-minute 1-on-1 live sessions, tutor performance notes, and slot approval statuses.
            </p>
          </div>
          <div>
            <a href="/book-trial">
              <Button variant="copper" className="gap-2 shadow-md">
                <Calendar className="h-4 w-4" /> Book New 40-Min Session
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-border pb-4">
        {[
          { id: "overview", label: "Children Overview", icon: User },
          { id: "bookings", label: "Class Slots & Approvals", icon: Calendar },
          { id: "billing", label: "Billing & Invoices", icon: CreditCard },
          { id: "profile", label: "Account Settings", icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-navy text-white shadow-sm"
                : "bg-white text-slate hover:text-navy border border-slate-border hover:bg-cream-muted"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-navy">Learners & Progress Summary</h2>
          </div>

          <div className="grid gap-6">
            {children.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <User className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No children linked to this parent account yet.</p>
              </div>
            ) : (
              children.map((child) => (
                <div key={child.id} className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-border/50 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-navy">{child.user.name}</h3>
                      <p className="text-xs text-slate">{child.user.email} • Level: {child.englishLevel}</p>
                    </div>
                    <span className="rounded-full bg-copper/10 px-3 py-1 text-xs font-bold text-copper border border-copper/20">
                      Active 1-on-1 Student
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-cream/40 p-4 border border-slate-border/50">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Enrolled Courses</h4>
                      {child.enrollments.length === 0 ? (
                        <p className="text-xs text-slate mt-2">No active course enrollments yet.</p>
                      ) : (
                        <div className="mt-2 space-y-2">
                          {child.enrollments.map((en) => (
                            <div key={en.id} className="flex justify-between text-xs font-semibold text-navy">
                              <span>{en.course.title}</span>
                              <span className="text-copper">{en.progressPercent}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl bg-cream/40 p-4 border border-slate-border/50">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Tutor Feedback & Notes</h4>
                      {child.bookings.some((b) => b.teacherNotes) ? (
                        <div className="mt-2 space-y-2 text-xs text-slate">
                          {child.bookings.filter((b) => b.teacherNotes).map((b) => (
                            <p key={b.id} className="bg-white p-2 rounded border border-slate-border">
                              &quot;{b.teacherNotes}&quot; — <span className="font-bold text-navy">{b.teacher.user.name}</span>
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate mt-2">Feedback notes will appear after completed 40-min sessions.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {activeTab === "bookings" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">40-Minute Class Slots & Approval Requests</h2>
            <p className="text-xs text-slate mt-0.5">Track upcoming sessions, custom slot confirmations, and teacher allotments.</p>
          </div>

          <div className="grid gap-4">
            {children.flatMap((c) => c.bookings).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <Calendar className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No scheduled class slots found.</p>
                <a href="/book-trial" className="mt-3 inline-block">
                  <Button variant="copper" size="sm">Book Free 40-Min Trial</Button>
                </a>
              </div>
            ) : (
              children.flatMap((c) =>
                c.bookings.map((b) => (
                  <div key={b.id} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-navy">{b.course?.title || "1-on-1 Class Session"}</span>
                        <span className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[10px] font-bold text-navy">40 Mins</span>
                      </div>
                      <p className="text-xs text-slate mt-1 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-copper" /> {new Date(b.scheduledAt).toLocaleString()}
                        <span>• Tutor: {b.teacher.user.name} (Auto-Allotted)</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        b.status === BookingStatus.CONFIRMED
                          ? "bg-emerald-100 text-emerald-700"
                          : b.status === BookingStatus.PENDING
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {b.status}
                      </span>
                      {b.status !== BookingStatus.CANCELLED && (
                        <Button variant="outline" size="sm" onClick={() => handleCancelBooking(b.id)}>
                          Cancel Slot
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      )}

      {/* BILLING TAB */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-navy">Billing & Invoices</h2>
            <p className="text-xs text-slate mt-0.5">View transaction statements and payment receipts.</p>
          </div>

          <div className="grid gap-4">
            {invoices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-border bg-white p-8 text-center">
                <CreditCard className="h-10 w-10 text-slate mx-auto mb-2" />
                <p className="text-sm font-bold text-navy">No billing invoices recorded yet.</p>
                <p className="text-xs text-slate mt-1">Receipts will automatically generate upon booking paid 1-on-1 packages.</p>
              </div>
            ) : (
              invoices.map((inv) => (
                <div key={inv.id} className="rounded-2xl border border-slate-border bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-navy">Invoice #{inv.id.substring(0, 8).toUpperCase()}</h3>
                    <p className="text-xs text-slate mt-1">
                      Issued: {new Date(inv.issuedAt).toLocaleDateString()} • Amount: <span className="font-bold text-navy">{(inv.amountCents / 100).toFixed(2)} {inv.currency}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      inv.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {inv.status}
                    </span>
                    {inv.pdfUrl && (
                      <a href={inv.pdfUrl} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">Download PDF</Button>
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* PROFILE TAB */}
      {activeTab === "profile" && (
        <div className="rounded-2xl border border-slate-border bg-white p-6 shadow-sm max-w-xl">
          <h2 className="text-xl font-extrabold text-navy mb-4">Account & Parent Profile Settings</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Parent Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Phone Number</label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Country</label>
              <input
                type="text"
                value={parentCountry}
                onChange={(e) => setParentCountry(e.target.value)}
                className="w-full rounded-xl border border-slate-border p-3 text-xs text-navy font-medium focus:border-copper focus:outline-none"
              />
            </div>
            <Button variant="copper" type="submit" isLoading={updatingProfile}>
              Save Profile Changes
            </Button>
            {profileMsg && <p className="text-xs font-bold text-copper mt-2">{profileMsg}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
