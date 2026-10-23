import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LinkedInIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/social-icons";

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
              <BrandLogo size="lg" iconBgWhite lightText />
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

            {/* Quick Contact & Social Profile Links - Minimal Real Icons with White Circular Background */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="https://linkedin.com/company/aevianacademy"
                target="_blank"
                rel="noopener noreferrer"
                title="Aevian Academy on LinkedIn"
                aria-label="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>

              <a
                href="https://instagram.com/aevianacademy"
                target="_blank"
                rel="noopener noreferrer"
                title="Aevian Academy on Instagram"
                aria-label="Instagram Profile"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>

              <a
                href="mailto:aevianacademy@gmail.com"
                title="Send Email (aevianacademy@gmail.com)"
                aria-label="Email Aevian Academy"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
              >
                <MailIcon className="h-4 w-4" />
              </a>

              <a
                href="tel:+923704942300"
                title="Call Support (+92 370 4942300)"
                aria-label="Call Aevian Academy Support"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://wa.me/923704942300"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+92 370 4942300)"
                aria-label="Chat on WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
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
            <p className="text-slate-light">Empowering students globally.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}


