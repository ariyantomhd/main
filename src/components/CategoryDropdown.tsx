'use client';

import React from 'react';
import { LayoutGrid } from 'lucide-react';

const CATEGORIES = [
  { title: 'Mobile Apps', slug: 'mobile-apps' },
  { title: 'Web Templates', slug: 'web-templates' },
  { title: 'Scripts & Plugins', slug: 'scripts-plugins' },
  { title: 'eCommerce', slug: 'ecommerce' },
  { title: 'Games', slug: 'games' },
  { title: 'UI Kits', slug: 'ui-kits' },
];

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryDropdown({
  selectedCategory,
  onCategoryChange,
}: CategoryDropdownProps) {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
      <LayoutGrid className="w-4 h-4 text-slate-100" />
      <span className="text-xs font-bold text-slate-100 uppercase">Category:</span>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 transition-colors"
      >
        <option value="ALL">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
}