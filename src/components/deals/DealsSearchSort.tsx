// src/components/deals/DealsSearchSort.tsx
'use client';

import React from 'react';

interface DealsSearchSortProps {
  totalDeals: number;
}

export default function DealsSearchSort({ totalDeals }: DealsSearchSortProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
      <div className="relative w-full sm:w-72">
        <input
          type="text"
          placeholder="Search by keywords, title..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs">
        <span className="text-slate-500">Found <strong className="text-slate-900">{totalDeals} Deals</strong></span>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Sort by:</span>
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none cursor-pointer">
            <option>Price: Lowest First</option>
            <option>Highest Discount</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
}