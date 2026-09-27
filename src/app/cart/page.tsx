'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/providers/StoreContext';
import AuthModal from '@/components/auth/AuthModal';
import CartSummary from '@/components/cart/CartSummary';
import CartEmpty from '@/components/cart/CartEmpty';
import PayPalButton from '@/components/cart/PayPalButton'; // Impor komponen PayPal Anda jika ada

// Komponen internal yang menangani logika penuh keranjang belanja
function CartContent() {
  const { 
    cart, 
    removeFromCart, 
    affiliateId,
    user // Ambil status user dari StoreContext / Auth Context
  } = useStore();

  const [currentView, setCurrentView] = useState<'cart' | 'success'>('cart');

  // Modal Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Form Checkout & Kupon States
  const [couponFeedback, setCouponFeedback] = useState('');
  const [discountMultiplier, setDiscountMultiplier] = useState(1.0);

  // Kalkulasi Harga
  const rawSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const taxAmount = Math.round(rawSubtotal * 0.10 * 100) / 100;
  const hasDiscount = discountMultiplier < 1.0;
  const savedAmount = Math.round(rawSubtotal * (1 - discountMultiplier) * 100) / 100;
  const finalTotal = Math.round((rawSubtotal + taxAmount - savedAmount) * 100) / 100;

  // Handler Kupon Diskon
  const handleApplyCoupon = (couponCode: string) => {
    const cleanCoupon = couponCode.trim().toUpperCase();
    if (cleanCoupon === 'PAYPAL10' || cleanCoupon === 'SAVE20') {
      setDiscountMultiplier(0.9);
      setCouponFeedback('10% promo discount active!');
    } else {
      setCouponFeedback('Kupon tidak valid.');
    }
  };

  // Handler ketika pembayaran PayPal berhasil dicapture
  const handlePaymentSuccess = () => {
    setCurrentView('success');
  };

  // Tampilan Berhasil Checkout
  if (currentView === 'success') {
    return <CartEmpty type="success" onAction={() => setCurrentView('cart')} />;
  }

  // Tampilan Jika Keranjang Kosong
  if (cart.length === 0) {
    return <CartEmpty type="empty" onAction={() => {}} />;
  }

  // Normalisasi cart agar properti thumbnail_url bernilai string atau undefined
  const normalizedCart = cart.map((item) => ({
    ...item,
    product: {
      ...item.product,
      thumbnail_url: item.product.thumbnail_url ?? undefined,
    },
  }));

  const isLoggedIn = !!user;

  return (
    <div className="pt-12 pb-20 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Card Container Utama */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          
          {/* Ringkasan Keranjang / Digital Order Summary */}
          <CartSummary
            cart={normalizedCart}
            removeFromCart={removeFromCart}
            rawSubtotal={rawSubtotal}
            hasDiscount={hasDiscount}
            discountMultiplier={discountMultiplier}
            savedAmount={savedAmount}
            finalTotal={finalTotal}
            onApplyCoupon={handleApplyCoupon}
            couponFeedback={couponFeedback}
          />

          {/* Area Tombol Checkout / Login (Tampil di bagian bawah Digital Order Summary) */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            {isLoggedIn ? (
              /* Jika User Sudah Login -> Tampilkan Tombol PayPal Aktif */
              <div className="w-full">
                {/* Sertakan komponen PayPal Checkout aktif Anda */}
                <PayPalButton 
                  amount={finalTotal} 
                  affiliateId={affiliateId} 
                  onSuccess={handlePaymentSuccess} 
                />
              </div>
            ) : (
              /* Jika User Belum Login -> Tampilkan Tombol Login / Register */
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full py-3.5 px-6 text-center font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Login or Register to Checkout</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Modal Autentikasi */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

// Bungkus dengan dynamic import dan matikan SSR khusus untuk halaman Cart ini
const CartContentDynamic = dynamic(() => Promise.resolve(CartContent), {
  ssr: false,
  loading: () => (
    <div className="pt-16 pb-16 min-h-[60vh] flex items-center justify-center">
      <div className="text-slate-400 text-xs animate-pulse font-medium">
        Memuat keranjang belanja...
      </div>
    </div>
  ),
});

export default function CartPage() {
  return <CartContentDynamic />;
}