import { UserAuthDTO } from "../domain/users/UserDTO";
import { prisma } from "../lib/prisma";
import { InterfaceUserRepository } from "./IUserRepository";

export class UserRepository implements InterfaceUserRepository {
  async findByEmail(email: string): Promise<UserAuthDTO | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // ⬅️ WAJIB untuk login
        role: true,
      },
    });
  }
}
