import type { 
  User, Product, CreateIntentInput, Coupon 
} from '../types/index';

const API_BASE_URL = import.meta.env.VITE_NEXT_API_URL || 'https://api.themavia.com/';

export interface GetProductsParams {
  search?: string;
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

type Headers = Record<string, string>;

const fetchFromBackend = async (endpoint: string, options: RequestInit = {}) => {
  const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const url = `${cleanBaseUrl}/api/v1${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers: Headers = {
    'Content-Type': 'application/json',
    ...(options.headers as Headers),
  };
  
  console.log(`[API Request]: ${options.method || 'GET'} ${url}`);

  try {
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      console.warn('⚠️ [API] Session expired (401).');
      localStorage.removeItem('demo_user');
    }
    return response;
  } catch (err: any) {
    console.error(`[API Fetch Error] ${endpoint}:`, err);
    return new Response(JSON.stringify({ success: false, data: null, message: err.message }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

const authHeader = (): Headers => {
  const savedUserStr = localStorage.getItem('demo_user');
  if (!savedUserStr) return {};
  try {
    const savedUser = JSON.parse(savedUserStr);
    return savedUser.token ? { 'Authorization': `Bearer ${savedUser.token}` } : {};
  } catch { return {}; }
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
    getCurrentUser: async () => (await fetchFromBackend('/auth/me', { method: 'GET', headers: authHeader() })).json(),
    logout: async () => {
      localStorage.removeItem('demo_user');
      const response = await fetchFromBackend('/auth/logout', { method: 'POST', headers: authHeader() });
      return response.json().catch(() => ({}));
    }
  },

  products: {
    getProducts: async (params: GetProductsParams = {}) => {
      const query = new URLSearchParams(params as any).toString();
      const response = await fetchFromBackend(`/products?${query}`);
      const result = await response.json();
      return result.data || result || [];
    },
    getProductBySlug: async (slug: string) => {
      const response = await fetchFromBackend(`/products/${slug}`);
      const result = await response.json();
      return result.data || result;
    },
    getProductById: async (id: string) => {
      const response = await fetchFromBackend(`/products/${id}`);
      const result = await response.json();
      return result.data || result;
    },
    applyCoupon: async (code: string) => {
      const response = await fetchFromBackend('/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: authHeader()
      });
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