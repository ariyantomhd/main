import React from 'react';
import { ExternalLink, Star, ShoppingCart } from 'lucide-react';

interface ProductHeaderProps {
  categoryName: string;
  framework: string;
  livePreviewUrl: string;
  title: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
}

export default function ProductHeader({
  categoryName,
  framework,
  livePreviewUrl,
  title,
  rating,
  reviewsCount,
  salesCount,
}: ProductHeaderProps) {
  return (
    <div className="mb-8 space-y-4 pb-6 border-b border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold bg-orange-500 text-white font-mono tracking-wider uppercase px-2.5 py-1">
            {categoryName}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Framework: <strong className="text-orange-500 font-semibold">{framework}</strong>
          </span>
        </div>
        
        <a
          href={livePreviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Live Preview</span>
        </a>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200/80">
        <span className="flex items-center text-amber-500 font-semibold">
          <Star className="h-3.5 w-3.5 fill-current mr-1" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal ml-1">({reviewsCount} reviews)</span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center">
          <ShoppingCart className="h-3.5 w-3.5 mr-1 text-slate-400" />
          <span>{salesCount} Sales</span>
        </span>
      </div>
    </div>
  );
}