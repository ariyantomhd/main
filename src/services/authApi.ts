// src/services/authApi.ts
import { fetchApi } from "./apiConfig";
import {
  LoginPayload,
  RegisterPayload,
} from "../types";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  data: {
    user: AuthUser;
    session?: {
      access_token: string;
      refresh_token: string;
    };
  };
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const authApi = {
  register: async (payload: RegisterPayload) => {
    return fetchApi<ApiResponse<{ message: string; userId: string }>>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login: async (payload: LoginPayload) => {
    return fetchApi<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout: async () => {
    return fetchApi<ApiResponse<{ message: string }>>("/api/auth/logout", {
      method: "POST",
    });
  },

  // Menyesuaikan backend: GET /api/auth/getMe (Menggunakan token dari header)
  me: async () => {
    return fetchApi<ApiResponse<AuthUser>>("/api/auth/getMe");
  },

  // Menyesuaikan backend: POST /api/auth/reset-password
  resetPassword: async (email: string) => {
    return fetchApi<ApiResponse<{ message: string }>>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Menyesuaikan backend: POST /api/auth/update-password
  updatePassword: async (payload: { accessToken: string; newPassword: string }) => {
    return fetchApi<ApiResponse<{ message: string }>>("/api/auth/update-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};