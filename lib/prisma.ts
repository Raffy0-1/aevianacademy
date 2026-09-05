import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  try {
    const connectionString =
      process.env.DATABASE_URL ||
      process.env.DIRECT_URL ||
      "postgresql://postgres:postgres@localhost:5432/postgres";

    const pool = new pg.Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: connectionString.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });

    pool.on("error", (err) => {
      console.warn("Prisma pg pool warning:", err.message);
    });

    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  } catch (err) {
    console.warn("PrismaPg adapter initialization warning, using standard client:", err);
    try {
      return new PrismaClient();
    } catch (fallbackErr) {
      console.error("PrismaClient fallback failed:", fallbackErr);
      return new PrismaClient();
    }
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
