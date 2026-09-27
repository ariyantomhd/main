// src/components/deals/DealsSidebar.tsx
'use client';

import React from 'react';

interface DealsSidebarProps {
  isFlashSaleOnly: boolean;
  onToggleFlashSale: () => void;
  priceRange: number;
  onPriceChange: (val: number) => void;
}

const TECH_LIST = ['React', 'Next.js', 'Flutter', 'Node.js', 'Tailwind', 'Python', 'Vue', 'TypeScript'];

export default function DealsSidebar({
  isFlashSaleOnly,
  onToggleFlashSale,
  priceRange,
  onPriceChange,
}: DealsSidebarProps) {
  return (
    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 space-y-6 h-fit shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-bold text-sm flex items-center gap-2 text-slate-800">
          ⚙️ FILTER DEALS
        </h3>
        <button className="text-xs text-indigo-600 hover:underline cursor-pointer font-medium">Reset</button>
      </div>

      {/* Toggle Flash Sale */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-700 font-medium">Flash Sales Only</span>
        <input
          type="checkbox"
          checked={isFlashSaleOnly}
          onChange={onToggleFlashSale}
          className="accent-indigo-600 cursor-pointer w-4 h-4 rounded border-slate-300"
        />
      </div>

      {/* Kategori Filter Sidebar */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Category</label>
        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500">
          <option>All Deals</option>
          <option>Web Templates</option>
          <option>Scripts & Plugins</option>
        </select>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider">Max Deal Price</span>
          <span className="text-indigo-600 font-bold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>$5</span>
          <span>$50</span>
          <span>$100</span>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tech & Framework</label>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {TECH_LIST.map((tech, i) => (
            <span key={i} className="bg-slate-50 border border-slate-200 hover:border-indigo-500 text-[11px] text-slate-600 px-2.5 py-1 rounded-lg cursor-pointer transition">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}