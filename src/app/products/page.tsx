// src/app/products/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { productApi } from '@/services/productApi';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

// Import komponen modular
import SearchForm from '@/components/SearchForm';
import CategoryDropdown from '@/components/CategoryDropdown';
import FilterDropdown from '@/components/FilterDropdown';
import PaginationButtons from '@/components/PaginationButtons';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil parameter dari URL (termasuk sort dan filter baru dari Navbar)
  const categoryParam = searchParams.get('category') || 'ALL';
  const techParam = searchParams.get('tech') || 'ALL';
  const tagParam = searchParams.get('tag') || undefined;
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || ''; // 'trending', 'bestseller'
  const filterParam = searchParams.get('filter') || ''; // 'new', 'deals'
  const pageParam = Number(searchParams.get('page')) || 1;

  const ITEMS_PER_PAGE = 8;

  // State lokal untuk search input agar responsif saat diketik
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Fetch data berdasarkan kategori (atau ambil semua)
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', categoryParam === 'ALL' ? undefined : categoryParam],
    queryFn: () => productApi.getProducts({ 
      category: categoryParam === 'ALL' ? undefined : categoryParam 
    }),
  });

  // Daftar tech stack unik dari data produk untuk dropdown filter tech
  const availableTechs = useMemo(() => {
    if (!products) return [];
    const techs = new Set<string>();
    products.forEach((p: Product) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => techs.add(t));
      }
    });
    return Array.from(techs);
  }, [products]);

  // Fungsi helper untuk memperbarui URLSearchParams
  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'ALL') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Handler untuk setiap filter & pagination
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateQueryParams({ search: query, page: '1' });
  };

  const handleCategoryChange = (category: string) => {
    updateQueryParams({ category, page: '1' });
  };

  const handleTechChange = (tech: string) => {
    updateQueryParams({ tech, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter gabungan & Sorting di sisi client (Tanpa tipe 'any')
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const result = products.filter((p: Product) => {
      // Filter Search (berdasarkan judul atau deskripsi)
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.short_description && p.short_description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter Tag / Tech Stack
      const activeTech = techParam !== 'ALL' ? techParam : tagParam;
      const matchesTech = !activeTech || (
        Array.isArray(p.tags) && 
        p.tags.some(t => t.toLowerCase() === activeTech.toLowerCase())
      );

      // Filter khusus dari Navbar (?filter=new / ?filter=deals)
      let matchesFilter = true;
      if (filterParam === 'new') {
        matchesFilter = Boolean(p.isFeatured || p.id); 
      } else if (filterParam === 'deals') {
        matchesFilter = Boolean(p.regular_price);
      }

      return matchesSearch && matchesTech && matchesFilter;
    });

    // Logika Sorting (?sort=trending / ?sort=bestseller) dengan konversi tipe yang aman dari error TS2362/TS2363
    if (sortParam === 'trending') {
      result.sort((a: Product, b: Product) => {
        const idA = typeof a.id === 'number' ? a.id : Number(a.id) || 0;
        const idB = typeof b.id === 'number' ? b.id : Number(b.id) || 0;
        return idB - idA;
      }); 
    } else if (sortParam === 'bestseller') {
      result.sort((a: Product, b: Product) => {
        const priceA = typeof a.regular_price === 'number' ? a.regular_price : Number(a.regular_price) || 0;
        const priceB = typeof b.regular_price === 'number' ? b.regular_price : Number(b.regular_price) || 0;
        return priceA - priceB;
      }); 
    }

    return result;
  }, [products, searchQuery, techParam, tagParam, filterParam, sortParam]);

  // Data yang dipotong untuk paginasi saat ini
  const paginatedProducts = useMemo(() => {
    const start = (pageParam - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, pageParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-orange-500 uppercase tracking-tight">
            {tagParam ? `Tag: #${tagParam}` : categoryParam !== 'ALL' ? `Category: ${categoryParam}` : filterParam ? `Filter: ${filterParam}` : sortParam ? `Sort by: ${sortParam}` : 'All Digital Assets'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Explore premium templates, source codes, and development kits.
          </p>
        </div>
      </div>

      {/* Toolbar: Search & Filters (Category & Tech Dropdown) dengan Gradient Deep Purple ke Hijau Tosca */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-800 to-teal-500 p-4 rounded-2xl shadow-xl mb-8 ">
        <div className=" backdrop-blur-md p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-1">
            <SearchForm 
              searchQuery={searchQuery} 
              onSearchChange={handleSearchChange} 
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <CategoryDropdown 
              selectedCategory={categoryParam} 
              onCategoryChange={handleCategoryChange} 
            />
            <FilterDropdown 
              selectedTech={techParam} 
              onTechChange={handleTechChange} 
              availableTechs={availableTechs} 
            />
          </div>
        </div>
      </div>

      {/* Product Grid / States */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-800 h-80 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-red-500 font-bold">Failed to load products. Please try again later.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-bold uppercase tracking-wider">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <PaginationButtons
            currentPage={pageParam}
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}