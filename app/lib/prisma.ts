import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Fungsi untuk membuat instance prisma
const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10, // Naikkan sedikit ke 10 agar lebih aman
  });
  return new PrismaClient({ adapter });
};

// Deklarasi global agar instance tersimpan di memori Node.js saat dev mode
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Gunakan instance yang sudah ada atau buat baru jika belum ada
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

// Simpan ke global jika bukan di production
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
