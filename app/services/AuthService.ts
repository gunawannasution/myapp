import bcrypt from "bcryptjs";
import { jwt } from "zod";
import { LoginRequestDTO, LoginResponseDTO } from "../domain/users/UserDTO";
import { InterfaceUserRepository } from "../repositories/IUserRepository";

export class AuthServices {
  constructor(private userRepository: InterfaceUserRepository) {}

  async login(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user || user.role !== "ADMIN") {
      throw new Error("Kredensial Tidak Valid");
    }
    const isMatch = await bcrypt.compare(payload.pass, user.password);
    if (!isMatch) throw new Error("Password Salah");

    const token = jwt.toString(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret_gunawan_app",
      { expiresIn: "id" },
    );

    return {
      user: { name: user.name, email: user.email, role: user.role },
      token,
    };
  }
}
