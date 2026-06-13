import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { PurchaseOrderItem } from "../../../types/order";

export function useDashboardData() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  const fetchUserData = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch or derive actual data from your backend
      setPurchases([]);
      setTotalSpent(0);
    } catch (err) {
      console.warn("Critical Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { 
    fetchUserData(); 
  }, [fetchUserData]);

  return {
    user,
    purchases,
    loading,
    totalSpent,
    refetch: fetchUserData
  };
}
