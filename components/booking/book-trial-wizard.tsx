"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createBooking } from "@/lib/actions/bookings";
import { BookingType, EnglishLevel } from "@prisma/client";
import {
  Loader2,
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Zap,
  UserCheck,
  Send,
  HelpCircle,
} from "lucide-react";

// Program & Sub-Program Hierarchy Definition
const PROGRAM_CATEGORIES = [
  {
    id: "academic-curriculum",
    name: "International School Curriculums",
    description: "IB, Cambridge/IGCSE, UK, US, & Australian Curriculums",
    courses: [
      { id: "math-curriculum", name: "Mathematics (Primary / Secondary / High School)" },
      { id: "science-curriculum", name: "Sciences (Physics, Chemistry, Biology)" },
      { id: "english-lit", name: "English Language & Literature" },
      { id: "computer-science", name: "Computer Science & Programming Fundamentals" },
    ],
  },
  {
    id: "school-assessment",
    name: "School Competitive Exams & Assessments",
    description: "NAPLAN, ACARA, TOEFL, UK SATs, CAT4 & Selective Tests",
    courses: [
      { id: "naplan-acara", name: "NAPLAN & ACARA Assessment Prep" },
      { id: "uk-sat-cat4", name: "UK SATs & CAT4 Exam Masterclass" },
      { id: "toefl-prep", name: "TOEFL & English Proficiency Prep" },
      { id: "selective-school", name: "Selective School & Entrance Test Coaching" },
    ],
  },
  {
    id: "communication-skills",
    name: "Communication Skills Courses",
    description: "Spoken Fluency, Public Speaking & Academic Writing",
    courses: [
      { id: "spoken-english", name: "Spoken English Fluency & Confidence" },
      { id: "public-speaking", name: "Public Speaking & Presentation Mastery" },
      { id: "academic-writing", name: "Formal Academic & Essay Writing" },
    ],
  },
  {
    id: "short-skills",
    name: "Short Skills (Reading & Writing)",
    description: "Targeted skill boosters for primary and high school students",
    courses: [
      { id: "reading-comprehension", name: "Reading Comprehension & Critical Analysis" },
      { id: "creative-writing", name: "Creative & Short Story Writing" },
      { id: "grammar-vocabulary", name: "Grammar, Punctuation & Vocabulary Boost" },
    ],
  },
  {
    id: "quran-recitation",
    name: "Quran Recitation & Tajweed",
    description: "Fluent Quran Recitation with proper Makharij rules",
    courses: [
      { id: "quran-reading-tajweed", name: "Quran Recitation & Tajweed Practice" },
      { id: "quran-memorization", name: "Hifz & Revision Support" },
    ],
  },
  {
    id: "islamic-foundation",
    name: "Islamic Foundation & Essential Teachings",
    description: "Imaan ki Shartein, Kalimas with translation, Namaz, Azan & Duas",
    courses: [
      { id: "islamic-essentials", name: "Islamic Foundation & Essential Teachings" },
      { id: "namaz-kalimas-duas", name: "Namaz (Salah), 3 Kalimas & Daily Duas" },
    ],
  },
];

// Standard 40-Minute Time Slots
const STANDARD_40MIN_SLOTS = [
  { id: "09:00-09:40", label: "09:00 AM – 09:40 AM", period: "Morning" },
  { id: "10:00-10:40", label: "10:00 AM – 10:40 AM", period: "Morning" },
  { id: "11:00-11:40", label: "11:00 AM – 11:40 AM", period: "Morning" },
  { id: "14:00-14:40", label: "02:00 PM – 02:40 PM", period: "Afternoon" },
  { id: "15:00-15:40", label: "03:00 PM – 03:40 PM", period: "Afternoon" },
  { id: "16:00-16:40", label: "04:00 PM – 04:40 PM", period: "Afternoon" },
  { id: "18:00-18:40", label: "06:00 PM – 06:40 PM", period: "Evening" },
  { id: "19:00-19:40", label: "07:00 PM – 07:40 PM", period: "Evening" },
  { id: "20:00-20:40", label: "08:00 PM – 08:40 PM", period: "Evening" },
];

const wizardSchema = z.object({
  // Parent
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentEmail: z.string().email("Please enter a valid parent email address"),
  parentPhone: z.string().min(6, "Please enter a valid phone number"),

  // Student
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  studentDob: z.string().min(1, "Student date of birth is required"),
  timezone: z.string().min(1, "Timezone is required"),
  englishLevel: z.nativeEnum(EnglishLevel),

  // Program & Subject Selection
  programCategory: z.string().min(1, "Please select a program category"),
  subProgramId: z.string().min(1, "Please select a specific course or subject"),

  // Schedule & Mode
  bookingMode: z.enum(["standard", "custom", "instant"]),
  scheduledAt: z.string().min(1, "Date is required"),
  slotId: z.string().optional(),
  customTime: z.string().optional(),

  // Goals
  goals: z.string().min(5, "Please share some goals or topics for the 40-min demo class"),
});

type WizardFields = z.infer<typeof wizardSchema>;

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
}

interface Props {
  teachers: Teacher[];
}

export function BookTrialWizard({ teachers }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<WizardFields>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      timezone: detectedTimezone,
      englishLevel: EnglishLevel.BEGINNER,
      programCategory: "school-assessment",
      subProgramId: "naplan-acara",
      bookingMode: "standard",
      slotId: "10:00-10:40",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  });

  const watchCategory = watch("programCategory");
  const watchBookingMode = watch("bookingMode");
  const watchScheduledAt = watch("scheduledAt");

  const selectedCategoryObj = PROGRAM_CATEGORIES.find((c) => c.id === watchCategory);

  const nextStep = async () => {
    let fieldsToValidate: (keyof WizardFields)[] = [];
    if (step === 1) {
      fieldsToValidate = ["parentName", "parentEmail", "parentPhone"];
    } else if (step === 2) {
      fieldsToValidate = ["studentName", "studentDob", "timezone", "englishLevel"];
    } else if (step === 3) {
      fieldsToValidate = ["programCategory", "subProgramId"];
    } else if (step === 4) {
      fieldsToValidate = ["bookingMode", "scheduledAt"];
      if (watchBookingMode === "standard" && !watch("slotId")) {
        setErrorMsg("Please select a 40-minute slot.");
        return;
      }
      if (watchBookingMode === "custom" && !watch("customTime")) {
        setErrorMsg("Please specify your preferred custom time.");
        return;
      }
      if (watchBookingMode === "instant") {
        const now = new Date();
        const selectedDate = new Date(watchScheduledAt);
        if (selectedDate.toDateString() === now.toDateString()) {
          const currentHour = now.getHours();
          if (currentHour >= 22) {
            setErrorMsg("Instant booking requires a minimum 2-hour notice. Please select tomorrow.");
            return;
          }
        }
      }
    }

    setErrorMsg(null);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: WizardFields) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const defaultStudentId = "cl70y2abc00003567abcd1234";
      const assignedTeacherId = teachers[0]?.id || "cl70teacher0000123456";

      let timeString = "10:00";
      if (data.bookingMode === "standard" && data.slotId) {
        timeString = data.slotId.split("-")[0];
      } else if (data.bookingMode === "custom" && data.customTime) {
        timeString = data.customTime;
      } else if (data.bookingMode === "instant") {
        const nowPlusTwoHours = new Date(Date.now() + 2.5 * 60 * 60 * 1000);
        timeString = `${String(nowPlusTwoHours.getHours()).padStart(2, "0")}:${String(
          nowPlusTwoHours.getMinutes()
        ).padStart(2, "0")}`;
      }

      const scheduledTime = new Date(data.scheduledAt);
      const [hours, minutes] = timeString.split(":");
      scheduledTime.setHours(parseInt(hours || "10"), parseInt(minutes || "0"), 0, 0);

      const res = await createBooking({
        studentId: defaultStudentId,
        teacherId: assignedTeacherId,
        type: BookingType.TRIAL,
        scheduledAt: scheduledTime,
        durationMinutes: 40,
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        const selectedSubProg = selectedCategoryObj?.courses.find((c) => c.id === data.subProgramId);
        setSuccessBooking({
          date: scheduledTime.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: timeString,
          bookingMode: data.bookingMode,
          courseName: selectedSubProg?.name || "Selected Subject",
          categoryName: selectedCategoryObj?.name,
          timezone: data.timezone,
          studentName: data.studentName,
          parentEmail: data.parentEmail,
        });
        setStep(6);
      }
    } catch (err) {
      setErrorMsg("An error occurred while creating your trial booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-border bg-white p-6 lg:p-10 shadow-lg">
      {/* Progress Steps Header */}
      {step < 6 && (
        <div className="mb-8 border-b border-slate-border/50 pb-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate">
            <span className="flex items-center gap-1.5 text-copper">
              <Sparkles className="h-4 w-4" /> Step {step} of 5
            </span>
            <span className="text-navy font-bold">
              {step === 1 && "1. Parent Contact"}
              {step === 2 && "2. Student Profile"}
              {step === 3 && "3. Program & Subject"}
              {step === 4 && "4. Schedule & Booking Mode"}
              {step === 5 && "5. Goals & Confirmation"}
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-cream-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-copper transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-red-500 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: Parent Contact */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Parent Information</h2>
              <p className="text-sm text-slate mt-1">
                We&apos;ll send your demo booking link, email confirmation, and session report here.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Parent / Guardian Full Name</label>
                <input
                  type="text"
                  {...register("parentName")}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                />
                {errors.parentName && <p className="mt-1 text-xs text-red-600">{errors.parentName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-1">Email Address</label>
                <input
                  type="email"
                  {...register("parentEmail")}
                  placeholder="e.g. sarah.jenkins@example.com"
                  className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                />
                {errors.parentEmail && <p className="mt-1 text-xs text-red-600">{errors.parentEmail.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-1">Phone Number (with Country Code)</label>
                <input
                  type="tel"
                  {...register("parentPhone")}
                  placeholder="+44 7911 123456"
                  className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                />
                {errors.parentPhone && <p className="mt-1 text-xs text-red-600">{errors.parentPhone.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Student Profile */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Student Profile</h2>
              <p className="text-sm text-slate mt-1">Tell us about the learner so we can tailor the 40-minute class.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-navy mb-1">Student Full Name</label>
                <input
                  type="text"
                  {...register("studentName")}
                  placeholder="e.g. Oliver Jenkins"
                  className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                />
                {errors.studentName && <p className="mt-1 text-xs text-red-600">{errors.studentName.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Date of Birth</label>
                  <input
                    type="date"
                    {...register("studentDob")}
                    className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                  />
                  {errors.studentDob && <p className="mt-1 text-xs text-red-600">{errors.studentDob.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Timezone</label>
                  <input
                    type="text"
                    {...register("timezone")}
                    className="w-full rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy mb-2">English Proficiency Level</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {Object.keys(EnglishLevel).map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-3 rounded-xl border border-slate-border p-3 hover:bg-cream-muted cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        value={lvl}
                        {...register("englishLevel")}
                        className="text-copper focus:ring-copper"
                      />
                      <span className="text-xs font-semibold text-navy">{lvl.replace(/_/g, " ")}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Program & Course Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Select Program & Course</h2>
              <p className="text-sm text-slate mt-1">
                Choose the program category and specific subject. Our academic team will auto-allot the ideal expert teacher.
              </p>
            </div>

            {/* Category Dropdown/Selector */}
            <div>
              <label className="block text-sm font-bold text-navy mb-2">1. Program Category</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROGRAM_CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    onClick={() => {
                      setValue("programCategory", cat.id);
                      if (cat.courses.length > 0) {
                        setValue("subProgramId", cat.courses[0].id);
                      }
                    }}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      watchCategory === cat.id
                        ? "border-copper bg-copper/5 shadow-sm ring-1 ring-copper"
                        : "border-slate-border bg-white hover:border-copper/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-sm text-navy">{cat.name}</div>
                      {watchCategory === cat.id && <CheckCircle2 className="h-4 w-4 text-copper shrink-0" />}
                    </div>
                    <p className="text-xs text-slate mt-1 leading-relaxed">{cat.description}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-Program / Subject Selector */}
            {selectedCategoryObj && (
              <div className="pt-2">
                <label className="block text-sm font-bold text-navy mb-2">
                  2. Select Specific Subject / Course under <span className="text-copper">{selectedCategoryObj.name}</span>
                </label>
                <div className="grid gap-2.5">
                  {selectedCategoryObj.courses.map((course) => (
                    <label
                      key={course.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-border p-3.5 hover:bg-cream-muted cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        value={course.id}
                        {...register("subProgramId")}
                        className="text-copper focus:ring-copper"
                      />
                      <span className="text-sm font-semibold text-navy">{course.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Auto-Allotment Info Banner */}
            <div className="rounded-xl bg-navy p-4 text-white flex items-center gap-3 border border-navy-light">
              <UserCheck className="h-6 w-6 text-copper shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">Teacher Auto-Allotted by Academic Admin</p>
                <p className="text-slate-light mt-0.5">
                  You don&apos;t need to manually search teachers. Aevian&apos;s academic team assigns a top certified master teacher matching your exact subject choices.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Schedule & Booking Mode */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Schedule & Booking Mode</h2>
              <p className="text-sm text-slate mt-1">
                All sessions are strictly <span className="font-bold text-copper">40 minutes</span> long. Choose standard slots, request a custom time, or select instant booking.
              </p>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-bold text-navy mb-1">Class Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("scheduledAt")}
                className="w-full sm:w-64 rounded-xl border border-slate-border bg-cream/30 px-4 py-3 text-sm text-navy font-semibold focus:border-copper focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Booking Mode Selector Tabs */}
            <div className="grid gap-3 sm:grid-cols-3">
              <label
                onClick={() => setValue("bookingMode", "standard")}
                className={`rounded-xl border p-4 cursor-pointer transition-all text-center ${
                  watchBookingMode === "standard"
                    ? "border-copper bg-copper/5 ring-1 ring-copper"
                    : "border-slate-border bg-white hover:border-copper/40"
                }`}
              >
                <Clock className="h-5 w-5 text-copper mx-auto mb-1.5" />
                <div className="font-bold text-sm text-navy">Standard 40-Min Slot</div>
                <div className="text-xs text-slate mt-0.5">Choose from pre-set times</div>
              </label>

              <label
                onClick={() => setValue("bookingMode", "custom")}
                className={`rounded-xl border p-4 cursor-pointer transition-all text-center ${
                  watchBookingMode === "custom"
                    ? "border-copper bg-copper/5 ring-1 ring-copper"
                    : "border-slate-border bg-white hover:border-copper/40"
                }`}
              >
                <Calendar className="h-5 w-5 text-copper mx-auto mb-1.5" />
                <div className="font-bold text-sm text-navy">Custom Time Slot</div>
                <div className="text-xs text-slate mt-0.5">Request your free time</div>
              </label>

              <label
                onClick={() => setValue("bookingMode", "instant")}
                className={`rounded-xl border p-4 cursor-pointer transition-all text-center ${
                  watchBookingMode === "instant"
                    ? "border-copper bg-copper/5 ring-1 ring-copper"
                    : "border-slate-border bg-white hover:border-copper/40"
                }`}
              >
                <Zap className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
                <div className="font-bold text-sm text-navy">Instant Booking</div>
                <div className="text-xs text-slate mt-0.5">Min 2-hour gap from now</div>
              </label>
            </div>

            {/* Mode 1: Standard Slots */}
            {watchBookingMode === "standard" && (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-bold text-navy">Available 40-Minute Session Slots</label>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {STANDARD_40MIN_SLOTS.map((slot) => (
                    <label
                      key={slot.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-border p-3.5 hover:bg-cream-muted cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        value={slot.id}
                        {...register("slotId")}
                        className="text-copper focus:ring-copper"
                      />
                      <div>
                        <span className="text-xs font-bold text-navy block">{slot.label}</span>
                        <span className="text-[10px] text-slate uppercase tracking-wider font-semibold">{slot.period} (40 min)</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Mode 2: Custom Slot */}
            {watchBookingMode === "custom" && (
              <div className="space-y-3 rounded-xl bg-cream-muted p-5 border border-slate-border">
                <label className="block text-sm font-bold text-navy">Enter Your Preferred Custom Time</label>
                <input
                  type="time"
                  {...register("customTime")}
                  className="w-full sm:w-64 rounded-xl border border-slate-border bg-white px-4 py-3 text-sm text-navy font-bold focus:border-copper focus:outline-none"
                />
                <div className="flex items-center gap-2 text-xs text-slate font-medium pt-1">
                  <Send className="h-4 w-4 text-copper shrink-0" />
                  <span>
                    <strong>Admin Confirmation Note:</strong> Custom slot requests are reviewed by our team. You will receive an instant email notification once approved.
                  </span>
                </div>
              </div>
            )}

            {/* Mode 3: Instant Booking */}
            {watchBookingMode === "instant" && (
              <div className="space-y-3 rounded-xl bg-amber-50 p-5 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Zap className="h-5 w-5 text-amber-600 shrink-0" />
                  <span>Instant Class Priority Scheduling</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Instant class bookings dispatch a dedicated master teacher with a <strong>minimum 2-hour notice gap</strong> from current time. Includes priority queue handling (+£15 / $20 instant fee).
                </p>
                <div className="text-xs font-bold text-navy pt-1">
                  Requested Gap: Minimum 2 Hours from local system clock.
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Learning Goals & Summary */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy">Learning Goals & Final Review</h2>
              <p className="text-sm text-slate mt-1">Tell us what you&apos;d like to accomplish in your 40-minute demo session.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-1">Student Learning Goals / Specific Topics</label>
              <textarea
                rows={4}
                {...register("goals")}
                placeholder="e.g. Needs help preparing for NAPLAN Math, or wants to learn Tajweed rules for Quran Recitation..."
                className="w-full rounded-xl border border-slate-border bg-cream/30 p-4 text-sm text-navy font-medium focus:border-copper focus:bg-white focus:outline-none transition-all"
              />
              {errors.goals && <p className="mt-1 text-xs text-red-600">{errors.goals.message}</p>}
            </div>

            <div className="rounded-xl border border-slate-border bg-cream/40 p-5 space-y-3 text-sm">
              <h3 className="font-bold text-navy text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-copper" /> Booking Summary
              </h3>
              <div className="grid gap-2 text-xs sm:grid-cols-2 text-slate font-medium">
                <div>
                  <span className="text-navy font-bold">Student:</span> {watch("studentName")}
                </div>
                <div>
                  <span className="text-navy font-bold">Parent Email:</span> {watch("parentEmail")}
                </div>
                <div>
                  <span className="text-navy font-bold">Program:</span> {selectedCategoryObj?.name}
                </div>
                <div>
                  <span className="text-navy font-bold">Booking Mode:</span>{" "}
                  <span className="capitalize font-bold text-copper">{watch("bookingMode")}</span>
                </div>
                <div>
                  <span className="text-navy font-bold">Session Duration:</span> 40 Minutes
                </div>
                <div>
                  <span className="text-navy font-bold">Teacher:</span> Auto-Allotted by Admin
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Success Screen */}
        {step === 6 && successBooking && (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-navy">40-Min Demo Class Requested!</h2>
              <p className="text-sm text-slate max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <span className="font-bold text-navy">{successBooking.studentName}</span>! Your demo class request for{" "}
                <span className="font-bold text-copper">{successBooking.courseName}</span> on{" "}
                <span className="font-bold text-navy">{successBooking.date}</span> at{" "}
                <span className="font-bold text-navy">{successBooking.time}</span> has been logged.
              </p>
            </div>

            {successBooking.bookingMode === "custom" && (
              <div className="rounded-xl bg-amber-50 p-4 text-xs text-amber-900 border border-amber-200 max-w-md mx-auto text-left font-medium">
                <Send className="h-4 w-4 text-amber-600 inline-block mr-2" />
                Your custom time request is sent to our admin team. An approval email will be sent to <strong>{successBooking.parentEmail}</strong> shortly.
              </div>
            )}

            <div className="rounded-xl bg-cream p-5 max-w-md mx-auto text-left border border-slate-border text-xs space-y-2">
              <div className="font-bold text-navy text-sm border-b border-slate-border/60 pb-2">Next Steps</div>
              <p className="text-slate">1. Our academic admin team will allot a verified master teacher for your session.</p>
              <p className="text-slate">2. PDF lecture notes & class link will be dispatched to your student dashboard.</p>
            </div>

            <div className="pt-4">
              <Button variant="copper" size="lg" onClick={() => (window.location.href = "/dashboard/student")}>
                Go to Student Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {step < 6 && (
          <div className="mt-8 flex justify-between border-t border-slate-border/50 pt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
                <ArrowLeft size={16} /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button type="button" variant="copper" onClick={nextStep} className="gap-2">
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="copper" isLoading={loading} className="gap-2">
                Confirm 40-Min Demo Trial
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
