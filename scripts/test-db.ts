import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("Testing standard PrismaClient connection...");
  const admin = await prisma.user.findUnique({
    where: { email: "admin@aevian.com" },
  });
  console.log("Found admin user in DB:", admin);
}

main().catch(console.error).finally(() => prisma.$disconnect());
