/**
 * User dari database untuk kebutuhan AUTH
 * ⚠️ password WAJIB ADA
 */
export interface UserAuthDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}

/**
 * Data login dari client
 */
export interface LoginRequestDTO {
  email: string;
  pass: string;
}

/**
 * Data yang dikembalikan ke client
 * ⚠️ TANPA password
 */
export interface LoginResponseDTO {
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface ActionReponse {
  success: boolean;
  message?: string;
}
