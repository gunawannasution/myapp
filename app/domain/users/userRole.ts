export interface UserPublicDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}
