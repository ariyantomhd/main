// app/affiliate/page.tsx
'use client';

import React, { useState } from 'react';
import { Percent, HeartHandshake, Calculator, ExternalLink } from 'lucide-react';

export default function AffiliatePage() {
  // Calculator States
  const [targetSalesCount, setTargetSalesCount] = useState(15);
  const [targetAveragePrice, setTargetAveragePrice] = useState(59);

  // Math calculations
  const grossProceeds = targetSalesCount * targetAveragePrice;
  const affiliateEarnings = Math.round(grossProceeds * 0.15 * 100) / 100; // 15% product commission
  const annualAffEarnings = affiliateEarnings * 12;

  return (
    <div className="min-h-screen py-10 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center space-y-5 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono text-violet-700 mx-auto">
            <Percent className="h-4 w-4 text-violet-600" />
            <span>15% UNLIMITED PRODUCT COMMISSION PAYOUTS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Build Passive Streams Promoting <span className="text-transparent bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text">Premium Code</span>
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Recommend top-tier boilerplate starter kits, responsive dashboards, WordPress engines, and plugins. Secure a flat 15% product tracking fee on standard or extended checkout product deals!
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => window.open('https://affiliate.themavia.com', '_blank', 'noopener,noreferrer')}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-lg active:scale-97 transition-all duration-200"
              id="affiliate-btn-join"
            >
              <span>Join as an Affiliate Partner</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-white" />
            </button>
          </div>
        </div>

        {/* Dynamic Calculator widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column Controls (Col Span 7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
              <Calculator className="h-5 w-5 text-violet-600" />
              <h2 className="text-base font-bold text-slate-800 font-sans tracking-tight">Commission Earnings Estimator</h2>
            </div>

            {/* Target sales count slider */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Estimated Product Sales (Monthly)</span>
                <span className="text-slate-900 font-extrabold text-sm">{targetSalesCount} checkouts</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={targetSalesCount}
                onChange={(e) => setTargetSalesCount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 border border-slate-250 rounded-lg appearance-none cursor-pointer accent-violet-600"
                id="calc-sliders-sales"
              />
            </div>

            {/* Target price slider */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600">
                <span>Average Product Price ($ USD)</span>
                <span className="text-slate-900 font-extrabold text-sm">${targetAveragePrice}</span>
              </div>
              <input
                type="range"
                min="19"
                max="259"
                step="5"
                value={targetAveragePrice}
                onChange={(e) => setTargetAveragePrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 border border-slate-250 rounded-lg appearance-none cursor-pointer accent-violet-600"
                id="calc-sliders-price"
              />
            </div>

            {/* Calculator help tips */}
            <p className="text-[10px] text-slate-500 leading-normal font-sans italic">
              *Estimator based on flat 15% product commission rates allocating standard payments. Higher extended licenses multiply earnings significantly.
            </p>
          </div>

          {/* Right Column Results display (Col Span 5) */}
          <div className="lg:col-span-5 bg-white border border-violet-200 rounded-2xl p-6 sm:p-8 space-y-6 text-center select-all shadow-xl relative">
            
            {/* Decors */}
            <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-200 text-xs font-bold font-mono">
              15%
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Simulated Monthly Earnings</span>
              <span className="text-4xl sm:text-5xl font-extrabold text-violet-600 font-sans tracking-tight">
                ${affiliateEarnings}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-mono max-w-xs mx-auto">
              <div className="text-left">
                <span className="text-slate-400 block pb-1 text-[9px] tracking-wider">PRODUCT SALES VOLUME</span>
                <span className="text-slate-800 block font-bold font-sans text-sm">${grossProceeds}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block pb-1 text-[9px] tracking-wider">ANNUAL FORECAST</span>
                <span className="text-violet-600 block font-bold font-sans text-sm">${annualAffEarnings}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Steps Guideline Cards */}
        <h2 className="text-center text-sm font-mono text-slate-500 uppercase tracking-widest mb-8">
          Frictionless 3-Step Product Promotion Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
              01
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Input Affiliate Key</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Navigate to any script page on the marketplace. Use the sidebar widget to write in your unique name/code reference tag.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xs shrink-0">
              02
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Generate Promo URI</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Click generate to capture your tracking credentials. Copy your custom hyperlink directly to newsletters, startup forums, or tech blogs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs shrink-0">
              03
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Continuous Payouts</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              When developers purchase standard source licenses within 30 days of visiting your links, receive automated credit allocations!
            </p>
          </div>

        </div>

        {/* Sandbox Simulation Exercise Hint box */}
        <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-6 text-center max-w-xl mx-auto mt-12 space-y-3">
          <HeartHandshake className="h-6 w-6 text-violet-600 mx-auto" />
          <h5 className="text-xs font-extrabold text-slate-800">Interactive Simulation Active!</h5>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Want to see how tracking commissions work? Open any source script listing inside DevMart, expand the <strong>&quot;Affiliate product bonus&quot;</strong> panel, type in a custom name, copy the reference url, load items to the basket, and click secure checkout! You will trigger a simulated commission payout alert immediately!
          </p>
        </div>

      </div>
    </div>
  );
}