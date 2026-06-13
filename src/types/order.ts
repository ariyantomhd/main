export interface ProductDetails {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  images?: string[];
  previewUrl?: string;
  category?: string;
  file_url?: string;
  version?: string;
  file_size?: string;
  tech_stack?: string[];
  created_at?: string;
}

export interface PurchaseOrderItem {
  id: string;
  created_at: string;
  price: number | string;
  orders?: { user_id: string; status: string } | null;
  products?: ProductDetails | null;
}
