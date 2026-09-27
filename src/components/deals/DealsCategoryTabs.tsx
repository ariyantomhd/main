// src/components/deals/DealsCategoryTabs.tsx
'use client';

import React from 'react';

interface DealsCategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function DealsCategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: DealsCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => onSelectCategory(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            selectedCategory === cat
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
          }`}
        >
          {cat} {idx === 0 && '⚡'}
        </button>
      ))}
    </div>
  );
}