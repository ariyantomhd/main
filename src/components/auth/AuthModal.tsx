// src/components/auth/AuthModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import SignInTabs from '@/components/auth/SignInTabs';
import RegisterTabs from '@/components/auth/RegisterTabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 shadow-2xl shadow-indigo-500/15 rounded-3xl p-8 sm:p-10 transition-all duration-500 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block group mb-2">
            <div className="relative w-12 h-12 mx-auto overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image 
                src="/logo.png" 
                alt="Themavia Logo" 
                fill 
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <h1 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Themavia
            </h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-2xl mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'login' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'signup' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          <div>
            {/* Mengirimkan fungsi onClose ke onSuccess SignInTabs agar modal tertutup saat navigasi */}
            <SignInTabs onSuccess={onClose} />
            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Don&apos;t have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-indigo-500/40 underline-offset-4"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <RegisterTabs onSuccess={onClose} />
            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-indigo-500/40 underline-offset-4"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}