// src/services/blogAPI.ts
import { fetchApi, ApiResponse } from './apiConfig';
import { Article, Category, Comment, CreateCommentDTO } from '../types/blog';

export const BlogAPI = {
  /**
   * Mengambil daftar artikel (dengan opsi filter kategori dan pagination)
   */
  async getArticles(category?: string, page = 1): Promise<Article[]> {
    const params: Record<string, string | number> = { page };
    if (category && category !== 'All') {
      params.category = category;
    }

    const response = await fetchApi<ApiResponse<Article[]>>('/blog', {
      method: 'GET',
      params,
    });

    return response.data;
  },

  /**
   * Mengambil detail artikel beserta komentarnya berdasarkan ID
   */
  async getArticleDetail(id: string): Promise<Article & { comments: Comment[] }> {
    const response = await fetchApi<ApiResponse<Article & { comments: Comment[] }>>(`/blog/${id}`, {
      method: 'GET',
    });

    return response.data;
  },

  /**
   * Mengambil daftar seluruh kategori artikel beserta jumlahnya
   */
  async getCategories(): Promise<Category[]> {
    const response = await fetchApi<ApiResponse<Category[]>>('/blog/categories', {
      method: 'GET',
    });

    return response.data;
  },

  /**
   * Mengirim komentar baru ke artikel tertentu
   */
  async postComment(articleId: string, payload: CreateCommentDTO): Promise<Comment> {
    const response = await fetchApi<ApiResponse<Comment>>(`/blog/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data;
  },
};