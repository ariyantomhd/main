import React from 'react';

interface ResultProps {
  type: 'success' | 'fail';
  onRetry?: () => void;
}

export default function VerificationResult({ type, onRetry }: ResultProps) {
  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center max-w-sm w-full mx-4">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
          {isSuccess ? (
            <span className="text-4xl">✅</span>
          ) : (
            <span className="text-4xl">❌</span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {isSuccess ? 'Account Verified!' : 'Verification Failed'}
        </h2>
        <p className="text-slate-500 mb-8">
          {isSuccess 
            ? 'Selamat, akun Themavia kamu sudah aktif.' 
            : 'Kode OTP yang kamu masukkan salah atau sudah kedaluwarsa.'}
        </p>

        {isSuccess ? (
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
            Masuk ke Dashboard
          </button>
        ) : (
          <button 
            onClick={onRetry}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}