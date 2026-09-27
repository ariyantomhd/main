// src/components/landingpage/LandingSections.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Loader2, 
  Code2, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Users, 
  DollarSign 
} from 'lucide-react';

import ProductCard from '@/components/ProductCard';
import ProductListSection from '@/components/landingpage/ProductListSection';
import { productApi } from '@/services/productApi';
import { Product as ComponentProduct } from '@/types';

export default function LandingSections() {
  const [featured, setFeatured] = useState<ComponentProduct[]>([]);
  const [trending, setTrending] = useState<ComponentProduct[]>([]);
  const [newArrivals, setNewArrivals] = useState<ComponentProduct[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSectionData() {
      try {
        setLoading(true);

        const [feat, pop, deals] = await Promise.all([
          productApi.getFeaturedProducts(),
          productApi.getPopularProducts(),
          productApi.getBestDeals(),
        ]);

        const featData = Array.isArray(feat) ? feat : ((feat as { data?: ComponentProduct[] })?.data || []);
        setFeatured(featData.slice(0, 5));

        const popData = Array.isArray(pop) ? pop : ((pop as { data?: ComponentProduct[] })?.data || []);
        setTrending(popData.slice(0, 3));

        const newDealsData = Array.isArray(deals) ? deals : ((deals as { data?: ComponentProduct[] })?.data || []);
        setNewArrivals(newDealsData.slice(0, 3));

      } catch (err) {
        console.error('Error fetching landing sections:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchSectionData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 bg-red-50/85 rounded-2xl border border-red-200 p-6 max-w-7xl mx-auto my-4">
        <p className="text-sm font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">

      {/* ================= 1. FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-sm tracking-tight mb-1">
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-600" />
              <span className="text-slate-900 text-lg font-black tracking-tight">Featured Products</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Hand-picked quality items from our top authors.
            </p>
          </div>
          <Link
            href="/products?section=featured"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors group"
          >
            <span>View all featured</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic py-4 bg-slate-50 text-center rounded-xl border border-slate-200">
            No featured products available.
          </p>
        )}
      </section>

      {/* ================= 2. WHY CHOOSE THEMAVIA? ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Why Choose Themavia?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Built for developers, by developers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { title: 'High Quality Code', desc: 'Clean, scalable and well-documented code.', icon: Code2, bg: 'bg-indigo-50 text-indigo-600' },
            { title: 'Instant Download', desc: 'Get your files instantly after purchase.', icon: Zap, bg: 'bg-emerald-50 text-emerald-600' },
            { title: 'Secure Payment', desc: '100% secure payment and privacy.', icon: ShieldCheck, bg: 'bg-purple-50 text-purple-600' },
            { title: 'Lifetime Updates', desc: 'Free updates and improvements.', icon: RefreshCw, bg: 'bg-teal-50 text-teal-600' },
            { title: 'Top Author Community', desc: 'Trusted by thousands of developers.', icon: Users, bg: 'bg-fuchsia-50 text-fuchsia-600' },
            { title: 'High Affiliate Commission', desc: 'Earn up to 45% commission on every sale.', icon: DollarSign, bg: 'bg-emerald-50 text-emerald-600' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{item.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 3. TRENDING NOW & NEW ARRIVALS (2 COLUMNS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Trending Now */}
          <ProductListSection
            title="Trending Now"
            description="See what&apos;s popular this week."
            viewAllHref="/products?section=trending"
            products={trending}
            emptyMessage="No trending products."
          />

          {/* Column 2: New Arrivals */}
          <ProductListSection
            title="New Arrivals"
            description="Check out our latest items."
            viewAllHref="/products?section=new"
            products={newArrivals}
            emptyMessage="No new items."
            isNewArrival={true}
          />

        </div>
      </section>

      {/* ================= 4. AFFILIATE PROGRAM BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1.5 text-center md:text-left z-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Earn with Themavia Affiliate Program</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Join our affiliate program and earn up to 45% commission for every sale you refer.
            </p>
          </div>

          <Link
            href="/affiliate"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all z-10 shrink-0"
          >
            Join Affiliate Program
          </Link>
        </div>
      </section>

    </div>
  );
}