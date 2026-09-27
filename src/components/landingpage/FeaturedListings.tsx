'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, ChevronDown, Loader2 } from 'lucide-react';
import { Product } from '@/types';

// Extend interface Product untuk menambahkan field opsional tanpa `any`
interface FeaturedProduct extends Product {
  thumbnail_url?: string;
  rating?: number;
  reviews_count?: number;
}

export default function FeaturedListings() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Featured Listings
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Products Grid (10 Cols) */}
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              Belum ada produk yang tersedia di database.
            </div>
          ) : (
            products.map((item) => {
              const imageUrl =
                item.thumbnail_url ||
                item.gallery?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>

                    {/* Rating Dinamis */}
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.rating || 5.0}
                      </span>
                      <span>({item.reviews_count || 12})</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-black text-slate-900 dark:text-white text-base">
                      ${((item.regular_price || 0) / 100).toFixed(0)}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Filters (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {['Category', 'Price', 'Rating'].map((filterName, i) => (
            <button
              key={i}
              type="button"
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span>{filterName}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}