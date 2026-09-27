// src/components/cart/CheckoutPanel.tsx
'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paymentApi } from '@/services/paymentAPI';
import { useStore } from '@/providers/StoreContext';
import { CreatePayPalOrderDTO } from '@/types/payment';

interface CheckoutPanelProps {
  finalTotal: number;
  isProcessingCheckout: boolean;
  errorMessage: string;
  affiliateId: string | null;
  onOpenLogin: () => void;
  onProcessPayment: () => void;
}

interface CartProduct {
  id?: string | number;
  product_id?: string | number;
  uuid?: string | number;
  _id?: string | number;
  title?: string;
  name?: string;
  [key: string]: unknown;
}

interface CartItemType {
  product?: CartProduct;
  product_id?: string | number;
  quantity?: number;
  price?: number;
  [key: string]: unknown;
}

export default function CheckoutPanel({
  finalTotal,
  isProcessingCheckout,
  errorMessage,
  affiliateId,
  onOpenLogin,
  onProcessPayment,
}: CheckoutPanelProps) {
  const { currentUser, cart } = useStore();

  // --- LOG DEBUG UNTUK MENGECEK STATE ASLI DARI STORE CONTEXT ---
  console.log("STATUS CART SAAT INI:", cart);
  console.log("STATUS USER SAAT INI:", currentUser);
  // -------------------------------------------------------------

  const [internalError, setInternalError] = useState('');
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';

  const userRecord = currentUser as unknown as Record<string, unknown>;
  const userDisplayName = currentUser 
    ? (userRecord?.full_name as string) || (userRecord?.display_name as string) || 'User' 
    : 'User';

  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-700 rounded-none flex items-center justify-center text-white font-black italic tracking-tighter shadow-sm">
              PP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-slate-800 text-sm">PayPal Payment Gateway</h3>
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100">
                  Official Checkout
                </span>
              </div>
              <p className="text-xs text-slate-500">Complete your digital product checkout securely via PayPal</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-emerald-600 font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>256-bit SSL</span>
          </div>
        </div>

        {!currentUser ? (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200/80 rounded-none p-4 flex items-start space-x-3 text-amber-800">
              <span className="text-amber-600 font-bold text-base">⚠️</span>
              <div>
                <h4 className="text-xs font-bold">Autentikasi Diperlukan</h4>
                <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                  Silakan masuk atau daftar menggunakan AuthModal resmi untuk mengaktifkan tombol Checkout PayPal dan menyimpan lisensi produk Anda.
                </p>
              </div>
            </div>

            <div className="w-full bg-slate-100 border border-slate-200 rounded-none py-3.5 flex items-center justify-center space-x-2 text-slate-400 font-bold text-xs select-none">
              <Lock className="h-4 w-4" />
              <span>PayPal Checkout Disabled (${finalTotal.toFixed(2)})</span>
            </div>

            <button
              onClick={onOpenLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-none text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>Sign In / Register (Buka AuthModal)</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-none p-3 flex items-center justify-between text-xs text-emerald-800">
              <span>
                Masuk sebagai: <strong>{userDisplayName}</strong> ({currentUser.email || 'No Email'})
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Terverifikasi
              </span>
            </div>

            <div className="pt-2">
              <PayPalScriptProvider
                options={{
                  clientId: paypalClientId,
                  currency: 'USD',
                  intent: 'capture',
                }}
              >
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', color: 'gold' }}
                  disabled={isProcessingCheckout}
                  createOrder={async () => {
                    try {
                      setInternalError('');

                      if (!cart || cart.length === 0) {
                        throw new Error('Keranjang belanja Anda saat ini masih kosong.');
                      }

                      // Pemetaan item keranjang dengan ekstraksi ID multi-fallback
                      const cartItems = cart.map((cartItem, index) => {
                        const item = cartItem as unknown as CartItemType;
                        const prod = (item.product || {}) as CartProduct;
                        const rawItemObj = cartItem as unknown as Record<string, unknown>;

                        // Deteksi ID dari berbagai kemungkinan nama properti
                        const resolvedId =
                          prod.id ??
                          prod.product_id ??
                          prod.uuid ??
                          prod._id ??
                          item.product_id ??
                          rawItemObj.id ??
                          rawItemObj.product_id ??
                          (prod.title ? `prod-${prod.title.toLowerCase().replace(/\s+/g, '-')}` : null) ??
                          `prod-${index + 1}`;

                        return {
                          product_id: String(resolvedId),
                          quantity: Number(item.quantity) || 1,
                          price: Number(item.price) || Number(prod.price) || 0,
                        };
                      });

                      console.log('[CheckoutPanel] Resolved PayPal Cart Items Payload:', cartItems);

                      const payload: CreatePayPalOrderDTO = {
                        buyer_id: currentUser.id,
                        email: currentUser.email,
                        amount: finalTotal,
                        currency: 'USD',
                        affiliate_id: affiliateId,
                        items: cartItems,
                      };

                      const response = await paymentApi.createPayPalOrder(payload);

                      if (!response || !response.data || !response.data.paypal_order) {
                        throw new Error('Respons data dari server pembayaran tidak valid.');
                      }

                      return response.data.paypal_order.id;
                    } catch (err: unknown) {
                      const errorObj = err as Error;
                      console.error('Failed to create PayPal order:', errorObj);
                      setInternalError(errorObj.message || 'Gagal menginisialisasi pembayaran PayPal.');
                      throw errorObj;
                    }
                  }}
                  onApprove={async (data: { orderID: string }) => {
                    try {
                      setInternalError('');
                      await paymentApi.capturePayPalOrder({
                        paypal_order_id: data.orderID,
                      });
                      onProcessPayment();
                    } catch (err: unknown) {
                      const errorObj = err as Error;
                      console.error('Failed to capture PayPal order:', errorObj);
                      setInternalError(errorObj.message || 'Pembayaran gagal dikonfirmasi oleh sistem.');
                    }
                  }}
                  onError={(err: Record<string, unknown>) => {
                    console.error('PayPal SDK Error:', err);
                    setInternalError('Terjadi kesalahan pada modul pembayaran PayPal.');
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )}

        {(errorMessage || internalError) && (
          <p className="text-xs text-rose-500 font-medium">{errorMessage || internalError}</p>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center space-x-1">
            <span className="text-blue-600 font-bold">✓</span>
            <span>PayPal Verified Gateway</span>
          </span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>PCI-DSS Level 1 Compliant</span>
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
          <Lock className="h-3.5 w-3.5 text-indigo-600" />
          <span>Benefits of Checkout for Digital Products with PayPal:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Instant & Automated License Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Bank-Grade Encrypted Vault Token</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Express 1-Click Checkout</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Functional Digital License Guarantee</span>
          </div>
        </div>
      </div>

      {affiliateId && (
        <div className="bg-amber-50 border border-amber-200 rounded-none p-4 flex items-start space-x-3">
          <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-800">Referensi Afiliasi Aktif</h4>
            <p className="text-[11px] text-amber-700 mt-0.5">
              Kode afiliasi <strong>&apos;{affiliateId}&apos;</strong> terdeteksi pada sesi ini.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}