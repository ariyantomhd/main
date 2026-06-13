import { api } from '../lib/api';

const API_BASE_URL = import.meta.env.VITE_NEXT_API_URL || 'https://api.themavia.com';

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

const fetchAdmin = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const url = `${cleanBaseUrl}/api/v1/admin${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
};

export const adminServices = {
  // --- Dashboard & Analytics ---
  getDashboardData: () => fetchAdmin('/dashboard'),
  getDashboardStats: () => fetchAdmin('/dashboard/stats'),
  getDashboardCharts: () => fetchAdmin('/dashboard/charts'),
  getAnalytics: () => fetchAdmin('/analytics'),

  // --- Customers ---
  getCustomers: () => fetchAdmin('/customers'),

  // --- Orders / Transactions ---
  getRecentOrders: () => fetchAdmin('/orders/recent'),
  getOrders: (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return fetchAdmin(`/orders${query}`);
  },
  getOrderDetail: (id: string) => fetchAdmin(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string) => fetchAdmin(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),

  // --- Products ---
  getProducts: () => fetchAdmin('/products'),
  getProductDetail: (id: string) => fetchAdmin(`/products/${id}`),
  createProduct: (data: any) => fetchAdmin('/products', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateProduct: (id: string, data: any) => fetchAdmin(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  deleteProduct: (id: string) => fetchAdmin(`/products/${id}`, {
    method: 'DELETE'
  }),

  // --- Blog / Posts ---
  getPosts: () => fetchAdmin('/posts'),
  createPost: (data: any) => fetchAdmin('/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateBlogStatus: (id: string, status: string) => fetchAdmin(`/posts/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  deletePost: (id: string) => fetchAdmin(`/posts/${id}`, {
    method: 'DELETE'
  }),

  // --- Affiliates ---
  getAffiliateStats: () => fetchAdmin('/affiliates/stats'),
  getAffiliatesList: () => fetchAdmin('/affiliates'),
  getAffiliateDetail: (id: string) => fetchAdmin(`/affiliates/${id}`),
  updateAffiliateStatus: (id: string, status: string) => fetchAdmin(`/affiliates/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),

  // --- Settings ---
  getSettings: () => fetchAdmin('/settings'),
  updateSettings: (data: any) => fetchAdmin('/settings', {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // --- Withdrawals ---
  getWithdrawals: () => fetchAdmin('/withdrawals'),
  updateWithdrawalStatus: (id: string, status: string) => fetchAdmin(`/withdrawals/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
};
