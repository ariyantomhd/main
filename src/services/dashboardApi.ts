// src/services/dashboardService.ts
import { fetchApi, ApiResponse } from './apiConfig';
import { UserDashboardData } from '../types/dashboard'; // Sesuaikan jalur impor types dashboard Anda

export const dashboardService = {
  /**
   * Mengambil data lengkap user dashboard (Profil, Statistik, Order Terbaru, Produk Dibeli)
   * @opsional userId Jika ingin mengambil data user tertentu (untuk admin)
   */
  async getDashboardData(userId?: string): Promise<UserDashboardData> {
    const endpoint = userId ? `/api/dashboard?userId=${userId}` : '/api/dashboard';
    
    console.log('[DashboardService] Fetching dashboard from endpoint:', endpoint);
    
    const response = await fetchApi<ApiResponse<UserDashboardData>>(endpoint, {
      method: 'GET',
    });

    return response.data;
  },
};