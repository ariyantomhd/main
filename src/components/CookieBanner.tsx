'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Cek apakah pengguna sudah pernah menyimpan pilihan cookie sebelumnya
    const consent = localStorage.getItem('themavia_cookie_consent');
    if (!consent) {
      // Munculkan banner setelah beberapa saat (opsional, misal 1 detik)
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('themavia_cookie_consent', 'all');
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('themavia_cookie_consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white/90 backdrop-blur-2xl border border-teal-100 shadow-2xl shadow-teal-900/10 rounded-3xl p-6 relative overflow-hidden">
        
        {/* Dekorasi Cahaya Pastel di Background Card */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-teal-100/60 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                <Cookie className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Your Privacy Matters</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            We use cookies to enhance your experience, analyze traffic, and serve personalized content. By clicking <span className="font-semibold text-slate-700">&quot;Accept all&quot;</span>, you consent to our use of cookies.{' '}
            <Link href="/privacy-policy" className="text-teal-600 hover:underline font-medium">
              Cookie Policy
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full sm:flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-teal-600/20 transition-all duration-200"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={handleRejectAll}
              className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all duration-200"
            >
              Reject all
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}