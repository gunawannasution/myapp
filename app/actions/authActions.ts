"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionReponse, LoginRequestDTO } from "../domain/users/UserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "../services/AuthService";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

function sanitizeString(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const str = value.toString().trim();
  return str.length > 0 ? str : null;
}

function buildError(message: string): ActionReponse {
  return {
    success: false,
    message,
  };
}

export async function loginAction(
  _: ActionReponse | null,
  formData: FormData,
): Promise<ActionReponse> {
  try {
    const email = sanitizeString(formData.get("email"));
    const password = sanitizeString(formData.get("password"));

    if (!email || !password) {
      return buildError("Email dan password wajib diisi");
    }

    const payload: LoginRequestDTO = {
      email,
      password,
    };

    const result = await authService.login(payload);

    // WAJIB await untuk kompatibilitas versi
    const cookieStore = await cookies();

    cookieStore.set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  } catch (error: unknown) {
    console.error("[loginAction]", error);
    return buildError("Email atau password salah");
  }
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}
