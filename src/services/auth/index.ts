'use client';

import { api } from '../../lib/api';
// Perbaikan: Import dari path yang benar sesuai struktur proyek Abang
import type { UserWithToken } from '../../types/marketplace'; 

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Helper internal untuk melakukan flattening/pembersihan data user dari API Backend.
 */
const transformAndFlattenUser = (rawUser: UserWithToken | null | undefined): UserWithToken | null => {
  if (!rawUser) return null;

  const anyUser = rawUser as any;

  return {
    ...rawUser,
    id: rawUser.id,
    email: rawUser.email,
    full_name: anyUser.full_name || '',
    username: anyUser.username || 'user',
    avatar_url: anyUser.avatar_url || null,
    role: anyUser.role || 'user',
    
    // Konversi nilai saldo ke float yang aman
    balance: typeof anyUser.balance === 'string' ? parseFloat(anyUser.balance) : (anyUser.balance || 0),
    affiliate_balance: typeof anyUser.affiliate_balance === 'string' ? parseFloat(anyUser.affiliate_balance) : (anyUser.affiliate_balance || 0),
    total_withdrawn: typeof anyUser.total_withdrawn === 'string' ? parseFloat(anyUser.total_withdrawn) : (anyUser.total_withdrawn || 0),
    
    createdAt: anyUser.createdAt || new Date().toISOString(),
    updatedAt: anyUser.updatedAt || new Date().toISOString(),
    token: rawUser.token
  } as UserWithToken;
};

export const authService = {
  async registerUser(payload: Record<string, string>) {
    return await api.auth.register(payload);
  },

  async loginUser(payload: Record<string, string>): Promise<ApiResponse<UserWithToken | null>> {
    const result = await api.auth.login(payload);
    
    if (result.success && result.data) {
      const cleanUser = transformAndFlattenUser(result.data as UserWithToken);
      
      if (cleanUser && cleanUser.token) {
        localStorage.setItem('demo_user', JSON.stringify(cleanUser));
        result.data = cleanUser;
      }
    }
    
    return result;
  },

  async loadCurrentUser(): Promise<ApiResponse<UserWithToken | null>> {
    const result = await api.auth.getCurrentUser();
    
    if (result.success && result.data) {
      const cleanUser = transformAndFlattenUser(result.data as UserWithToken);
      result.data = cleanUser;
    }
    
    return result;
  },

  async logoutUser() {
    // Pastikan hapus dari storage saat logout
    localStorage.removeItem('demo_user');
    return await api.auth.logout();
  }
};