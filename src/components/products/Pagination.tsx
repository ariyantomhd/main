import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-none bg-app-surface border border-app-border text-app-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-app-accent transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-none font-black text-xs transition-all ${
              currentPage === i + 1
                ? "bg-app-primary text-app-surface shadow-lg scale-110"
                : "bg-app-surface text-app-secondary border border-app-border hover:border-app-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-none bg-app-surface border border-app-border text-app-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-app-accent transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
