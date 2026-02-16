import bcrypt from "bcryptjs";
import {
  LoginRequestDTO,
  LoginResponseDTO,
  UserRole,
} from "../domain/users/UserDTO";
import { signToken } from "../lib/jwt";
import { InterfaceUserRepository } from "../repositories/IUserRepository";

export class AuthService {
  constructor(private userRepository: InterfaceUserRepository) {}

  async login(
    payload: LoginRequestDTO,
    allowedRoles?: UserRole[],
  ): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(payload.email);

    if (!user || user.deletedAt) {
      throw new Error("Kredensial tidak valid");
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);

    if (!isMatch) {
      throw new Error("Kredensial tidak valid");
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      throw new Error("Akses ditolak");
    }

    const token = signToken({
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    return {
      user: {
        id: user.id,
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
    role?: UserRole;
  }) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email sudah digunakan");
    }

    const hashed = await bcrypt.hash(data.password, 12);

    return this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role ?? "USER",
    });
  }

  async invalidateUserSessions(userId: string) {
    return this.userRepository.incrementTokenVersion(userId);
  }
}
