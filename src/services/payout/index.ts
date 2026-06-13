'use client';

// SOLUSI PATH RELATIF: Mengamankan import agar dibaca sempurna oleh TypeScript compiler
import { api } from '../../lib/api';
import type { Withdrawal } from '../../types/index';

export interface CreateWithdrawalInput {
  amount: number;
  method: 'paypal' | 'bank_transfer' | 'crypto';
  account_details: string;
  balanceType?: 'vendor' | 'affiliate'; // Opsi penentu jenis wallet reservoir jika backend membutuhkannya
}

export const payoutService = {
  /**
   * Mengirimkan permintaan penarikan dana (withdrawal request) dari user aktif ke Backend API.
   * Backend akan memvalidasi kecukupan dana dan mengunci saldo di database secara aman (escrow).
   */
  async submitWithdrawalRequest(payload: CreateWithdrawalInput): Promise<Withdrawal | null> {
    // 1. Sanity Check ringan di sisi client sebelum hit API
    if (payload.amount <= 0 || payload.amount > 5000) {
      throw new Error('Batas penarikan dana yang diizinkan adalah antara $0 - $5000.');
    }

    try {
      // Menembak sub-objek payout yang sudah kita petakan secara modular di lib/api.ts
      const response = await api.payout.requestWithdrawal({
        amount: payload.amount,
        method: payload.method,
        account_details: payload.account_details
      });

      if (response.success && response.data) {
        // Normalisasi properti amount agar aman dibaca sebagai float number murni JavaScript di UI
        return {
          ...response.data,
          amount: typeof response.data.amount === 'string'
            ? parseFloat(response.data.amount)
            : (response.data.amount || 0)
        };
      }
      
      return null;
    } catch (error: unknown) {
      // SOLUSI ESLINT TYPE-SAFETY: Menggunakan unknown & Type Guarding untuk membungkam error 'any'
      const errorMessage = error instanceof Error ? error.message : 'Gagal memproses pengajuan penarikan dana.';
      console.error('❌ [PayoutService] Terjadi kesalahan pada mesin payout:', errorMessage);
      
      // SOLUSI PRESERVE-CAUGHT-ERROR: Melampirkan error asli ke dalam objek 'cause' agar linter senang!
      throw new Error(errorMessage, { cause: error });
    }
  }
};
