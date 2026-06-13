import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Download } from "lucide-react";

export default function UserOrderDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

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
        <Link to="/dashboard/orders" className="inline-flex items-center text-sm text-app-secondary hover:text-white mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-app-secondary">Order ID: {id}</p>
      </div>

      <div className="bg-app-surface border border-app-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Items</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-app-bg border border-app-border rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-app-surface border border-app-border rounded-lg flex items-center justify-center">
                <span className="text-xs text-app-secondary">Image</span>
              </div>
              <div>
                <h3 className="font-medium">Product Item</h3>
                <p className="text-sm text-app-secondary">Quantity: 1</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-medium">$99.00</span>
              <button className="text-xs flex items-center gap-1 text-app-accent hover:underline">
                <Download className="w-3 h-3" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
