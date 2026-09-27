// src/components/product-detail/SimilarProduct.tsx
'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/services/productApi';
import { Product } from '@/types';
import ProductCard from '../ProductCard';

export default function SimilarProduct() {
  const { data: popularProducts, isLoading } = useQuery({
    queryKey: ['products', 'popular'],
    queryFn: productApi.getPopularProducts,
  });

  if (isLoading || !popularProducts) return null;

  const similarItems = popularProducts.slice(0, 4);

  if (similarItems.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-slate-200 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          Related Products
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarItems.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}