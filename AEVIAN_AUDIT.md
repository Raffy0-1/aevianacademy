# Aevian Academy — Senior Dev Audit & Launch Readiness Report
**Reviewed:** production code export + live site (aevian-acadmey.vercel.app)
**Stack:** Next.js 15 (App Router) + Prisma 7 + Supabase (Auth/DB) + Vercel

## Verdict
**Not launch-ready.** The codebase is a well-styled Stage-1 scaffold — the schema file literally says so (`prisma/schema.prisma` line 2: *"Stage 1: data model only. TODO(stage-3): RLS policies, real payment provider."*). The AI agent built the data model, the UI, and the "happy path" screens, but stopped before wiring up security, payments, and any real backend automation. Visually it reads as ~80% done; functionally it's closer to ~35% done. Below is everything found, ordered by severity, followed by a portal-by-portal walkthrough and a prioritized fix roadmap.

---

## 1. Critical — fix before anyone else touches this site

### 1.1 Hard-coded admin backdoor password (in source, shipped to production)
`lib/actions/auth.ts` — the `signIn` function contains a literal credential check:
```
email === "aevian_admin" / "admin@aevian.com" / "aevian_admin@aevian.com"
password === "avn32"
```
Anyone who reads the deployed JS bundle or guesses this can log in as admin with **no database, no Supabase account, no MFA**. This must be deleted, not "hidden better."

### 1.2 A second, completely unprotected admin panel exists
There are **two admin routes**: `/dashboard/admin` (properly guarded — checks `role === "ADMIN"`, redirects otherwise) and a duplicate `/admin` (`app/admin/page.tsx`) that has **zero auth or role check**. It queries and renders the full user list, CRM leads, support tickets, bookings and courses to *anyone* who visits the URL, logged in or not. Combined with 1.1 (which redirects straight to `/admin`), this is a full data breach waiting to happen. This route also isn't covered by `middleware.ts`, which only guards `/dashboard/*`.

### 1.3 No real database-level access control (RLS)
Every sensitive file has a `// TODO(stage-3): RLS —` comment (bookings, enrollments, homework, profiles, courses, reviews). Right now, authorization is only checked *inside individual server actions/pages*, inconsistently. There is no Postgres Row Level Security, so any code path that talks to Prisma directly with a service-level connection can read/write anything, and any future API route that forgets a manual check is an open data leak. For a site handling children's data (student names, grades, parent contact info), this is a serious data-protection issue, not just a nice-to-have.

### 1.4 Silent total failure when env vars are missing/misconfigured
`lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/auth.ts`, and `middleware.ts` all fall back to a `"https://placeholder.supabase.co"` URL when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` aren't set correctly on Vercel. When that happens, `getCurrentUser()` just returns `null` everywhere — **no error is thrown or logged to the user**, dashboards silently redirect to `/login`, and the whole app *looks* like "login doesn't work" or "dashboard is broken" with no clue why. Given your description ("many key functions are not working"), this is the single most likely root cause and the first thing to verify: confirm the exact same Supabase URL/anon key/service key that are live in your Supabase project are set in Vercel's Production environment variables (not just `.env.local`), and that `DATABASE_URL` for Prisma points at the same Supabase Postgres instance.

### 1.5 `getCurrentUser` invents fake users when the DB write fails
In `lib/auth.ts`, if a Supabase-authenticated user doesn't yet have a matching Prisma `User` row and the auto-create `prisma.user.create(...)` throws, the code **fabricates a synthetic in-memory user** (`id: "temp-student"`, `hourlyRate: 50`, etc.) and returns it as if it were real, instead of surfacing the error. This can make a broken database connection look like a working one until someone tries to save data that references that fake ID and it fails.

---

## 2. High priority — the business can't actually run on this yet

### 2.1 There is no payment system
`Payment` and `Invoice` models exist in `prisma/schema.prisma` but are **never created or updated anywhere in the app** — they only appear in `prisma/seed.ts` (fake demo data). Every "Enroll" / "Start Free Trial" button on the pricing page and program pages routes to `/book-trial`, which only books a *free* trial call — there is no checkout, no Stripe/PayPal/JazzCash/Easypaisa integration, and no way for a parent to actually pay for the $79/$149/$259 monthly plans advertised on the homepage. This is the core revenue function of the business and it does not exist yet.

### 2.2 Contact form and newsletter signup are fake
`app/contact/page.tsx`: the submit handler is literally `await new Promise(resolve => setTimeout(resolve, 1000))` — it shows a fake "Thank you" message and **stores nothing**. No lead is created, no email is sent, no one on your team ever sees the message. The newsletter box on the homepage has the same problem — nothing is captured.

### 2.3 No email system at all
There is no email provider wired in anywhere (no Resend/SendGrid/Postmark/SMTP, no API keys referenced). This means: no welcome email on signup, no booking confirmation, no "your teacher submitted feedback" notification, no password reset email, no receipt/invoice email. `app/forgot-password/page.tsx` and `app/reset-password/page.tsx` both have `// TODO(stage-3): Wire to real Supabase/Resend password reset trigger` — password reset does not currently work end-to-end.

### 2.4 CRM is a shell
The admin panel can list and update lead status, but nothing on the public site actually creates a `Lead` — the contact form (2.2) and any "book a call"/newsletter capture don't feed it. So the CRM table in `/dashboard/admin` will stay empty in real use unless you manually add leads.

### 2.5 No automations
No automated emails, no reminder texts/emails before a booked class, no drip sequence for trial → paid conversion, no abandoned-signup follow-up, no admin alert when a new lead/booking/ticket comes in. Given this is explicitly an ed-tech business that depends on trial-to-paid conversion, this absence directly costs revenue.

### 2.6 Messaging & notifications are cosmetic
The homepage promises *"Message your teacher directly between classes"* and dashboards imply notifications, but `Message` and `Notification` Prisma models are **only ever touched by the seed script** — no real send/receive UI or server action exists. This is an advertised feature that doesn't work.

### 2.7 File/image upload silently degrades to fake data
`app/api/upload/route.ts` (used for homework submissions / profile photos via Cloudinary) returns a **dummy signature** (`"dummy-signature-123456"`) whenever Cloudinary env vars are missing, instead of failing loudly. If Cloudinary isn't configured on Vercel, uploads will appear to "succeed" in the UI while no file is actually stored anywhere.

### 2.8 Rate limiting won't work in production
`middleware.ts` implements rate limiting with an in-memory `Map`. On Vercel's serverless/edge platform, each request can hit a different function instance with its own empty memory, and the map resets on every cold start — so this limiter gives a false sense of protection against brute-force login/signup abuse.

### 2.9 Referral/affiliate program is a placeholder
`app/referral/page.tsx` shows a hard-coded fake link (`?code=MOCK_REF`) for every user rather than a real generated code tied to their account, so the referral program cannot actually track anyone.

---

## 3. Portal-by-portal walkthrough

### Public site / visitor journey
Landing page, Programs, Teachers, Pricing, FAQ, Blog, About, Countries pages are all built, on-brand, and content-complete — this part is genuinely close to launch quality visually. The break happens the moment a visitor tries to **act**: "Start Free Trial" → booking wizard (works, creates a `Booking` row) → but there is no path from there into an actual paid enrollment (2.1). Contact and newsletter forms both silently do nothing (2.2).

### Signup / Login
Signup lets a user pick Student/Parent/Teacher (Admin can't be self-selected — good) and creates both a Supabase auth user and a Prisma `User` row. Login works for real accounts, but also contains the backdoor in 1.1. Forgot/reset password are UI-only stubs (2.3). Email verification is listed as `TODO(stage-3)` — meaning anyone can sign up with any email, real or not, and immediately access a dashboard.

### Student portal (`/dashboard/student`)
Reasonably solid: fetches real enrollments/modules/lessons from Prisma with sensible fallbacks. Depends entirely on 1.4 being fixed (real Supabase env) and on enrollments actually existing — which currently only happens via the unfinished payment flow (2.1) or manual admin/database action, so a real new student has no way to get enrolled in a paid course today.

### Teacher portal (`/dashboard/teacher`)
Present but should be checked for the same class of issues: whether homework grading and availability-setting actions actually persist correctly, and whether a teacher can see only their own students (RLS gap in 1.3 means this is enforced only by an in-code filter, not by the database).

### Parent portal (`/dashboard/parent`)
Present; homepage promises attendance/homework/grades/invoices in one place, and "download invoices" — but since there are no real `Payment`/`Invoice` records ever created (2.1), this will show empty/broken states for any real family.

### Admin portal
Two versions exist (1.2) — this alone needs fixing before launch regardless of anything else. Once consolidated to the single guarded `/dashboard/admin` route, verify: user management, course management (publish/unpublish), CRM lead pipeline, and support tickets all actually write back through `lib/actions/admin.ts` (they appear to — the action file looks structurally sound), and that the fallback "demo numbers" (`fallbackStats` in `app/admin/page.tsx`, e.g. hardcoded `158 active users`) are never accidentally shown to a real admin as if they were live data.

---

## 4. UI/UX notes (lower priority — you're right that this part is already decent)
- Pricing, program, and teacher pages read as polished; the main visual gap is that nothing after the "buy" moment reflects a real commercial product yet (no cart/checkout state, no order confirmation, no invoice view with real data).
- Empty states matter a lot here: once payments/CRM/messaging are wired up, make sure every dashboard has a deliberate, on-brand empty state (e.g., "No classes booked yet — book your first trial") rather than a blank or broken-looking panel, since real new users will hit these constantly.
- Standardize form components (`login`, `signup`, `contact`, `reset-password` all hand-roll near-identical input markup) — low risk, but worth consolidating into a shared `<FormField>` while other fixes are in progress, purely to reduce future duplication bugs like the dual-admin-route issue.

---

## 5. Recommended fix order (phased)
1. **Security lockdown (do this first, today):** remove the hardcoded admin credential; delete or properly guard the duplicate `/admin` route (merge into `/dashboard/admin`); confirm production Supabase/DB env vars on Vercel are correct; add real Postgres RLS policies matching every `TODO(stage-3): RLS` comment.
2. **Make the core loop real:** payments/checkout (Stripe or a Pakistan-friendly processor like JazzCash/Easypaisa depending on your target market), then wire enrollment to a confirmed payment, then invoices/receipts in the parent dashboard.
3. **Close the trust gaps:** real contact form → CRM lead creation, real email delivery (Resend/SendGrid) for verification, password reset, booking confirmations, and admin alerts.
4. **Automations & retention:** trial-to-paid email/reminder sequences, class reminders, teacher-student messaging, notifications.
5. **Polish & hardening:** durable rate limiting (e.g. Upstash Redis instead of in-memory), real referral code generation, Cloudinary properly configured, remove all fallback/dummy data paths so failures are loud instead of silently faked.

---

## Bottom line
Your instinct is correct: this should not launch as-is. The good news is the data model (`schema.prisma`) is actually well-designed and already anticipates almost everything needed (Payment, Invoice, Message, Notification, DiscountCode, Certificate models all exist) — the work remaining is *wiring the front door to the house that's already built*, plus closing the two critical security holes above, rather than a redesign.
