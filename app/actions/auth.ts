"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";
import { LoginSchema, type LoginFormState } from "@/lib/validations/auth";

export async function login(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.active) {
    return { message: "Invalid email or password." };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return { message: "Invalid email or password." };
  }

  await createSession(user.id, user.role);

  redirect(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
