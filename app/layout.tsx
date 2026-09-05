import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AbstractBackground } from "@/components/ui/abstract-background";

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
  title: {
    default: "Aevian Academy — Premium Modern Ed-Tech & Global Tutoring",
    template: "%s · Aevian Academy",
  },
  description:
    "Aevian Academy is a premier live online academy connecting students worldwide with top international teachers across IB, IGCSE, SAT, AP, and critical thinking curricula.",
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
  authors: [{ name: "Aevian Academy" }],
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
    sameAs: [
      "https://instagram.com/aevianacademy",
      "https://linkedin.com/company/aevianacademy",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-background text-foreground min-h-screen flex flex-col antialiased relative overflow-x-hidden`}
      >
        <AbstractBackground />
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}


