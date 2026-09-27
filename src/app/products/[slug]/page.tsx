'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/services/productApi';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Import Modular Components
import ProductHeader from '@/components/product-detail/ProductHeader';
import ProductGallery from '@/components/product-detail/ProductGallery';
import ProductTabs from '@/components/product-detail/ProductTabs';
import PriceBox from '@/components/product-detail/PriceBox';
import AffiliateBox from '@/components/product-detail/AffiliateBox';
import RelatedProducts from '@/components/product-detail/RelatedProducts';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<'regular' | 'extended'>('regular');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productApi.getProductBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
        <h2 className="text-xl font-black text-slate-900 uppercase mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-4">
          Produk yang Anda cari mungkin sudah dihapus atau tautan tidak valid.
        </p>
        <Link href="/" className="px-4 py-2 bg-orange-500 text-white font-bold text-xs uppercase tracking-wider">
          Return Home
        </Link>
      </div>
    );
  }

  const title = product.title || product.name || 'Untitled Product';
  const longDesc = product.long_description || product.description || product.short_description || 'No description provided.';
  const regularPrice = product.regular_price || product.price || 45;
  const extendedPrice = product.extended_price || (regularPrice * 4);
  const currentPrice = selectedLicense === 'regular' ? regularPrice : extendedPrice;
  
  const thumbnails = product.gallery && product.gallery.length > 0
    ? product.gallery.map((g) => g.image_url)
    : [
        product.thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800'
      ];
  
  const livePreviewUrl = product.live_preview_url || product.previewUrl || product.demoUrl || '#';
  const categoryName = product.categoryId || product.category_id || product.platform || 'MOBILE APPS';
  const framework = product.tech_stack?.[0] || 'SwiftUI (Swift 5.10)';
  const rating = product.rating || 4.8;
  const reviewsCount = product.reviews?.length || 72;
  const salesCount = product.sales || 420;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-slate-50/50 space-y-6">
        
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browse Catalog</span>
        </Link>

        {/* Product Header Component */}
        <ProductHeader
          categoryName={categoryName}
          framework={framework}
          livePreviewUrl={livePreviewUrl}
          title={title}
          rating={rating}
          reviewsCount={reviewsCount}
          salesCount={salesCount}
        />

        {/* Grid Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <ProductGallery
              images={thumbnails}
              selectedIndex={selectedScreenshotIndex}
              onSelectIndex={setSelectedScreenshotIndex}
              title={title}
            />

            <ProductTabs
              longDesc={longDesc}
              tags={product.tags || []}
              rating={rating}
              reviewsCount={reviewsCount}
            />
          </div>

          {/* Right Column / Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <PriceBox
              currentPrice={currentPrice}
              regularPrice={regularPrice}
              extendedPrice={extendedPrice}
              selectedLicense={selectedLicense}
              onSelectLicense={setSelectedLicense} 
              productId={product.id || slug}
            />

            <AffiliateBox slug={slug} />
          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-2">
          <RelatedProducts />
        </div>

      </div>
    </div>
  );
}