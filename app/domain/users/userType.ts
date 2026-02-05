export type UserId = string;
export type UserRole = "ADMIN" | "USER";

export type User = {
  id: UserId;
  email: string;
  password?: string;
  name: string | null;
  role: UserRole;
  createdAt: Date;
};
