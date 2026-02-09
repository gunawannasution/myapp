"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionReponse, LoginRequestDTO } from "../domain/users/UserDTO";
import { UserRepository } from "../repositories/UserRepository";
import { AuthServices } from "../services/AuthService";

export async function loginAction(
  prevState: ActionReponse | null,
  formData: FormData,
): Promise<ActionReponse> {
  const payload: LoginRequestDTO = {
    email: formData.get("email") as string,
    pass: formData.get("password") as string,
  };

  try {
    const userRepository = new UserRepository();
    const authService = new AuthServices(userRepository);

    const result = await authService.login(payload);

    const cookieStore = await cookies();
    cookieStore.set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Login gagal",
    };
  }

  // ⚠️ redirect HARUS di luar try-catch
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}
