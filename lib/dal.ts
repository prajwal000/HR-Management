import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { decrypt, getSessionCookie } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const verifySession = cache(async () => {
  const cookie = await getSessionCookie();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/");
  }

  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      active: true,
    },
  });

  if (!user || !user.active) {
    redirect("/");
  }

  return user;
});

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }
  return user;
}
