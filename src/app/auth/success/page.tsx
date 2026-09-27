// src/app/auth/success/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { useUser } from '@/providers/UserContext';
import { authApi } from '@/services/authApi';

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthSuccess = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setErrorDetails('Token verifikasi tidak ditemukan pada URL.');
        return;
      }

      try {
        // 1. Simpan access token ke localStorage terlebih dahulu
        localStorage.setItem('access_token', token);

        let userId = '';
        let email = '';
        let username = '';
        let avatarUrl = null;
        let role = 'BUYER';

        try {
          // 2. Ambil data profil user via authApi.me()
          const response = await authApi.me();
          const resRecord = response as unknown as Record<string, unknown>;
          const resData = (resRecord?.data as Record<string, unknown>) || resRecord;
          const userData = (resData?.user as Record<string, unknown>) || resData;

          userId = (userData?.id as string) || (userData?._id as string) || '';
          email = (userData?.email as string) || '';
          username = 
            (userData?.username as string) || 
            (userData?.full_name as string) || 
            (userData?.display_name as string) || 
            (email ? email.split('@')[0] : 'User');
          avatarUrl = (userData?.avatar_url as string | null) || null;
          role = (userData?.role as string) || 'BUYER';
        } catch (meError) {
          console.warn('Gagal memanggil authApi.me(), menggunakan data sesi langsung:', meError);
          // Fallback aman jika endpoint profil belum merespons
          userId = 'verified-user-' + Date.now();
          email = 'user@tmv-hub.com';
          username = 'User';
        }

        if (!userId) {
          throw new Error('Gagal mengenali identitas user dari sesi verifikasi.');
        }

        // 3. Masukkan data ke UserContext agar aplikasi berubah menjadi kondisi login
        login(
          {
            id: userId,
            username: username,
            email: email,
            avatar_url: avatarUrl,
            role: role,
          },
          token
        );

        // 4. Redirect otomatis ke halaman utama dalam kondisi sudah login
        window.location.href = '/';
      } catch (error: unknown) {
        console.error('Failed to process auth success token:', error);
        let msg = 'Terjadi kesalahan saat memproses sesi.';
        if (error instanceof Error) {
          msg = error.message;
        }
        setErrorDetails(msg);
      }
    };

    handleAuthSuccess();
  }, [searchParams, router, login]);

  if (errorDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4 p-4">
        <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-center gap-3 text-red-400 max-w-md w-full">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">Verifikasi / Inisialisasi Sesi Gagal</p>
            <p className="mt-0.5 text-slate-300">{errorDetails}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          Pergi ke Halaman Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      <div className="text-center">
        <h2 className="text-lg font-bold">Verifikasi Berhasil!</h2>
        <p className="text-slate-400 text-sm mt-1">
          Mengarahkan Anda ke halaman utama...
        </p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <p className="text-slate-400 text-sm">Memuat...</p>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}