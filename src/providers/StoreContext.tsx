// src/providers/StoreContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { Product } from '@/types';
import { User } from '@/types/auth';
import { useUser } from '@/providers/UserContext';

export interface CartItem {
  product: Product & {
    id: string | number;
  };
  quantity: number;
  price: number;
  licenseType: 'regular' | 'extended';
}

export interface StoreContextType {
  cart: CartItem[];
  cartCount: number;
  isLoaded: boolean;

  // Autentikasi & Modal
  user: User | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  openAuthModal: (mode?: 'signin' | 'signup') => void;

  addToCart: (
    product: Product,
    licenseType?: 'regular' | 'extended'
  ) => void;

  removeFromCart: (
    productId: string | number,
    licenseType?: string
  ) => void;

  updateLicenseType: (
    productId: string | number,
    oldType: string,
    newType: 'regular' | 'extended'
  ) => void;

  completeCheckout: (
    name: string,
    email: string,
    orderId: string
  ) => void;

  clearCart: () => void;

  affiliateId: string | null;

  changeView: (
    view: string,
    id?: string
  ) => void;

  logout: () => void;
}

const StoreContext = createContext<
  StoreContextType | undefined
>(undefined);

// Helper Sanitasi: Memastikan data keranjang lama yang dimuat dari localStorage tidak memiliki ID kosong
function sanitizeCartItems(items: unknown[]): CartItem[] {
  if (!Array.isArray(items)) return [];
  
  return items.map((rawItem, index) => {
    const item = rawItem as Record<string, unknown>;
    const prod = (item?.product || {}) as Record<string, unknown>;
    
    // Cari ID dari berbagai kemungkinan property
    const rawId = prod.id || prod.product_id || item?.product_id;
    const validId =
      rawId && String(rawId).trim() !== ''
        ? String(rawId)
        : `prod-recovered-${Date.now()}-${index}`;

    return {
      ...(item as unknown as CartItem),
      product: {
        ...(prod as unknown as Product),
        id: validId,
      },
      quantity: Number(item?.quantity) || 1,
      price: Number(item?.price) || 0,
      licenseType: item?.licenseType === 'extended' ? 'extended' : 'regular',
    };
  });
}

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = useUser();
  const rawUser = userContext?.user as unknown as User | null;

  // NORMALISASI KETAT: Memastikan currentUser bernilai null jika id user kosong/tidak valid
  const currentUser = rawUser && rawUser.id ? rawUser : null;
  const isAuthenticated = Boolean(currentUser);

  // Helper untuk membuka Auth Modal (Mendukung pemicuan via UserContext atau Event Global)
  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    const ctx = userContext as Record<string, unknown> | undefined;

    if (typeof ctx?.openAuthModal === 'function') {
      (ctx.openAuthModal as (m: string) => void)(mode);
    } else if (typeof ctx?.openLoginModal === 'function') {
      (ctx.openLoginModal as () => void)();
    } else {
      window.dispatchEvent(
        new CustomEvent('open-auth-modal', { detail: { mode } })
      );
    }
  };

  const [affiliateId] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const refFromUrl = params.get('ref');

      if (refFromUrl) {
        localStorage.setItem('tmv_affiliate_id', refFromUrl);
        return refFromUrl;
      }

      return localStorage.getItem('tmv_affiliate_id');
    } catch (error) {
      console.error('Failed to load affiliate id:', error);
      return null;
    }
  });

  // Inisialisasi Cart dengan Sanitasi ID
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const savedCart = localStorage.getItem('store_cart');
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      return sanitizeCartItems(parsed);
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  });

  const isLoaded = true;

  // Sinkronisasi Cart ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem('store_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cart]);

  const addToCart = (
    product: Product,
    licenseType: 'regular' | 'extended' = 'regular'
  ) => {
    // PROTEKSI UTAMA: Validasi string ID tidak boleh kosong ("")
    const rawId = product.id ?? (product as unknown as { product_id?: string | number }).product_id;
    const validProductId =
      rawId && String(rawId).trim() !== ''
        ? String(rawId)
        : `prod-${Date.now()}`;

    const safeProduct = {
      ...product,
      id: validProductId,
    };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          String(item.product.id) === validProductId &&
          item.licenseType === licenseType
      );

      // Kalkulasi harga dasar yang aman
      const basePrice = safeProduct.regular_price
        ? safeProduct.regular_price / 100
        : safeProduct.price || 0;

      const priceMultiplier = licenseType === 'extended' ? 2 : 1;
      const price = basePrice * priceMultiplier;

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };

        return updated;
      }

      return [
        ...prevCart,
        {
          product: safeProduct,
          quantity: 1,
          price,
          licenseType,
        },
      ];
    });
  };

  const removeFromCart = (
    productId: string | number,
    licenseType: string = 'regular'
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            String(item.product.id) === String(productId) &&
            item.licenseType === licenseType
          )
      )
    );
  };

  const updateLicenseType = (
    productId: string | number,
    oldType: string,
    newType: 'regular' | 'extended'
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          String(item.product.id) === String(productId) &&
          item.licenseType === oldType
        ) {
          const basePrice = item.product.regular_price
            ? item.product.regular_price / 100
            : item.price / (oldType === 'extended' ? 2 : 1);

          const priceMultiplier = newType === 'extended' ? 2 : 1;

          return {
            ...item,
            licenseType: newType,
            price: basePrice * priceMultiplier,
          };
        }

        return item;
      })
    );
  };

  const completeCheckout = (
    name: string,
    email: string,
    orderId: string
  ) => {
    console.log('Checkout completed:', {
      name,
      email,
      orderId,
      affiliateId,
    });

    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const changeView = (view: string, id?: string) => {
    console.log('Change view:', view, id);
  };

  const logout = () => {
    userContext?.logout?.();
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        isLoaded,
        user: currentUser,
        currentUser,
        isAuthenticated,
        openAuthModal,
        addToCart,
        removeFromCart,
        updateLicenseType,
        completeCheckout,
        clearCart,
        affiliateId,
        changeView,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}