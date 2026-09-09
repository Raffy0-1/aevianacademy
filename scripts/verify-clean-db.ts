import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function checkDatabaseCountsDirect() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  console.log("==================================================");
  console.log("VERIFYING LIVE DATABASE COUNTS AFTER CLEANUP");
  console.log("==================================================");

  try {
    const resUsers = await pool.query(`SELECT COUNT(*) FROM "User"`);
    const resBookings = await pool.query(`SELECT COUNT(*) FROM "Booking"`);
    const resLeads = await pool.query(`SELECT COUNT(*) FROM "Lead"`);
    const resTickets = await pool.query(`SELECT COUNT(*) FROM "SupportTicket"`);
    const resCourses = await pool.query(`SELECT COUNT(*) FROM "Course"`);

    const usersList = await pool.query(`SELECT email, role FROM "User"`);

    console.log(`  Users count: ${resUsers.rows[0].count}`);
    console.log(`  Bookings count: ${resBookings.rows[0].count}`);
    console.log(`  Leads count: ${resLeads.rows[0].count}`);
    console.log(`  Support Tickets count: ${resTickets.rows[0].count}`);
    console.log(`  Courses count: ${resCourses.rows[0].count}`);
    console.log("\n  Remaining Accounts in DB:", usersList.rows);
    console.log("==================================================\n");
  } catch (err: any) {
    console.error("Error querying DB counts:", err.message);
  } finally {
    await pool.end();
  }
}

checkDatabaseCountsDirect();
