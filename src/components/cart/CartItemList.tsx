'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useStore } from '@/providers/StoreContext';

export default function CartItemList() {
  const { cart, removeFromCart, updateLicenseType, currentUser } = useStore();

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 bg-white rounded-lg border border-slate-200">
        <p className="text-sm">Keranjang belanja Anda masih kosong.</p>
      </div>
    );
  }

  // Helper untuk mengambil nama pengguna
  const getUserDisplayName = () => {
    if (!currentUser) return 'Guest';
    const userWithMeta = currentUser as unknown as Record<string, unknown>;
    if (typeof userWithMeta.display_name === 'string') {
      return userWithMeta.display_name;
    }
    return currentUser.email || 'User';
  };

  return (
    <div className="space-y-4">
      {/* Informasi Pengguna / Customer Info */}
      {currentUser && (
        <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>
            Checkout sebagai:{' '}
            <strong className="text-slate-900">
              {getUserDisplayName()}
            </strong>
          </span>
          <span className="font-mono bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
            {((currentUser as unknown as Record<string, unknown>).role as string) || 'BUYER'}
          </span>
        </div>
      )}

      {/* List Item Keranjang */}
      <div className="divide-y divide-slate-100 bg-white rounded-lg border border-slate-200 overflow-hidden">
        {cart.map((item, index) => {
          const prod = item.product as unknown as Record<string, unknown>;
          
          const screenshotArray = Array.isArray(prod.screenshotUrls) ? (prod.screenshotUrls as string[]) : [];
          const galleryArray = Array.isArray(prod.gallery) ? (prod.gallery as Array<{ image_url: string }>) : [];
          
          const thumbnail = 
            screenshotArray[0] || 
            galleryArray[0]?.image_url || 
            (typeof prod.thumbnail_url === 'string' ? prod.thumbnail_url : null) || 
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500';

          const title = (prod.title as string) || (prod.name as string) || 'Untitled Product';
          const productId = String(prod.id ?? index);

          return (
            <div key={`${productId}-${item.licenseType}-${index}`} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Info Produk */}
              <div className="flex items-center space-x-3">
                <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded bg-slate-100 border border-slate-200">
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ID: {productId}
                  </p>
                </div>
              </div>

              {/* Tipe Lisensi, Harga & Opsi Hapus */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <select
                  value={item.licenseType}
                  onChange={(e) =>
                    updateLicenseType(
                      productId,
                      item.licenseType,
                      e.target.value as 'regular' | 'extended'
                    )
                  }
                  className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-orange-500 font-medium text-slate-700"
                >
                  <option value="regular">Regular License</option>
                  <option value="extended">Extended License</option>
                </select>

                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(productId, item.licenseType)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  title="Remove item"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}