import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { userDashboardService } from "../../../services/userDashboard.service";

export default function UserTransaction() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await userDashboardService.getTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
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
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <p className="text-app-secondary">View your past orders and purchases.</p>
      </div>

      <div className="bg-app-surface border border-app-border rounded-2xl overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-app-secondary">
            <p>You haven't made any purchases yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-app-bg text-app-secondary uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {transactions.map((order) => (
                  <tr key={order.id} className="hover:bg-app-bg/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4 text-app-secondary">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${((order.total_price || order.total_amount || 0) / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center text-app-accent hover:underline font-medium gap-1"
                      >
                        Details
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
