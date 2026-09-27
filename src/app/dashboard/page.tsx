// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import OverviewTab from '@/components/dashboard/OverviewTab';
import PurchasesTab from '@/components/dashboard/PurchasesTab';
import DownloadsTab from '@/components/dashboard/DownloadsTab';
import WishlistTab from '@/components/dashboard/WishlistTab';
import SettingsTab from '@/components/dashboard/SettingsTab';
import { dashboardService } from '@/services/dashboardApi';
import { UserDashboardData } from '@/types/dashboard';
import { Loader2, AlertCircle } from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'downloads' | 'wishlist' | 'settings'>('overview');
  
  // State untuk menyimpan data dari Backend
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil data dari Backend saat komponen pertama kali dimuat
  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Gagal memuat data dari server.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  // Tampilan saat data sedang dimuat
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Memuat Dashboard...</p>
      </div>
    );
  }

  // Tampilan saat terjadi error koneksi/backend
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-sm font-black text-slate-900">Terjadi Kesalahan</h2>
        <p className="text-xs text-slate-500 max-w-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={dashboardData?.user} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          activeTab={activeTab} 
          user={dashboardData?.user} 
        />

        {/* Membatasi lebar maksimum area konten agar tidak terlalu melebar */}
        <div className="p-6 flex-1 flex justify-center">
          <div className="w-full max-w-7xl space-y-6">
            {activeTab === 'overview' && (
              <OverviewTab 
                setActiveTab={setActiveTab} 
                stats={dashboardData?.stats}
                recentOrders={dashboardData?.recent_orders}
              />
            )}
            {activeTab === 'purchases' && (
              <PurchasesTab 
                purchases={dashboardData?.recent_orders} 
              />
            )}
            {activeTab === 'downloads' && (
              <DownloadsTab 
                downloads={dashboardData?.purchased_products} 
              />
            )}
            {activeTab === 'wishlist' && (
              <WishlistTab />
            )}
            {activeTab === 'settings' && (
              <SettingsTab 
                user={dashboardData?.user} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}