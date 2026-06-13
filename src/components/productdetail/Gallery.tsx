import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X, Monitor, Camera, Heart } from "lucide-react";

interface GalleryProps {
  images: string[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  demoUrl?: string;
  likes?: number;
}

export default function Gallery({ images, activeIndex, setActiveIndex, demoUrl, likes = 0 }: GalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white p-2 rounded-sm border border-gray-200 shadow-sm">
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt="Product Preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prev}
              className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-app-accent hover:text-black transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-app-accent hover:text-black transition-all"
            >
              <ChevronRight size={24} />
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
          onClick={() => setIsZoomed(true)}
          className="flex-1 bg-white border border-gray-200 text-app-secondary py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
        >
          <Camera size={18} />
          Screenshot
        </button>
        
        <button className="bg-white border border-gray-200 text-app-secondary py-4 px-6 font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm min-w-[80px]">
          <Heart size={18} className="text-gray-400" />
          <span className="text-gray-400">{likes}</span>
        </button>
      </div>

      {/* Fullscreen Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X size={32} />
          </button>

          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all pointer-events-auto group"
            >
              <ChevronLeft size={48} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all pointer-events-auto group"
            >
              <ChevronRight size={48} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-black tracking-widest uppercase">
            {activeIndex + 1} / {images.length}
          </div>

          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt="Zoomed Preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}
