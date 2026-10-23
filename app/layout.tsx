import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AbstractBackground } from "@/components/ui/abstract-background";
import { ToastProvider } from "@/components/ui/toast";
import { AeviMascot } from "@/components/ui/aevi-mascot";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aevianacademy.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Aevian Academy — Global Live Online Tutoring & Test Prep",
    template: "%s · Aevian Academy",
  },
  description:
    "Live 1-on-1 online tutoring for IB, Cambridge, SAT & competitive exams with certified international teachers. Book a free 40-minute demo class today.",
  keywords: [
    "Aevian Academy",
    "Online Tutoring",
    "IB Tutoring",
    "IGCSE Classes",
    "SAT Prep",
    "Global Online School",
    "1-on-1 Tutoring",
    "Critical Thinking Education",
  ],
  authors: [{ name: "Aevian Academy Faculty" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aevian Academy — The Learning Path to Academic Excellence",
    description:
      "Live 1-on-1 online classes, international master teachers, structured curricula designed to compound.",
    url: "https://aevianacademy.com",
    siteName: "Aevian Academy",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Aevian Academy Brand Identity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevian Academy — Premier Live Online Learning",
    description:
      "Empowering students globally through structured learning paths and expert educators.",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Aevian Academy",
    url: "https://aevianacademy.com",
    logo: "https://aevianacademy.com/icon.png",
    description:
      "Global ed-tech platform connecting students worldwide with expert live tutors for IB, IGCSE, SAT, AP, and critical thinking advancement.",
    email: "aevianacademy@gmail.com",
    telephone: "+92-370-4942300",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-370-4942300",
      contactType: "customer service",
      email: "aevianacademy@gmail.com",
      availableLanguage: ["English", "Urdu", "Arabic"],
    },
    sameAs: [
      "https://instagram.com/aevianacademy",
      "https://linkedin.com/company/aevianacademy",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <link rel="preload" href="/vendor/three.r134.min.js" as="script" />
        <link rel="preload" href="/vendor/vanta.rings.min.js" as="script" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-background text-foreground min-h-screen flex flex-col antialiased relative overflow-x-hidden`}
      >
        {/* Accessible Skip Navigation Link for Screen Readers and Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2.5 focus:text-white focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-copper font-semibold text-xs"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ToastProvider>
            <AbstractBackground />
            <div className="relative z-10 flex-1 flex flex-col">{children}</div>
            <AeviMascot />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


