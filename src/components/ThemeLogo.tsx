// src/components/ThemeLogo.tsx
'use client';

import React from 'react';

interface ThemeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeLogo({ className = '', size = 'md' }: ThemeLogoProps) {
  // Pengaturan ukuran font berdasarkan props
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center font-black tracking-wider group cursor-pointer translate-y-[1px] ${sizeClasses[size]} ${className}`}>
      <span className="text-slate-900 dark:text-white transition-transform group-hover:scale-105">
        THEMΛ
      </span>
      <span className="flex items-center transition-transform group-hover:scale-105 ml-0.5">
        <span className="text-[#A855F7]">V</span>
        <span className="text-[#3B82F6]">I</span>
        <span className="text-[#22D3EE]">Λ</span>
      </span>
    </div>
  );
}