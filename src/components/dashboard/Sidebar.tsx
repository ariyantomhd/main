'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Download, 
  Heart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { UserRole } from '@/types/enum';

interface SidebarProps {
  activeTab: 'overview' | 'purchases' | 'downloads' | 'wishlist' | 'settings';
  setActiveTab: (tab: 'overview' | 'purchases' | 'downloads' | 'wishlist' | 'settings') => void;
  user?: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
    role: UserRole;
    created_at: string;
  };
}

export default function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'purchases', label: 'Riwayat Pembelian', icon: ShoppingBag },
    { id: 'downloads', label: 'Download Aset', icon: Download },
    { id: 'wishlist', label: 'Wishlist Saya', icon: Heart },
    { id: 'settings', label: 'Pengaturan Akun', icon: Settings },
  ] as const;

  const initials = user?.display_name 
    ? user.display_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'US';

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-lg">
            D
          </div>
          <span className="font-black text-slate-900 text-lg tracking-tight">DevMart <span className="text-teal-600">Panel</span></span>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-700">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.display_name || 'Pengguna'}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email || 'email@domain.com'}</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}