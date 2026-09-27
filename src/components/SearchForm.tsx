'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export default function SearchForm({
  searchQuery,
  onSearchChange,
  placeholder = 'Search products by title...',
}: SearchFormProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors"
      />
    </div>
  );
}