// src/types/index.ts
export * from './enum';
export * from './auth';
export * from './product';
export * from './order';
export * from './security';
export * from './blog';
export * from './dashboard';

// Response Standard Wrapper Global
export interface ApiResponse<T = unknown> {
  success: boolean;
  status_code?: number;
  message?: string;
  data: T;
  error?: {
    code: string;
    details?: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total_rows: number;
    total_pages: number;
  };
}