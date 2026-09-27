// src/app/deals/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DealsHero from '@/components/deals/DealsHero';
import DealsCategoryTabs from '@/components/deals/DealsCategoryTabs';
import DealsSidebar from '@/components/deals/DealsSidebar';
import DealsSearchSort from '@/components/deals/DealsSearchSort';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function DealsPage() {
  const [isFlashSaleOnly, setIsFlashSaleOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Deals');
  const [priceRange, setPriceRange] = useState(100);

  // State untuk data produk dari database
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    'All Deals',
    'SaaS Boilerplate',
    'Web Templates',
    'Mobile Apps',
    'UI Kits & Systems',
    'Backend & APIs',
    'Plugins & Extensions',
  ];

  // Fetch data langsung dari database/endpoint API Anda
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products'); 
        const data = await res.json();
        
        // Ambil array secara aman, baik itu langsung array atau terbungkus di dalam objek
        const resultData = Array.isArray(data) ? data : data.products || data.data || [];
        setProducts(resultData);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="font-sans p-4 md:p-6">
      {/* Mengurangi jarak antar elemen utama menjadi space-y-4 agar lebih padat */}
      <div className="max-w-7xl mx-auto space-y-4">

        {/* 1. HERO BANNER FLASH DEAL */}
        <DealsHero />

        {/* 2. CATEGORY TABS CHIPS */}
        <DealsCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. MAIN CONTENT LAYOUT (SIDEBAR + GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* SIDEBAR FILTER KIRI */}
          <DealsSidebar
            isFlashSaleOnly={isFlashSaleOnly}
            onToggleFlashSale={() => setIsFlashSaleOnly(!isFlashSaleOnly)}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />

          {/* AREA KANAN (SEARCH & PRODUCT GRID) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Search & Sort Bar */}
            <DealsSearchSort totalDeals={Array.isArray(products) ? products.length : 0} />

            {/* Loading State atau Grid Produk */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-100 border border-slate-200 h-72 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : !Array.isArray(products) || products.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-white border border-slate-200 rounded-2xl shadow-sm">
                Belum ada produk atau deals yang tersedia dari database.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}