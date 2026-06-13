'use client';

// SOLUSI PATH RELATIF: Mengamankan import agar dibaca sempurna oleh TypeScript compiler
import { api } from '../../lib/api';
import type { CreateIntentInput, GatewayWebhookPayload, Transaction } from '../../types/index';

export const checkoutService = {
  /**
   * Mengirim data checkout keranjang (cart) ke Backend untuk divalidasi harganya secara aman,
   * sekaligus membuat payment intent / sesi invoice transaksi baru.
   */
  async initiateCheckout(payload: CreateIntentInput) {
    try {
      // Menembak sub-objek checkout yang sudah kita petakan di lib/api.ts
      return await api.checkout.createPaymentIntent(payload);
    } catch (error: unknown) {
      // SOLUSI ESLINT: Menghapus tipe 'any' dan menggantinya dengan penanganan type safety 'unknown'
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('❌ [CheckoutService] Gagal memproses inisiasi payment intent:', errorMessage);
      throw error;
    }
  },

  /**
   * Mengambil rincian data detail invoice pesanan berdasarkan Order ID untuk halaman Thank You / Invoice.
   */
  async fetchOrderInvoice(orderId: string) {
    try {
      const response = await api.checkout.getOrderById(orderId);
      if (response.success && response.data) {
        return {
          ...response.data,
          // Normalisasi harga total ke float number murni JavaScript jika dari backend dikirim berupa string desimal
          totalPrice: typeof (response.data as any).total_price === 'string'
            ? parseFloat((response.data as any).total_price)
            : ((response.data as any).total_price || 0)
        } as any;
      }
      return null;
    } catch (error) {
      console.error(`❌ [CheckoutService] Gagal mengambil invoice order [${orderId}]:`, error);
      return null;
    }
  },

  /**
   * Mengambil catatan riwayat seluruh transaksi pembelian (buyer ledger history) milik user aktif.
   */
  async getBuyerLedgerHistory(): Promise<Transaction[]> {
    try {
      const response = await api.checkout.getTransactions();
      if (response.success && response.data) {
        // Normalisasi nominal amount transaksi riwayat
        return response.data.map((tx) => ({
          ...tx,
          amount: typeof tx.amount === 'string' ? parseFloat(tx.amount) : (tx.amount || 0)
        }));
      }
      return [];
    } catch (error) {
      console.error('❌ [CheckoutService] Gagal memuat riwayat transaksi:', error);
      return [];
    }
  },

  /**
   * Helper opsional jika frontend perlu menstimulasi/menembak pemberitahuan webhook sistem pembayaran.
   */
  async processWebhook(payload: GatewayWebhookPayload) {
    try {
      return await api.checkout.handleWebhookNotification(payload);
    } catch (error) {
      console.error('❌ [CheckoutService] Webhook notification transmission failed:', error);
      return { success: false, message: 'Webhook processing failed', data: null };
    }
  }
};
