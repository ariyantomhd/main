import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { useAuth } from "../../hooks/useAuth";

export default function UserLayout() {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen bg-app-bg font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
        <div className="flex items-center justify-start pt-4">
          <Link to="/" className="flex items-center gap-2 text-app-secondary hover:text-app-primary transition-colors group">
            <div className="p-2 bg-app-surface rounded-xl group-hover:bg-app-bg border border-app-border shadow-sm">
              <ChevronLeft size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Home</span>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-64 flex-shrink-0 sticky top-[88px]">
             <Sidebar userProfile={profile} />
          </div>
          <div className="flex-1 w-full flex flex-col gap-8">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
