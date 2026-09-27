// src/app/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Sesuaikan URL backend Express kamu (misal: http://localhost:5000/api/auth/forgot-password)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Gagal mengirim permintaan reset password.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Terjadi kesalahan pada server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold tracking-tight">
          Lupa Password?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Masukkan email akun Hub TMV kamu dan kami akan mengirimkan instruksi untuk mereset passwordmu.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl border border-slate-800 sm:rounded-xl sm:px-10">
          
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="bg-red-950/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center space-x-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Alamat Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Memproses...
                    </>
                  ) : (
                    'Kirim Instruksi Reset'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-950 border border-green-800">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Cek Email Anda</h3>
              <p className="text-sm text-slate-400">
                Kami telah mengirimkan tautan pemulihan password ke <span className="font-semibold text-slate-200">{email}</span>. Silakan periksa kotak masuk atau folder spam Anda.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Kirim ulang email
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center">
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