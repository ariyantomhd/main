// src/components/landingpage/ProductListSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Loader2 } from 'lucide-react';
import { Product as ComponentProduct } from '@/types';
import { productApi } from '@/services/productApi';

interface ProductListSectionProps {
  title: string;
  description: string;
  viewAllHref: string;
  products?: ComponentProduct[];
  emptyMessage: string;
  isNewArrival?: boolean;
  fetchType?: 'trending' | 'new' | 'featured' | 'bestDeals' | 'popular';
  limit?: number;
}

export default function ProductListSection({
  title,
  description,
  viewAllHref,
  products = [],
  emptyMessage,
  isNewArrival = false,
  fetchType,
  limit = 3,
}: ProductListSectionProps) {
  const [fetchedProducts, setFetchedProducts] = useState<ComponentProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(!products || products.length === 0);

  const displayList = products && products.length > 0 
    ? products.slice(0, limit) 
    : fetchedProducts.slice(0, limit);

  useEffect(() => {
    let isMounted = true;

    if (!products || products.length === 0) {
      if (fetchType) {
        async function loadData() {
          try {
            let data: ComponentProduct[] = [];

            switch (fetchType) {
              case 'trending':
              case 'popular':
                data = await productApi.getPopularProducts();
                break;
              case 'featured':
                data = await productApi.getFeaturedProducts();
                break;
              case 'bestDeals':
                data = await productApi.getBestDeals();
                break;
              case 'new':
                data = await productApi.getNewProducts();
                break;
              default:
                data = await productApi.getProducts();
                break;
            }

            if (isMounted) {
              setFetchedProducts(data);
              setLoading(false);
            }
          } catch (error) {
            console.error(`Failed to fetch products for section ${title}:`, error);
            if (isMounted) {
              setLoading(false);
            }
          }
        }

        loadData();
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [products, fetchType, title]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <Link href={viewAllHref} className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
          </div>
        ) : displayList.length > 0 ? (
          displayList.map((prod, index) => {
            const imageUrl = prod.thumbnail_url || (prod.gallery && prod.gallery[0]?.image_url);
            const displayPrice = prod.regular_price ?? prod.price ?? 0;
            const displayRating = prod.rating ?? (isNewArrival ? 4.9 : 4.8);
            const reviewList = prod.reviews ?? [];

            // Menggunakan slug atau id produk secara langsung tanpa menyertakan segmen kategori 'general'
            const productSlug = prod.slug || prod.id;

            return (
              <Link 
                key={prod.id} 
                href={`/products/${productSlug}`}
                className={`flex items-center justify-between py-2.5 px-2 hover:bg-slate-50 transition-colors rounded-xl gap-3 ${
                  index !== displayList.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative border border-slate-200">
                    {imageUrl ? (
                      <Image 
                        src={imageUrl} 
                        alt={prod.title || prod.name || 'Product'} 
                        fill 
                        sizes="48px"
                        className="object-cover" 
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400">IMG</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate hover:text-indigo-600 transition-colors">
                        {prod.title || prod.name}
                      </h4>
                      {isNewArrival && (
                        <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 justify-end">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 
                    <span>{displayRating}</span>
                    <span className="text-slate-400 font-normal">({reviewList.length || (isNewArrival ? 30 : 120)})</span>
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">${displayPrice}</span>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}