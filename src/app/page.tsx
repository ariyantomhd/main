'use client';

import React from 'react';
import HeroSection from '@/components/landingpage/HeroSection';
import CategoryPills from '@/components/landingpage/CategoryPills';
import LandingSections from '@/components/landingpage/LandingSections';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section (Biasanya full-width dengan background gelap/utama) */}
      <HeroSection />

      {/* 2. Container Utama untuk Konten di Bawahnya */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-6">
        
        {/* Category Filters / Pills */}
        <CategoryPills />

        {/* Multi-Sections (Featured, Popular, Flash Sale, New Release) */}
        <LandingSections />
        
      </div>
    </main>
  );
}