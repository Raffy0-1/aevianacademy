# Aevian — Design System & Home Page

This package is the first slice of the full platform brief: the **design
system** and a **complete, real Home page**, built in Next.js 15 (App
Router) + TypeScript + Tailwind. Everything else in the original brief
(dashboards, LMS, booking, payments, Prisma schema, CRM, etc.) is scoped as
follow-up work — see **Roadmap** at the bottom.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Requires Node 18.17+.

## Design rationale

**Brand:** Aevian — from *aevum* (eternity) + *-ian*. The design thesis is
"learning built to last," expressed as a literal idea rather than a slogan:
a curriculum is a graph where one lesson unlocks the next. That idea is
drawn once, directly, as the site's signature visual — the **Learning
Constellation** (`components/ui/learning-constellation.tsx`) — and echoed
as a quiet horizontal rule between sections (`constellation-rule.tsx`)
instead of a generic wave or blob divider.

**Why not the "usual" AI-generated look:** the brief asked explicitly to
avoid neon. Beyond that, three looks currently dominate AI-generated
design — warm cream + high-contrast serif + terracotta; near-black + one
neon accent; or a broadsheet/newspaper grid. Aevian intentionally sits
outside all three: a cool grey-green paper tone (not cream), a muted
antique gold (not terracotta or neon), and a reading-oriented serif used
sparingly rather than as a decorative display face.

**Palette** (defined as CSS variables in `app/globals.css`, mapped into
Tailwind in `tailwind.config.ts`):

| Token | Hex | Role |
|---|---|---|
| `ink` | `#12181F` | Dark-mode ground / hero backdrop |
| `chalk` | `#F3F4F0` | Light-mode ground (cool, not cream) |
| `meridian` | `#1F3D46` | Primary — deep teal-indigo |
| `gold` | `#B8925A` | Accent — spent deliberately, never fills large surfaces |
| `slate` | `#5B6570` | Secondary neutral / muted text |
| `success` / `warning` / `danger` / `info` | see `globals.css` | Semantic states, both modes |

Dark mode is a full token swap (`.dark` class), not just an inverted
background — surfaces, borders, and semantic colors all get dedicated
values so contrast holds up.

**Typography:**
- **Display** — [Newsreader](https://fonts.google.com/specimen/Newsreader): a
  serif built for long reading, giving headlines an academic, unhurried
  gravitas without the high-contrast Didone look that's become a template
  signal.
- **Body** — [Public Sans](https://fonts.google.com/specimen/Public+Sans): a
  clean, civic grotesk optimized for legibility in dashboards and long
  copy.
- **Utility/mono** — [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono):
  course codes, timestamps, eyebrows, labels — anything that reads as
  "data" rather than prose.

**Numbering:** used only in "How it works," because that content is a real
four-step sequence. It's intentionally absent elsewhere (features, audience
benefits) where the content isn't actually ordered.

## Project structure

```
app/
  layout.tsx        Fonts, metadata, root shell
  page.tsx           Home page (assembles all sections below)
  globals.css         Design tokens (light + dark)
  robots.ts / sitemap.ts
components/
  layout/            Navbar, Footer
  home/               Hero, Stats, Features, HowItWorks, FeaturedCourses,
                       TeacherSpotlight, AudienceBenefits, Testimonials,
                       PricingPreview, Faq, Newsletter
  ui/                 Button, Badge, Container, SectionHeading,
                       LearningConstellation, ConstellationRule
docs/
  program-catalog.md Program & pricing content strategy specification
  automation-plan.md Automated scheduling & Zoom/WhatsApp notification architecture
lib/
  utils.ts            cn() class helper
  data/               Placeholder content (courses, testimonials, faq) —
                       swap for real data/Prisma queries later
```

Every component is a plain, reusable building block with no page-specific
logic baked in, so the same `Button`, `Badge`, `SectionHeading`, etc. carry
through to Courses, Pricing, and the dashboards later.

## What's intentionally not in this package

Per the original brief, the full platform also includes: authentication
(student/parent/teacher/admin), four role-based dashboards, the booking
wizard, Stripe-style payments/invoicing, an LMS (quizzes, homework,
certificates), a CMS-backed blog, a CRM/lead pipeline, notifications, and
the Prisma/Postgres schema behind all of it. None of that is stubbed here
so this package stays honest about what's real versus placeholder.

## Suggested next slices

1. **Prisma schema + Supabase setup** — the data model everything else
   depends on (Users/Roles, Courses/Modules/Lessons, Bookings, Payments).
2. **Book Free Trial wizard** — the highest-leverage conversion flow,
   using React Hook Form + Zod on top of this design system.
3. **Auth** (Supabase Auth) — student/parent/teacher/admin roles and
   protected routes.
4. **Parent & Student dashboards** — the two most-used logged-in surfaces.
5. **Courses listing + Course detail pages** — reusing `FeaturedCourses`'
   card pattern and data shape.

Happy to build any of these next — just say which.
