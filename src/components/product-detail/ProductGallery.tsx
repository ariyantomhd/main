import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, Monitor, Camera, Heart } from "lucide-react";

interface GalleryProps {
  images?: string[];
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  demoUrl?: string;
  likes?: number;
}

export default function Gallery({ 
  images = [], 
  activeIndex: externalIndex, 
  setActiveIndex: externalSetActiveIndex, 
  demoUrl, 
  likes = 0 
}: GalleryProps) {
  // State lokal jika parent component tidak mengirimkan activeIndex / setActiveIndex
  const [internalIndex, setInternalIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const activeIndex = externalIndex ?? internalIndex;
  const setActiveIndex = externalSetActiveIndex || setInternalIndex;

  // Gambar cadangan jika daftar gambar kosong atau URL bermasalah
  const fallbackImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

  const validImages = images.filter((img) => Boolean(img));
  const currentImageList = validImages.length > 0 ? validImages : [fallbackImage];

  const activeImage = imgError ? fallbackImage : (currentImageList[activeIndex] || currentImageList[0]);

  const next = () => {
    setImgError(false);
    setActiveIndex((prev) => (prev + 1) % currentImageList.length);
  };

  const prev = () => {
    setImgError(false);
    setActiveIndex((prev) => (prev - 1 + currentImageList.length) % currentImageList.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="bg-white p-2 rounded-sm border border-gray-200 shadow-sm">
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden group flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex + activeImage}
              src={activeImage}
              alt="Product Preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          </AnimatePresence>

          {/* Navigasi Panah Slide Utama (Selalu Tampil Permanen) */}
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none z-10">
            <button
              type="button"
              onClick={prev}
              className="p-2.5 bg-black/40 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto cursor-pointer shadow-md group"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              type="button"
              onClick={next}
              className="p-2.5 bg-black/40 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-sm transition-all pointer-events-auto cursor-pointer shadow-md group"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons below Gallery */}
      <div className="flex items-stretch gap-3 mt-4">
        <a 
          href={demoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] bg-[#00AEEF] text-white py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00AEEF]/90 transition-all shadow-sm"
        >
          <Monitor size={18} />
          Live Demo
        </a>
        
        <button 
          type="button"
          onClick={() => setIsZoomed(true)}
          className="flex-1 bg-white border border-gray-200 text-slate-700 py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
        >
          <Camera size={18} />
          Screenshot
        </button>
        
        <button 
          type="button"
          className="bg-white border border-gray-200 text-slate-700 py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm min-w-[80px] cursor-pointer"
        >
          <Heart size={18} className="text-gray-400" />
          <span className="text-gray-400">{likes}</span>
        </button>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer z-50"
          >
            <X size={28} />
          </button>

          {/* Navigasi Panah Fullscreen Modal */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none z-50">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="p-3 md:p-4 bg-white/10 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-lg group"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="p-3 md:p-4 bg-white/10 hover:bg-[#00AEEF] text-white rounded-full backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-lg group"
              aria-label="Next image"
            >
              <ChevronRight size={36} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs font-mono font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full z-50">
            {activeIndex + 1} / {currentImageList.length}
          </div>

          {/* Main Zoomed Image */}
          <motion.img
            key={activeIndex + activeImage}
            src={activeImage}
            alt="Zoomed Preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-[85vw] max-h-[80vh] object-contain rounded-md shadow-2xl"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </div>
      )}
    </div>
  );
}