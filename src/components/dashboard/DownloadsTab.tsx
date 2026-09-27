'use client';

import React from 'react';
import { PurchasedProduct } from '@/types/dashboard';
import { Download } from 'lucide-react';

interface DownloadsTabProps {
  downloads?: PurchasedProduct[];
}

export default function DownloadsTab({ downloads }: DownloadsTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <h3 className="text-sm font-black text-slate-900 mb-4">Pusat Download Aset Resmi</h3>
      <p className="text-xs text-slate-500 mb-6">Tombol download update source code terbaru tersedia pada bagian ini.</p>

      {downloads && downloads.length > 0 ? (
        <div className="space-y-3">
          {downloads.map((item) => (
            <div key={item.id} className="p-4 border border-slate-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                <p className="text-slate-400 mt-0.5">Versi: <span className="font-semibold text-slate-600">{item.version}</span></p>
              </div>
              <a 
                href={item.download_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">Belum ada aset digital yang dapat di-download.</p>
      )}
    </div>
  );
}