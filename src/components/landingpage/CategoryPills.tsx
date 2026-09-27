// src/components/landingpage/CategoryPills.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  {
    title: 'Mobile Apps',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/518/518705.png',
    slug: 'mobile-apps',
  },
  {
    title: 'Web Templates',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6863/6863803.png',
    slug: 'web-templates',
  },
  {
    title: 'Scripts & Plugins',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8749/8749219.png',
    slug: 'scripts-plugins',
  },
  {
    title: 'eCommerce',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3176/3176363.png',
    slug: 'ecommerce',
  },
  {
    title: 'Games',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8316/8316931.png',
    slug: 'games',
  },
  {
    title: 'UI Kits',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055666.png',
    slug: 'ui-kits',
  },
];

export default function CategoryPills() {
  return (
    /* Ubah -mt-10 menjadi -mt-6 atau -mt-8 agar posisinya pas di tengah perbatasan */
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            href={`/products?category=${cat.slug}`}
            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 shadow-lg border border-slate-200/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Animasi Garis Border Berjalan saat Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#f97316_0deg,#fdba74_120deg,transparent_180deg)] animate-spin [animation-duration:3s]" />
            </div>

            {/* Layer Putih Penutup Tengah */}
            <div className="absolute inset-[1.5px] bg-white rounded-[15px] z-0" />

            {/* Icon Container */}
            <div className="relative z-10 p-2.5 rounded-xl bg-slate-100 group-hover:bg-orange-500/10 mb-2.5 transition-all duration-300 group-hover:scale-110 shadow-sm flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src={cat.iconUrl}
                alt={cat.title}
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <span className="relative z-10 font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors text-center">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}