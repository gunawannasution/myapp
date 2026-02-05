// middleware.ts (Letakkan di root folder, di luar folder app)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server"; // <--- WAJIB ADA INI

export function middleware(request: NextRequest) {
  // 1. Ambil token dari cookie (namanya sesuaikan dengan loginAction tadi)
  const token = request.cookies.get("admin_token")?.value;

  // 2. Ambil path yang sedang diakses
  const { pathname } = request.nextUrl;

  // 3. LOGIKA PROTEKSI
  // Jika mencoba akses folder /admin tapi tidak punya token
  if (pathname.startsWith("/admin") && !token) {
    // Tendang ke halaman login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah punya token tapi malah mau akses halaman login lagi
  if (pathname === "/login" && token) {
    // Lempar langsung ke dashboard
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// 4. CONFIG: Tentukan path mana saja yang akan diproses middleware ini
export const config = {
  matcher: [
    "/admin/:path*", // Proteksi semua yang diawali /admin
    "/login", // Cek juga saat di halaman login
  ],
};
