import React from "react";
import { CreditCard, DownloadCloud } from "lucide-react";

export default function StatsGrid({ user, totalSpent, count }: { user: any, totalSpent: number, count: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-app-surface border border-app-border p-6 rounded-2xl flex items-center gap-5 shadow-[0_10px_40px_-20px_rgba(30,27,75,0.3)] hover:border-app-accent/30 transition-colors group">
        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
          <CreditCard size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Total Invested</p>
          <h3 className="text-3xl font-black text-app-primary tracking-tighter">${totalSpent.toFixed(2)}</h3>
        </div>
      </div>
      
      <div className="bg-app-surface border border-app-border p-6 rounded-2xl flex items-center gap-5 shadow-[0_10px_40px_-20px_rgba(30,27,75,0.3)] hover:border-app-accent/30 transition-colors group">
        <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 border border-green-500/20 group-hover:scale-110 transition-transform duration-500">
          <DownloadCloud size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Assets Owned</p>
          <h3 className="text-3xl font-black text-app-primary tracking-tighter">{count} Items</h3>
        </div>
      </div>
    </div>
  );
}
