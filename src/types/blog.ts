// src/types/blog.ts

// Tipe Data Kategori
export interface Category {
  id: number;
  name: string;
  slug: string;
  badge_color: string;
  count?: number;
}

// Tipe Data Komentar
export interface Comment {
  id: number;
  article_id: number;
  name: string;
  text: string;
  created_at: string;
}

// Tipe Data Artikel (Mendukung struktur Database & Frontend)
export interface Article {
  id: number | string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string[]; // Array paragraf untuk isi artikel
  category_id?: number;
  category?: string;       // Nama kategori (hasil join)
  categoryColor?: string;  // Warna badge kategori (frontend)
  badge_color?: string;    // Warna badge kategori (database)
  author?: string;
  image_url?: string;
  is_featured?: boolean;
  is_slideshow?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  comments?: Comment[];    // Relasi komentar opsional saat detail
}

// Tipe Data Slideshow / Featured Post
export interface FeaturedSlide {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  badgeColor: string;
  date: string;
}

// Tipe Payload Request untuk Kirim Komentar
export interface CreateCommentDTO {
  name: string;
  text: string;
}

// Tipe Response API Standard
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}