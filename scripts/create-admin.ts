import { createClient } from "@supabase/supabase-js";
import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const adminEmail = "admin@aevian.com";
  const adminPassword = "AevianAdmin2026!";
  const adminName = "Aevian Master Admin";

  console.log(`Creating/Verifying Admin User: ${adminEmail}...`);

  // 1. Create Supabase Auth User
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: adminEmail,
    password: adminPassword,
    options: {
      data: {
        name: adminName,
        role: "ADMIN",
      },
    },
  });

  if (signUpError) {
    console.log("Supabase Auth SignUp Note:", signUpError.message);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (signInError) {
      console.error("Failed to sign in to existing Supabase user:", signInError.message);
    } else {
      console.log("Successfully verified Supabase Auth credentials for admin.");
    }
  } else {
    console.log("Successfully created Supabase Auth user:", signUpData.user?.id);
  }

  // 2. Upsert Prisma User with ADMIN role
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      name: adminName,
    },
    create: {
      email: adminEmail,
      name: adminName,
      role: Role.ADMIN,
      timezone: "UTC",
    },
  });

  console.log("✅ Verified Prisma User in DB:", user);
  console.log("\n==========================================");
  console.log("ADMIN LOGIN CREDENTIALS:");
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log("==========================================\n");
}

main()
  .catch((e) => {
    console.error("Error creating admin user:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
