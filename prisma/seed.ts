import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const email = "admin@hrmapp.local";
  const password = "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
      active: true,
    },
  });

  console.log("Seeded initial admin user:");
  console.log(`  email:    ${email}`);
  console.log(`  password: ${password}`);
  console.log("Change this password after first login.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
