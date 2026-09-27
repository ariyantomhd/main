// src/components/auth/SignInTabs.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/providers/UserContext';
import { authApi } from '@/services/authApi';

import FormInput from './FormInput';
import SocialAuthButtons from './SocialAuthButtons';

interface SignInTabsProps {
  onSuccess?: () => void;
}

export default function SignInTabs({ onSuccess }: SignInTabsProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useUser();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await authApi.login({ email, password });
      
      console.log('DEBUG FULL LOGIN RESPONSE:', response);

      const resRecord = response as unknown as Record<string, unknown>;
      const resData = (resRecord?.data as Record<string, unknown>) || resRecord;
      const userData = (resData?.user as Record<string, unknown>) || resData;

      const sessionObj = resData?.session as Record<string, unknown> | undefined;
      const accessToken =
        (sessionObj?.access_token as string) ||
        (resData?.access_token as string) ||
        (resData?.token as string) ||
        (resRecord?.token as string) ||
        (resRecord?.access_token as string);

      const userId = (userData?.id as string) || (userData?._id as string) || '';
      const userEmail = (userData?.email as string) || email;
      
      // Mengambil username dari data backend (bisa berupa username, full_name, atau fallback ke email)
      const username = 
        (userData?.username as string) || 
        (userData?.full_name as string) || 
        (userData?.display_name as string) || 
        email.split('@')[0];

      const avatarUrl = (userData?.avatar_url as string | null) || null;
      const role = (userData?.role as string) || 'BUYER';

      // Set session user sekaligus menyimpan access_token ke localStorage via UserContext
      login(
        {
          id: userId,
          username: username, // Menggunakan properti username yang sesuai dengan UserContext
          email: userEmail,
          avatar_url: avatarUrl,
          role: role,
        },
        accessToken
      );

      if (onSuccess) onSuccess();
      
      // Menggunakan window.location.href untuk memaksa reload halaman 
      // sehingga token terbaca sempurna oleh fetchApi saat dashboard dimuat
      window.location.href = '/dashboard';
    } catch (error: unknown) {
      console.error('Login Error:', error);
      
      let serverError = 'Failed to login. Please check your credentials.';
      if (error instanceof Error) {
        serverError = error.message;
      }
      
      setErrorMsg(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-full">
      {/* Email Field */}
      <FormInput
        label="Email Address"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        icon={Mail}
      />

      {/* Password Field */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Password
          </span>
          <Link
            href="/forgot-password"
            onClick={() => {
              if (onSuccess) onSuccess();
            }}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
        <FormInput
          label=""
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          icon={Lock}
          isPasswordToggle
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Error Message */}
      {errorMsg && (
        <div className="text-red-500 text-sm font-semibold text-center mt-2">
          {errorMsg}
        </div>
      )}

      {/* Social Auth Buttons */}
      <SocialAuthButtons label="Or continue with" />
    </form>
  );
}