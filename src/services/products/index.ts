'use client';

// SOLUSI PATH RELATIF: Mengamankan import agar dibaca sempurna oleh TypeScript compiler
import { api } from '../../lib/api';
import type { GetProductsParams } from '../../lib/api';
import type { Product, Coupon } from '../../types/index';

export type ListProductsParams = GetProductsParams;

export const productsService = {
  /**
   * Mengambil produk unggulan.
   */
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      return await api.products.getFeaturedProducts();
    } catch {
      return [];
    }
  },

  /**
   * Mengambil produk populer.
   */
  async getPopularProducts(): Promise<Product[]> {
    try {
      return await api.products.getPopularProducts();
    } catch {
      return [];
    }
  },

  /**
   * Mengambil produk flash sale.
   */
  async getFlashSaleProducts(): Promise<Product[]> {
    try {
      return await api.products.getFlashSaleProducts();
    } catch {
      return [];
    }
  },

  /**
   * Mengambil produk berdasarkan id.
   */
  async getProduct(slugOrId: string): Promise<Product | null> {
    try {
      return await api.products.getProduct(slugOrId);
    } catch {
      return null;
    }
  },

  /**
   * Mengambil direktori publik aset digital dengan penyaringan parameter dinamis dari API Backend.
   * Parameter filter (search, category, sort) diteruskan murni lewat query string HTTP.
   */
  async fetchAllProducts(params: ListProductsParams = {}): Promise<Product[]> {
    try {
      // Menembak fungsi utama getProducts yang sudah dipetakan di lib/api.ts
      const products = await api.products.getProducts(params);
      
      // Normalisasi nilai numerik harga desimal dari database SQL agar aman dihitung di komponen UI
      return products.map((product) => {
        const anyProduct = product as any;
        return {
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0),
          regularPrice: typeof anyProduct.regular_price === 'string' ? parseFloat(anyProduct.regular_price) : (anyProduct.regular_price || 0),
          extendedPrice: typeof anyProduct.extended_price === 'string' ? parseFloat(anyProduct.extended_price) : (anyProduct.extended_price || 0),
          discountPrice: typeof anyProduct.discount_price === 'string' ? parseFloat(anyProduct.discount_price) : (anyProduct.discount_price || 0),
          rating: typeof anyProduct.rating === 'string' ? parseFloat(anyProduct.rating) : (anyProduct.rating || 5.0),
          sales: typeof anyProduct.sales === 'string' ? parseInt(anyProduct.sales, 10) : (anyProduct.sales || 0)
        } as Product;
      });
    } catch (error: unknown) {
      console.error('❌ [ProductsService] Gagal memuat daftar katalog produk publik:', error);
      return [];
    }
  },

  /**
   * Mengambil rincian data detail satu produk secara spesifik berdasarkan Product ID unik.
   */
  async fetchProductDetails(id: string): Promise<Product | null> {
    try {
      const response = await api.products.getProductById(id);
      if (response.success && response.data) {
        const product = response.data;
        const anyProduct = product as any;
        // Normalisasi data detail produk tunggal
        return {
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : (product.price || 0),
          regularPrice: typeof anyProduct.regular_price === 'string' ? parseFloat(anyProduct.regular_price) : (anyProduct.regular_price || 0),
          extendedPrice: typeof anyProduct.extended_price === 'string' ? parseFloat(anyProduct.extended_price) : (anyProduct.extended_price || 0),
          discountPrice: typeof anyProduct.discount_price === 'string' ? parseFloat(anyProduct.discount_price) : (anyProduct.discount_price || 0),
          rating: typeof anyProduct.rating === 'string' ? parseFloat(anyProduct.rating) : (anyProduct.rating || 5.0),
          sales: typeof anyProduct.sales === 'string' ? parseInt(anyProduct.sales, 10) : (anyProduct.sales || 0)
        } as Product;
      }
      return null;
    } catch (error: unknown) {
      console.error(`❌ [ProductsService] Gagal memuat data detail produk [${id}]:`, error);
      return null;
    }
  },

  /**
   * Memvalidasi keabsahan kode kupon promosi langsung ke server API.
   */
  async validatePromoCoupon(code: string): Promise<Coupon | null> {
    try {
      const response = await api.products.applyCoupon(code);
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Kupon tidak dapat diaplikasikan.';
      console.error(`❌ [ProductsService] Kegagalan validasi tiket kupon [${code}]:`, errorMessage);
      
      // SOLUSI PRESERVE-CAUGHT-ERROR: Melampirkan error asli ke properti cause agar linter hijau segar!
      throw new Error(errorMessage, { cause: error });
    }
  }
};
