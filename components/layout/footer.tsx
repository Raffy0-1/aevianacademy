import Link from "next/link";
import { Mail, PhoneCall, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";

const columns = [
  {
    title: "Programs",
    links: [
      { href: "/programs", label: "All Programs" },
      { href: "/teachers", label: "Master Faculty" },
      { href: "/pricing", label: "Tuition & Pricing" },
      { href: "/book-trial", label: "Book Free Trial" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Aevian" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog & Insights" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/scholarship", label: "Scholarship Program" },
      { href: "/affiliate", label: "Affiliate Program" },
      { href: "/referral", label: "Referral Program" },
      { href: "/reviews", label: "Parent Reviews" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-light bg-navy text-cream pt-16 pb-12">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6 pb-12 border-b border-navy-light/60">
          <div className="lg:col-span-2 flex flex-col">
            <Link href="/" aria-label="Aevian Academy">
              <BrandLogo size="lg" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-light">
              Premier global ed-tech academy connecting students worldwide with top international teachers across IB, IGCSE, SAT, and critical thinking curricula.
            </p>
            {/* Quick Contact Icon Action Bar - Hidden raw text, interactive icons with subtle animation */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:aevianacademy@gmail.com"
                title="Send Email (aevianacademy@gmail.com)"
                aria-label="Email Aevian Academy"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-light/80 text-gold shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:shadow-gold/20"
              >
                <Mail size={18} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navy-dark px-2 py-0.5 text-[10px] font-medium text-cream opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 border border-slate-700">
                  Email
                </span>
              </a>

              <a
                href="tel:+923704942300"
                title="Call Support (+92 370 4942300)"
                aria-label="Call Aevian Academy Support"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-light/80 text-gold shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:shadow-gold/20"
              >
                <PhoneCall size={18} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navy-dark px-2 py-0.5 text-[10px] font-medium text-cream opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 border border-slate-700">
                  Call
                </span>
              </a>

              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+92 370 4942300)"
                aria-label="Chat on WhatsApp"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-emerald-500/25"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-25 group-hover:opacity-40" />
                <MessageCircle size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-navy-dark px-2 py-0.5 text-[10px] font-medium text-emerald-300 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 border border-emerald-800/50">
                  WhatsApp
                </span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs text-copper">
              <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
              <span className="font-semibold tracking-wide uppercase">The Learning Path Strategy</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-wider text-copper font-semibold">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-light transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-light sm:flex-row">
          <p>© {new Date().getFullYear()} Aevian Academy Inc. All rights reserved.</p>
          <p className="text-slate-light">Empowering students in over 40 countries globally.</p>
        </div>
      </Container>
    </footer>
  );
}

