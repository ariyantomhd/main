// src/components/blog/BlogSideFeatured.tsx
import React from 'react';
import Link from 'next/link';
import { Article } from '@/types/blog';

interface BlogSideFeaturedProps {
  articles: Article[];
}

export default function BlogSideFeatured({ articles }: BlogSideFeaturedProps) {
  // Ambil 2 artikel cadangan untuk sisi kanan atas
  const sidePosts = articles.slice(1, 3);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {sidePosts.map((post, idx) => (
        <Link 
          key={post.id || idx} 
          href={`/blog/${post.id}`} 
          className="relative h-[190px] sm:h-[200px] rounded-3xl overflow-hidden bg-slate-900 shadow-sm flex flex-col justify-end p-5 text-white group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-slate-800 group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative z-20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
              {post.category}
            </span>
            <h3 className="text-base sm:text-lg font-black tracking-tight mb-1 group-hover:text-teal-300 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <span className="text-[11px] text-slate-400">
              {formatDate(post.created_at)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}