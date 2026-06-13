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
