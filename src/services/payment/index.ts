'use client';

// SOLUSI PATH RELATIF: Menjamin import dibaca sempurna oleh TypeScript compiler
import { api } from '../../lib/api';

export interface PayPalOrderInput {
  productId: string;
  priceType: 'regular_price' | 'extended_price';
  couponCode?: string;
}

export interface PayPalCaptureInput {
  orderId: string;
  productId: string;
  priceType: 'regular_price' | 'extended_price';
}

export const paymentService = {
  /**
   * 1. Fungsi Pembuat Order PayPal Intent
   * Meminta Backend API untuk mendaftarkan invoice dan membuat order token resmi ke server PayPal.
   */
  async createPayPalOrder(payload: PayPalOrderInput): Promise<string> {
    try {
      // Menggunakan mapping checkout intent yang sudah terintegrasi aman di lib/api
      const response = await api.checkout.createPaymentIntent({
        items: [{
          productId: payload.productId,
          priceType: payload.priceType
        }],
        couponCode: payload.couponCode
      } as any);

      // SOLUSI ERROR TS 2339: Mengakses properti 'orderId' di dalam objek 'data' sesuai kontrak ApiResponse
      if (!response || !response.success || !response.data || !response.data.orderId) {
        throw new Error(response?.message || 'Gagal mendapatkan PayPal Order ID dari gateway backend.');
      }

      // Mengembalikan token Order ID PayPal untuk diproses oleh PayPal Button SDK
      return response.data.orderId;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Gagal menginisiasi checkout PayPal.';
      console.error('❌ [PaymentService] Create Order Error:', errorMessage);
      throw error;
    }
  },

  /**
   * 2. Fungsi Verifikasi & Eksekusi Dana (Capture Order)
   * Dipicu setelah buyer sukses autorisasi di pop-up PayPal. 
   * Backend akan mencairkan dana, mengupdate status order menjadi 'paid', dan memberikan akses download.
   */
  async capturePayPalOrder(payload: PayPalCaptureInput) {
    try {
      // Menembak webhook/capture notification gateway internal yang ada di lib/api
      const response = await api.checkout.handleWebhookNotification({
        transactionStatus: 'COMPLETED',
        providerReferenceId: payload.orderId // Menggunakan ID PayPal sebagai referensi transaksi
      } as any);

      if (!response.success) {
        throw new Error(response.message || 'Proses verifikasi invoice ditolak oleh server.');
      }

      return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kegagalan transmisi dana PayPal.';
      console.error('❌ [PaymentService] Capture Order Error:', errorMessage);
      
      // SOLUSI PRESERVE-CAUGHT-ERROR: Menyertakan error asli ke properti 'cause' agar linter abang hijau segar!
      throw new Error(errorMessage, { cause: error });
    }
  }
};
