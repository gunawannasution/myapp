// prisma/seed.ts
import { prisma } from "@/app/lib/prisma.ts";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Sedang melakukan koneksi ke MariaDB...");

  try {
    // 1. Pastikan koneksi terjalin
    await prisma.$connect();

    console.log("Sedang membuat data admin...");
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // 2. Gunakan upsert
    const admin = await prisma.user.upsert({
      where: { email: "admin@hapesindo.com" },
      update: {},
      create: {
        email: "admin@hapesindo.com",
        name: "Super Admin Hapesindo",
        password: adminPassword,
        role: "ADMIN",
      },
    });
    // 3. Buat / Update User Biasa (Untuk tes: seharusnya ditendang oleh middleware jika akses /admin)
    const regularUser = await prisma.user.upsert({
      where: { email: "user@hapesindo.com" },
      update: { password: userPassword },
      create: {
        email: "user@hapesindo.com",
        name: "Customer Biasa",
        password: userPassword,
        role: "USER",
      },
    });

    console.log("✅ Seed Berhasil!");
    console.log("-----------------------------------------");
    console.log("Akses Admin:");
    console.log(`Email: ${admin.email} | Pass: admin123`);
    console.log("-----------------------------------------");
    console.log("Akses User Biasa (Tes Middleware):");
    console.log(`Email: ${regularUser.email} | Pass: user123`);
    console.log("-----------------------------------------");
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
