'use client';

import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export default function PasswordStrengthMeter({
  password = '',
}: PasswordStrengthMeterProps) {
  // Hitung skor kekuatan password (0 - 4)
  const calculateStrength = (pass: string): number => {
    let score = 0;
    if (!pass) return 0;

    // Kriteria 1: Minimal 8 karakter
    if (pass.length >= 8) score += 1;
    // Kriteria 2: Mengandung kombinasi huruf kecil & besar
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    // Kriteria 3: Mengandung angka
    if (/\d/.test(pass)) score += 1;
    // Kriteria 4: Mengandung simbol/spesial karakter
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    return score;
  };

  const score = calculateStrength(password);

  // Helper warna dan label berdasarkan skor
  const getStrengthConfig = (strength: number) => {
    switch (strength) {
      case 1:
        return { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', textColor: 'text-amber-500' };
      case 3:
        return { label: 'Good', color: 'bg-blue-500', textColor: 'text-blue-500' };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-500' };
      default:
        return { label: '', color: 'bg-slate-200 dark:bg-slate-700', textColor: 'text-slate-400' };
    }
  };

  const config = getStrengthConfig(score);

  if (!password) return null;

  return (
    <div className="mt-2 w-full flex flex-col gap-1.5">
      {/* Indicator Bars */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full rounded-full transition-all duration-300 ${
              score >= level
                ? config.color
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Label Keterangan */}
      <div className="flex justify-between items-center text-[11px] font-semibold">
        <span className="text-slate-500 dark:text-slate-400">
          Password strength:
        </span>
        <span className={`transition-colors duration-300 ${config.textColor}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}