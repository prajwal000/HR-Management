import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const PUBLIC_ROUTES = new Set(["/"]);

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.has(path);

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = Boolean(session?.userId);

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && isAuthenticated) {
    const destination = session?.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  if (path.startsWith("/admin") && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)"],
};
