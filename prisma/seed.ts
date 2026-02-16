// prisma/seed.ts
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🔄 Menghubungkan ke database...");

  await prisma.$connect();

  try {
    console.log("🔄 Menyiapkan akun default...");

    // Gunakan cost 12 (lebih aman)
    const adminPasswordHash = await bcrypt.hash("admin123", 12);
    const userPasswordHash = await bcrypt.hash("user123", 12);

    await prisma.$transaction([
      prisma.user.upsert({
        where: { email: "admin@hapesindo.com" },
        update: {
          password: adminPasswordHash,
          role: "ADMIN",
          tokenVersion: 0,
          deletedAt: null,
        },
        create: {
          email: "admin@hapesindo.com",
          name: "Super Admin Hapesindo",
          password: adminPasswordHash,
          role: "ADMIN",
        },
      }),

      prisma.user.upsert({
        where: { email: "user@hapesindo.com" },
        update: {
          password: userPasswordHash,
          role: "USER",
          tokenVersion: 0,
          deletedAt: null,
        },
        create: {
          email: "user@hapesindo.com",
          name: "Customer Biasa",
          password: userPasswordHash,
          role: "USER",
        },
      }),
    ]);

    console.log("✅ Seed berhasil.");
    console.log("Admin  : admin@hapesindo.com / admin123");
    console.log("User   : user@hapesindo.com / user123");
  } catch (error) {
    console.error("❌ Seed gagal:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
