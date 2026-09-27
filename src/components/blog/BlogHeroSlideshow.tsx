// src/components/blog/BlogHeroSlideshow.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Article } from '@/types/blog';

interface BlogHeroSlideshowProps {
  articles: Article[];
}

export default function BlogHeroSlideshow({ articles }: BlogHeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ambil maksimal 3 artikel pertama untuk dijadikan slideshow featured
  const featuredSlides = articles.slice(0, 3);

  useEffect(() => {
    if (featuredSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  if (featuredSlides.length === 0) return null;

  const activeSlideData = featuredSlides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  };

  return (
    <Link 
      href={`/blog/${activeSlideData.id}`}
      className="lg:col-span-2 relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden bg-slate-900 shadow-sm flex-col justify-end p-6 sm:p-8 text-white group block"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-slate-800 group-hover:scale-105 transition-transform duration-500"></div>

      {/* Content Slide */}
      <div className="relative z-20 transition-opacity duration-300">
        <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-3 bg-amber-400 text-slate-950">
          {activeSlideData.category}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:text-teal-300 transition-colors">
          {activeSlideData.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl">
          {activeSlideData.excerpt}
        </p>
      </div>

      {/* Slideshow Navigation Buttons */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <div 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </div>
        <div 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-6 z-30 flex items-center gap-1.5">
        {featuredSlides.map((_, idx) => (
          <div
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'w-6 bg-teal-400' : 'w-1.5 bg-slate-600'
            }`}
          />
        ))}
      </div>
    </Link>
  );
}