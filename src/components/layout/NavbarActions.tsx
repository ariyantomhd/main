// src/components/layout/NavbarActions.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';

interface NavbarUser {
  id?: string | number;
  display_name?: string;
  email?: string;
  avatar_url?: string | null;
}

interface NavbarActionsProps {
  mounted: boolean;
  cartCount: number;
  isLoggedIn: boolean;
  currentUser: NavbarUser | null;
  logout: () => void;
  openAuthModal: (tab: 'login' | 'signup') => void;
}

export default function NavbarActions({
  mounted,
  cartCount,
  isLoggedIn,
  currentUser,
  logout,
  openAuthModal,
}: NavbarActionsProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link 
        href="/cart" 
        className="relative p-2 text-slate-300 hover:text-indigo-400 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {mounted && cartCount > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500 text-white ring-2 ring-[#0F1035]">
            {cartCount}
          </span>
        )}
      </Link>

      {!mounted ? (
        <div className="w-20 h-10 bg-slate-800 rounded-xl animate-pulse" />
      ) : isLoggedIn ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-200 overflow-hidden">
              {currentUser?.avatar_url ? (
                <Image 
                  src={currentUser.avatar_url} 
                  alt={currentUser.display_name || 'User Avatar'} 
                  fill 
                  className="object-cover" 
                />
              ) : (
                <UserIcon className="w-4 h-4 text-indigo-600" />
              )}
            </div>
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {currentUser?.display_name || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {currentUser?.email}
                </p>
              </div>

              <Link
                href="/dashboard"
                onClick={() => setIsProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="px-5 py-2 text-sm font-semibold text-slate-200 bg-transparent hover:bg-slate-800/60 border border-slate-700/80 rounded-xl transition-all cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 rounded-xl transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}