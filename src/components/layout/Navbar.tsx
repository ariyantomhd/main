// src/components/layout/Navbar.tsx
'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '@/providers/StoreContext';
import AuthModal from '@/components/auth/AuthModal';

import NavbarBrand from './NavbarBrand';
import NavbarLinks from './NavbarLinks';
import NavbarActions from './NavbarActions';
import MobileMenu from './MobileMenu';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function Navbar() {
  const { cartCount, currentUser, logout } = useStore();
  
  const isLoggedIn = Boolean(currentUser && currentUser.id); 
  const mounted = useIsMounted();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'login' | 'signup'>('login');

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthModalDefaultTab(tab);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0F1035] border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo & Brand */}
            <NavbarBrand />

            {/* Navbar Menu Links (Desktop) */}
            <NavbarLinks />

            {/* Right Action Elements (Desktop) */}
            <NavbarActions 
              mounted={mounted}
              cartCount={cartCount}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              logout={logout}
              openAuthModal={openAuthModal}
            />

            {/* Mobile Toggle & Cart */}
            <div className="flex lg:hidden items-center gap-2">
              <Link 
                href="/cart" 
                className="relative p-2 text-slate-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-500 text-white ring-2 ring-[#0F1035]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          mounted={mounted}
          isLoggedIn={isLoggedIn}
          onClose={() => setIsMobileMenuOpen(false)}
          logout={logout}
          openAuthModal={openAuthModal}
        />
      </header>

      {/* Auth Modal Global Integration */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authModalDefaultTab} 
      />
    </>
  );
}