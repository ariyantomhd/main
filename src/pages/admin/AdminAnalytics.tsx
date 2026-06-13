import React, { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { adminServices } from "../../services/admin.services";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminServices.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.warn("Failed to fetch analytics", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const monthlyData = analytics?.monthlyData || [
    { name: "Jan", revenue: 0, sales: 0 }
  ];

  const categoryData = analytics?.categoryData || [
    { name: "Uncategorized", value: 100, color: "#6366f1" }
  ];

  const stats = analytics?.stats || [
    { label: "Avg. Order Value", value: "$0.00", icon: DollarSign },
    { label: "Conversion Rate", value: "0%", icon: TrendingUp },
    { label: "Retention Rate", value: "0%", icon: Users },
    { label: "Items per Order", value: "0", icon: ShoppingBag },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Analytics</h1>
        <p className="text-app-secondary font-medium mt-2">Deep dive into your marketplace performance.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-app-secondary">
          Loading analytics...
        </div>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat: any, index: number) => {
               // Use local icons for standard matching 
               let Icon = stat.icon;
               if (!Icon) {
                   if (stat.label.includes('Avg')) Icon = DollarSign;
                   else if (stat.label.includes('Rate') && !stat.label.includes('Retention')) Icon = TrendingUp;
                   else if (stat.label.includes('Retention')) Icon = Users;
                   else Icon = ShoppingBag;
               }
               return (
                <div key={stat.label || index} className="bg-app-surface border border-app-border p-6 rounded-none shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-app-bg text-app-primary rounded-none">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-app-secondary opacity-60">{stat.label}</p>
                    <p className="text-xl font-black text-app-primary tracking-tighter">{stat.value}</p>
                  </div>
                </div>
               );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Growth */}
            <div className="lg:col-span-2 bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Revenue Growth</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
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
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Sales by Category</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color || '#6366f1'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {categoryData.map((cat: any, i: number) => (
                  <div key={cat.name || i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-none" style={{ backgroundColor: cat.color || '#6366f1' }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-app-primary">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
