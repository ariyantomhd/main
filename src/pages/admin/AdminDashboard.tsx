import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Package
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { adminServices } from "../../lib/api";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([
    { label: "Total Revenue", value: "$0", change: "+0%", icon: DollarSign, color: "text-app-success" },
    { label: "Total Orders", value: "0", change: "+0%", icon: ShoppingCart, color: "text-app-accent" },
    { label: "Total Customers", value: "0", change: "+0%", icon: Users, color: "text-app-warning" },
    { label: "Active Products", value: "0", change: "+0%", icon: Package, color: "text-app-primary" },
  ]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [dashboardData, recentData] = await Promise.all([
          adminServices.getDashboardCharts().catch(() => ({ stats: {}, chartData: [] })),
          adminServices.getRecentOrders().catch(() => [])
        ]);

        if (dashboardData && dashboardData.stats) {
          setStats([
            { label: "Total Revenue", value: dashboardData.stats.totalRevenue || "$0", change: "+0%", icon: DollarSign, color: "text-app-success" },
            { label: "Total Orders", value: dashboardData.stats.totalOrders || "0", change: "+0%", icon: ShoppingCart, color: "text-app-accent" },
            { label: "Total Customers", value: dashboardData.stats.totalCustomers || "0", change: "+0%", icon: Users, color: "text-app-warning" },
            { label: "Active Products", value: dashboardData.stats.activeProducts || "0", change: "+0%", icon: Package, color: "text-app-primary" },
          ]);
        }
        if (dashboardData && dashboardData.chartData) {
           setData(dashboardData.chartData);
        }
        
        if (Array.isArray(recentData)) {
          setRecentOrders(recentData);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Dashboard</h1>
          <p className="text-app-secondary font-medium mt-2">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest hover:bg-app-bg transition-colors">
            Download Report
          </button>
          <button className="px-6 py-3 bg-app-primary text-app-surface text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
            Manage Inventory
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-app-secondary">
           Loading data...
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 bg-app-bg ${stat.color} rounded-none`}>
                      <Icon size={24} />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-black ${stat.change.startsWith('+') ? 'text-app-success' : 'text-app-danger'}`}>
                      {stat.change}
                      {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">{stat.label}</p>
                    <h3 className="text-3xl font-black text-app-primary tracking-tighter mt-1">{stat.value}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Revenue Overview</h3>
                <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-app-accent outline-none cursor-pointer">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                {data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0px' }}
                        labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', marginBottom: '4px' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                   <div className="h-full flex items-center justify-center text-app-secondary text-sm">No data available</div>
                )}
              </div>
            </div>

            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Sales Performance</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-app-primary rounded-none" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Orders</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                {data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0px' }}
                        labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', marginBottom: '4px' }}
                      />
                      <Bar dataKey="sales" fill="#0f172a" radius={[0, 0, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-app-secondary text-sm">No data available</div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-app-surface border border-app-border rounded-none shadow-sm overflow-hidden">
            <div className="p-8 border-b border-app-border flex justify-between items-center bg-app-bg/10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Recent Orders</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-app-accent hover:underline">View All Orders</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-app-bg/5 border-b border-app-border">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Order ID</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Customer Email</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Amount</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order: any, i: number) => (
                      <tr key={i} className="hover:bg-app-bg/5 transition-colors group">
                        <td className="p-6 text-xs font-black text-app-primary">#{order.invoice_number || order.id?.substring(0,8) || `ORD-${i}`}</td>
                        <td className="p-6 text-xs font-medium text-app-secondary">{order.buyer_email || 'anonymous'}</td>
                        <td className="p-6 text-xs font-black text-app-primary">${order.amount || 0}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${
                            order.status === 'completed' || order.status === 'success' 
                              ? 'bg-app-success/10 text-app-success border-app-success/20'
                              : 'bg-app-warning/10 text-app-warning border-app-warning/20'
                          }`}>
                            {order.status || 'Pending'}
                          </span>
                        </td>
                        <td className="p-6 text-xs font-medium text-app-secondary">
                          {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Just now'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-sm text-app-secondary">No recent orders.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
