// src/components/blog/BlogHeader.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BlogHeader() {
  return (
    <>
      {/* ================= UPDATE BANNER ================= */}
      <div className="bg-indigo-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
        <span>UPDATE: Welcome to our new blog format! We’ll be posting regular updates and tutorials.</span>
      </div>

      {/* ================= HEADER SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
          THEMAVIA BLOG
        </h1>
      </div>
    </>
  );
}