-- Migration: Enable Row Level Security (RLS) on Postgres Tables
-- Purpose: Secondary defense layer for direct Supabase client SDK calls.

-- 1. Enable RLS on all sensitive tables
ALTER TABLE IF EXISTS "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "ParentProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "StudentProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "TeacherProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Enrollment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "HomeworkSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Notification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Lead" ENABLE ROW LEVEL SECURITY;

-- 2. Public Read Policies for Catalog Data
CREATE POLICY "Public courses viewable by all" ON "Course" FOR SELECT USING (published = true);
CREATE POLICY "Public blog posts viewable by all" ON "BlogPost" FOR SELECT USING (published = true);

-- 3. Authenticated User Policies (Backstop for Supabase Client SDK)
CREATE POLICY "Users can read own profile" ON "User" FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON "User" FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Students view own bookings" ON "Booking" FOR SELECT USING (
  student_id IN (SELECT id FROM "StudentProfile" WHERE user_id = auth.uid()::text)
);

CREATE POLICY "Teachers view assigned bookings" ON "Booking" FOR SELECT USING (
  teacher_id IN (SELECT id FROM "TeacherProfile" WHERE user_id = auth.uid()::text)
);
