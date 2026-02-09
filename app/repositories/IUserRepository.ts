import { UserAuthDTO } from "../domain/users/UserDTO";

export interface InterfaceUserRepository {
  findByEmail(email: string): Promise<UserAuthDTO | null>;
}
