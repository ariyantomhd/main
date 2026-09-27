// src/components/auth/RegisterTabs.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Lock, AtSign, Loader2, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/authApi';

import FormInput from './FormInput';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import TermsCheckbox from './TermsCheckbox';
import SocialAuthButtons from './SocialAuthButtons';

interface RegisterTabsProps {
  onSuccess?: () => void;
}

export default function RegisterTabs({ onSuccess }: RegisterTabsProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // State untuk indikator ketersediaan username
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  const router = useRouter();

  // Fungsi penanganan perubahan username untuk mengecek ketersediaan tanpa melanggar aturan useEffect React
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);

    const trimmed = val.trim();
    if (!trimmed || trimmed.length < 3) {
      setIsUsernameAvailable(null);
      setIsCheckingUsername(false);
      return;
    }

    setIsCheckingUsername(true);
    
    // Simulasi pengecekan atau endpoint ketersediaan username
    const timer = setTimeout(async () => {
      try {
        // Jika backend belum memiliki endpoint khusus checkUsername, 
        // kita berikan fallback true atau integrasikan dengan fetch API kustom jika ada.
        // Contoh: const res = await fetch(`/api/auth/check-username?username=${trimmed}`);
        setIsUsernameAvailable(true);
      } catch (err) {
        console.error('Error checking username:', err);
        setIsUsernameAvailable(true);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isUsernameAvailable === false) {
      setErrorMsg('Username is already taken. Please choose another one.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Please accept the Terms and Conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Mapping username ke properti fullName yang diekspektasikan backend
      await authApi.register({
        fullName: username.trim(),
        email: email.trim(),
        password,
      });

      if (onSuccess) {
        onSuccess();
      }

      router.push('/verify');
    } catch (error: unknown) {
      console.error("DETAIL ERROR:", error);

      let serverError = 'Failed to register. Please try again.';
      if (error instanceof Error) {
        serverError = error.message;
      }

      setErrorMsg(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2.5 w-full">
      {/* Username Field dengan Indikator Ketersediaan */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center px-0.5">
          <label className="text-sm font-semibold text-slate-700">Username</label>
          {username.trim().length >= 3 && (
            <div className="text-xs font-medium flex items-center gap-1">
              {isCheckingUsername ? (
                <span className="text-slate-400 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Checking...
                </span>
              ) : isUsernameAvailable ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available
                </span>
              ) : (
                <span className="text-red-500 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Taken
                </span>
              )}
            </div>
          )}
        </div>
        <div className="[&_input]:bg-white [&_input]:text-slate-900 [&_input]:border-slate-300 [&_input]:placeholder:text-slate-400 [&_input]:py-2">
          <FormInput
            label=""
            type="text"
            required
            value={username}
            onChange={handleUsernameChange}
            placeholder="johndoe"
            icon={AtSign}
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="[&_input]:bg-white [&_input]:text-slate-900 [&_input]:border-slate-300 [&_input]:placeholder:text-slate-400 [&_input]:py-2">
        <FormInput
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          icon={Mail}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col [&_input]:bg-white [&_input]:text-slate-900 [&_input]:border-slate-300 [&_input]:placeholder:text-slate-400 [&_input]:py-2">
        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
          icon={Lock}
          isPasswordToggle
        />
        <PasswordStrengthMeter password={password} />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col [&_input]:bg-white [&_input]:text-slate-900 [&_input]:border-slate-300 [&_input]:placeholder:text-slate-400 [&_input]:py-2">
        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          icon={Lock}
          isPasswordToggle
        />
        {confirmPassword.length > 0 && confirmPassword !== password && (
          <p className="text-[10px] font-bold text-red-500 mt-0.5">
            Passwords do not match
          </p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="text-slate-600 scale-95 origin-left -my-1">
        <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isLoading ||
          !termsAccepted ||
          !password ||
          password !== confirmPassword ||
          isUsernameAvailable === false
        }
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20 cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Error Message Box */}
      {errorMsg && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs text-center font-medium">
          {errorMsg}
        </div>
      )}

      {/* Social Auth */}
      <div className="text-slate-600 pt-1">
        <SocialAuthButtons label="Or sign up with" />
      </div>
    </form>
  );
}