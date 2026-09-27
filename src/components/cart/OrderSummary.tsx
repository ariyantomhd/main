// src/components/cart/OrderSummary.tsx
'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface OrderSummaryProps {
  rawSubtotal: number;
  taxAmount: number;
  savedAmount: number;
  finalTotal: number;
  hasDiscount: boolean;
  couponCode: string;
  couponFeedback: string;
  errorMessage: string;
  isProcessingCheckout: boolean;
  currentUser: User | null;
  setCouponCode: (code: string) => void;
  handleApplyCoupon: (e: React.FormEvent) => void;
  handleProcessSimulatedPayment: () => void;
}

export default function OrderSummary({
  rawSubtotal,
  taxAmount,
  savedAmount,
  finalTotal,
  hasDiscount,
  couponCode,
  couponFeedback,
  errorMessage,
  isProcessingCheckout,
  currentUser,
  setCouponCode,
  handleApplyCoupon,
  handleProcessSimulatedPayment,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Ringkasan Pesanan
        </h2>

        <div className="space-y-3.5 text-xs">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Subtotal</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">${rawSubtotal.toFixed(2)}</span>
          </div>

          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coba kupon: SAVE20"
              className="flex-grow px-3.5 py-2 bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0"
            >
              Pakai
            </button>
          </form>

          {couponFeedback && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
              {couponFeedback}
            </p>
          )}

          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Pajak (10%)</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">${taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Diskon</span>
            <span className="font-bold text-emerald-500">
              {hasDiscount ? `-$${savedAmount.toFixed(2)}` : '$0.00'}
            </span>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-900 dark:text-slate-100">Total</span>
            <span className="text-slate-900 dark:text-slate-100 font-extrabold text-base">
              ${finalTotal.toFixed(2)} USD
            </span>
          </div>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-3 flex items-start space-x-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 leading-normal font-medium">
            Dengan melanjutkan pembelian, Anda menyetujui Ketentuan Layanan dan Perjanjian Lisensi kami.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* Bagian Informasi User & Tombol Pembayaran PayPal */}
        <div className="bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-center space-y-3">
          {currentUser && (
            <p className="text-[10px] text-slate-400">
              Masuk sebagai <span className="font-semibold text-slate-700 dark:text-slate-300">{currentUser.name}</span>
            </p>
          )}
          
          <button
            onClick={handleProcessSimulatedPayment}
            disabled={isProcessingCheckout}
            className="w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] disabled:bg-slate-400 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
          >
            {isProcessingCheckout ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menghubungkan ke PayPal...</span>
              </>
            ) : (
              <>
                {/* Ikon / Teks Khas PayPal */}
                <span className="tracking-wide font-extrabold italic text-sm">Pay</span>
                <span className="tracking-wide font-extrabold text-sky-200 italic text-sm">Pal</span>
                <span className="font-normal text-xs ml-1 opacity-90">Checkout</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}