// src/app/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BlogAPI } from '@/services/blogAPI';
import { Article, Category } from '@/types/blog';

import BlogHeader from '@/components/blog/BlogHeader';
import BlogHeroSlideshow from '@/components/blog/BlogHeroSlideshow';
import BlogSideFeatured from '@/components/blog/BlogSideFeatured';
import BlogCategoriesWidget from '@/components/blog/BlogCategoriesWidget';
import BlogSidebarArticles from '@/components/blog/BlogSidebarArticles';
import BlogArticleGrid from '@/components/blog/BlogArticleGrid';

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedArticles, fetchedCategories] = await Promise.all([
          BlogAPI.getArticles(selectedCategory, currentPage),
          BlogAPI.getCategories(),
        ]);
        setArticles(fetchedArticles);
        
        // Menambahkan kategori 'All' dengan struktur lengkap sesuai interface Category
        const allCategory: Category = {
          id: 0,
          name: 'All',
          slug: 'all',
          badge_color: 'bg-slate-100 text-slate-700',
          count: fetchedArticles.length,
        };

        setCategories([allCategory, ...fetchedCategories]);
      } catch (error) {
        console.error('Failed to load blog data:', error);
      }
    }

    loadData();
  }, [selectedCategory, currentPage]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <BlogHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <BlogHeroSlideshow articles={articles} />
          <BlogSideFeatured articles={articles} />
        </div>

        {/* ADVERTISEMENT BANNER */}
        <div className="w-full h-24 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-xs text-slate-400 font-medium mb-12 shadow-sm">
          - Advertisement -
        </div>

        {/* CONTENT & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <BlogArticleGrid 
            articles={articles} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
          />
          <div className="space-y-6">
            <BlogCategoriesWidget 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }} 
            />
            <BlogSidebarArticles articles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
}