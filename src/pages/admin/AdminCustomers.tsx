import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpDown,
  MoreVertical,
  Mail,
  Calendar,
  ShoppingBag,
  UserCheck,
  UserMinus
} from "lucide-react";
import { adminServices } from "../../services/admin.services";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await adminServices.getCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Error fetching customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Customers</h1>
          <p className="text-app-secondary font-medium mt-2">Manage your customer base and user accounts.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search customers by name, email, or ID..." 
            className="w-full bg-app-surface border border-app-border px-12 py-4 text-sm font-bold outline-none focus:border-app-primary transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-app-surface border border-app-border rounded-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-app-bg/5 border-b border-app-border">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Customer</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Joined</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Orders</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Total Spent</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-sm text-app-secondary">Loading customers...</td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer, i) => (
                  <tr key={customer.id || i} className="hover:bg-app-bg/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-app-bg border border-app-border rounded-none flex items-center justify-center text-xs font-black text-app-secondary">
                          {customer.name ? customer.name.substring(0, 1).toUpperCase() : 'A'}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-app-primary uppercase leading-tight">{customer.name || 'Anonymous'}</p>
                          <p className="text-[10px] font-medium text-app-secondary opacity-60">{customer.email || 'No email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-app-secondary">
                        <Calendar size={14} />
                        {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : (customer.joined || 'Unknown')}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-xs font-black text-app-primary">
                        <ShoppingBag size={14} className="text-app-secondary opacity-40" />
                        {customer.orders || customer.order_count || 0}
                      </div>
                    </td>
                    <td className="p-6 text-xs font-black text-app-primary">${Number(customer.spent || customer.total_spent || 0).toFixed(2)}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${
                        (customer.status === "active" || customer.status === "Active")
                          ? "bg-app-success/10 text-app-success border-app-success/20" 
                          : customer.status === "banned" || customer.status === "Banned"
                          ? "bg-app-danger/10 text-app-danger border-app-danger/20"
                          : "bg-app-secondary/10 text-app-secondary border-app-secondary/20"
                      }`}>
                        {customer.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-app-secondary hover:text-app-primary transition-colors">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-app-secondary hover:text-app-accent transition-colors">
                          <UserCheck size={16} />
                        </button>
                        <button className="p-2 text-app-secondary hover:text-app-danger transition-colors">
                          <UserMinus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-sm text-app-secondary">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
