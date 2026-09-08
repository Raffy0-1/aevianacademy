import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function auditRlsPolicies() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  console.log("==================================================");
  console.log("AUDITING POSTGRES ROW-LEVEL SECURITY (RLS) POLICIES");
  console.log("==================================================");

  try {
    // 1. Get all tables and their RLS status
    const tablesRes = await pool.query(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    // 2. Get all active policies
    const policiesRes = await pool.query(`
      SELECT tablename, policyname, roles, cmd, qual
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    console.log("\n1. TABLES WITH RLS ENABLED:");
    tablesRes.rows.forEach((t) => {
      console.log(`  - ${t.tablename}: rowsecurity = ${t.rowsecurity}`);
    });

    console.log("\n2. ACTIVE RLS POLICIES BY TABLE:");
    if (policiesRes.rows.length === 0) {
      console.log("  No policies found.");
    } else {
      policiesRes.rows.forEach((p) => {
        console.log(`  - Table: [${p.tablename}] | Policy: "${p.policyname}" | Command: ${p.cmd}`);
      });
    }

    const tablesWithPolicies = new Set(policiesRes.rows.map((p) => p.tablename));
    const tablesWithoutPolicies = tablesRes.rows
      .map((t) => t.tablename)
      .filter((t) => !tablesWithPolicies.has(t));

    console.log("\n3. SUMMARY GAP AUDIT:");
    console.log(`  Tables WITH active RLS policies (${tablesWithPolicies.size}):`, Array.from(tablesWithPolicies).join(", "));
    console.log(`  Tables WITHOUT active RLS policies (${tablesWithoutPolicies.length}):`, tablesWithoutPolicies.join(", "));
  } catch (err: any) {
    console.error("Error querying pg_policies:", err.message);
  } finally {
    await pool.end();
  }
}

auditRlsPolicies();
