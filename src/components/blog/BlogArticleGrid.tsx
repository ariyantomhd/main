// src/components/blog/BlogArticleGrid.tsx
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types/blog';

interface BlogArticleGridProps {
  articles: Article[];
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export default function BlogArticleGrid({
  articles,
  currentPage,
  onPageChange,
}: BlogArticleGridProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <h2 className="text-xl font-black text-slate-900 tracking-tight">Latest Articles</h2>

      {articles.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-10 text-center text-slate-500 text-sm">
          No articles found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((item) => (
            <Link 
              key={item.id} 
              href={`/blog/${item.id}`}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex-col justify-between hover:shadow-md transition-all group block"
            >
              <div>
                <div className="w-full h-40 bg-slate-100 rounded-2xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs font-bold">
                    IMG
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end">
                <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
          {currentPage}
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}