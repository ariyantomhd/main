// src/components/HeroSection.tsx
'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Radial Glow Soft Tosca (Dikecilkan ukurannya agar lebih proporsional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-teal-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Badge Tosca Accent */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span>Premium Source Code & Templates</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
          Discover & Buy Top-Tier Source Code.
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}Accelerate Your Projects.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
          Access high-quality scripts, mobile apps, and Web UI kits created for modern developers and businesses.
        </p>

      </div>
    </section>
  );
}