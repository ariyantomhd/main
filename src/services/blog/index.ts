// src/services/blog/index.ts
import { api } from "../../lib/api";
import { adminServices } from "../admin.services";
import { AdminBlogPost, CreateBlogPostInput } from "../../types";

/**
 * Service untuk modul Blog.
 */
export const blogService = {
  /**
   * Mengambil semua postingan (Public)
   */
  getAllPosts: async (): Promise<AdminBlogPost[]> => {
    try {
      return await api.blog.getAll();
    } catch {
      return []; 
    }
  },

  /**
   * Mengambil detail postingan berdasarkan slug
   */
  getPostBySlug: async (slug: string): Promise<AdminBlogPost | null> => {
    try {
      return await api.blog.getBySlug(slug);
    } catch {
      return null;
    }
  },

  /**
   * Membuat postingan baru (Admin Only)
   */
  createPost: async (payload: CreateBlogPostInput): Promise<AdminBlogPost> => {
    const response = await adminServices.createPost(payload);
    return response.data;
  },

  /**
   * Update status postingan
   */
  updateStatus: async (id: string, status: 'draft' | 'published'): Promise<void> => {
    await adminServices.updateBlogStatus(id, status);
  }
};
