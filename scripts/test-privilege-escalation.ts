import { updateUserRole } from "../lib/actions/admin";
import { Role } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Testing Privilege-Escalation Protection on updateUserRole action...");

  // Invoking updateUserRole without an active ADMIN session in server context
  const res = await updateUserRole("some-target-user-id", Role.ADMIN);

  console.log("\n==================================================");
  console.log("PRIVILEGE-ESCALATION TEST RESULT:");
  console.log("Action Result:", res);
  console.log("==================================================\n");

  if (res.error && res.error.includes("Unauthorized") || res.error?.includes("Forbidden")) {
    console.log("✅ SUCCESS: Non-admin attempt was correctly REJECTED with error:", res.error);
  } else {
    console.error("❌ FAILURE: Privilege escalation check failed!");
  }
}

main().catch(console.error);
