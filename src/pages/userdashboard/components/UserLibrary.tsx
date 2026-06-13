import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { userDashboardService } from "../../../services/userDashboard.service";

export default function UserLibrary() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDownloads() {
      try {
        const data = await userDashboardService.getDownloads();
        setDownloads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load downloads:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDownloads();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-app-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold">My Library</h1>
        <p className="text-app-secondary">Access and download your purchased digital products.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloads.length === 0 ? (
          <div className="col-span-full p-8 text-center text-app-secondary bg-app-surface border border-app-border rounded-2xl">
            <p>You haven't made any purchases yet.</p>
          </div>
        ) : (
          downloads.map((item, index) => (
            <div key={item.id || index} className="bg-app-surface border border-app-border rounded-2xl p-6 flex items-center justify-between">
               <div>
                  <h3 className="font-semibold text-lg">{item.products?.name || `Product ${item.product_id || item.id || ''}`}</h3>
                  <p className="text-xs text-app-secondary mt-1">Purchased on {new Date(item.downloaded_at || item.created_at).toLocaleDateString()}</p>
               </div>
               <button className="flex items-center gap-2 bg-app-bg hover:bg-app-accent hover:text-white transition-colors border border-app-border px-4 py-2 rounded-xl text-sm font-medium">
                 <Download className="w-4 h-4" /> Download
               </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
