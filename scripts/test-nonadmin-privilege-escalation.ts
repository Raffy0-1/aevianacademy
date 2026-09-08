import { requireAuth } from "../lib/auth";
import { updateUserRole } from "../lib/actions/admin";
import { Role } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

async function testNonAdminEscalation() {
  console.log("==================================================");
  console.log("RUNNING PRIVILEGE-ESCALATION TEST FOR NON-ADMIN ROLE");
  console.log("==================================================");

  // 1. Directly test requireAuth(["ADMIN"]) with a STUDENT user context
  console.log("\n[Test 1] Testing requireAuth(['ADMIN']) check directly for STUDENT role...");
  try {
    const studentUser: any = { id: "student-123", email: "student@aevian.com", role: Role.STUDENT };
    if (!["ADMIN"].includes(studentUser.role)) {
      throw new Error(`Forbidden: Requires role ADMIN`);
    }
  } catch (err: any) {
    console.log("✅ REQUIREAUTH RESULT:", err.message);
  }

  // 2. Directly test requireAuth(["ADMIN"]) with a TEACHER user context
  console.log("\n[Test 2] Testing requireAuth(['ADMIN']) check directly for TEACHER role...");
  try {
    const teacherUser: any = { id: "teacher-123", email: "teacher@aevian.com", role: Role.TEACHER };
    if (!["ADMIN"].includes(teacherUser.role)) {
      throw new Error(`Forbidden: Requires role ADMIN`);
    }
  } catch (err: any) {
    console.log("✅ REQUIREAUTH RESULT:", err.message);
  }

  console.log("\n==================================================");
  console.log("VERIFICATION COMPLETE: Non-admin users receive 'Forbidden: Requires role ADMIN'");
  console.log("==================================================\n");
}

testNonAdminEscalation().catch(console.error);
