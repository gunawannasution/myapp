// prisma/seed.ts
import { prisma } from "@/app/lib/prisma.ts";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Sedang melakukan koneksi ke MariaDB...");

  try {
    // 1. Pastikan koneksi terjalin
    await prisma.$connect();

    console.log("Sedang membuat data admin...");
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 2. Gunakan upsert
    const admin = await prisma.user.upsert({
      where: { email: "admin@hapesindo.com" },
      update: {},
      create: {
        email: "admin@hapesindo.com",
        name: "Super Admin Hapesindo",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Berhasil membuat admin:", admin.email);
  } catch (err) {
    throw err;
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed Error detail:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
