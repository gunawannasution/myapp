export type UserRole = "ADMIN" | "USER";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}

export interface JwtPayload {
  sub: string;
  role: UserRole;
  tokenVersion: number;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
}
