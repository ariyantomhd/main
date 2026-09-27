// src/providers/StoreContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/types/auth';

interface CartItem {
  product: {
    id: string;
    title: string;
    screenshotUrls: string[];
  };
  price: number;
  licenseType: 'regular' | 'extended';
}

interface StoreContextType {
  cart: CartItem[];
  changeView: (view: string, id?: string) => void;
  removeFromCart: (productId: string, licenseType: string) => void;
  updateLicenseType: (productId: string, oldType: string, newType: 'regular' | 'extended') => void;
  completeCheckout: (name: string, email: string, orderId: string) => void;
  clearCart: () => void;
  affiliateId: string | null;
  currentUser: User | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: {
        id: 'prod-1',
        title: 'DevMart SaaS Boilerplate & Next.js Starter Kit',
        screenshotUrls: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60']
      },
      price: 49.00,
      licenseType: 'regular'
    },
    {
      product: {
        id: 'prod-2',
        title: 'Tailwind Dashboard UI Admin Template Pro',
        screenshotUrls: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60']
      },
      price: 29.00,
      licenseType: 'regular'
    },
    {
      product: {
        id: 'prod-3',
        title: 'E-Commerce React Native Mobile App Template',
        screenshotUrls: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60']
      },
      price: 39.00,
      licenseType: 'regular'
    },
    {
      product: {
        id: 'prod-4',
        title: 'AI Copywriting SaaS Web Application UI',
        screenshotUrls: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60']
      },
      price: 59.00,
      licenseType: 'regular'
    }
  ]);

  const [currentUser] = useState<User | null>({
    id: 'user-sandbox-123',
    email: 'sandbox-customer@devmart.com',
    display_name: 'Sandbox Tester',
    creator_number: 1001,
    avatar_url: null,
    role: 'BUYER',
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  const [affiliateId] = useState<string | null>('DEVREF2026');

  const changeView = (view: string, id?: string) => {
    console.log('Change view to:', view, id);
  };

  const removeFromCart = (productId: string, licenseType: string) => {
    setCart(cart.filter(item => !(item.product.id === productId && item.licenseType === licenseType)));
  };

  const updateLicenseType = (productId: string, oldType: string, newType: 'regular' | 'extended') => {
    setCart(cart.map(item => {
      if (item.product.id === productId && item.licenseType === oldType) {
        const priceMultiplierChange = newType === 'extended' ? 2 : 0.5;
        return { 
          ...item, 
          licenseType: newType, 
          price: Math.round(item.price * priceMultiplierChange * 100) / 100 
        };
      }
      return item;
    }));
  };

  const completeCheckout = (name: string, email: string, orderId: string) => {
    console.log('Checkout completed:', { name, email, orderId });
    setCart([]);
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{
      cart,
      changeView,
      removeFromCart,
      updateLicenseType,
      completeCheckout,
      clearCart,
      affiliateId,
      currentUser
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};