// src/services/productApi.ts

import { Product } from '@/types';
import { fetchApi } from './apiConfig';

export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  items?: T;
  message?: string;
  error?: string;
}

export interface QueryParams {
  category?: string;
  sort?: string;
  search?: string;
  limit?: number;
  page?: number;
  category_id?: string;
  is_new?: boolean | string;
  [key: string]: string | number | undefined | boolean;
}

// Helper untuk mengekstrak data dari list/array response backend
const extractListData = <T>(responseData: unknown): T => {
  if (!responseData) return responseData as T;
  let current: unknown = responseData;

  if (typeof current === 'object' && current !== null) {
    if ('items' in current && (current as ApiResponse<unknown>).items !== undefined) {
      current = (current as ApiResponse<unknown>).items;
    } else if ('data' in current && (current as ApiResponse<unknown>).data !== undefined) {
      current = (current as ApiResponse<unknown>).data;
    }
    
    if (typeof current === 'object' && current !== null) {
      if ('products' in current && (current as { products: unknown }).products !== undefined) {
        current = (current as { products: unknown }).products;
      } else if ('items' in current && (current as { items: unknown }).items !== undefined) {
        current = (current as { items: unknown }).items;
      } else if ('data' in current && (current as { data: unknown }).data !== undefined) {
        current = (current as { data: unknown }).data;
      }
    }
  }

  return current as T;
};

export const productApi = {
  getProducts: async (params?: { category?: string; sort?: string; is_featured?: boolean; is_popular?: boolean; is_flash_sale?: boolean; is_new?: boolean }): Promise<Product[]> => {
    const queryParams: QueryParams = { limit: 100 };
    
    if (params?.category) {
      // Jika parameter berupa UUID (panjang 36 karakter) atau angka, gunakan category_id. 
      // Jika berupa slug text, gunakan parameter category.
      if (params.category.length === 36 || !isNaN(Number(params.category))) {
        queryParams.category_id = params.category;
      } else {
        queryParams.category = params.category;
      }
    }

    if (params?.sort) {
      queryParams.sort = params.sort;
    }
    if (params?.is_featured !== undefined) {
      queryParams.is_featured = params.is_featured ? 'true' : 'false';
    }
    if (params?.is_popular !== undefined) {
      queryParams.is_popular = params.is_popular ? 'true' : 'false';
    }
    if (params?.is_flash_sale !== undefined) {
      queryParams.is_flash_sale = params.is_flash_sale ? 'true' : 'false';
    }
    if (params?.is_new !== undefined) {
      queryParams.is_new = params.is_new ? 'true' : 'false';
    }

    const data = await fetchApi<unknown>('/api/products', { 
      method: 'GET', 
      params: queryParams as unknown as Record<string, string | number> 
    });
    
    const unwrapped = extractListData<{ items?: Product[]; data?: Product[] } | Product[]>(data);
    const products = Array.isArray(unwrapped) 
      ? unwrapped 
      : (unwrapped as { items?: Product[] })?.items || (unwrapped as { data?: Product[] })?.data || [];
    
    return products as Product[];
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const products = await productApi.getProducts({ is_featured: true });
    return products.slice(0, 8);
  },

  getPopularProducts: async (): Promise<Product[]> => {
    const products = await productApi.getProducts({ is_popular: true });
    return products.slice(0, 8);
  },

  // Method untuk mengambil produk rilis terbaru (menyesuaikan findNewReleases di BE)
  getNewProducts: async (): Promise<Product[]> => {
    const products = await productApi.getProducts({ is_new: true, sort: 'newest' });
    return products.slice(0, 8);
  },

  getFlashSale: async (): Promise<{ data: Product[]; ends_at: string }> => {
    const products = await productApi.getProducts({ is_flash_sale: true });
    const fallbackEnd = new Date();
    fallbackEnd.setHours(23, 59, 59, 999);
    return { 
      data: products.slice(0, 8) as Product[],
      ends_at: fallbackEnd.toISOString(),
    };
  },

  getBestDeals: async (): Promise<Product[]> => {
    const products = await productApi.getProducts();
    return products.slice(0, 4);
  },

  getProductsByCategory: async (categoryIdentifier: string): Promise<Product[]> => {
    return productApi.getProducts({ category: categoryIdentifier });
  },

  // Mengambil detail produk berdasarkan slug (mencakup deskripsi, tags, harga, dll)
  getProductBySlug: async (slug: string): Promise<Product> => {
    console.log("======================================");
    console.log("GET PRODUCT BY SLUG");
    console.log("Slug:", slug);

    const response = await fetchApi<unknown>(
      `/api/products/${slug}`,
      {
        method: "GET",
      }
    );

    console.log("RAW RESPONSE:");
    console.dir(response, { depth: null });

    if (!response) {
      throw new Error("Product response is null");
    }

    return response as unknown as Product;
  },

  // Mengambil fitur produk (jika dipisah endpoint-nya)
  getProductFeatures: async (productId: string | number) => {
    const response = await fetchApi<unknown>(`/api/products/${productId}/features`, {
      method: "GET",
    });
    return response;
  },

  // Mengambil changelog produk
  getProductChangelogs: async (productId: string | number) => {
    const response = await fetchApi<unknown>(`/api/products/${productId}/changelogs`, {
      method: "GET",
    });
    return response;
  },

  // Mengambil ulasan/reviews produk
  getProductReviews: async (productId: string | number) => {
    const response = await fetchApi<unknown>(`/api/products/${productId}/reviews`, {
      method: "GET",
    });
    return response;
  },
};