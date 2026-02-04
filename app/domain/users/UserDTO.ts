export type LoginRequestDTO = {
  email: string;
  pass: string;
};

export type LoginResponseDTO = {
  user: {
    name: string | null;
    email: string;
    role: string;
  };
  token: string;
};

export type ActionReponse = {
  success: boolean;
  message?: string;
};
