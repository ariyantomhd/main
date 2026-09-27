'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';
import { UserRole } from '@/types/enum';

interface HeaderProps {
  activeTab: string;
  user?: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
    role: UserRole;
    created_at: string;
  };
}

export default function Header({ activeTab }: HeaderProps) {
  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Dashboard Overview';
      case 'purchases': return 'Riwayat Pembelian Produk';
      case 'downloads': return 'Pusat Download Aset';
      case 'wishlist': return 'Daftar Keinginan (Wishlist)';
      case 'settings': return 'Pengaturan Profil Akun';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          {getTitle()}
        </h1>
        <p className="text-xs text-slate-500">Kelola aktivitas marketplace dan aset digital Anda di sini.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari transaksi atau aset..."
            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-teal-500"
          />
        </div>
        <button className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>
      </div>
    </header>
  );
}