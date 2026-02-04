import { User } from "../domain/users/userType";

export interface InterfaceUserRepository {
  findByEmail(email: string): Promise<User | null>;
}
