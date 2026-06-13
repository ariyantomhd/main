import { Menu, Sun, Moon, ChevronDown, User, Shield, LogOut, LayoutDashboard, ShoppingCart, Monitor } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import JoinModal from "./JoinModal";
import { useAuth } from "../hooks/useAuth";
import { useUIStore } from "../store/useUIStore";
import { useCartStore } from "../store/useCartStore";

const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "PRODUCTS", path: "/products" },
  { name: "BUNDLES", path: "/bundles", isHot: true },
  { name: "BLOG", path: "/blog" },
  { name: "CUSTOMIZE", path: "/customize" },
  { name: "BECOME AFFILIATE", path: "/affiliate" },
];

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const { isJoinModalOpen, openJoinModal, closeJoinModal, theme, setTheme } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsThemeMenuOpen(false);
  }, [location]);

  const { getTotalItems, toggleCart } = useCartStore();
  const cartItemCount = getTotalItems();

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <nav className="bg-[#0F1035] text-white py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 border-b border-white/10 transition-colors duration-300">
      {/* Brand - Left */}
      <Link to="/" className="flex items-center gap-0 cursor-pointer group select-none">
        <div className="text-2xl md:text-3xl font-black tracking-tighter flex items-center">
          <span className="text-white transition-transform group-hover:scale-105">THEM</span>
          <span className="flex items-center transition-transform group-hover:scale-105">
            <span className="text-[#D8B4FE]">Λ</span>
            <span className="text-[#A855F7]">V</span>
            <span className="text-[#3B82F6]">I</span>
            <span className="text-[#22D3EE]">Λ</span>
          </span>
        </div>
      </Link>
      
      {/* Navigation - Center */}
      <div className="hidden lg:flex items-center gap-8 text-xs font-black uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative py-2 hover:text-app-accent transition-colors ${isActive ? "text-app-accent" : "text-white/80"}`}
            >
              {link.name}
              {link.isHot && (
                <span className="absolute -top-1 -right-6 bg-app-danger text-white text-[8px] px-1 py-0.5 font-black leading-none">
                  HOT
                </span>
              )}
              {isActive && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-app-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Actions - Right */}
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleCart}
          className="relative p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          title="Open Cart"
        >
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span className="absolute 0 right-0 -translate-y-1/4 translate-x-1/4 w-4 h-4 bg-app-accent rounded-full text-[10px] font-black flex items-center justify-center text-white">
              {cartItemCount}
            </span>
          )}
        </button>

        <div className="relative" ref={themeMenuRef}>
          <button 
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            title="Theme Selection"
          >
            <ThemeIcon size={20} />
          </button>
          
          <AnimatePresence>
            {isThemeMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-32 bg-white dark:bg-app-surface border border-app-border rounded-xl shadow-xl overflow-hidden py-1 z-50"
              >
                <div className="px-3 py-2 text-[9px] font-black tracking-widest text-app-secondary uppercase border-b border-app-border mb-1">
                  Theme
                </div>
                <button
                  onClick={() => { setTheme('light'); setIsThemeMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-app-bg hover:text-app-accent transition-colors ${theme === 'light' ? 'text-app-accent' : 'text-app-primary'}`}
                >
                  <Sun size={14} /> Light
                </button>
                <button
                  onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-app-bg hover:text-app-accent transition-colors ${theme === 'dark' ? 'text-app-accent' : 'text-app-primary'}`}
                >
                  <Moon size={14} /> Dark
                </button>
                <button
                  onClick={() => { setTheme('system'); setIsThemeMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-app-bg hover:text-app-accent transition-colors ${theme === 'system' ? 'text-app-accent' : 'text-app-primary'}`}
                >
                  <Monitor size={14} /> System
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-1 md:gap-3">
          <button className="lg:hidden p-2 hover:bg-app-bg rounded-full transition-colors">
            <Menu size={20} />
          </button>
          
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-app-accent transition-all group shadow-sm"
              >
                <div className="w-6 h-6 bg-white/10 border border-white/10 flex items-center justify-center text-app-brand-green overflow-hidden rounded-md">
                  {profile?.avatar_url && profile.avatar_url.trim() !== "" ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <span className="hidden sm:inline text-white">
                  {profile?.username || "Dashboard"}
                </span>
                <ChevronDown size={14} className={`text-white/60 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-app-surface border border-app-border shadow-2xl z-50 overflow-hidden rounded-lg"
                  >
                    <div className="p-4 border-b border-app-border bg-app-bg/5">
                      <p className="text-[10px] font-black text-app-secondary uppercase tracking-widest opacity-60 mb-1">Signed in as</p>
                      <p className="text-xs font-black text-app-primary truncate uppercase tracking-tight">{profile?.username || user.email}</p>
                    </div>

                    <div className="p-2">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary hover:bg-app-bg transition-colors group"
                      >
                        <LayoutDashboard size={14} className="text-app-brand-green group-hover:scale-110 transition-transform" />
                        My Dashboard
                      </Link>
                    </div>

                    <div className="p-2 border-t border-app-border bg-app-bg/5">
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-app-warning hover:text-app-warning hover:bg-app-warning/10 transition-colors group mb-1"
                        >
                          <Shield size={14} className="group-hover:scale-110 transition-transform" />
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-app-danger hover:bg-app-danger/5 transition-colors group"
                      >
                        <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={openJoinModal}
                className="hidden sm:block border-2 border-white/10 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={openJoinModal}
                className="hidden sm:block bg-app-accent text-app-surface px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>

    </nav>
  );
}
