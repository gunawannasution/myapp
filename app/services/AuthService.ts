import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginRequestDTO, LoginResponseDTO } from "../domain/users/UserDTO";
import { JWT_SECRET_NODE } from "../lib/auth";
import { InterfaceUserRepository } from "../repositories/IUserRepository";

type JwtPayload = {
  id: string;
  role: string;
};

export class AuthServices {
  constructor(private userRepository: InterfaceUserRepository) {}

  async login(
    payload: LoginRequestDTO,
    allowedRoles?: string[],
  ): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(payload.email);

    // Unified error to prevent user enumeration
    if (!user) {
      throw new Error("Kredensial tidak valid");
    }

    const isMatch = await bcrypt.compare(payload.pass, user.password);

    if (!isMatch) {
      throw new Error("Kredensial tidak valid");
    }

    // Optional role guard
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      throw new Error("Akses ditolak");
    }

    const tokenPayload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET_NODE, {
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
  }
}
