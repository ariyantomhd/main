
import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface ProductTabsProps {
  longDesc: string;
  tags?: string[];
  rating: number;
  reviewsCount: number;
}

export default function ProductTabs({
  longDesc,
  tags,
  rating,
  reviewsCount,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'changelog' | 'reviews'>('desc');

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="border-b border-slate-200">
        <div className="flex space-x-6 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto">
          {(['desc', 'features', 'changelog', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 border-b-2 transition-colors relative whitespace-nowrap cursor-pointer uppercase ${
                activeTab === tab ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'desc' ? 'Item Details' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[200px] text-xs text-slate-600 leading-relaxed space-y-4">
        {activeTab === 'desc' && (
          <>
            <h3 className="text-base font-bold text-slate-900">Product Description</h3>
            <p className="whitespace-pre-line">{longDesc}</p>
            
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 font-mono text-[11px] mt-4">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">First Released</span>
                <span className="text-slate-800 font-semibold">Mar 22, 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase">Last Update</span>
                <span className="text-slate-800 font-semibold">2 days ago</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase mb-1">Category Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {(tags || ['SwiftUI', 'iOS', 'Web3', 'Crypto']).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] text-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Key Technical Capabilities</h3>
            {['Advanced state management integration', 'Fully responsive modern UI components', 'Clean, modular architecture'].map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'changelog' && (
          <div className="space-y-4">
            <div className="pl-4 border-l-2 border-orange-500">
              <span className="font-bold text-orange-500 font-mono">v1.1.0</span>
              <p className="text-slate-500 text-[11px]">Released 2 days ago</p>
              <p className="mt-1">Performance optimizations and minor bug fixes.</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-50 p-4 border border-slate-200">
              <div className="text-3xl font-black text-slate-900">{rating.toFixed(1)}</div>
              <div className="text-amber-500 flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs text-slate-600 ml-2 font-medium">Based on {reviewsCount} verified reviews</span>
              </div>
            </div>
            <div className="border border-slate-200 p-3 bg-slate-50">
              <div className="flex justify-between font-bold text-slate-900 mb-1">
                <span>Alex Developer</span>
                <span className="text-amber-500 text-[11px]">★★★★★</span>
              </div>
              <p className="text-slate-600">Sangat membantu dan mempercepat waktu development!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}