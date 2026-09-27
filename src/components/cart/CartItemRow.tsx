// src/components/cart/CartItemRow.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface CartItemRowProps {
  item: {
    product: {
      id: string | number;
      title: string;
      thumbnail_url?: string;
      gallery?: { image_url: string }[];
    };
    licenseType: string;
    price: number;
  };
  onRemove: (productId: string | number, licenseType: string) => void;
}

export default function CartItemRow({ item, onRemove }: CartItemRowProps) {
  const imageUrl =
    item.product.thumbnail_url ||
    item.product.gallery?.[0]?.image_url ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60';

  return (
    <div className="border border-slate-100 bg-slate-50/50 rounded-none p-3.5 flex items-start justify-between gap-3">
      <div className="flex items-start space-x-3">
        <div className="relative h-12 w-12 bg-slate-200 rounded-none overflow-hidden shrink-0 border border-slate-200">
          <Image src={imageUrl} alt={item.product.title} fill sizes="48px" className="object-cover" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.product.title}</h4>
          <p className="text-[10px] text-slate-500 line-clamp-1">
            {item.licenseType === 'extended' ? 'Extended License' : 'Lifetime License + Full Source Code'}
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-[10px] text-slate-500 border border-slate-200 rounded px-1.5 py-0.5 bg-white">
              - 1 +
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch shrink-0">
        <div className="flex items-center space-x-1.5">
          <button className="text-slate-400 hover:text-slate-600 text-xs">✏️</button>
          <button
            onClick={() => onRemove(item.product.id, item.licenseType)}
            className="text-slate-400 hover:text-rose-500 text-xs cursor-pointer"
          >
            🗑️
          </button>
        </div>
        <div className="text-right mt-3">
          <span className="font-extrabold text-slate-800 text-xs">${item.price.toFixed(2)}</span>
          <p className="text-[9px] text-slate-400">${item.price.toFixed(2)} / lic</p>
        </div>
      </div>
    </div>
  );
}