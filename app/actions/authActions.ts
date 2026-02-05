"use server";

import { cookies } from "next/headers"; // TAMBAHKAN INI
import { redirect } from "next/navigation"; // TAMBAHKAN INI
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

    // Gunakan await cookies() untuk Next.js 15
    const cookieStore = await cookies();
    cookieStore.set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    // Redirect harus di luar block try-catch atau dilempar ulang karena
    // redirect Next.js bekerja dengan melempar error khusus
  } catch (error: any) {
    return { success: false, message: error.message };
  }

  redirect("/admin/dashboard");
}
