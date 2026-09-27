// src/components/product-detail/PriceBox.tsx
'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useStore } from '@/providers/StoreContext';
import { Product } from '@/types/product';

// Interface untuk StoreContext agar terhindar dari 'any'
interface StoreContextType {
  addToCart: (product: Product, license: 'regular' | 'extended') => void;
  user?: { id?: string; email?: string } | Record<string, unknown> | null;
  isAuthenticated?: boolean;
  openAuthModal?: (mode?: 'signin' | 'signup') => void;
  openLoginModal?: () => void;
  setIsAuthModalOpen?: (isOpen: boolean) => void;
  setAuthModalOpen?: (isOpen: boolean) => void;
  setAuthMode?: (mode: 'signin' | 'signup') => void;
}

interface PriceBoxProps {
  productId: string | number;
  productName?: string;
  currentPrice: number;
  regularPrice: number;
  extendedPrice: number;
  selectedLicense: 'regular' | 'extended';
  onSelectLicense: (license: 'regular' | 'extended') => void;
  productData?: Product;
}

export default function PriceBox({
  productId,
  productName,
  currentPrice,
  regularPrice,
  extendedPrice,
  selectedLicense,
  onSelectLicense,
  productData,
}: PriceBoxProps) {
  // Mengambil state dan method dari StoreContext
  const store = useStore() as StoreContextType;
  const { 
    addToCart, 
    user, 
    isAuthenticated, 
    openAuthModal, 
    openLoginModal,
    setIsAuthModalOpen,
    setAuthModalOpen,
    setAuthMode
  } = store;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    // 1. Validasi Login secara presisi
    // Memastikan user benar-benar terautentikasi (bukan sekadar object kosong {})
    const hasValidUserObj = Boolean(
      user && 
      typeof user === 'object' && 
      Object.keys(user).length > 0 && 
      ('id' in user || 'email' in user)
    );
    const isLoggedIn = Boolean(isAuthenticated || hasValidUserObj);

    // DEBUG LOG: Buka inspect browser (F12) -> Console untuk mengecek nilai ini saat klik button
    console.log('[PriceBox Debug]', { isLoggedIn, isAuthenticated, user, availableStoreMethods: Object.keys(store || {}) });

    if (!isLoggedIn) {
      console.log('[PriceBox] User belum login. Memicu Auth Modal...');

      // Pemicu Modal berbasis ketersediaan method di StoreContext
      if (typeof openAuthModal === 'function') {
        openAuthModal('signin');
      } else if (typeof openLoginModal === 'function') {
        openLoginModal();
      } else if (typeof setIsAuthModalOpen === 'function') {
        if (typeof setAuthMode === 'function') setAuthMode('signin');
        setIsAuthModalOpen(true);
      } else if (typeof setAuthModalOpen === 'function') {
        if (typeof setAuthMode === 'function') setAuthMode('signin');
        setAuthModalOpen(true);
      } else {
        // Fallback: Dispatch custom event jika modal menggunakan Event Listener global
        console.warn('[PriceBox] Method modal tidak ditemukan di StoreContext. Mengirim CustomEvent global.');
        window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } }));
      }
      return;
    }

    // 2. Jika sudah login, masukkan ke keranjang
    setIsLoading(true);
    try {
      const baseProduct: Product = productData || {
        id: String(productId),
        title: productName || 'Product Theme',
        slug: '',
        short_description: '',
        long_description: '',
        regular_price: regularPrice,
        extended_price: extendedPrice,
        discount_price: null,
        discount_ends_at: null,
        category_id: null,
        tags: [],
        tech_stack: [],
        current_version: '1.0.0',
        live_preview_url: null,
        file_source_url: '',
        status: 'active' as Product['status'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: productName || 'Product Theme',
        price: currentPrice,
      };

      addToCart(baseProduct, selectedLicense);

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Terjadi kesalahan saat memasukkan produk ke keranjang.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 p-6 shadow-sm space-y-5">
      {/* Dropdown Lisensi & Harga Utama */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <select
            value={selectedLicense}
            onChange={(e) => onSelectLicense(e.target.value as 'regular' | 'extended')}
            className="w-full appearance-none bg-white border border-slate-300 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500 cursor-pointer pr-8"
          >
            <option value="regular">Regular license (${regularPrice})</option>
            <option value="extended">Extended license (${extendedPrice})</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
        </div>
        <span className="text-3xl font-extrabold text-slate-800 font-mono">
          ${currentPrice}
        </span>
      </div>

      {/* View License Details */}
      <div>
        <a 
          href="#license-details" 
          onClick={(e) => { e.preventDefault(); alert("Menampilkan detail lisensi..."); }}
          className="text-xs text-blue-600 hover:underline font-medium inline-block"
        >
          View license details
        </a>
      </div>

      {/* Benefit List */}
      <div className="space-y-2.5 pt-1 border-t border-slate-100">
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Free support</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Future product updates</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Quality checked by Codester</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 fill-emerald-50" />
          <span>Lowest price guarantee</span>
        </div>
      </div>

      {/* Tombol Add to Cart */}
      <div className="pt-2">
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center space-x-2 uppercase tracking-wider cursor-pointer shadow-sm disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Payment Section */}
      <div className="flex flex-col items-center justify-center gap-1.5 border-t border-slate-100 pt-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Powered by</span>
        <div className="relative h-6 w-20 opacity-90 hover:opacity-100 transition-opacity">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}