import { prisma } from "../lib/prisma";
import { InterfaceUserRepository } from "./IUserRepository";

export class UserRepository implements InterfaceUserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        tokenVersion: true,
        deletedAt: true,
      },
    });
  }
}
