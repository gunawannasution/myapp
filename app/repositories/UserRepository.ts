import { User } from "../domain/users/userType";
import { prisma } from "../lib/prisma";
import { InterfaceUserRepository } from "./IUserRepository";

export class UserRepository implements InterfaceUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return (await prisma.user.findUnique({
      where: { email }, // Prisma sudah tahu tipenya jika schema benar
    })) as User | null; // Casting di akhir jika diperlukan
  }
}
