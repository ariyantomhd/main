import React, { useState, useEffect } from "react";
import { 
  X, 
  Save, 
  Star, 
  ShoppingBag, 
  Loader2,
  AlertTriangle
} from "lucide-react";
import { Product } from "../../../types/product";
import { motion, AnimatePresence } from "motion/react";

interface ReviewAndRatingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: { sales: number; rating: number }) => Promise<void>;
  product: Product | null;
}

export default function ReviewAndRating({ 
  isOpen, 
  onClose, 
  onSave, 
  product 
}: ReviewAndRatingProps) {
  const [sales, setSales] = useState(0);
  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setSales(product.sales ?? 0);
      setRating(product.rating ?? 0);
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsSaving(true);
    try {
      await onSave(product.id, { sales, rating });
      onClose();
    } catch (error) {
      console.error("Error updating stats:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-app-surface border border-app-border rounded-none shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-app-border flex justify-between items-center bg-app-bg/5">
            <h2 className="text-xl font-black text-app-primary uppercase tracking-tight">
              Inject Stats
            </h2>
            <button onClick={onClose} className="text-app-secondary hover:text-app-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="p-4 bg-app-accent/5 border border-app-accent/20 flex gap-4 items-start">
              <AlertTriangle className="text-app-accent shrink-0" size={20} />
              <p className="text-[10px] font-bold text-app-secondary uppercase tracking-widest leading-relaxed">
                Use this tool to manually adjust sales and ratings for social proof. Changes are immediate.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary flex items-center gap-2">
                  <ShoppingBag size={14} />
                  Total Sales Count
                </label>
                <input 
                  type="number" 
                  value={sales}
                  onChange={(e) => setSales(parseInt(e.target.value) || 0)}
                  className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary flex items-center gap-2">
                  <Star size={14} />
                  Average Rating (0-5)
                </label>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.1"
                    value={Number.isNaN(rating) ? 0 : (rating || 0)}
                    onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                    className="w-full accent-app-accent"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-app-primary">{rating.toFixed(1)}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={16} 
                          className={s <= Math.round(rating) ? "text-app-accent fill-app-accent" : "text-app-border"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-3 bg-app-primary text-app-surface px-6 py-4 font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity shadow-xl disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Update Stats
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
