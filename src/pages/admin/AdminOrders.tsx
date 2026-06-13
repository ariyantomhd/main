import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { adminServices } from "../../services/admin.services";

const statusStyles: Record<string, string> = {
  Completed: "bg-app-success/10 text-app-success border-app-success/20",
  Processing: "bg-app-warning/10 text-app-warning border-app-warning/20",
  Failed: "bg-app-danger/10 text-app-danger border-app-danger/20",
  Refunded: "bg-app-secondary/10 text-app-secondary border-app-secondary/20",
};

const statusIcons: Record<string, any> = {
  Completed: CheckCircle2,
  Processing: Clock,
  Failed: XCircle,
  Refunded: AlertCircle,
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async (search?: string) => {
    setIsLoading(true);
    try {
      const data = await adminServices.getOrders(search);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Error fetching orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(searchQuery);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Orders</h1>
          <p className="text-app-secondary font-medium mt-2">Monitor and manage customer transactions.</p>
        </div>
        <button className="flex items-center gap-3 bg-app-surface border border-app-border px-8 py-4 rounded-none font-black uppercase text-xs tracking-widest hover:bg-app-bg transition-colors">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filters & Search */}
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders by ID, customer, or email..." 
            className="w-full bg-app-surface border border-app-border px-12 py-4 text-sm font-bold outline-none focus:border-app-primary transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <button type="button" className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button type="button" className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </form>

      {/* Orders Table */}
      <div className="bg-app-surface border border-app-border rounded-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-app-bg/5 border-b border-app-border">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Order ID</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Customer</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Product</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Amount</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Date</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-sm text-app-secondary">Loading orders...</td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => {
                  // Normalize status string for matching styles exactly. E.g. "completed" or "Completed"
                  const normalizedStatus = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase() : "Processing";
                  const StatusIcon = statusIcons[normalizedStatus] || Clock;
                  const styleClass = statusStyles[normalizedStatus] || statusStyles.Processing;
                  
                  return (
                    <tr key={order.id} className="hover:bg-app-bg/5 transition-colors group">
                      <td className="p-6 text-xs font-black text-app-primary">#{order.id?.substring(0, 8) || order.id}</td>
                      <td className="p-6">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-app-primary">{order.customer || 'Anonymous'}</p>
                          <p className="text-[10px] font-medium text-app-secondary opacity-60">{order.email}</p>
                        </div>
                      </td>
                      <td className="p-6 text-xs font-medium text-app-secondary">{order.product}</td>
                      <td className="p-6 text-xs font-black text-app-primary">${Number(order.amount || 0).toFixed(2)}</td>
                      <td className="p-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${styleClass}`}>
                          <StatusIcon size={12} />
                          {normalizedStatus}
                        </div>
                      </td>
                      <td className="p-6 text-xs font-medium text-app-secondary">
                        {order.date || (order.created_at ? new Date(order.created_at).toLocaleDateString() : '')}
                      </td>
                      <td className="p-6 text-right">
                        <button className="p-2 text-app-secondary hover:text-app-primary transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-sm text-app-secondary">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
