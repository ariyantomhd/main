// src/providers/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

// Tipe data item keranjang yang mendukung variasi lisensi dan harga dinamis
export type CartItem = {
  product: Product;
  price: number;
  licenseType: 'regular' | 'extended';
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, price: number, licenseType?: 'regular' | 'extended') => void;
  removeFromCart: (productId: string | number, licenseType: string) => void;
  updateLicenseType: (productId: string | number, oldType: string, newType: 'regular' | 'extended') => void;
  clearCart: () => void;
  refreshCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('theme_cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          // Validasi agar item di cart tidak ada yang memiliki properti product bernilai null/undefined
          if (Array.isArray(parsed)) {
            return parsed.filter((item: CartItem) => item && item.product && item.product.id !== undefined);
          }
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
    return [];
  });

  // Sync state ke localStorage tiap kali cart berubah
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme_cart', JSON.stringify(cart));
      const totalCount = cart.reduce((acc, item) => acc + (item?.quantity || 1), 0);
      localStorage.setItem('cart_count', totalCount.toString());
    }
  }, [cart]);

  // Fungsi nyata untuk menambahkan produk ke keranjang dengan memperhitungkan tipe lisensi dan validasi keamanan produk
  const addToCart = (product: Product, price: number, licenseType: 'regular' | 'extended' = 'regular') => {
    if (!product || product.id === undefined || product.id === null) {
      console.error("Cannot add product with invalid id to cart", product);
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item && item.product && item.product.id === product.id && item.licenseType === licenseType
      );

      if (existingIndex > -1) {
        // Jika produk dengan lisensi yang sama sudah ada, tambahkan quantity-nya
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: (updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }

      // Jika belum ada, masukkan sebagai item baru
      return [...prevCart, { product, price, licenseType, quantity: 1 }];
    });
  };

  // Fungsi nyata untuk menghapus item spesifik berdasarkan ID dan tipe lisensi
  const removeFromCart = (productId: string | number, licenseType: string) => {
    setCart((prevCart) => 
      prevCart.filter((item) => item && item.product && !(item.product.id === productId && item.licenseType === licenseType))
    );
  };

  // Fungsi untuk mengubah tipe lisensi (misal dari Reguler ke Extended) beserta kalkulasi ulang harganya
  const updateLicenseType = (productId: string | number, oldType: string, newType: 'regular' | 'extended') => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item && item.product && item.product.id === productId && item.licenseType === oldType) {
          // Contoh logika penyesuaian harga: Extended biasanya 2x lipat dari Reguler
          const priceMultiplierChange = newType === 'extended' ? 2 : 0.5;
          return {
            ...item,
            licenseType: newType,
            price: Math.round(item.price * priceMultiplierChange * 100) / 100,
          };
        }
        return item;
      })
    );
  };

  // Mengosongkan seluruh keranjang
  const clearCart = () => {
    setCart([]);
  };

  // Sinkronisasi ulang data keranjang dari localStorage
  const refreshCart = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('theme_cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCart(parsed.filter((item: CartItem) => item && item.product && item.product.id !== undefined));
          }
        } catch (e) {
          console.error("Failed to refresh cart", e);
        }
      }
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + (item?.quantity || 1), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount, 
        addToCart, 
        removeFromCart, 
        updateLicenseType, 
        clearCart, 
        refreshCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}