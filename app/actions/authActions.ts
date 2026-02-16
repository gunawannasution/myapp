"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResponse } from "../domain/users/UserDTO";
import { checkRateLimit } from "../lib/rateLimiter";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";

const authService = new AuthService(new UserRepository());

function sanitize(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const trimmed = value.toString().trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function loginAction(
  _: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const email = sanitize(formData.get("email"));
  const password = sanitize(formData.get("password"));

  if (!email || !password) {
    return {
      success: false,
      message: "Email dan password wajib diisi",
    };
  }

  try {
    checkRateLimit(email);

    const result = await authService.login({ email, password }, ["ADMIN"]);

    const cookieStore = cookies();

    cookieStore.set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    return {
      success: false,
      message: "Email atau password salah",
    };
  }

  // ⬇ redirect di luar try/catch
  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete("admin_token");
  return redirect("/login");
}
