import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, Package, ShoppingCart, Code } from "lucide-react";
import { Product } from "../types/index";
import { useCartStore } from "../store/useCartStore";

interface ItemCardProps {
  item: Product;
  forcedBadge?: "SALE" | "FEATURED" | "TRENDING" | "NEW";
}

export default function ItemCard({ item, forcedBadge }: ItemCardProps) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const getBadgeInfo = () => {
    // 1. Prioritas jika Section memaksa badge tertentu (untuk konsistensi)
    if (forcedBadge) {
      if (forcedBadge === "SALE") return { text: "SALE", color: "bg-red-500" };
      if (forcedBadge === "FEATURED") return { text: "FEATURED", color: "bg-blue-500" };
      if (forcedBadge === "TRENDING") return { text: "TRENDING", color: "bg-orange-500" };
      if (forcedBadge === "NEW") return { text: "NEW", color: "bg-green-500" };
    }
    
    // 2. Fallback otomatis jika tidak ada forcedBadge
    if (item.isFlashSale) return { text: "SALE", color: "bg-red-500" };
    if (item.isFeatured) return { text: "FEATURED", color: "bg-blue-500" };
    if (item.isPopular) return { text: "TRENDING", color: "bg-orange-500" };
    
    return null;
  };

  const badgeInfo = getBadgeInfo();

  const handleCardClick = () => navigate(`/products/${item.slug || item.id}`);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    item.demoUrl ? window.open(item.demoUrl, '_blank') : handleCardClick();
  };

  const handleCartClick = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    addItem({ 
      id: item.id, 
      name: item.name, 
      price: item.discountPrice || item.price || 0, 
      quantity: 1, 
      image: item.previewUrl, 
      category: item.categoryId 
    }); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleCardClick}
      className="relative bg-app-surface border border-app-border rounded-xl hover:shadow-[0_20px_40px_-15px_rgba(var(--app-accent),0.25)] hover:border-app-accent/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-app-bg overflow-hidden w-full border-b border-app-border">
        {badgeInfo && (
          <div className={`absolute top-3 left-3 z-30 px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-wider shadow-md ${badgeInfo.color}`}>
            {badgeInfo.text}
          </div>
        )}
        <img 
          src={item.previewUrl || "https://picsum.photos/seed/placeholder/800/600"} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          referrerPolicy="no-referrer" 
        />
        <button 
          onClick={toggleWishlist} 
          className="absolute top-3 right-3 w-8 h-8 bg-app-surface/80 backdrop-blur-sm border border-app-border rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm z-20"
        >
          <Heart size={14} className={isWishlisted ? "fill-app-accent text-app-accent" : "text-app-secondary"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col relative bg-gradient-to-b from-app-surface to-app-bg/50">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 text-app-accent text-[9px] font-black uppercase tracking-wider">
            {item.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="bg-app-accent/10 px-1.5 py-0.5 rounded-sm">#{tag}</span>
            )) || <span className="bg-app-accent/10 px-1.5 py-0.5 rounded-sm">#SCRIPT</span>}
          </div>
          <div className="text-app-secondary text-[9px] font-bold flex items-center gap-1 uppercase tracking-widest bg-app-bg/50 px-1.5 py-0.5 rounded-sm border border-app-border">
            <Package size={11} strokeWidth={2.5} />
            v{item.version || "1.0.0"}
          </div>
        </div>

        <h3 className="font-bold text-app-primary text-base leading-snug mb-2 line-clamp-2 group-hover:text-app-accent transition-colors">
          {item.name}
        </h3>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <span className="bg-app-bg text-app-secondary px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm border border-app-border">
            {item.categoryId || "OTHERS"}
          </span>
          <div className="flex items-center gap-[2px]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={11} className="fill-app-brand-gold text-app-brand-gold" />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end mb-4 border-t border-app-border/50 pt-3">
          <div className="text-xl font-black text-app-primary">
            ${(item.discountPrice || item.price || 0).toLocaleString()}
          </div>
          <div className="text-app-secondary text-[9px] font-medium flex items-center gap-1">
            <Code size={10} strokeWidth={2} />
            {(item.platform || "REACT").substring(0, 15)}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleDemoClick}
            className="flex-1 bg-app-accent hover:bg-app-accent/90 text-white py-2.5 px-4 font-bold text-xs rounded-lg flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            Live Preview
          </button>
          <button 
            onClick={handleCartClick}
            className="w-10 flex-shrink-0 bg-app-bg border border-app-border hover:border-app-accent/50 hover:bg-app-surface rounded-lg text-app-primary flex items-center justify-center transition-all active:scale-95 group/cart"
          >
            <ShoppingCart size={16} strokeWidth={2} className="group-hover/cart:text-app-accent transition-colors" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}