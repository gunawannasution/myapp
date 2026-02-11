import { Prisma } from "@prisma/client";

/**
 * Error yang aman untuk ditampilkan ke user
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code = "APP_ERROR", status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/**
 * Normalisasi semua error ke AppError
 */
export function normalizeError(error: unknown): AppError {
  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new AppError("Data sudah ada", "DUPLICATE_DATA", 409);
      case "P2003":
        return new AppError(
          "Data masih digunakan oleh entitas lain",
          "FOREIGN_KEY",
          409,
        );
      default:
        return new AppError("Kesalahan database", "DB_ERROR", 500);
    }
  }

  // AppError (biarkan lewat)
  if (error instanceof AppError) {
    return error;
  }

  // Error biasa
  if (error instanceof Error) {
    return new AppError(error.message, "INTERNAL_ERROR", 500);
  }

  // Unknown
  return new AppError("Terjadi kesalahan tidak dikenal", "UNKNOWN", 500);
}
