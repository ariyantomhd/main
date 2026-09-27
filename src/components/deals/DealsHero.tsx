// src/components/deals/DealsHero.tsx
'use client';

import React from 'react';

export default function DealsHero() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white border border-indigo-200/20 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        {/* Info Kiri */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              ⚡ LIMITED FLASH SALE
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
              🔥 Save 35% OFF
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            ShipFast Next.js 15 SaaS Starter Kit + Gemini AI & Stripe
          </h1>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
            Complete full-stack SaaS boilerplate with Supabase Auth, Stripe Webhooks, Prisma ORM, and built-in Gemini AI generator.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Ends in:</span>
            <div className="flex items-center gap-2 font-mono font-bold text-center">
              <div className="bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg text-white">
                <span className="text-lg">13</span> <span className="text-[10px] block text-slate-400">HOURS</span>
              </div>
              <span>:</span>
              <div className="bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg text-white">
                <span className="text-lg">59</span> <span className="text-[10px] block text-slate-400">MINS</span>
              </div>
              <span>:</span>
              <div className="bg-slate-900/80 border border-slate-700 px-3 py-1.5 rounded-lg text-white">
                <span className="text-lg">15</span> <span className="text-[10px] block text-slate-400">SECS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Harga Kanan */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-300 line-through">$499</span>
              <div className="text-3xl font-black text-emerald-300">$29 <span className="text-xs font-normal text-slate-300">94% OFF</span></div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-300 block">Coupon Code</span>
              <span className="bg-slate-900/60 text-indigo-300 font-mono text-xs px-2.5 py-1 rounded border border-indigo-400/30">FLASH35OFF</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Discounted Licenses Left</span>
              <span className="text-amber-300 font-semibold">5 Units Left</span>
            </div>
            <div className="w-full bg-slate-900/40 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-rose-400 w-[15%] h-full rounded-full"></div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-200 border-t border-white/10">
            <span>🛡️ Full Source Code & License</span>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl transition shadow-md cursor-pointer">
              Claim Deal &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}