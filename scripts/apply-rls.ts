import pg from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("Applying RLS migration to live Supabase Postgres database...");
  const sqlPath = path.join(process.cwd(), "supabase", "migrations", "01_enable_rls.sql");
  const sql = fs.readFileSync(sqlPath, "utf-8");

  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log("✅ RLS Migration SQL executed successfully!");

    // Query active RLS tables from pg_tables
    const tablesRes = await client.query(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' AND rowsecurity = true;
    `);

    // Query active RLS policies from pg_policies
    const activePolicies = await client.query(`
      SELECT tablename, policyname, cmd 
      FROM pg_policies 
      WHERE schemaname = 'public';
    `);

    console.log("\n==================================================");
    console.log("VERIFIED LIVE POSTGRES TABLES WITH RLS ENABLED:");
    console.table(tablesRes.rows);
    console.log("\nVERIFIED ACTIVE POSTGRES RLS POLICIES:");
    console.table(activePolicies.rows);
    console.log("==================================================\n");
  } finally {
    client.release();
  }
}

main().catch(console.error).finally(() => pool.end());
