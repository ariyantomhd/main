// src/components/cart/CartSummary.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import CartItemRow from './CartItemRow';

interface CartItem {
  product: {
    id: string | number;
    title: string;
    thumbnail_url?: string;
    gallery?: { image_url: string }[];
  };
  licenseType: string;
  price: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  removeFromCart: (productId: string | number, licenseType: string) => void;
  rawSubtotal: number;
  hasDiscount: boolean;
  discountMultiplier: number;
  savedAmount: number;
  finalTotal: number;
  onApplyCoupon: (code: string) => void;
  couponFeedback: string;
}

export default function CartSummary({
  cart,
  removeFromCart,
  rawSubtotal,
  hasDiscount,
  discountMultiplier,
  savedAmount,
  finalTotal,
  onApplyCoupon,
  couponFeedback,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  
  // State toggle dropdown untuk menampilkan / menyembunyikan item
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCoupon(couponCode);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm space-y-5">
      {/* Header Summary & Tombol Toggle Details */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Digital Order Summary</h3>
            <p className="text-[11px] text-slate-500">{cart.length} Digital Items</p>
          </div>
        </div>

        {/* Button Toggle Details */}
        <button
          type="button"
          onClick={() => setIsDetailsOpen((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer select-none"
        >
          <span>Details</span>
          {isDetailsOpen ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* List Item Keranjang (Dapat di-collapse/toggle) */}
      {isDetailsOpen && (
        <div className="space-y-4 transition-all">
          {cart.map((item, index) => (
            <CartItemRow
              key={`${item.product.id}-${item.licenseType}-${index}`}
              item={item}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      )}

      {/* Form Kupon */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="PAYPAL10"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-none px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 uppercase tracking-wider font-mono"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-none text-xs transition-colors cursor-pointer"
        >
          Apply
        </button>
      </form>
      {couponFeedback && (
        <p className={`text-[11px] font-medium ${couponFeedback.includes('active') ? 'text-emerald-600' : 'text-rose-500'}`}>
          {couponFeedback.includes('active') ? '✓ ' : ''}{couponFeedback}
        </p>
      )}

      {/* Rincian Harga */}
      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">${rawSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-bold text-emerald-600">FREE</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span className="flex items-center gap-1">✨ Discount ({Math.round((1 - discountMultiplier) * 100)}%)</span>
            <span>-${savedAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total Amount */}
      <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Total Amount</h4>
          <p className="text-[10px] text-slate-400">Includes VAT</p>
        </div>
        <span className="text-xl font-black text-indigo-600">${finalTotal.toFixed(2)}</span>
      </div>

      {/* Buyer Protection Footer dengan Logo PayPal */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between gap-3 text-[11px] text-slate-600">
        <div className="flex items-start space-x-2">
          <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong>PayPal Buyer Protection:</strong> Instant license security & 100% refund guarantee.
          </p>
        </div>
        <div className="relative w-14 h-5 shrink-0">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
            alt="PayPal" 
            fill 
            className="object-contain" 
          />
        </div>
      </div>
    </div>
  );
}