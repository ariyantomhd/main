'use client';

// SOLUSI PATH RELATIF: Mengamankan import agar dibaca sempurna oleh TypeScript compiler
import { api } from '../../lib/api';
import type { Download } from '../../types/index';

export const downloadsService = {
  /**
   * Mengambil pustaka item digital (digital library) yang berhasil dibeli oleh user aktif.
   */
  async getMyDigitalLibrary(): Promise<Download[]> {
    try {
      const response = await api.downloads.getUserDownloads();
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('❌ [DownloadsService] Gagal memuat pustaka unduhan:', error);
      return [];
    }
  },

  /**
   * Memicu Backend API untuk memvalidasi invoice pembelian dan mengembalikan transient token
   * berupa link unduhan aman yang akan kedaluwarsa otomatis dalam waktu 60 detik.
   */
  async generateSecureDownloadLink(productId: string): Promise<{ downloadUrl: string; fileName: string } | null> {
    try {
      const cleanBaseUrl = import.meta.env.VITE_NEXT_API_URL || 'https://api.themavia.com';
      
      // Menembak endpoint secure handshake gateway di backend API
      const response = await fetch(`${cleanBaseUrl}/api/v1/downloads/secure-link?productId=${encodeURIComponent(productId)}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Token otorisasi diambil secara aman melalui penanganan internal helper
          'Authorization': `Bearer ${this.getInternalToken()}`
        }
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Akses unduhan ditolak oleh server.');

      return {
        downloadUrl: result.data.downloadUrl,
        fileName: result.data.fileName || 'asset-package.zip'
      };
    } catch (error: unknown) {
      // SOLUSI ESLINT TYPE-SAFETY: Menggunakan unknown & Type Guarding untuk membungkam error 'any'
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`❌ [DownloadsService] Gagal mengunduh produk [${productId}]:`, errorMessage);
      return null;
    }
  },

  /**
   * Helper internal untuk menarik token sesi aktif secara aman dari localStorage
   */
  getInternalToken(): string {
    if (typeof window === 'undefined') return '';
    const savedUserStr = localStorage.getItem('demo_user');
    if (!savedUserStr) return '';
    try {
      const savedUser = JSON.parse(savedUserStr);
      return savedUser.token || '';
    } catch {
      return '';
    }
  }
};
