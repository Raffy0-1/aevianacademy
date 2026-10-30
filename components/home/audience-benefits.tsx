import { Container } from "@/components/ui/container";
import { ConstellationRule } from "@/components/ui/constellation-rule";
import { CheckCircle2, Shield, Compass } from "lucide-react";
import { CardAbstract } from "@/components/ui/card-abstract";

const parent = [
  "See real-time attendance, homework completion, and grades in one portal",
  "Receive detailed written qualitative feedback after every single class",
  "Reschedule or pause sessions instantly without contacting support",
  "Download automated invoices, payment records, and tax receipts anytime",
];

const student = [
  "Join live interactive classes from any device with zero software installation",
  "Diagnose exact exam board weaknesses with past paper analytics",
  "Targeted mastery tracks for UK SATs, GCSEs, A-Levels, NAPLAN & IELTS",
  "Message your certified educator directly for questions between sessions",
];

export function AudienceBenefits() {
  return (
    <section className="py-20 lg:py-28 relative">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Parent Experience Double-Bezel Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/70 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_12px_36px_-10px_rgba(28,42,56,0.1)] transition-all duration-300">
            <div className="rounded-[1.35rem] bg-gradient-to-br from-white via-cream/30 to-slate-50/40 p-7 sm:p-9 flex flex-col justify-between h-full relative overflow-hidden">
              <CardAbstract variant="compass" position="bottom-right" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white/90 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-navy shadow-2xs">
                  <span className="text-copper font-bold">{"//"}</span>
                  <span>For Parents</span>
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.025em] text-navy leading-snug">
                  Total clarity without constant check-ins
                </h3>
                <p className="mt-2.5 text-sm text-slate leading-relaxed">
                  Stay effortlessly connected with your child&apos;s academic progression through real-time feedback and direct educator reporting.
                </p>

                <ul className="mt-7 space-y-3.5">
                  {parent.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate">
                      <CheckCircle2 className="h-4 w-4 text-copper shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-8 pt-5 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate">
                <span>Direct Teacher Access</span>
                <span className="text-copper font-bold">100% Transparency</span>
              </div>
            </div>
          </div>

          {/* Student Experience Double-Bezel Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/70 p-2 sm:p-2.5 shadow-[0_4px_24px_-4px_rgba(28,42,56,0.06)] hover:shadow-[0_12px_36px_-10px_rgba(28,42,56,0.1)] transition-all duration-300">
            <div className="rounded-[1.35rem] bg-gradient-to-br from-[#1C2A38] via-[#16222E] to-[#111A24] text-white p-7 sm:p-9 flex flex-col justify-between h-full relative overflow-hidden">
              <CardAbstract variant="orbit" position="bottom-right" theme="dark" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-white">
                  <span className="text-copper font-bold">{"//"}</span>
                  <span>For Students</span>
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-[-0.025em] text-white leading-snug">
                  A learning path you can actually see yourself on
                </h3>
                <p className="mt-2.5 text-sm text-slate-light leading-relaxed">
                  No generic lectures. Step into an engaging, interactive environment where complex syllabus concepts are broken down into achievable wins.
                </p>

                <ul className="mt-7 space-y-3.5">
                  {student.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-light">
                      <CheckCircle2 className="h-4 w-4 text-copper shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-light">
                <span>Interactive Whiteboard & Practice</span>
                <span className="text-copper font-bold">Compounding Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <ConstellationRule />
      </div>
    </section>
  );
}
