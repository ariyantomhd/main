// src/components/layout/MobileMenu.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, LayoutDashboard, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  mounted: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  logout: () => void;
  openAuthModal: (tab: 'login' | 'signup') => void;
}

export default function MobileMenu({
  isOpen,
  mounted,
  isLoggedIn,
  onClose,
  logout,
  openAuthModal,
}: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="lg:hidden border-b border-slate-800 bg-[#0F1035] px-4 pt-3 pb-6 flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
      </form>

      <nav className="flex flex-col gap-1 font-medium text-slate-300 text-sm">
        <Link href="/products" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          Browse Products
        </Link>
        <Link href="/categories" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          Categories
        </Link>
        <Link href="/products" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          All Products
        </Link>
        <Link href="/deals" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          Deals
        </Link>
        <Link href="/blog" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          Blog
        </Link>
        <Link href="/affiliate" onClick={onClose} className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60">
          Become Affiliate
        </Link>
      </nav>

      <div className="pt-3 border-t border-slate-800">
        {!mounted ? (
          <div className="w-full h-10 bg-slate-800 rounded-xl animate-pulse" />
        ) : isLoggedIn ? (
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-slate-200 hover:bg-slate-800/60"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-200 bg-transparent hover:bg-slate-800/60 border border-slate-700/80 rounded-xl transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}