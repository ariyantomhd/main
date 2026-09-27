// src/components/layout/NavbarLinks.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function NavbarLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-200">
      {/* Browse Dropdown */}
      <div className="relative group py-2">
        <button type="button" className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer">
          <span>Browse</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
        </button>

        <div className="absolute top-full left-0 w-56 bg-[#0F1035] border border-slate-800 rounded-2xl shadow-xl py-3 hidden group-hover:block z-50">
          <Link href="/products?sort=trending" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            🔥 Trending Now
          </Link>
          <Link href="/products?sort=bestseller" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            ⭐ Best Sellers
          </Link>
          <Link href="/products?filter=new" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            ✨ New Releases
          </Link>
          <Link href="/deals" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            ⚡ Special Deals
          </Link>
        </div>
      </div>

      {/* Categories Dropdown */}
      <div className="relative group py-2">
        <button type="button" className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer">
          <span>Categories</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
        </button>

        <div className="absolute top-full left-0 w-60 bg-[#0F1035] border border-slate-800 rounded-2xl shadow-xl py-3 hidden group-hover:block z-50">
          <Link href="/products?category=mobile-apps" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            📱 Mobile Apps
          </Link>
          <Link href="/products?category=web-templates" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            🌐 Web Templates
          </Link>
          <Link href="/products?category=scripts-plugins" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            ⚙️ Scripts & Plugins
          </Link>
          <Link href="/products?category=ecommerce" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            🛍️ eCommerce
          </Link>
          <Link href="/products?category=ui-kits" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/80 hover:text-indigo-400">
            🎨 UI Kits
          </Link>
          <div className="my-1.5 border-t border-slate-800" />
          <Link href="/categories" className="block px-4 py-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 text-center">
            View All Categories →
          </Link>
        </div>
      </div>

      <Link href="/products" className="hover:text-indigo-400 transition-colors">
        All Products
      </Link>
      <Link href="/deals" className="hover:text-indigo-400 transition-colors">
        Deals
      </Link>
      <Link href="/blog" className="hover:text-indigo-400 transition-colors">
        Blog
      </Link>
      <Link href="/affiliate" className="hover:text-indigo-400 transition-colors">
        Become Affiliate
      </Link>
    </nav>
  );
}