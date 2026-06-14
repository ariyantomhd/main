/**
 * THEMAVIA ECOSYSTEM - TYPES DEFINITION 2026
 * Arsitektur: Marketplace Source Code & Affiliate System
 */

// --- 1. USER & AUTH ENTITIES ---
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  avatar_url?: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
}

// --- 2. PRODUCT & CONTENT ENTITIES ---
export interface ProductFile {
  name: string;
  url: string;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  regularPrice?: number;
  extendedPrice?: number;
  categoryId: string;
  category_id?: string; // Compatibility field
  tags?: string[];
  previewUrl: string;
  gallery?: string[];
  files: ProductFile[];
  demoUrl?: string;
  rating: number;
  sales: number;
  soldCount?: string; // Display string
  version: string;
  platform: string; 
  isPopular?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  discount_Price?: number;
  discountPrice?: number; // Compatibility field
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string; // Denormalized untuk performa
  productId: string;
  rating: number;
  comment: string;
  likes: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// --- 3. TRANSACTION & LEGAL ENTITIES ---
export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  totalPrice: number;
  status: 'pending' | 'paid' | 'failed';
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  provider: 'paypal' | 'midtrans';
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface License {
  id: string;
  orderId: string;
  productId: string;
  userId: string;
  licenseKey: string; // Purchase Code Unik
  licenseType: 'regular' | 'extended';
  purchaseDate: string;
  supportUntil: string;
}

export interface Download {
  id: string;
  userId: string;
  productId: string;
  fileId: string;
  downloadedAt: string;
}

// --- 4. AFFILIATE & WALLET ENTITIES ---
export interface Wallet {
  userId: string;
  balance: number; // Saldo siap cair
  totalEarned: number; // Total histori pendapatan
  pendingBalance: number; // Saldo tertahan (Masa Garansi)
}

export interface AffiliateEarning {
  id: string;
  affiliateId: string;
  orderId: string;
  productId: string;
  commissionAmount: number;
  percentage: number;
  status: 'locked' | 'available' | 'withdrawn'; 
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  method: 'paypal' | 'bank_transfer' | 'crypto';
  payoutEmail?: string;
  account_details?: string;
  transactionId?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface Affiliate {
  userId: string;
  link: string;
  clicks: number;
  conversions: number;
}

export interface Coupon {
  code: string;
  discount: number;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  slug: string;
}

export interface AdminUserRegistry {
  id: string;
  email: string;
}

export interface AdminProductAsset {
  id: string;
  name: string;
}

export interface AdminOrderLedger {
  id: string;
  amount: number;
}

export interface AdminDownloadLog {
  id: string;
  fileName: string;
}

export interface AdminCommissionLogEntry {
  id: string;
  amount: number;
}

export interface AdminWithdrawalRequest {
  id: string;
  amount: number;
}

export interface AdminCoreConfig {
  version: string;
}

export interface CreateIntentInput {
  amount: number;
}

export interface GatewayWebhookPayload {
  event: string;
}
