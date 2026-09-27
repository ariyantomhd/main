// src/components/blog/BlogCategoriesWidget.tsx
import React from 'react';
import { Category } from '@/types/blog';

interface BlogCategoriesWidgetProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export default function BlogCategoriesWidget({
  categories,
  selectedCategory,
  onSelectCategory,
}: BlogCategoriesWidgetProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-base mb-4 tracking-tight">Categories</h3>
      <div className="space-y-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => onSelectCategory(cat.name)}
            className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-medium transition-colors ${
              selectedCategory === cat.name 
                ? 'bg-indigo-50 text-indigo-600 font-bold' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{cat.name}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px]">
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}