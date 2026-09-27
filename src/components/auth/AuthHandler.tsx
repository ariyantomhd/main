// src/components/auth/AuthHandler.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/providers/UserContext';
import { authApi } from '@/services/authApi';
import type { User as UserType } from '@/types';

export default function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Supabase biasanya mengembalikan token di URL query / hash setelah verifikasi email
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      // Jika ada access_token langsung dari URL redirect (OAuth / Email Verification Callback)
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken);
        }

        try {
          // Memanggil authApi.me() tanpa argumen ID, menggunakan header Bearer token
          const response = await authApi.me(); 
          const responseData = response as unknown as { data?: UserType };
          const userData = responseData?.data || (response as unknown as UserType);

          if (userData && userData.id) {
            login(
              {
                id: userData.id,
                username: userData.username || '',
                email: userData.email || '',
                avatar_url: userData.avatar_url || null,
                role: userData.role || 'BUYER',
              },
              accessToken
            );
          }

          // Redirect bersih ke halaman utama dalam kondisi sudah login
          router.replace('/?verified=true');
        } catch (err) {
          console.error("Failed to fetch user profile after auth callback:", err);
          router.replace('/login');
        }
      } 
      // Jika menggunakan token_hash dari verifikasi email signup
      else if (tokenHash && type) {
        // Diarahkan ke halaman utama dengan status terverifikasi
        router.replace('/?verified=true');
      }
    };

    handleAuthCallback();
  }, [searchParams, router, login]);

  return null;
}