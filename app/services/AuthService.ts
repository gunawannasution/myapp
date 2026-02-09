import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginRequestDTO, LoginResponseDTO } from "../domain/users/UserDTO";
import { JWT_SECRET_NODE } from "../lib/auth";
import { InterfaceUserRepository } from "../repositories/IUserRepository";

export class AuthServices {
  constructor(private userRepository: InterfaceUserRepository) {}

  async login(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user || user.role !== "ADMIN") {
      throw new Error("Kredensial Tidak Valid");
    }

    const isMatch = await bcrypt.compare(payload.pass, user.password);
    if (!isMatch) {
      throw new Error("Password Salah");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET_NODE, // ✅ STRING
      { expiresIn: "1d" },
    );

    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
