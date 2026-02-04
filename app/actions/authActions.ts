"use server";

import { ActionReponse } from "../domain/users/UserDTO";
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

    (await cookies()).set("admin_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  }

  redirect("/admin/dashboard");
}
