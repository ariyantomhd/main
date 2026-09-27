// src/app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Supabase biasanya mengirim token di hash (access_token=...) atau query params (code=...)
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);
      
      let token = '';
      if (hash) {
        const params = new URLSearchParams(hash.replace('#', '?'));
        token = params.get('access_token') || '';
      } else {
        token = searchParams.get('access_token') || searchParams.get('code') || '';
      }

      if (!token) {
        alert('Autentikasi Google gagal: Token tidak ditemukan.');
        router.push('/');
        return;
      }

      try {
        // Kirim token tersebut ke backend Express Anda untuk divalidasi dan dibuatkan sesi
        const response = await fetch('http://localhost:5000/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Gagal memproses login Google di server.');
        }

        // Simpan token/session ke localStorage atau cookie sesuai kebutuhan frontend Anda
        // Contoh: localStorage.setItem('token', result.data.token);

        // Berhasil, arahkan ke beranda
        router.push('/');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
        console.error('Auth Callback Error:', errorMessage);
        alert('Gagal login: ' + errorMessage);
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Authenticating with Google...</h2>
        <p className="text-sm text-slate-400 mt-2">Please wait while we set up your session.</p>
      </div>
    </div>
  );
}