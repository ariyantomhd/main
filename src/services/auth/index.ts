'use client';

// SOLUSI: Mengubah path alias '@/' menjadi jalur relatif agar langsung terbaca oleh compiler
import { api } from '../../lib/api';
import type { UserWithToken } from '../../lib/api';

// SOLUSI ESLINT: Menghapus import 'User' yang tidak terpakai agar tidak memicu error linter

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Helper internal untuk melakukan flattening/pembersihan data user dari API Backend.
 * Mengadopsi logika penataan desimal dan nilai default agar UI tidak crash.
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
    
    // Memastikan nilai saldo dikonversi ke number float javascript secara aman
    balance: typeof anyUser.balance === 'string' ? parseFloat(anyUser.balance) : (anyUser.balance || 0),
    affiliate_balance: typeof anyUser.affiliate_balance === 'string' ? parseFloat(anyUser.affiliate_balance) : (anyUser.affiliate_balance || 0),
    total_withdrawn: typeof anyUser.total_withdrawn === 'string' ? parseFloat(anyUser.total_withdrawn) : (anyUser.total_withdrawn || 0),
    
    createdAt: anyUser.createdAt || new Date().toISOString(),
    updatedAt: anyUser.updatedAt || new Date().toISOString(),
    token: rawUser.token // Pertahankan token JWT jika ada
  } as UserWithToken;
};

export const authService = {
  // 1. Mendaftarkan user baru via API
  async registerUser(payload: Record<string, string>) {
    return await api.auth.register(payload);
  },

  // 2. Login user, bersihkan datanya, lalu amankan ke localStorage
  async loginUser(payload: Record<string, string>): Promise<ApiResponse<UserWithToken | null>> {
    const result = await api.auth.login(payload);
    
    if (result.success && result.data) {
      // Jalankan proses transformasi agar data balance aman menjadi number float
      const cleanUser = transformAndFlattenUser(result.data);
      
      if (cleanUser && cleanUser.token) {
        localStorage.setItem('demo_user', JSON.stringify(cleanUser));
        result.data = cleanUser; // Kembalikan data yang sudah bersih ke store/UI
      }
    }
    
    return result;
  },

  // 3. Mengambil session user aktif saat reload halaman, lalu bersihkan datanya
  async loadCurrentUser(): Promise<ApiResponse<UserWithToken | null>> {
    const result = await api.auth.getCurrentUser();
    
    if (result.success && result.data) {
      const cleanUser = transformAndFlattenUser(result.data);
      result.data = cleanUser;
    }
    
    return result;
  },

  // 4. Logout dan bersihkan berkas sesi
  async logoutUser() {
    return await api.auth.logout();
  }
};
