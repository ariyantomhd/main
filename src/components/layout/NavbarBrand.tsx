// src/components/layout/NavbarBrand.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeLogo from '@/components/ThemeLogo';

export default function NavbarBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div className="relative w-11 h-11 overflow-hidden flex items-center justify-center">
        <Image 
          src="/logo.png" 
          alt="ThemaVia Logo" 
          fill
          className="object-contain group-hover:scale-105 transition-transform"
          priority
        />
      </div>
      <ThemeLogo size="lg" />
    </Link>
  );
}