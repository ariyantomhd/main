// src/types/payment.ts
import { TransactionStatus, PaymentGateway } from './enum';

export interface CreatePayPalOrderItemDTO {
  product_id: string;
  quantity: number;
  price: number;
}

export interface CreatePayPalOrderDTO {
  buyer_id: string;
  email?: string;
  amount: number;
  currency: string;
  affiliate_id?: string | null;
  items: CreatePayPalOrderItemDTO[];
}

export interface PayPalOrderResponse {
  id: string; // Mengikuti struktur response asli PayPal / backend
  order_id: string;
  approval_url: string;
  status: string;
}

export interface TransactionResponse {
  id: string;
  user_id: string;
  order_id: string;
  paypal_transaction_id?: string;
  gateway: PaymentGateway;
  amount: number;
  currency: string;
  status: TransactionStatus;
  created_at: string;
}

export interface CapturePayPalOrderDTO {
  paypal_order_id: string;
}