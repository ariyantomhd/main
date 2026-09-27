'use client';

import React from 'react';
import { UserRole } from '@/types/enum';

interface SettingsTabProps {
  user?: {
    id: string;
    display_name: string;
    email: string;
    avatar_url: string | null;
    role: UserRole;
    created_at: string;
  };
}

export default function SettingsTab({ user }: SettingsTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl">
      <h3 className="text-sm font-black text-slate-900 mb-4">Informasi Akun & Keamanan</h3>
      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            defaultValue={user?.display_name || ''} 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:border-teal-500" 
          />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Alamat Email</label>
          <input 
            type="email" 
            defaultValue={user?.email || ''} 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold opacity-75 cursor-not-allowed" 
            disabled 
          />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Peran Akun</label>
          <input 
            type="text" 
            defaultValue={user?.role || 'USER'} 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold opacity-75 cursor-not-allowed uppercase" 
            disabled 
          />
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}