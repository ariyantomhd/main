import React from "react";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AdminLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <Loader2 size={48} className="text-app-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-app-bg font-sans">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-8 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
