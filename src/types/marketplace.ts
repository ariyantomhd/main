// 1. Tambahkan import User (pastikan path-nya benar)
import { User } from './index'; 

// 2. Tambahkan interface UserWithToken di sini
export interface UserWithToken extends User {
  token?: string;
  balance?: number;
  affiliate_balance?: number;
  total_withdrawn?: number;
}

// 3. Masukkan semua interface admin yang sudah Abang miliki
export interface AdminBlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
}

export interface AdminAnalyticsStat {
  date: string;
  revenue: number;
}

export interface AdminProductAsset {
  id: string;
  name: string;
  price: number;
  sales: number;
}

export interface AdminOrderLedger {
  id: string;
  amount: number;
  status: string;
}

export interface AdminDownloadLog {
  id: string;
  userId: string;
  productId: string;
}

export interface AdminAffiliatePerformance {
  affiliateId: string;
  clicks: number;
  sales: number;
}

export interface AdminCommissionLogEntry {
  id: string;
  amount: number;
  status: string;
}

export interface AdminWithdrawalRequest {
  id: string;
  affiliateId: string;
  amount: number;
  status: string;
}

export interface AdminUserRegistry {
  id: string;
  email: string;
  role: 'buyer' | 'admin';
}

export interface AdminCoreConfig {
  siteName: string;
  maintenanceMode: boolean;
}

// Tambahkan ini di akhir file src/types/marketplace.ts
export interface UserWithToken extends User {
  token?: string;
  balance?: number;
  affiliate_status?: 'none' | 'pending' | 'active' | 'rejected';
}