import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  ExternalLink,
  BarChart3,
  Wallet,
  Edit3
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Customers", path: "/admin/customers" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Wallet, label: "Finance", path: "/admin/finance" },
  { icon: Users, label: "Affiliates", path: "/admin/affiliate" },
  { icon: Edit3, label: "Blog", path: "/admin/blog" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-app-surface border-r border-app-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-app-border">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="https://placehold.co/200x50/31343C/FFFFFF.png?text=LOGO" 
            alt="TEMAVIA" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
          <span className="text-[10px] font-black bg-app-primary text-app-surface px-2 py-0.5 uppercase tracking-widest">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-none transition-all group ${
                isActive 
                  ? "bg-app-primary text-app-surface" 
                  : "text-app-secondary hover:bg-app-bg hover:text-app-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-app-border space-y-2">
        <Link 
          to="/" 
          className="flex items-center gap-3 p-3 text-app-secondary hover:text-app-accent transition-colors group"
        >
          <ExternalLink size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">View Storefront</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-app-danger hover:bg-app-danger/10 transition-all group"
        >
          <LogOut size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </aside>
  );
}
