// src/components/auth/SocialAuthButtons.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SocialAuthButtonsProps {
  label?: string;
  onGoogleClick?: () => void;
}

export default function SocialAuthButtons({
  label = 'Or continue with',
  onGoogleClick,
}: SocialAuthButtonsProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    // Jika ada callback kustom yang dioper via props, jalankan itu dulu
    if (onGoogleClick) {
      onGoogleClick();
      return;
    }

    try {
      setLoading(true);

      // 🟢 Panggil Express Backend untuk mendapatkan URL OAuth Google Supabase
      const response = await fetch('http://localhost:5000/api/auth/google');
      
      const textResponse = await response.text();
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch {
        throw new Error(`Server Response Error: ${textResponse}`);
      }

      if (!response.ok || !result.url) {
        throw new Error(result.message || 'Gagal mendapatkan URL Google Auth');
      }

      // 🚀 Redirect browser user ke URL Google
      window.location.href = result.url;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';

      console.error('Google Auth Error Detail:', errorMessage);
      alert('Gagal autentikasi Google: ' + errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-slate-400 font-medium">
            {label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-xl text-sm font-semibold transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={18}
            height={18}
            className="w-4 h-4"
          />
          <span>{loading ? 'Connecting...' : 'Google'}</span>
        </button>
      </div>
    </div>
  );
}