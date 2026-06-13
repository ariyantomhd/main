import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  FileText,
  Wallet,
  Clock,
  Download
} from "lucide-react";
import { motion } from "motion/react";
import { adminServices } from "../../services/admin.services";

interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  method: string;
  account_details: string;
  status: string;
  created_at: string;
}

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState("Revenue");
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "Revenue", label: "Revenue Summary", icon: DollarSign },
    { id: "Withdrawals", label: "Withdrawal Requests", icon: CreditCard },
  ];

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setIsLoading(true);
    try {
      const response = await adminServices.getWithdrawals();
      if (response && response.data) {
        setWithdrawals(response.data);
      } else if (Array.isArray(response)) {
        setWithdrawals(response);
      }
    } catch (e) {
      console.error(e);
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await adminServices.updateWithdrawalStatus(id, 'completed');
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'completed' } : w));
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminServices.updateWithdrawalStatus(id, 'rejected');
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'rejected' } : w));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-app-primary">Finance & Revenue</h1>
        <p className="text-sm font-medium text-app-secondary mt-2">Manage marketplace revenue and affiliate payouts.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-app-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "text-app-primary border-b-2 border-app-primary bg-app-surface"
                : "text-app-secondary hover:bg-app-bg"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pt-4">
        {activeTab === "Revenue" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-app-surface border border-app-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-app-bg text-app-primary">
                    <DollarSign size={24} />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-[#10B981] bg-[#10B981]/10 px-2 py-1">+12.5%</span>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-app-secondary">Total Gross Revenue</p>
                <p className="text-3xl font-black text-app-primary mt-2">$24,500.00</p>
              </div>

              <div className="bg-app-surface border border-app-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-app-bg text-app-accent">
                    <Wallet size={24} />
                  </div>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-app-secondary">Platform Commissions</p>
                <p className="text-3xl font-black text-app-primary mt-2">$4,900.00</p>
              </div>

              <div className="bg-app-surface border border-app-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-app-bg text-app-accent">
                    <CreditCard size={24} />
                  </div>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-app-secondary">Affiliate Payouts</p>
                <p className="text-3xl font-black text-app-primary mt-2">$2,150.00</p>
              </div>
            </div>

            {/* Additional revenue logic could go here */}
            <div className="bg-app-surface border border-app-border p-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-app-primary mb-4 border-b border-app-border pb-4">Recent Transactions</h3>
              <div className="text-center py-12 text-sm font-medium text-app-secondary">
                <FileText className="mx-auto mb-4 opacity-50" size={32} />
                Transaction logs will be displayed here.
              </div>
            </div>
          </div>
        )}

        {activeTab === "Withdrawals" && (
          <div className="bg-app-surface border border-app-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-app-bg text-xs font-black uppercase tracking-widest text-app-secondary border-b border-app-border">
                  <tr>
                    <th className="px-6 py-4">Req ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method & Details</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border font-medium">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-app-secondary">
                        Loading requests...
                      </td>
                    </tr>
                  ) : withdrawals.length > 0 ? (
                    withdrawals.map((req) => (
                      <tr key={req.id} className="hover:bg-app-bg/50 transition-colors">
                        <td className="px-6 py-4 text-app-primary uppercase tracking-widest text-xs font-black">{req.id}</td>
                        <td className="px-6 py-4">{req.userId}</td>
                        <td className="px-6 py-4 font-black">${Number(req.amount || 0).toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="uppercase tracking-wider text-[10px] font-black">{req.method}</span>
                            <span className="text-app-secondary opacity-80">{req.account_details}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                            req.status === 'completed' || req.status === 'success' ? 'bg-[#10B981]/10 text-[#10B981]' :
                            req.status === 'rejected' ? 'bg-app-danger/10 text-app-danger' :
                            'bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}>
                            {(req.status === 'completed' || req.status === 'success') && <CheckCircle size={12} />}
                            {req.status === 'rejected' && <XCircle size={12} />}
                            {(req.status === 'pending' || req.status === 'processing') && <Clock size={12} />}
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {(req.status === 'pending' || req.status === 'processing') && (
                            <>
                              <button 
                                onClick={() => handleApprove(req.id)}
                                className="px-3 py-1.5 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#059669] transition-colors"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleReject(req.id)}
                                className="px-3 py-1.5 border border-app-danger text-app-danger text-[10px] font-black uppercase tracking-widest hover:bg-app-danger hover:text-white transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-app-secondary">
                        No withdrawal requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
