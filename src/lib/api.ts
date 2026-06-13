// src/lib/api.ts
import type { 
  User, 
  Product, 
  Transaction, 
  Order, 
  Download, 
  Affiliate, 
  AffiliateEarning, 
  Withdrawal,
  Coupon,
  CreateBlogPostInput,
  AdminBlogPost,
  AdminUserRegistry,
  AdminProductAsset,
  AdminOrderLedger,
  AdminDownloadLog,
  AdminCommissionLogEntry,
  AdminWithdrawalRequest,
  AdminCoreConfig,
  CreateIntentInput,
  GatewayWebhookPayload
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
  const url = `${cleanBaseUrl}/v1${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  return fetch(url, { ...options, headers }).catch(err => {
    console.warn("API Fetch Failed:", err.message);
    // Return a fake response that fails gracefully on .json()
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

export const api = {
  auth: {
    register: async (payload: Record<string, string>): Promise<ApiResponse<{ userId: string; email: string }>> => {
      const response = await fetchFromBackend('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mendaftarkan akun baru.');
      return result;
    },
    login: async (payload: Record<string, string>): Promise<ApiResponse<UserWithToken>> => {
      const response = await fetchFromBackend('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal masuk ke akun Anda.');
      return result;
    },
    getCurrentUser: async (): Promise<ApiResponse<UserWithToken | null>> => {
      const token = getAuthToken();
      if (!token) return { success: true, message: 'No active session found.', data: null };
      const response = await fetchFromBackend('/auth/me', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Sesi kadaluarsa.');
      return result; 
    },
    logout: async (): Promise<ApiResponse<null>> => {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      localStorage.removeItem('demo_user');
      const response = await fetchFromBackend('/auth/logout', { method: 'POST', headers });
      return await response.json().catch(() => ({ success: true, message: 'Logged out', data: null }));
    }
  },

  // MODUL CUSTOM REQUESTS (Untuk halaman Customize.tsx)
  custom: {
    submitRequest: async (payload: { fullName: string; email: string; projectType: string; details: string }): Promise<ApiResponse<null>> => {
      const response = await fetchFromBackend('/custom-requests', { 
        method: 'POST', 
        body: JSON.stringify(payload) 
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengirim permintaan.');
      return result;
    }
  },

  blog: {
    getAll: async (): Promise<AdminBlogPost[]> => {
      const response = await fetchFromBackend('/blog');
      const result = await response.json().catch(() => ({ data: [] }));
      return result.data || [];
    },
    getBySlug: async (slug: string): Promise<AdminBlogPost | null> => {
      const response = await fetchFromBackend(`/blog/${slug}`);
      const result = await response.json().catch(() => ({ data: null }));
      return result.data || null;
    }
  },

  products: {
    getProducts: async (params: GetProductsParams = {}): Promise<Product[]> => {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.set('search', params.search);
      if (params.category) queryParams.set('category', params.category);
      if (params.sort) queryParams.set('sort', params.sort);
      try {
        const response = await fetchFromBackend(`/products?${queryParams.toString()}`, { method: 'GET', cache: 'no-store' });
        const result: ApiResponse<Product[]> = await response.json().catch(() => ({ data: [] }));
        return result.data || [];
      } catch (error: unknown) {
        console.warn('Error pada getProducts:', error);
        return [];
      }
    },
    getProductById: async (id: string): Promise<ApiResponse<Product>> => {
      const response = await fetchFromBackend(`/products/${id}`);
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengambil detail produk.');
      return result;
    },
    applyCoupon: async (code: string): Promise<ApiResponse<Coupon>> => {
      const response = await fetchFromBackend(`/coupons/validate/${code}`, { method: 'GET' });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Kupon tidak valid.');
      return result;
    },
    getFeaturedProducts: async (): Promise<Product[]> => {
      try {
        const response = await fetchFromBackend(`/products/featured`);
        const result = await response.json().catch(() => ({ data: [] }));
        return result.data || [];
      } catch (e) { return []; }
    },
    getPopularProducts: async (): Promise<Product[]> => {
      try {
        const response = await fetchFromBackend(`/products/popular`);
        const result = await response.json().catch(() => ({ data: [] }));
        return result.data || [];
      } catch (e) { return []; }
    },
    getFlashSaleProducts: async (): Promise<Product[]> => {
      try {
        const response = await fetchFromBackend(`/products/flash-sale`);
        const result = await response.json().catch(() => ({ data: [] }));
        return result.data || [];
      } catch (e) { return []; }
    },
    getBestDealsProducts: async (): Promise<Product[]> => {
      try {
        const response = await fetchFromBackend(`/products/best-deals`);
        const result = await response.json().catch(() => ({ data: [] }));
        return result.data || [];
      } catch (e) { return []; }
    },
    getProduct: async (slugOrId: string): Promise<Product | null> => {
      try {
        const response = await fetchFromBackend(`/products/${slugOrId}`);
        const result = await response.json().catch(() => ({ data: null }));
        return result.data || null;
      } catch (e) { return null; }
    }
  },

  affiliate: {
    getProfile: async (): Promise<ApiResponse<Affiliate>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/affiliate/profile', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengambil profil afiliasi.');
      return result;
    },
    getEarnings: async (): Promise<ApiResponse<AffiliateEarning[]>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/affiliate/earnings', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengambil riwayat komisi.');
      return result;
    }
  },

  payment: {
    createPayPalOrder: async (productId: string, licenseType: 'regular' | 'extended'): Promise<string> => {
      const response = await fetchFromBackend('/paypal/create-order', {
        method: "POST",
        body: JSON.stringify({ productId, licenseType }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal create order');
      return result.data?.orderId || result.orderId;
    },
    capturePayPalOrder: async (orderId: string, productId: string, licenseType: string): Promise<any> => {
      const response = await fetchFromBackend('/paypal/capture-order', {
        method: "POST",
        body: JSON.stringify({ orderId, productId, licenseType }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal capture order');
      return result.data !== undefined ? result.data : result;
    }
  },
  checkout: {
    createPaymentIntent: async (payload: CreateIntentInput): Promise<ApiResponse<{ orderId: string; redirectUrl?: string }>> => {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetchFromBackend('/checkout/intent', { method: 'POST', headers, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal membuat sesi transaksi.');
      return result;
    },
    handleWebhookNotification: async (payload: GatewayWebhookPayload): Promise<ApiResponse<null>> => {
      const response = await fetchFromBackend('/checkout/webhook', { method: 'POST', body: JSON.stringify(payload) });
      return await response.json().catch(() => ({ success: true, message: 'Processed', data: null }));
    },
    getTransactions: async (): Promise<ApiResponse<Transaction[]>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/transactions/history', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengambil data riwayat ledger.');
      return result;
    },
    getOrderById: async (orderId: string): Promise<ApiResponse<Order>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend(`/orders/${orderId}`, { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal memuat detail invoice order.');
      return result;
    }
  },

  payout: {
    requestWithdrawal: async (payload: { amount: number; method: 'paypal' | 'bank_transfer' | 'crypto'; account_details: string }): Promise<ApiResponse<Withdrawal>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/payments/withdrawal', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal mengajukan penarikan dana.');
      return result;
    }
  },

  downloads: {
    getUserDownloads: async (): Promise<ApiResponse<Download[]>> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/downloads/library', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Gagal memuat pustaka item unduhan Anda.');
      return result;
    }
  },

  userDashboard: {
    getStats: async (): Promise<any> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/user-dashboard/stats', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ({}));
      return result;
    },
    getDownloads: async (): Promise<any> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/user-dashboard/downloads', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ([]));
      return result;
    },
    getLibrary: async (): Promise<any> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/user-dashboard/library', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ([]));
      return result;
    },
    updateProfile: async (data: any): Promise<any> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/user-dashboard/profile', { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      return result;
    },
    getTransactions: async (): Promise<any> => {
      const token = getAuthToken();
      if (!token) throw new Error('Autentikasi diperlukan.');
      const response = await fetchFromBackend('/user-dashboard/transactions', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` } });
      const result = await response.json().catch(() => ([]));
      return result;
    }
  }

};

export { adminServices } from '../services/admin.services';
