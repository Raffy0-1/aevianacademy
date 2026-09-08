# Aevian — Program Catalog, Pricing & Content Strategy

Compiled from `Aevian.docx`, `Aevian_Courses_Gudie.docx`, and
`Suggestions_for_Aevian.docx`. This is a **content and positioning spec**,
not a design or engineering spec — it defines what the platform teaches,
how it's priced, and how each page should be structured. It supersedes the
course/category assumptions baked into the placeholder data
(`lib/data/courses.ts`) and the original brief's "K-12 subjects only"
framing.

---

## 1. Positioning

Aevian is an **EdTech platform**, not a traditional tuition center. Two
candidate taglines:

- *"A Global Online Learning Platform Empowering Students Worldwide Through
  Personalized Tutoring, Academic Excellence Programs, and International
  Test Preparation."*
- *"Connecting Students Worldwide with Expert Teachers for Academic
  Success, Skill Development, and Global Opportunities."*

Core differentiators to foreground across the site (not just the homepage):

- **Global reach** — target students in Australia, UK, USA, Canada, Europe,
  Gulf/Middle East, and Pakistan/South Asia. **The UK is the primary target
  market** — expect most international traffic/enrollments to come from
  there, so GBP is the default display currency (see §3, §9).
- **Personalized learning** — one-to-one classes as the premium, flagship
  offering (not a video library).
- **International curriculum expertise** — IB, Cambridge/IGCSE, Australian
  Curriculum, UK Curriculum, American Curriculum.
- **Verified teachers** — profiles, qualifications, reviews build trust.
- **Flexible, timezone-aware scheduling.**

The site should not read as "just a tuition academy" — position it as a
global online education platform with room to expand into other services
later (consultancy, ed-tech tools, etc.).

---

## 2. The six core program areas

Every one of these should have real presence in navigation and be
individually explorable — not buried as sub-bullets of "Courses":

1. **International School Curriculum Tutoring** — Math, Physics, Chemistry,
   Biology, English, Computer Science, and other academic subjects, across
   IB, Cambridge/IGCSE, Australian, UK, and American curricula.
2. **Global School Assessment & Competitive Exam Preparation** — NAPLAN, UK
   SATs, Selective School Tests, CAT4, GL Assessment, MAP Growth, and
   similar entrance/assessment exams. (Called out specifically as an
   underserved niche — few Pakistani institutes target this market.)
3. **International Test Preparation** — IELTS, PTE, Duolingo English Test
   (DET), TOEFL, SAT, GRE, GMAT.
4. **Quran Learning Programs** — for overseas Muslim families specifically.
5. **English Language & Communication Skill Courses** — short, entry-level
   products (grammar, spoken English, business English, academic writing,
   presentation skills).
6. **Islamic Foundations & Basic Islamic Studies Programs** — structured
   short courses distinct from Quran reading (see §4).

---

## 3. Course catalog & pricing

**Three currencies throughout: GBP (primary/default — UK is the main
target market), USD (other international: USA, Australia, Canada, Gulf,
Europe), and PKR (Pakistan/South Asia).** Sell **packages and outcomes, not
bare hourly rates** (see §6) — the tables below are the underlying rate
card, not necessarily what's advertised verbatim on course cards.

> GBP figures below are a starting-point conversion from the original USD
> notes (~0.79 rate, rounded to clean numbers) — **treat these as estimates
> to sanity-check against actual UK market rates before publishing**, not
> final prices. UK tutoring/test-prep pricing sometimes runs its own market
> rate rather than a straight FX conversion.

### 3.1 One-to-One School & College Subject Tutoring
Subjects: Mathematics, Physics, Chemistry, Biology, English, Computer
Science, other school subjects.

| Package | UK (GBP) | International (USD) | Pakistan |
|---|---|---|---|
| Single class (1 hr) | £20 | $25 | PKR 1,500–2,500 |
| 8 classes/month | £125 | $160 | PKR 12,000–18,000 |
| 12 classes/month | £175 | $220 | PKR 18,000–25,000 |
| 20 classes/month | £275 | $350 | — |

Base hourly rate: £12–20 / $15–25/hr.

### 3.2 International Curriculum Tutoring (Premium)
Australian Curriculum, Cambridge, IGCSE, A Levels, IB, American Curriculum.
Priced higher — parents pay a premium for curriculum-specific expertise.

- £20–32 / $25–40/hr
- 8 classes/month: £175–235 / $220–300
- 12 classes/month: £235–355 / $300–450

### 3.3 Quran Teaching
One-to-one: Noorani Qaida, Quran Reading, Tajweed, Memorization (Hifz),
Islamic Studies.

| Package | UK (GBP) | International (USD) | Pakistan |
|---|---|---|---|
| 3 classes/week | £47–71/month | $60–90/month | PKR 5,000–10,000/month |
| 5 classes/week | £79–120/month | $100–150/month | — |

### 3.4 IELTS Preparation
- One-to-one: £16–28 / $20–35/hr
- Complete course (8 weeks — speaking practice, writing correction, mock
  tests, reading strategies, listening practice): **£200–315** UK,
  **$250–400** international, **PKR 35,000–60,000** Pakistan.

### 3.5 PTE Preparation (6–8 weeks)
- One-to-one: £16–28 / $20–35/hr, 3–5 classes/week, 45–60 min each
- Complete course: £200–315 UK / $250–400 international; PKR 35,000–60,000
  Pakistan (3–5 classes/week)

### 3.6 Duolingo English Test (DET) Preparation (4–6 weeks)
- One-to-one: £16–28 / $20–35/hr, 3–5 classes/week
- Complete course: £120–235 UK / $150–300 international; PKR 25,000–45,000
  Pakistan

### 3.7 TOEFL Preparation (6–8 weeks)
- One-to-one: £16–28 / $20–35/hr, 3–5 classes/week (practice tests,
  speaking practice, writing evaluations included)
- Complete course: £200–355 UK / $250–450 international; PKR 40,000–70,000
  Pakistan

### 3.8 SAT Preparation (8–12 weeks) — premium
Covers Math, Reading, Writing, practice tests.
- One-to-one: £28–47 / $35–60/hr
- Complete course: £315–555 UK / $400–700 international; PKR 60,000–100,000
  Pakistan

### 3.9 GRE Preparation (8–12 weeks) — premium (grad-level audience)
- One-to-one: £24–40 / $30–50/hr, 3–5 classes/week, 60 min each
- Complete course (mock tests, vocabulary, quant + verbal): £395–710 UK /
  $500–900 international; PKR 80,000–150,000 Pakistan

### 3.10 GMAT Preparation (10–12 weeks) — top premium tier
- One-to-one: £32–47 / $40–60/hr, 3–5 classes/week, 60 min each
- Complete course (full-length mocks, quant/verbal/data insights):
  £555–950 UK / $700–1,200 international; PKR 120,000–200,000 Pakistan

### 3.11 Competitive School Assessment Preparation (8–10 weeks)
NAPLAN, UK SATs, Selective School Tests, CAT4, GL Assessment, MAP Growth,
school entrance exams. Position as a premium international service — and
note UK SATs / Selective School Tests specifically will resonate with the
primary UK audience.
- One-to-one: £20–36 / $25–45/hr, 2–4 classes/week
- Complete course (practice papers, strategy, progress tracking): £235–475
  UK / $300–600 international; PKR 50,000–90,000 Pakistan

### 3.12 Short Courses (entry-level products)
Example flagship: **15-Day Grammar Mastery Course** — daily 45–60 min
sessions. £40–79 UK / $50–100 international; PKR 8,000–15,000 Pakistan.
Other short courses in this tier: Spoken English, Business English,
Academic Writing, Presentation Skills.

### 3.13 Islamic Foundations Course (1 month) — see §4 for full content

| Package | UK (GBP) | International (USD) | Pakistan |
|---|---|---|---|
| 3 classes/week (45 min) | £63–95/month | $80–120/month | PKR 8,000–12,000/month |
| 5 classes/week (45 min) | £95–140/month | $120–180/month | PKR 12,000–18,000/month |

### 3.14 Launch pricing quick-reference (starting prices, for a new institute)

| Service | UK (GBP) | International (USD) |
|---|---|---|
| School Subject Tutoring | £16/hour | $20/hour |
| International Curriculum Tutoring | £24/hour | $30/hour |
| Quran Classes | £79/month | $100/month |
| IELTS | £235/course | $300/course |
| TOEFL | £275/course | $350/course |
| SAT | £395/course | $500/course |
| GRE | £555/course | $700/course |
| GMAT | £710/course | $900/course |
| NAPLAN & Global Assessments | £315/course | $400/course |
| Grammar Short Course | £59/course | $75/course |

---

## 4. Islamic Education vertical (detail)

This is a distinct product line from generic Quran tutoring — a
structured, dated curriculum aimed at children and beginners.

**Islamic Foundations Course — Learn, Understand & Practice Islam**
*(suggested website description)*

> A comprehensive one-month online course designed for children and
> beginners to learn essential Islamic teachings, including Kalimas with
> translation, Articles of Faith (Iman Ke Shara'it), purification practices
> (Wudu, Ghusl, Tayammum), Namaz, and daily Islamic manners under the
> guidance of qualified teachers.

**Course content:**
- First 3 Kalimas with translation & explanation (Tayyibah, Shahadat,
  Tamjeed)
- Iman Ke Shara'it (Six Articles of Faith) — meaning and understanding of
  each
- Essential Islamic practices: Farz of Wudu, Farz of Ghusl, Farz of
  Tayammum
- Daily Islamic learning: basic Duas, Islamic manners (Adab), daily routine
- Namaz: importance of Salah, basic method, essential recitations and duas

**Suggested "Islamic Education Programs" sub-catalog:**
- Quran Reading with Tajweed
- Quran Memorization (Hifz Program)
- Islamic Foundations Course (1 Month)
- Namaz & Daily Duas Course
- Kids Islamic Studies Program

Rationale: many overseas Muslim families want a complete Islamic upbringing
program for their children, not just Quran reading — this broadens appeal
beyond the Quran-teaching competitive market. Note: the UK has a large
Muslim population, so this vertical is directly relevant to the primary UK
target market, not just Gulf/South Asian audiences.

---

## 5. Countries served

**UK (primary target)** · Australia · USA · Canada · UAE/Gulf Countries ·
Europe · Pakistan

Worth a dedicated "Countries We Serve" section/page — lead with the UK.

---

## 6. Pricing & messaging strategy

**Do not advertise bare hourly rates as the primary message.**
International education companies sell packages and outcomes.

- ❌ "Math tutoring — £16/hour"
- ✅ "Personalized Mathematics Mastery Program — Starting from £125/month"

Parents buy outcomes, not hours. Hourly rates can still exist as the
underlying unit (and should show somewhere for transparency/flexibility),
but package framing leads.

**Highest-priority revenue streams** (should get the most site real estate
and SEO investment):
1. International School Curriculum Tutoring
2. NAPLAN / UK SATs / Global School Assessment Preparation (UK SATs and
   Selective School Tests specifically map to the primary UK audience)
3. IELTS / TOEFL / PTE / Duolingo / SAT / GRE / GMAT Test Preparation
4. Quran Learning Programs for overseas Muslim families
5. English Language & Communication Skill Courses
6. Islamic Foundations & Basic Islamic Studies Programs

---

## 7. Suggested site structure

```
Home         → "Global Online Learning for Students Worldwide"

Programs
  - Academic Tutoring
  - International Test Preparation
  - School Assessment Preparation
  - Language & Skill Development
  - Quran Education
  - Islamic Foundations

For Students
  - Book a Free Trial Class
  - Choose Your Tutor
  - Personalized Learning Plans

For Teachers
  - Join as an Online Tutor
  - Become a Certified Instructor

Countries We Serve
  - UK, Australia, USA, Canada, UAE/Gulf, Europe, Pakistan
```

---

## 8. Page-level content requirements

Consolidated, deduplicated list of specific asks:

**Courses / Programs pages**
- Strong hero section on the Courses page explaining Aevian's global
  vision and key benefits, above the course listing.
- Group courses into clear categories: Academic Tutoring, Test Preparation,
  International Assessments, Quran & Islamic Education, Short Skill
  Courses — not one flat list.
- Every course needs: short description, target students, duration, and
  learning outcomes — not just a course name.
- Country-specific curriculum labels (Australian Curriculum, Cambridge,
  IB, UK Curriculum, American Curriculum) as filterable tags — UK
  Curriculum and Cambridge/IGCSE should be especially prominent given the
  primary UK audience.
- Course badges for quick scanning: "Best for School Students,"
  "University Admission," "International Curriculum," "Beginner Friendly."
- A prominent **Free Trial Class / Book Assessment** button on every course
  page, not just the homepage.

**Trust & credibility**
- "Why Choose Us?" section: expert tutors, flexible timings, global
  student base, personalized learning, progress tracking.
- Tutor profiles: qualifications, experience, subjects taught, intro
  videos.
- Testimonials from students and parents — especially overseas families,
  UK families in particular.
- Explain the teaching process as a visible flow: **Assessment → Tutor
  Matching → Personalized Learning Plan → Progress Reports.**

**Pricing**
- Present as packages — Starter / Standard / Premium — rather than a flat
  list of individual course prices (consistent with §6).
- Default currency displayed: **GBP**. Offer a currency switch to USD/PKR
  for other regions (see §9).

**Audience-specific pages**
- Dedicated **Parents** page: how they monitor attendance, progress,
  homework, and teacher feedback.
- Dedicated **Teachers/Tutors** page: opportunities to join the global
  teaching network (recruitment-oriented, distinct from the student-facing
  "Teachers" directory already planned).

**SEO**
- Separate landing pages per major service for search intent, e.g.:
  "IELTS Preparation Online," "NAPLAN Preparation Online," "Quran Classes
  Online," "Math Tutor Online." Each should be a real indexable page, not a
  filtered view of one generic courses page. Given the UK focus, prioritize
  UK-intent variants too where search volume supports it (e.g. "UK SATs
  Preparation Online," "GCSE/IGCSE Tutor Online").

**FAQ**
- Answer common parent questions: timings, fees, trial classes, teacher
  selection process, course duration.

**Future / not immediate**
- Multilingual support (Arabic and Urdu especially) to target Gulf and
  overseas Muslim families.
- Social media integration (Facebook, Instagram, LinkedIn, YouTube,
  TikTok, WhatsApp) — links/feeds to build trust, showcase student
  success, share educational content.
- Brand structure flexible enough to expand into other services
  (consultancy, ed-tech tools) later without a re-platform.

---

## 9. Currency handling

- **Default/primary display currency: GBP** — the UK is the main target
  market.
- **USD and PKR** as secondary currencies for other international
  (Australia/Canada/Gulf/Europe/USA) and Pakistan/South Asia audiences,
  respectively.
- Simplest viable implementation: a manual currency switcher (e.g. in the
  navbar or pricing sections), defaulting to GBP for everyone unless/until
  geolocation-based defaulting is worth the added complexity. IP-based
  auto-detection can come later — note it as a nice-to-have, not a
  blocker.
- The GBP figures in §3 are FX-estimate placeholders — get them reviewed
  against actual UK tutoring-market rates before they go live; competitors'
  published UK pricing is a better anchor than a straight USD conversion.
