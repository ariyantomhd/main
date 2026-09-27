// src/types/index.ts (atau file types Abang)
import { UserRole, AccountStatus } from './enum';

export interface User {
  id: string;
  email: string;
  password?: string;
  username: string; // Diubah dari display_name agar konsisten
  creator_number?: number;
  avatar_url: string | null;
  role: UserRole;
  status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string; // Mapping yang dikirim ke backend Express (dto.fullName)
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateUserProfileInput {
  username: string;
  avatar_url: string | null;
}

export interface UpdateUserPasswordInput {
  new_password: string;
}