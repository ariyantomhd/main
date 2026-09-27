'use client';

import React from 'react';
import { RecentOrder } from '@/types/dashboard';
import { CheckCircle2, Clock } from 'lucide-react';

interface PurchasesTabProps {
  purchases?: RecentOrder[];
}

export default function PurchasesTab({ purchases }: PurchasesTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <h3 className="text-sm font-black text-slate-900 mb-4">Semua Riwayat Pembelian</h3>
      <p className="text-xs text-slate-500 mb-6">Daftar lengkap seluruh transaksi pembelian aset digital Anda.</p>
      
      {purchases && purchases.length > 0 ? (
        <div className="space-y-3">
          {purchases.map((p) => (
            <div key={p.id} className="p-4 border border-slate-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div>
                <p className="font-mono text-[10px] text-slate-400 font-bold">{p.order_number}</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{p.product_name}</p>
                <p className="text-slate-500 mt-1">Tanggal: {new Date(p.created_at).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-black text-slate-900">Rp {p.total_amount.toLocaleString('id-ID')}</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  p.status === 'COMPLETED' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {p.status === 'COMPLETED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Belum ada riwayat pembelian ditemukan.</p>
      )}
    </div>
  );
}