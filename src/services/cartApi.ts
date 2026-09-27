// src/services/cartApi.ts
import { fetchApi, ApiResponse } from './apiConfig';
import { Cart, CartItem } from '../types/cart'; // Sesuaikan path import types jika diperlukan

export const cartApi = {
  async getCart() {
    return fetchApi<ApiResponse<Cart>>('/api/cart', { method: 'GET' });
  },

  async addToCart(productId: string, quantity: number = 1) {
    return fetchApi<ApiResponse<CartItem>>('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },

  async removeItem(cartItemId: string) {
    return fetchApi<ApiResponse<{ message: string }>>(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
    });
  },

  async clearCart() {
    return fetchApi<ApiResponse<{ message: string }>>('/api/cart', {
      method: 'DELETE',
    });
  },
};