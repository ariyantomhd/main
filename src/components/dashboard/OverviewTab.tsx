'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Download, 
  Heart, 
  Wallet, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck 
} from 'lucide-react';
import { DashboardStats, RecentOrder } from '@/types/dashboard';

interface OverviewTabProps {
  setActiveTab: (tab: 'overview' | 'purchases' | 'downloads' | 'wishlist' | 'settings') => void;
  stats?: DashboardStats;
  recentOrders?: RecentOrder[];
}

export default function OverviewTab({ setActiveTab, stats, recentOrders }: OverviewTabProps) {
  const statItems = [
    { title: 'Total Pembelian', value: `${stats?.active_orders || 0} Produk`, icon: ShoppingBag, color: 'text-teal-600 bg-teal-50 border-teal-100' },
    { title: 'Aset Didownload', value: `${stats?.downloadable_items || 0} File`, icon: Download, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { title: 'Wishlist', value: `${stats?.wishlist_count || 0} Item`, icon: Heart, color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { title: 'Total Belanja', value: `Rp ${(stats?.total_spent || 0).toLocaleString('id-ID')}`, icon: Wallet, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.title}</p>
                <h3 className="text-xl font-black text-slate-900">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-xl border ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black text-slate-900">Transaksi Terakhir</h3>
            <button 
              onClick={() => setActiveTab('purchases')} 
              className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                  <th className="pb-3">ID Transaksi</th>
                  <th className="pb-3">Produk</th>
                  <th className="pb-3">Tanggal</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders && recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-mono font-semibold text-slate-700">{order.order_number}</td>
                      <td className="py-3 font-bold text-slate-900">{order.product_name}</td>
                      <td className="py-3 text-slate-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="py-3 font-semibold text-slate-900">Rp {order.total_amount.toLocaleString('id-ID')}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'COMPLETED' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.status === 'COMPLETED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400 italic">Belum ada transaksi terbaru.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-6 text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-teal-100" />
            </div>
            <h3 className="text-base font-black mb-2">Upgrade ke Developer Pro</h3>
            <p className="text-xs text-teal-100 leading-relaxed mb-4">
              Dapatkan akses tak terbatas ke semua source code premium, diskon khusus afiliasi, dan prioritas dukungan teknis.
            </p>
          </div>
          <button className="w-full py-2.5 bg-white text-teal-800 rounded-xl text-xs font-black shadow-sm hover:bg-teal-50 transition-colors">
            Pelajari Selengkapnya
          </button>
        </div>
      </div>
    </>
  );
}