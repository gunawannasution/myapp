/**
 * Data user dari database untuk proses AUTH
 * ⚠️ Jangan pernah dikirim ke client
 */
export interface UserAuthDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  tokenVersion: number;
}

/**
 * Data login dari client
 */
export interface LoginRequestDTO {
  email: string;
  password: string; // ganti pass → konsisten
}

/**
 * Data yang dikembalikan ke client
 * ⚠️ TANPA password
 */
export interface LoginResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
}
