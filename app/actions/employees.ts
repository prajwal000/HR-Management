"use server";

import bcrypt from "bcryptjs";
import { Prisma, type Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { generateTemporaryPassword } from "@/lib/passwords";
import { sendWelcomeEmail } from "@/lib/email";
import {
  CreateEmployeeSchema,
  type CreateEmployeeFormState,
} from "@/lib/validations/employee";

export async function createEmployee(
  _state: CreateEmployeeFormState,
  formData: FormData
): Promise<CreateEmployeeFormState> {
  await requireAdmin();

  const validatedFields = CreateEmployeeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    department: formData.get("department") || undefined,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, role, department } = validatedFields.data;
  const temporaryPassword = generateTemporaryPassword();
  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role,
        department: department || null,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { errors: { email: ["An account with this email already exists."] } };
    }
    throw error;
  }

  await sendWelcomeEmail({ name, email, temporaryPassword });

  revalidatePath("/employees");
  return { success: true, message: `Account created for ${email}.` };
}

export async function updateEmployeeRole(userId: string, role: Role) {
  const admin = await requireAdmin();

  if (admin.id === userId) {
    throw new Error("You cannot change your own role.");
  }

  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/employees");
}

export async function setEmployeeActive(userId: string, active: boolean) {
  const admin = await requireAdmin();

  if (admin.id === userId) {
    throw new Error("You cannot deactivate your own account.");
  }

  await prisma.user.update({ where: { id: userId }, data: { active } });
  revalidatePath("/employees");
}
