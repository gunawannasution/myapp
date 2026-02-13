import { JWT_SECRET_EDGE } from "@/app/lib/auth";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const LOGIN_PATH = "/login";
const ADMIN_PREFIX = "/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  // ===============================
  // HANDLE ADMIN ROUTES
  // ===============================
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!token) {
      return redirectToLogin(req);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET_EDGE);

      if (payload.role !== "ADMIN") {
        return redirectToLogin(req);
      }

      return NextResponse.next();
    } catch {
      // token invalid / expired → hapus cookie
      const response = redirectToLogin(req);
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // ===============================
  // HANDLE LOGIN PAGE
  // ===============================
  if (pathname === LOGIN_PATH && token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET_EDGE);

      if (payload.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    } catch {
      // token invalid → biarkan lanjut ke login
    }
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
