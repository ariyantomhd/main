// src/services/licenseApi.ts
import { fetchApi, ApiResponse } from './apiConfig';
import { LicenseItem, LicenseVerifyResponse, DownloadResponse } from '../types/license';

export const licenseApi = {
  /**
   * Mengambil daftar produk dan lisensi yang dimiliki user (Halaman Library / Dashboard)
   */
  async getLibrary() {
    return fetchApi<ApiResponse<LicenseItem[]>>('/api/licenses/library', {
      method: 'GET',
    });
  },

  /**
   * Memverifikasi lisensi secara publik
   */
  async verifyLicense(licenseKey: string) {
    return fetchApi<ApiResponse<LicenseVerifyResponse>>('/api/licenses/verify', {
      method: 'POST',
      body: JSON.stringify({ license_key: licenseKey }),
    });
  },

  /**
   * Mendapatkan link unduh aman untuk produk yang dibeli
   */
  async downloadFile(licenseKey: string) {
    return fetchApi<ApiResponse<DownloadResponse>>('/api/download', {
      method: 'POST',
      body: JSON.stringify({ license_key: licenseKey }),
    });
  },
};