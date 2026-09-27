// src/components/blog/BlogSidebarArticles.tsx
import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';

interface BlogSidebarArticlesProps {
  articles: Article[];
}

export default function BlogSidebarArticles({ articles }: BlogSidebarArticlesProps) {
  // Ambil 4 artikel terbaru untuk widget sidebar
  const recentArticles = articles.slice(0, 4);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-base mb-4 tracking-tight">New Articles</h3>
      <div className="space-y-4 divide-y divide-slate-100">
        {recentArticles.map((item, idx) => (
          <div key={item.id} className={`${idx !== 0 ? 'pt-4' : ''}`}>
            <Link href={`/blog/${item.id}`} className="group block">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mb-1">
                {item.title}
              </h4>
              <span className="text-[11px] text-slate-400 block">
                {formatDate(item.created_at)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}