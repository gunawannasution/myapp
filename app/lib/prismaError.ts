export function isPrismaError(
  error: unknown,
  code?: string,
): error is { code: string } {
  if (typeof error !== "object" || error === null) return false;
  if (!("code" in error)) return false;
  if (code) return error.code === code;
  return true;
}
