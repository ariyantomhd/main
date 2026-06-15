'use client';

import { api } from '../../lib/api'; 
import type { Product, Coupon } from '../../types/index';

const normalizeProduct = (p: any): Product => ({
  ...p,
  price: Number(p.price) || 0,
  regularPrice: Number(p.regularPrice || p.regular_price || p.price) || 0,
  // Pastikan discountPrice selalu berupa angka atau null
  discountPrice: p.discountPrice !== null && p.discountPrice !== undefined ? Number(p.discountPrice) : (p.discount_price !== null && p.discount_price !== undefined ? Number(p.discount_price) : null),
  id: p.id || '',
  slug: p.slug || '',
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
  isFlashSale: p.isFlashSale || false,
  isFeatured: p.isFeatured || false,
  isPopular: p.isPopular || false,
});

export const productsService = {
  
  // --- PERBAIKAN LOGIKA DISKON DENGAN SAFE CHECK ---
  async getFlashSaleProducts(): Promise<Product[]> {
    const products = await this.fetchAllProducts(); 
    
    // Gunakan pengecekan (p.discountPrice ?? 0) untuk memastikan tidak ada error undefined
    return products.filter(p => 
      p.isFlashSale === true || (p.discountPrice !== null && (p.discountPrice ?? 0) > 0)
    );
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.filter(p => p.isFeatured);
  },

  async getPopularProducts(): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.filter(p => p.isPopular);
  },

  async getNewReleases(): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 8);
  },

  async fetchAllProducts(params: any = {}): Promise<Product[]> {
    try {
      const response = await (api.products as any).getProducts(params);
      const products = Array.isArray(response) ? response : (response?.data || []);
      return products.map(normalizeProduct);
    } catch (error) {
      console.error('❌ [ProductsService] Gagal fetch:', error);
      return [];
    }
  },

  async getProduct(slug: string): Promise<Product | null> {
    try {
      const response = await (api.products as any).getProductBySlug(slug);
      const data = response?.data || response;
      return data ? normalizeProduct(data) : null;
    } catch (error) {
      console.error(`❌ [ProductsService] Gagal fetch produk: ${slug}`, error);
      return null;
    }
  },

  async validatePromoCoupon(code: string): Promise<Coupon | null> {
    try {
      const response = await (api.products as any).applyCoupon(code);
      return response?.data || null;
    } catch {
      return null;
    }
  }
};