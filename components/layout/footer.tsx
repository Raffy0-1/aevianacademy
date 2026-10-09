import Link from "next/link";
import { Mail, PhoneCall, MessageCircle, Linkedin, Instagram, MapPin, ShieldCheck } from "lucide-react";
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
    title: "Legal & Trust",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/about", label: "Academic Standards" },
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

            {/* Registered Physical Address & Trust Badge */}
            <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-light">
              <p className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-copper shrink-0" />
                <span>HQ: 71-75 Shelton Street, Covent Garden, London, UK</span>
              </p>
              <p className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Verified Independent International Ed-Tech Provider</span>
              </p>
            </div>

            {/* Quick Contact & Social Profile Links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://linkedin.com/company/aevianacademy"
                target="_blank"
                rel="noopener noreferrer"
                title="Aevian Academy on LinkedIn"
                aria-label="LinkedIn Profile"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-navy-light/80 text-slate-300 shadow-sm transition-all duration-300 hover:scale-110 hover:border-sky-400 hover:text-sky-400 hover:bg-sky-500/10"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://instagram.com/aevianacademy"
                target="_blank"
                rel="noopener noreferrer"
                title="Aevian Academy on Instagram"
                aria-label="Instagram Profile"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-navy-light/80 text-slate-300 shadow-sm transition-all duration-300 hover:scale-110 hover:border-pink-400 hover:text-pink-400 hover:bg-pink-500/10"
              >
                <Instagram size={18} />
              </a>

              <a
                href="mailto:aevianacademy@gmail.com"
                title="Send Email (aevianacademy@gmail.com)"
                aria-label="Email Aevian Academy"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-light/80 text-gold shadow-sm transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold/10 hover:shadow-gold/20"
              >
                <Mail size={18} />
              </a>

              <a
                href="tel:+923704942300"
                title="Call Support (+92 370 4942300)"
                aria-label="Call Aevian Academy Support"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-light/80 text-gold shadow-sm transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold/10 hover:shadow-gold/20"
              >
                <PhoneCall size={18} />
              </a>

              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+92 370 4942300)"
                aria-label="Chat on WhatsApp"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:bg-emerald-500/20"
              >
                <MessageCircle size={18} />
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

        {/* Disclaimer & Copyright */}
        <div className="mt-8 flex flex-col gap-4 text-xs text-slate-400">
          <p className="leading-relaxed text-[11px] text-slate-400/90 border-b border-navy-light/40 pb-4">
            <strong>Educational Disclaimer:</strong> Aevian Academy is an independent online tutoring and academic enrichment institution. International Baccalaureate (IB), Cambridge Assessment International Education (CAIE), SAT (College Board), AP, and NAPLAN are trademarks of their respective owners and are not affiliated with or endorsing Aevian Academy.
          </p>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-light">
            <p>© {new Date().getFullYear()} Aevian Academy Inc. All rights reserved.</p>
            <p className="text-slate-light">Empowering students in over 40 countries globally.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}


