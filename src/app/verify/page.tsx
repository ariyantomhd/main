// src/app/verify/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MailCheck, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';

export default function VerifyPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendSuccess(false);

    try {
      // Simulasi atau panggil API resend verification email backend kamu jika ada
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setResendSuccess(true);
    } catch (error) {
      console.error('Gagal mengirim ulang email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-950 border border-indigo-800 mb-4 shadow-lg shadow-indigo-500/10">
          <MailCheck className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Cek Email Anda
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
          Kami telah mengirimkan tautan verifikasi ke alamat email Anda. Silakan periksa kotak masuk atau folder spam untuk mengaktifkan akun Hub TMV Anda.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl border border-slate-800 sm:rounded-xl sm:px-10 space-y-6">
          
          {resendSuccess && (
            <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-200 px-4 py-3 rounded-lg text-sm text-center">
              Tautan verifikasi baru berhasil dikirim ulang!
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Mengirim ulang...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Kirim Ulang Email Verifikasi
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center pt-2 border-t border-slate-800">
            <Link
              href="/login"
              className="flex items-center text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke halaman Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}