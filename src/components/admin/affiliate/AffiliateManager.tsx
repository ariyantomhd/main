import React, { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { adminServices } from "../../../services/admin.services";

export default function AffiliateManager() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [affiliateData, statsData] = await Promise.all([
          adminServices.getAffiliatesList().catch(() => []),
          adminServices.getAffiliateStats().catch(() => null)
        ]);

        if (Array.isArray(affiliateData)) {
          setAffiliates(affiliateData);
        } else if (affiliateData && Array.isArray(affiliateData.data)) {
           setAffiliates(affiliateData.data);
        }
        
        if (statsData) {
          setStats(statsData);
        }
      } catch (error) {
        console.warn("Error fetching affiliates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
     try {
        await adminServices.updateAffiliateStatus(id, status);
        setAffiliates(affiliates.map(a => a.id === id ? { ...a, status } : a));
     } catch(err) {
        console.error(err);
     }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Affiliates</h1>
          <p className="text-app-secondary font-medium mt-2">Manage your partners and referral program.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Partners", value: stats?.totalAffiliates || "0", icon: Users, color: "text-app-accent" },
          { label: "Total Payouts", value: stats?.totalPayouts || "$0", icon: DollarSign, color: "text-app-success" },
          { label: "Conversion Rate", value: stats?.conversionRate || "0%", icon: TrendingUp, color: "text-app-primary" },
        ].map((stat, i) => (
          <div key={i} className="bg-app-surface p-8 border border-app-border shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">{stat.label}</p>
                <p className="text-3xl font-black text-app-primary tracking-tighter">{stat.value}</p>
              </div>
              <div className={`p-3 bg-app-bg border border-app-border ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Affiliates Table */}
      <div className="bg-app-surface border border-app-border rounded-none shadow-sm overflow-hidden">
        <div className="p-6 border-b border-app-border bg-app-bg/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Search partners..." 
              className="w-full bg-app-surface border border-app-border px-10 py-3 text-xs font-bold outline-none focus:border-app-primary transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <button className="text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">Export CSV</button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 size={48} className="text-app-accent animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Loading Partners...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-app-bg/5 border-b border-app-border">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Partner</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Referrals</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Earnings</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {affiliates.length > 0 ? affiliates.map((aff, i) => (
                  <tr key={aff.id || i} className="hover:bg-app-bg/5 transition-colors group">
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-app-primary uppercase leading-tight">{aff.name || 'Anonymous'}</p>
                        <p className="text-[10px] font-medium text-app-secondary opacity-60">{aff.email}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-black text-app-primary">{aff.referral_count || aff.referrals || 0}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-black text-app-primary">${Number(aff.earnings || 0).toFixed(2)}</span>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${
                        (aff.status === "active" || aff.status === 'approved')
                          ? "bg-app-success/10 text-app-success border-app-success/20" 
                          : "bg-app-warning/10 text-app-warning border-app-warning/20"
                      }`}>
                        {aff.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-app-secondary hover:text-app-primary transition-colors">
                          <ExternalLink size={16} />
                        </button>
                        <button onClick={() => handleUpdateStatus(aff.id, 'approved')} className="p-2 text-app-secondary hover:text-app-success transition-colors">
                          <CheckCircle2 size={16} />
                        </button>
                        <button onClick={() => handleUpdateStatus(aff.id, 'rejected')} className="p-2 text-app-secondary hover:text-app-danger transition-colors">
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-sm text-app-secondary">No affiliates found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
