// src/components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/providers/StoreContext";
import { TechIcon } from "@/components/TechIcons";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'regular');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.live_preview_url) {
      window.open(product.live_preview_url, '_blank');
    } else {
      handleCardClick();
    }
  };

  const fallbackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const rawImage = product.thumbnail_url || product.gallery?.[0]?.image_url;
  const imageSource = (!imgError && rawImage) ? rawImage : fallbackImage;
  
  // Ambil list tech stack atau fallback default
  const techStackList = product.tech_stack?.length 
    ? product.tech_stack 
    : (product.tags?.length ? product.tags : ["PHP Scripts"]);

  const priceFormatted = ((product.regular_price || 0) / 100).toFixed(0);

  return (
    <motion.div 
      key={product.id} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative h-full cursor-pointer hover:-translate-y-1 transition-all duration-300 ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative bg-white border border-slate-200 rounded-none flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        
        {/* Container Image Preview */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-200 shrink-0">
          <Image 
            src={imageSource} 
            alt={product.title || "Product Preview"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />

          {/* Badge Harga - Sisi Kiri Atas */}
          <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 border border-slate-200 px-2.5 py-0.5 font-extrabold text-[12px] shadow-xs backdrop-blur-xs z-10">
            {priceFormatted === "0" ? "FREE" : `$${priceFormatted}`}
          </div>
      
          {/* Tombol Keranjang - Sisi Kanan Atas */}
          <button 
            onClick={handleCartClick}
            title={isAdded ? "Added to Cart" : "Add to Cart"}
            className={`absolute top-2.5 right-2.5 w-7 h-7 ${
              isAdded 
                ? "bg-green-500 border-green-600 text-white" 
                : "bg-white/95 text-slate-700 hover:bg-slate-100 border-slate-200"
            } backdrop-blur-xs border flex items-center justify-center hover:scale-110 transition-transform shadow-xs rounded-none z-10`}
          >
            {isAdded ? (
              <Check size={13} strokeWidth={2.5} />
            ) : (
              <ShoppingCart size={13} strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Body Card */}
        <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <h3 className="font-bold text-slate-900 text-[14px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </div>

          <div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className="fill-slate-300 text-slate-300" />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div className="px-3.5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          {/* Framework Icons - Sisi Kiri */}
          <div className="flex items-center gap-2 shrink-0">
            {techStackList.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx} 
                title={tech}
                className="w-6 h-6 rounded-none bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-2xs"
              >
                <TechIcon name={tech} size={14} />
              </span>
            ))}
          </div>

          {/* Tombol Demo Live - Sisi Kanan */}
          <button 
            onClick={handleDemoClick}
            className="bg-[#ffa33b] hover:bg-orange-600 text-white py-1.5 px-3 font-black text-[9px] uppercase tracking-widest rounded-none flex items-center justify-center transition-colors shadow-xs shrink-0"
          >
            DEMO LIVE
          </button>
        </div>

      </div>
    </motion.div>
  );
}