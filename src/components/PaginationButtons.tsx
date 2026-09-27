'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationButtonsProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationButtons({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationButtonsProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems <= itemsPerPage) return null;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-1.5 bg-white border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 text-slate-600" />
      </button>
      <span className="text-xs font-bold text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage * itemsPerPage < totalItems ? currentPage + 1 : currentPage)}
        disabled={currentPage * itemsPerPage >= totalItems}
        className="p-1.5 bg-white border border-slate-200 rounded-md disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
}