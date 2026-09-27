// src/components/cart/CartEmpty.tsx
'use client';

import React from 'react';
import { ShieldCheck, ShoppingBag } from 'lucide-react';

interface CartEmptyProps {
  type: 'empty' | 'success';
  onAction: () => void;
}

export default function CartEmpty({ type, onAction }: CartEmptyProps) {
  if (type === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 max-w-lg mx-auto space-y-4 text-center my-12">
        <div className="p-4 bg-emerald-500/15 text-emerald-600 rounded-full">
          <ShieldCheck className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800">Pembayaran Berhasil!</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Terima kasih telah berbelanja. Detail lisensi dan tautan unduhan telah dikirimkan ke email Anda.
        </p>
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-4"
        >
          Kembali ke Keranjang
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-16 max-w-lg mx-auto space-y-4 text-center my-12">
      <div className="p-4 bg-orange-500/10 text-orange-500 rounded-full">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <h2 className="text-xl font-bold text-slate-800">Keranjang Anda Kosong</h2>
      <p className="text-xs text-slate-500 leading-relaxed">
        Jelajahi katalog marketplace kami untuk menemukan skrip, modul, dan kit boilerplate terbaik.
      </p>
    </div>
  );
}