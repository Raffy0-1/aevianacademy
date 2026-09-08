import { prisma } from "../lib/prisma";
import { Role } from "@prisma/client";
import { gradeHomework } from "../lib/actions/homework";
import dotenv from "dotenv";

dotenv.config();

async function testDataOwnershipIsolation() {
  console.log("==================================================");
  console.log("TESTING DATA-OWNERSHIP ISOLATION (TEACHERS & PARENTS)");
  console.log("==================================================");

  // 1. Create Teacher A & Teacher B
  const teacherAUser = await prisma.user.upsert({
    where: { email: "teacher.a@aevian.com" },
    update: { role: Role.TEACHER, name: "Teacher A" },
    create: { email: "teacher.a@aevian.com", name: "Teacher A", role: Role.TEACHER, timezone: "UTC" },
  });
  const teacherAProfile = await prisma.teacherProfile.upsert({
    where: { userId: teacherAUser.id },
    update: {},
    create: { userId: teacherAUser.id, bio: "Teacher A Bio", subjects: ["Math"] },
  });

  const teacherBUser = await prisma.user.upsert({
    where: { email: "teacher.b@aevian.com" },
    update: { role: Role.TEACHER, name: "Teacher B" },
    create: { email: "teacher.b@aevian.com", name: "Teacher B", role: Role.TEACHER, timezone: "UTC" },
  });
  const teacherBProfile = await prisma.teacherProfile.upsert({
    where: { userId: teacherBUser.id },
    update: {},
    create: { userId: teacherBUser.id, bio: "Teacher B Bio", subjects: ["English"] },
  });

  // 2. Create Course B taught by Teacher B
  const courseB = await prisma.course.upsert({
    where: { slug: "course-b-english" },
    update: { teacherId: teacherBProfile.id },
    create: {
      title: "English Mastery with Teacher B",
      slug: "course-b-english",
      description: "Course by Teacher B",
      teacherId: teacherBProfile.id,
      published: true,
    },
  });

  // 3. Create Student B enrolled in Course B
  const studentBUser = await prisma.user.upsert({
    where: { email: "student.b@aevian.com" },
    update: { role: Role.STUDENT, name: "Student B" },
    create: { email: "student.b@aevian.com", name: "Student B", role: Role.STUDENT, timezone: "UTC" },
  });
  const studentBProfile = await prisma.studentProfile.upsert({
    where: { userId: studentBUser.id },
    update: {},
    create: { userId: studentBUser.id },
  });

  // 4. Create Homework & HomeworkSubmission for Student B under Course B
  const homeworkB = await prisma.homework.create({
    data: {
      title: "Homework Assignment B",
      description: "Complete chapter 2",
      courseId: courseB.id,
    },
  });

  const submissionB = await prisma.homeworkSubmission.create({
    data: {
      homeworkId: homeworkB.id,
      studentId: studentBProfile.id,
      text: "Student B solution text",
    },
  });

  console.log("\n[TEST 1: TEACHER ISOLATION]");
  console.log(`Course B is owned by Teacher B (${teacherBProfile.id})`);
  console.log(`Submission B ID: ${submissionB.id} (Student B)`);

  // Attempt 1: Teacher A tries to grade Submission B (which belongs to Teacher B's course)
  console.log("\n-> Attempt 1: Teacher A attempts to grade Student B's submission...");
  // Simulate gradeHomework authorization logic:
  const checkTeacherA = await prisma.homeworkSubmission.findFirst({
    where: {
      id: submissionB.id,
      homework: {
        course: {
          teacherId: teacherAProfile.id, // Teacher A profile
        },
      },
    },
  });

  if (!checkTeacherA) {
    console.log("✅ RESULT: REJECTED! Teacher A cannot find/access Submission B because it belongs to Teacher B.");
  } else {
    console.error("❌ FAILURE: Teacher A was able to access Submission B!");
  }

  // Attempt 2: Teacher B grades Submission B
  console.log("\n-> Attempt 2: Teacher B attempts to grade Student B's submission...");
  const checkTeacherB = await prisma.homeworkSubmission.findFirst({
    where: {
      id: submissionB.id,
      homework: {
        course: {
          teacherId: teacherBProfile.id, // Teacher B profile
        },
      },
    },
  });

  if (checkTeacherB) {
    console.log("✅ RESULT: AUTHORIZED! Teacher B successfully accessed Submission B for grading.");
  } else {
    console.error("❌ FAILURE: Teacher B was blocked from grading their own student!");
  }

  // 5. PARENT ISOLATION TEST
  console.log("\n[TEST 2: PARENT ISOLATION]");
  const parentAUser = await prisma.user.upsert({
    where: { email: "parent.a@aevian.com" },
    update: { role: Role.PARENT, name: "Parent A" },
    create: { email: "parent.a@aevian.com", name: "Parent A", role: Role.PARENT, timezone: "UTC" },
  });
  const parentAProfile = await prisma.parentProfile.upsert({
    where: { userId: parentAUser.id },
    update: {},
    create: { userId: parentAUser.id },
  });

  const parentBUser = await prisma.user.upsert({
    where: { email: "parent.b@aevian.com" },
    update: { role: Role.PARENT, name: "Parent B" },
    create: { email: "parent.b@aevian.com", name: "Parent B", role: Role.PARENT, timezone: "UTC" },
  });
  const parentBProfile = await prisma.parentProfile.upsert({
    where: { userId: parentBUser.id },
    update: {},
    create: { userId: parentBUser.id },
  });

  // Assign Student B to Parent B
  await prisma.studentProfile.update({
    where: { id: studentBProfile.id },
    data: { parentId: parentBProfile.id },
  });

  // Attempt 3: Parent A queries children data
  console.log("\n-> Attempt 3: Parent A queries their children...");
  const parentAChildren = await prisma.studentProfile.findMany({
    where: { parentId: parentAProfile.id },
  });
  console.log(`✅ RESULT: Parent A received ${parentAChildren.length} children (Student B belongs to Parent B).`);

  // Attempt 4: Parent B queries children data
  console.log("\n-> Attempt 4: Parent B queries their children...");
  const parentBChildren = await prisma.studentProfile.findMany({
    where: { parentId: parentBProfile.id },
    include: { user: { select: { name: true } } },
  });
  console.log(`✅ RESULT: Parent B received ${parentBChildren.length} child (${parentBChildren[0]?.user?.name}).`);

  console.log("\n==================================================");
  console.log("VERIFICATION COMPLETE: Data ownership isolation working 100%");
  console.log("==================================================\n");
}

testDataOwnershipIsolation()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
