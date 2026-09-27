// src/components/CategoriesClientView.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/types';

interface CategoriesClientViewProps {
  initialProducts: Product[];
  selectedCategory: string;
  currentPage: number;
  searchQuery: string;
  selectedFramework: string;
  minPrice: number;
  maxPrice: number;
}

const CATEGORIES_LIST = ['ALL', 'Templates', 'Themes', 'Scripts', 'Plugins'];
const FRAMEWORKS_LIST = ['ALL', 'React', 'Next.js', 'Tailwind CSS', 'Vue', 'Laravel'];

export default function CategoriesClientView({
  initialProducts,
  selectedCategory,
  currentPage,
  searchQuery,
  selectedFramework,
  minPrice,
  maxPrice,
}: CategoriesClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchQuery);
  const itemsPerPage = 8;

  // Handler untuk memperbarui URL Params secara dinamis tanpa full reload
  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset ke halaman 1 jika filter atau pencarian diubah
    if (key !== 'page') {
      params.set('page', '1');
    }

    startTransition(() => {
      router.push(`/categories?${params.toString()}`, { scroll: false });
    });
  };

  // Filter Data di sisi Client berdasarkan Search, Framework, & Harga
  const filteredProducts = initialProducts.filter((product) => {
    // Filter Search
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
      (product.short_description && product.short_description.toLowerCase().includes(search.toLowerCase()));

    // Filter Framework (Simulasi pengecekan tag/framework pada judul atau data produk)
    const matchesFramework = selectedFramework === 'ALL' || 
      (product.title.toLowerCase().includes(selectedFramework.toLowerCase()));

    // Filter Harga
    const price = product.regular_price ? product.regular_price / 100 : 0;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesSearch && matchesFramework && matchesPrice;
  });

  // Pagination Logic
  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Halaman */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Explore Categories & Resources
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Temukan aset digital, template, dan skrip terbaik yang dikurasi khusus untuk project Anda.
            </p>
          </div>

          {/* Search Bar Cepat */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                updateQueryParam('search', e.target.value);
              }}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            />
          </div>
        </div>

        {/* Panel Filter Lengkap (Kategori & Framework) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm mb-8 space-y-4">
          
          {/* Kategori Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Kategori
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateQueryParam('category', cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Framework Filter */}
          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Framework / Teknologi
            </label>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS_LIST.map((fw) => (
                <button
                  key={fw}
                  onClick={() => updateQueryParam('framework', fw)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedFramework === fw
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Konten Produk & Hasil */}
        <div className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm min-h-[400px] transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'}`}>
          
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Menampilkan hasil untuk:{' '}
              <span className="font-bold uppercase text-teal-600">
                {selectedCategory}
              </span> 
              {selectedFramework !== 'ALL' && <span className="text-slate-400"> (Framework: <strong className="text-indigo-600">{selectedFramework}</strong>)</span>}
            </p>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {totalItems} produk ditemukan
            </span>
          </div>

          {/* State Kosong */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm font-semibold text-slate-600">
                Tidak ada produk yang cocok dengan kriteria filter Anda.
              </p>
              <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau reset filter.</p>
            </div>
          ) : (
            <>
              {/* Grid Kartu Produk Modern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="group border border-slate-200/70 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-white"
                  >
                    <div>
                      <div className="h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center text-slate-300 font-bold">
                        <span>PREVIEW</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {product.short_description || 'No description available for this item.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Harga</span>
                        <span className="font-extrabold text-teal-600 text-base">
                          ${product.regular_price ? (product.regular_price / 100).toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <a 
                        href={`/products/${product.slug}`} 
                        className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-teal-600 transition-colors shadow-sm"
                      >
                        Detail &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Modern */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-100">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => updateQueryParam('page', page.toString())}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </main>
  );
}