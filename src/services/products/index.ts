'use client';

import { api } from '../../lib/api';
import type { Product, Coupon } from '../../types/index';

export const productsService = {
  
  /**
   * Mengambil semua produk dengan normalisasi slug
   */
  async fetchAllProducts(params: any = {}): Promise<Product[]> {
    try {
      const response = await (api.products as any).getProducts(params);
      const products = Array.isArray(response) ? response : (response?.data || []);
      
      return products.map((p: any) => ({
        ...p,
        // Konversi tipe data
        price: Number(p.price) || 0,
        regularPrice: Number(p.regularPrice || p.regular_price) || 0,
        discountPrice: Number(p.discountPrice || p.discount_Price) || 0,
        
        // Pemetaan data
        id: p.id || '',
        slug: p.slug || '', // 🌟 Ambil slug dari API
        name: p.name || 'Untitled',
        description: p.description || '',
        categoryId: p.categoryId || p.category_id || '',
        previewUrl: p.previewUrl || p.preview_url || '',
        files: p.files || [],
        rating: Number(p.rating) || 0,
        sales: Number(p.sales) || 0,
        version: p.version || '1.0.0',
        platform: p.platform || 'General',
        createdAt: p.createdAt || p.created_at || new Date().toISOString(),
        updatedAt: p.updatedAt || p.updated_at || new Date().toISOString(),
      } as Product));
    } catch (error) {
      console.error('❌ [ProductsService] Gagal fetch:', error);
      return [];
    }
  },

  /**
   * Mengambil detail produk berdasarkan SLUG
   */
  async getProduct(slug: string): Promise<Product | null> {
    try {
      // Pastikan backend mengembalikan objek dengan field 'slug'
      const response = await (api.products as any).getProductBySlug(slug);
      const data = response?.data || response;
      
      return data ? (data as Product) : null;
    } catch (error) {
      console.error(`❌ [ProductsService] Gagal fetch produk dengan slug: ${slug}`, error);
      return null;
    }
  },

  /**
   * Validasi Kupon
   */
  async validatePromoCoupon(code: string): Promise<Coupon | null> {
    try {
      const response = await (api.products as any).applyCoupon(code);
      return response?.data || null;
    } catch {
      return null;
    }
  }
};