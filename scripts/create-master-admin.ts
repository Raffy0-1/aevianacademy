import { createClient } from "@supabase/supabase-js";
import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const masterEmail = "admin@aevian.com";
  const masterPassword = "AevianAdmin2026!";
  const masterName = "Aevian Master Admin";

  console.log("==========================================");
  console.log("PROVISIONING MASTER ADMIN ACCOUNT");
  console.log("==========================================");

  // 1. Create/verify in Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: masterEmail,
    password: masterPassword,
    options: {
      data: {
        name: masterName,
        role: "ADMIN",
      },
    },
  });

  if (signUpError) {
    console.log("Supabase Auth Note:", signUpError.message);
  } else {
    console.log("Created Supabase Auth user:", signUpData.user?.id);
  }

  // 2. Create/upsert in Prisma DB
  const user = await prisma.user.upsert({
    where: { email: masterEmail },
    update: {
      role: Role.ADMIN,
      name: masterName,
    },
    create: {
      email: masterEmail,
      name: masterName,
      role: Role.ADMIN,
      timezone: "UTC",
    },
  });

  console.log("Verified Prisma Admin User row:", user.email, "Role:", user.role);

  console.log("\n==========================================");
  console.log("REAL ADMIN CREDENTIALS FOR TESTING:");
  console.log(`URL: http://localhost:3000/login`);
  console.log(`Email: ${masterEmail}`);
  console.log(`Password: ${masterPassword}`);
  console.log("==========================================\n");
}

main().catch(console.error).finally(() => prisma.$disconnect());
