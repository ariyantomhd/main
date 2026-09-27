// src/services/paymentAPI.ts
import { fetchApi, ApiResponse } from './apiConfig';
import { 
  CreatePayPalOrderDTO, 
  CapturePayPalOrderDTO, 
  TransactionResponse 
} from '@/types/payment';

interface CreatePayPalOrderResponse {
  paypal_order: {
    id: string;
    status: string;
    [key: string]: unknown;
  };
  order_id?: string;
  status?: string;
  approval_url?: string;
  [key: string]: unknown;
}

export const paymentApi = {
  /**
   * Menginisialisasi pembuatan order PayPal melalui backend
   */
  async createPayPalOrder(
    payload: CreatePayPalOrderDTO
  ): Promise<ApiResponse<CreatePayPalOrderResponse>> {
    return fetchApi<ApiResponse<CreatePayPalOrderResponse>>('/api/payments/paypal/create-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Melakukan capture/konfirmasi pembayaran order PayPal yang telah disetujui buyer
   */
  async capturePayPalOrder(
    payload: CapturePayPalOrderDTO
  ): Promise<ApiResponse<TransactionResponse>> {
    return fetchApi<ApiResponse<TransactionResponse>>('/api/payments/paypal/capture-order', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};