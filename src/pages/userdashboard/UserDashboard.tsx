import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import StatsGrid from "./components/StatsGrid";
import PurchaseList from "./components/PurchaseList";
import { userDashboardService } from "../../services/userDashboard.service";

export default function UserDashboard() {
  const [stats, setStats] = useState({ totalInvested: 0, assetsOwned: 0 });
  const [user, setUser] = useState<{ name?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await userDashboardService.getStats();
        if (response.user) setUser(response.user);
        if (response.stats) setStats(response.stats);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <StatsGrid user={user} totalSpent={stats.totalInvested} count={stats.assetsOwned} />
      
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 bg-app-surface border border-app-border rounded-2xl shadow-sm">
          <Loader2 className="animate-spin text-app-accent" size={32} />
          <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Accessing Database...</p>
        </div>
      ) : (
        <PurchaseList items={[]} />
      )}
    </div>
  );
}

