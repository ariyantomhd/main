// src/lib/api.ts
import type { 
  User, Product, Transaction, Order, Download, Affiliate, AffiliateEarning, Withdrawal,
  Coupon, AdminBlogPost, CreateIntentInput, GatewayWebhookPayload
} from '../types/index';

const API_BASE_URL = import.meta.env.VITE_NEXT_API_URL || 'https://api.themavia.com';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GetProductsParams {
  search?: string;
  category?: string;
  sort?: string;
}

export interface UserWithToken extends User {
  token?: string;
}

const fetchFromBackend = async (endpoint: string, options: RequestInit = {}) => {
  const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const url = `${cleanBaseUrl}/v1${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  console.log(`[API Request]: ${options.method || 'GET'} ${url}`);

  return fetch(url, { ...options, headers }).catch(err => {
    console.error(`[API Fetch Error] ${endpoint}:`, err);
    return new Response(JSON.stringify({ success: false, data: null, message: err.message }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  });
};

const getAuthToken = (): string | null => {
  const savedUserStr = localStorage.getItem('demo_user');
  if (!savedUserStr) return null;
  try {
    const savedUser = JSON.parse(savedUserStr);
    return savedUser.token || null;
  } catch {
    return null;
  }
};

const authHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  auth: {
    register: async (payload: Record<string, string>) => {
      const response = await fetchFromBackend('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal mendaftar');
      return result;
    },
    login: async (payload: Record<string, string>) => {
      const response = await fetchFromBackend('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Gagal login');
      return result;
    },
    getCurrentUser: async () => {
      const response = await fetchFromBackend('/auth/me', { method: 'GET', headers: authHeader(), cache: 'no-store' });
      return await response.json();
    },
    logout: async () => {
      localStorage.removeItem('demo_user');
      const response = await fetchFromBackend('/auth/logout', { method: 'POST', headers: authHeader() });
      return await response.json().catch(() => ({}));
    }
  },

  products: {
    getProducts: async (params: GetProductsParams = {}) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      const response = await fetchFromBackend(`/products?${query}`);
      const result = await response.json();
      return result.data || [];
    },
    getProductById: async (id: string) => {
      const response = await fetchFromBackend(`/products/${id}`);
      return await response.json();
    },
    getFeaturedProducts: async () => (await (await fetchFromBackend('/products/featured')).json()).data || [],
    getPopularProducts: async () => (await (await fetchFromBackend('/products/popular')).json()).data || [],
    getFlashSaleProducts: async () => (await (await fetchFromBackend('/products/flash-sale')).json()).data || [],
  },

  checkout: {
    createPaymentIntent: async (payload: CreateIntentInput) => {
      const response = await fetchFromBackend('/checkout/intent', { method: 'POST', headers: authHeader(), body: JSON.stringify(payload) });
      return await response.json();
    },
    getOrderById: async (orderId: string) => {
      const response = await fetchFromBackend(`/orders/${orderId}`, { method: 'GET', headers: authHeader() });
      return await response.json();
    }
  },

  userDashboard: {
    getStats: async () => (await (await fetchFromBackend('/user-dashboard/stats', { headers: authHeader() })).json()),
    getLibrary: async () => (await (await fetchFromBackend('/user-dashboard/library', { headers: authHeader() })).json()) || []
  }
};

export { adminServices } from '../services/admin.services';