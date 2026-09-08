import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("Testing connection string:", connectionString?.split("@")[1]);
  const client = await pool.connect();
  const res = await client.query("SELECT email, role, name FROM \"User\" WHERE email = 'admin@aevian.com';");
  console.log("DB Query Result:", res.rows);
  client.release();
}

main().catch(console.error).finally(() => pool.end());
