// src/app/categories/page.tsx
import React from 'react';
import { productApi } from '@/services/productApi';
import { Product } from '@/types';
import CategoriesClientView from '../../components/CategoriesClientView';

interface PageProps {
  searchParams: Promise<{ 
    category?: string; 
    page?: string; 
    search?: string;
    framework?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  const selectedCategory = resolvedParams.category || 'ALL';
  const currentPage = Number(resolvedParams.page) || 1;
  const searchQuery = resolvedParams.search || '';
  const selectedFramework = resolvedParams.framework || 'ALL';
  const minPrice = resolvedParams.minPrice ? Number(resolvedParams.minPrice) : 0;
  const maxPrice = resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : 10000;

  // Ambil data produk di server
  let products: Product[] = [];
  try {
    if (selectedCategory === 'ALL') {
      products = await productApi.getProducts();
    } else {
      products = await productApi.getProductsByCategory(selectedCategory);
    }
  } catch (error) {
    console.error('Failed to fetch products on server:', error);
  }

  return (
    <CategoriesClientView 
      initialProducts={products}
      selectedCategory={selectedCategory}
      currentPage={currentPage}
      searchQuery={searchQuery}
      selectedFramework={selectedFramework}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
  );
}