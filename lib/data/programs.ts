export type PricingPackage = {
  name: string;
  priceGBP: number | string;
  priceUSD: number | string;
  pricePKR: number | string;
  features: string[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  targetStudents: string;
  duration: string;
  learningOutcomes: string[];
  badges: string[];
  curriculumTags: string[];
  pricing: PricingPackage[];
};

export type ProgramCategory = {
  id: string;
  title: string;
  description: string;
  courses: Course[];
};

export const programs: ProgramCategory[] = [
  {
    id: "academic-tutoring",
    title: "International School Curriculum Tutoring",
    description: "One-to-one personalized tutoring for school and college subjects across international curricula.",
    courses: [
      {
        slug: "school-subject-tutoring",
        title: "Personalized School Subject Tutoring",
        description: "Comprehensive one-to-one tutoring in Math, Physics, Chemistry, Biology, English, and Computer Science.",
        targetStudents: "Middle and High School Students",
        duration: "Flexible",
        learningOutcomes: ["Master core concepts", "Improve school grades", "Build strong foundational knowledge"],
        badges: ["Best for School Students"],
        curriculumTags: ["National Curriculum"],
        pricing: [
          { name: "8 Classes / Month", priceGBP: 125, priceUSD: 160, pricePKR: "12,000–18,000", features: ["1-on-1 tutoring", "Progress tracking", "8 hours of instruction"] },
          { name: "12 Classes / Month", priceGBP: 175, priceUSD: 220, pricePKR: "18,000–25,000", features: ["1-on-1 tutoring", "Progress tracking", "12 hours of instruction"] },
          { name: "20 Classes / Month", priceGBP: 275, priceUSD: 350, pricePKR: "Custom", features: ["1-on-1 tutoring", "Progress tracking", "20 hours of instruction"] },
        ],
      },
      {
        slug: "international-curriculum-tutoring",
        title: "International Curriculum Expertise",
        description: "Premium tutoring specifically tailored for rigorous international curricula.",
        targetStudents: "IB, Cambridge/IGCSE, A-Level, and American Curriculum Students",
        duration: "Flexible",
        learningOutcomes: ["Excel in international board exams", "Complete challenging assignments", "Deep understanding of curriculum rubrics"],
        badges: ["International Curriculum", "University Admission"],
        curriculumTags: ["IB", "Cambridge", "IGCSE", "A Levels", "UK Curriculum", "American Curriculum", "Australian Curriculum"],
        pricing: [
          { name: "8 Classes / Month", priceGBP: 175, priceUSD: 220, pricePKR: "Custom", features: ["Expert curriculum tutor", "Past paper practice", "8 hours of instruction"] },
          { name: "12 Classes / Month", priceGBP: 235, priceUSD: 300, pricePKR: "Custom", features: ["Expert curriculum tutor", "Past paper practice", "12 hours of instruction"] },
        ],
      }
    ]
  },
  {
    id: "school-assessment",
    title: "Global School Assessment Preparation",
    description: "Targeted preparation for competitive school assessments and entrance exams worldwide.",
    courses: [
      {
        slug: "competitive-school-assessment",
        title: "Competitive School Assessment Prep",
        description: "Intensive preparation for NAPLAN, UK SATs, Selective School Tests, CAT4, GL Assessment, and MAP Growth.",
        targetStudents: "Primary and Middle School Students applying to selective schools",
        duration: "8–10 weeks",
        learningOutcomes: ["Familiarity with exam formats", "Time management strategies", "Confidence in test-taking"],
        badges: ["Highly Competitive", "Premium Selection"],
        curriculumTags: ["UK SATs", "NAPLAN", "CAT4", "GL Assessment"],
        pricing: [
          { name: "Complete Course", priceGBP: 235, priceUSD: 300, pricePKR: "50,000–90,000", features: ["Practice papers", "Test strategy", "Progress tracking"] },
        ],
      }
    ]
  },
  {
    id: "test-preparation",
    title: "International Test Preparation",
    description: "Expert guidance for achieving high scores in international English proficiency and standardized tests.",
    courses: [
      {
        slug: "ielts-preparation",
        title: "IELTS Preparation Masterclass",
        description: "Comprehensive preparation covering speaking, writing, reading, and listening for the IELTS exam.",
        targetStudents: "University Applicants & Immigrants",
        duration: "8 weeks",
        learningOutcomes: ["Band 7.0+ strategies", "Mock test experience", "Targeted writing correction"],
        badges: ["Most Popular", "University Admission"],
        curriculumTags: ["IELTS"],
        pricing: [
          { name: "Complete Course", priceGBP: 235, priceUSD: 300, pricePKR: "35,000–60,000", features: ["Mock tests", "Writing correction", "Speaking practice"] },
        ]
      },
      {
        slug: "sat-preparation",
        title: "SAT Preparation Premium",
        description: "In-depth SAT preparation covering Math, Reading, and Writing to maximize your score.",
        targetStudents: "High School Students aiming for US Universities",
        duration: "8–12 weeks",
        learningOutcomes: ["Score improvement strategies", "Full-length mock tests", "Concept mastery"],
        badges: ["Premium", "University Admission"],
        curriculumTags: ["SAT"],
        pricing: [
          { name: "Complete Course", priceGBP: 395, priceUSD: 500, pricePKR: "60,000–100,000", features: ["Full-length mocks", "Targeted practice", "Score guarantee"] },
        ]
      }
    ]
  },
  {
    id: "language-skills",
    title: "English Language & Communication Skills",
    description: "Targeted programs to improve spoken fluency, grammar, and formal writing for school exams.",
    courses: [
      {
        slug: "grammar-mastery",
        title: "15-Day Grammar Mastery",
        description: "Intensive short course to solidify English grammar fundamentals for school assessments.",
        targetStudents: "Primary and High School Students",
        duration: "15 Days (daily 45-60min)",
        learningOutcomes: ["Flawless sentence structure", "Confidence in exam writing", "Correction of common syntax errors"],
        badges: ["School Support", "Short Course"],
        curriculumTags: ["UK Curriculum", "Australian Curriculum"],
        pricing: [
          { name: "Complete Course", priceGBP: 59, priceUSD: 75, pricePKR: "8,000–15,000", features: ["Daily 1-on-1 sessions", "Interactive exam exercises"] },
        ]
      }
    ]
  },
  {
    id: "e-skills-coming-soon",
    title: "E-Skills & Professional Certifications",
    description: "Generic skill courses, coding bootcamps, and professional certificates (Launching soon).",
    courses: [
      {
        slug: "coding-for-kids-coming-soon",
        title: "Python & Creative Coding",
        description: "Interactive programming for young learners (Enrollments opening soon).",
        targetStudents: "Ages 10–16",
        duration: "Coming Soon",
        learningOutcomes: ["Computational logic", "Python fundamentals", "Project creation"],
        badges: ["Coming Soon"],
        curriculumTags: ["E-Skills"],
        pricing: [
          { name: "Notify Me", priceGBP: 0, priceUSD: 0, pricePKR: "Coming Soon", features: ["Priority notification list"] },
        ]
      }
    ]
  },
  {
    id: "quran-education",
    title: "Quran Recitation & Islamic Foundations",
    description: "Dedicated 1-on-1 Quran Recitation, Tajweed, and essential Islamic teachings for overseas families with verified teachers.",
    courses: [
      {
        slug: "quran-reading",
        title: "Quran Recitation & Tajweed Mastery",
        description: "Learn to recite the Holy Quran fluently with proper Tajweed rules and precise pronunciation from qualified certified instructors.",
        targetStudents: "Children and Adults",
        duration: "Ongoing (40-min sessions)",
        learningOutcomes: ["Fluent Quran Recitation", "Correct Makharij & Tajweed Rules", "Mazz & Qirat Practice"],
        badges: ["1-on-1 Learning", "Recitation Focus"],
        curriculumTags: ["Quran Recitation", "Tajweed"],
        pricing: [
          { name: "3 Classes / Week", priceGBP: 79, priceUSD: 100, pricePKR: "5,000–10,000", features: ["1-on-1 Recitation attention", "Tajweed focus", "Dedicated 40-min slots"] },
        ]
      },
      {
        slug: "islamic-foundation-essential-teachings",
        title: "Islamic Foundation & Essential Teachings",
        description: "Fundamental Islamic learning covering Imaan ki Shartein, First 3 Kalimas with translation, Namaz, Azan, and essential daily Duas.",
        targetStudents: "Young Learners & Beginners",
        duration: "Flexible (40-min sessions)",
        learningOutcomes: [
          "Imaan ki Shartein (Articles of Faith)",
          "First 3 Kalimas with word-by-word translation",
          "Complete Namaz (Salah) step-by-step & Azan recitation",
          "Essential daily Duas & Islamic etiquette"
        ],
        badges: ["Essential Foundation", "1-on-1 Mentorship"],
        curriculumTags: ["Islamic Foundations", "Kalimas & Namaz", "Essential Duas"],
        pricing: [
          { name: "3 Classes / Week", priceGBP: 75, priceUSD: 95, pricePKR: "5,000–9,000", features: ["1-on-1 guidance", "Kalima & Namaz practice", "Interactive learning"] },
          { name: "5 Classes / Week", priceGBP: 110, priceUSD: 140, pricePKR: "8,000–14,000", features: ["Accelerated track", "Daily Duas & Azan", "Parent progress dashboard"] }
        ]
      }
    ]
  }
];

