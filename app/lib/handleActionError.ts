import { ActionResult } from "./actionResult";
import { isPrismaError } from "./prismaError";

export function handleActionError(
  error: unknown,
  fallbackMessage = "Terjadi kesalahan",
): ActionResult {
  if (isPrismaError(error, "P2003")) {
    return {
      success: false,
      error: "Data masih digunakan oleh entitas lain",
    };
  }

  if (isPrismaError(error, "P2002")) {
    return {
      success: false,
      error: "Data sudah ada (duplikat)",
    };
  }

  return {
    success: false,
    error: fallbackMessage,
  };
}
