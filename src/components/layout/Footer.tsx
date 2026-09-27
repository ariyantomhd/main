"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const exploreAssets = [
  {
    title: 'Mobile Apps',
    slug: 'mobile-apps',
  },
  {
    title: 'Web Templates',
    slug: 'web-templates',
  },
  {
    title: 'Scripts & Plugins',
    slug: 'scripts-plugins',
  },
  {
    title: 'eCommerce',
    slug: 'ecommerce',
  },
  {
    title: 'Games',
    slug: 'games',
  },
  {
    title: 'UI Kits',
    slug: 'ui-kits',
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0F1035] text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Themavia Logo" 
                width={130} 
                height={30} 
                className="object-contain"
              />
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              &quot;Build for Better.&apos; Premium templates, developer tools, and scalable solutions.
            </p>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Kolom 2: Explore Assets */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-gray-200 uppercase">
              Explore Assets
            </h3>
            <ul className="space-y-2">
              {exploreAssets.map((asset) => (
                <li key={asset.slug}>
                  <Link 
                    href={`/category/${asset.slug}`}
                    className="text-xs hover:text-white transition block"
                  >
                    {asset.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Developer Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-gray-200 uppercase">
              Developer Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="hover:text-white transition">Documentation</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition">Help Center / FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-gray-200 uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-white transition">Partnership</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-white transition">License</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Join Themavia / Newsletter & Pembayaran */}
          <div className="space-y-3 lg:col-span-1">
            <h3 className="text-xs font-bold tracking-wider text-gray-200 uppercase">
              Join Themavia
            </h3>
            <p className="text-xs text-gray-400">
              Get notified about new assets & exclusive deals.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#131827] border border-gray-800 rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-2 rounded transition shadow-md shadow-orange-500/20"
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Metode Pembayaran */}
            <div className="pt-2 flex items-center space-x-2 text-[10px] text-gray-500 font-medium">
              <div className="flex items-center space-x-1 bg-[#131827] px-2 py-1 rounded border border-gray-800">
                <span>PayPal</span>
              </div>
              <span className="tracking-wider">VISA</span>
              <span className="tracking-wider">MASTERCARD</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};