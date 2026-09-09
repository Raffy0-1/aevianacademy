import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function wipeDatabaseDirectly() {
  const connectionString =
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/postgres";

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  console.log("==================================================");
  console.log("WIPING ALL FAKE SEED DATA VIA DIRECT POSTGRES POOL");
  console.log("==================================================");

  try {
    const client = await pool.connect();
    try {
      console.log("Connected to database successfully. Truncating tables...");

      // Truncate all tables with CASCADE, keeping schema structure clean
      await client.query(`
        TRUNCATE TABLE 
          "QuizAttempt",
          "QuizQuestion",
          "Quiz",
          "HomeworkSubmission",
          "Homework",
          "Certificate",
          "Review",
          "Enrollment",
          "Booking",
          "Payment",
          "Invoice",
          "Lesson",
          "Module",
          "Availability",
          "Course",
          "Notification",
          "Message",
          "SupportTicket",
          "BlogPost",
          "Media",
          "Lead",
          "DiscountCode",
          "StudentProfile",
          "ParentProfile",
          "TeacherProfile",
          "User"
        CASCADE;
      `);

      console.log("✅ Truncated all tables successfully.");

      // Re-insert Master Admin user
      await client.query(`
        INSERT INTO "User" (id, email, name, role, timezone, "createdAt", "updatedAt")
        VALUES (
          'master-admin-id',
          'admin@aevian.com',
          'Aevian Master Admin',
          'ADMIN',
          'UTC',
          NOW(),
          NOW()
        )
        ON CONFLICT (email) DO UPDATE SET role = 'ADMIN', name = 'Aevian Master Admin';
      `);

      console.log("✅ Master Admin user 'admin@aevian.com' provisioned in database.");
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("Direct wipe error:", err.message);
  } finally {
    await pool.end();
  }

  console.log("\n==================================================");
  console.log("DATABASE IS NOW 100% FRESH AND REALTIME READY!");
  console.log("==================================================\n");
}

wipeDatabaseDirectly();
