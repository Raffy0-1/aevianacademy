import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
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
            <div className="mt-5 space-y-2 text-xs text-slate-light">
              <a
                href="mailto:aeivanacademy@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-gold shrink-0" />
                <span>aeivanacademy@gmail.com</span>
              </a>
              <a
                href="tel:+923704942300"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-gold shrink-0" />
                <span>03704942300 (PAK) / +92 370 4942300</span>
              </a>
              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 font-medium hover:underline transition-colors"
              >
                <MessageCircle size={14} className="shrink-0" />
                <span>WhatsApp: 03704942300</span>
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

