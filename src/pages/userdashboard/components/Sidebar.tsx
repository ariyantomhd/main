import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Download, ShoppingBag, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

export default function Sidebar({ userProfile }: { userProfile: any }) {
  const location = useLocation();
  const { signOut } = useAuth();

  const MENU = useMemo(() => {
    const base = [
      { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "My Library", path: "/dashboard/downloads", icon: <Download size={18} /> },
      { name: "Transaction", path: "/dashboard/orders", icon: <ShoppingBag size={18} /> },
    ];

    base.push({ name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> });
    return base;
  }, []);

  return (
    <aside className="w-full flex-shrink-0 flex flex-col gap-6">
      {/* User Info */}
      <div className="bg-app-surface border border-app-border p-6 rounded-2xl flex flex-col items-center gap-4 shadow-sm text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-app-accent/10 border-2 border-app-accent/20 flex items-center justify-center flex-shrink-0 shadow-inner">
           {userProfile?.avatar_url ? (
             <img src={userProfile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
           ) : (
             <span className="text-3xl font-black text-app-accent uppercase">{userProfile?.full_name?.charAt(0) || userProfile?.email?.charAt(0) || 'U'}</span>
           )}
        </div>
        <div className="overflow-hidden w-full px-2">
          <h3 className="text-sm font-black text-app-primary truncate">{userProfile?.full_name || 'User'}</h3>
          <p className="text-[10px] tracking-widest text-app-secondary uppercase truncate mt-1">{userProfile?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-app-surface border border-app-border rounded-2xl p-3 flex flex-col gap-1 shadow-sm">
        {MENU.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && item.path !== '#' && location.pathname.startsWith(item.path));
          const isExact = location.pathname === item.path;
          const activeState = item.path === '/dashboard' ? isExact : isActive;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${
                activeState 
                ? "bg-app-primary text-app-surface shadow-md scale-[1.02]" 
                : "text-app-secondary hover:bg-app-bg hover:text-app-primary hover:scale-[1.01]"
              }`}
            >
              <div className={activeState ? "text-app-surface" : "text-app-accent"}>
                 {item.icon}
              </div>
              {item.name}
            </Link>
          );
        })}
        
        <div className="h-px bg-app-border my-2 mx-4" />
        
        <button 
          onClick={signOut}
          className="flex items-center gap-4 px-5 py-4 text-app-warning hover:bg-app-warning/10 rounded-xl transition-all text-xs font-black uppercase tracking-widest w-full text-left"
        >
          <div className="text-app-warning opacity-80">
            <LogOut size={18} />
          </div>
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
