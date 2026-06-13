import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Product } from "../../../types/product";
import { motion, AnimatePresence } from "motion/react";
import BasicInfoSection from "./form/BasicInfoSection";
import ProductAssetsSection from "./form/ProductAssetsSection";
import VisualsGallerySection from "./form/VisualsGallerySection";
import SettingsTagsSection from "./form/SettingsTagsSection";
import ManualReviewsSection from "./form/ManualReviewsSection";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
  product?: Product | null;
}

export default function AddProduct({ isOpen, onClose, onSave, product }: AddProductProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    categoryId: "DeFi",
    previewUrl: "",
    gallery: [],
    demoUrl: "",
    tags: [],
    files: [],
    isFeatured: false,
    isPopular: false,
    isFlashSale: false,
    discountPrice: undefined,
    platform: "React",
    version: "1.0.0",
    sales: 0,
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [uploadingType, setUploadingType] = useState<"preview" | "gallery" | "zip" | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        categoryId: product.categoryId || "DeFi",
        previewUrl: product.previewUrl || "",
        gallery: product.gallery || [],
        demoUrl: product.demoUrl || "",
        tags: product.tags || [],
        files: product.files || [],
        platform: product.platform || "React",
        version: product.version || "1.0.0",
        sales: product.sales || 0,
        reviews: product.reviews || [],
        rating: product.rating || 0
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        categoryId: "DeFi",
        previewUrl: "",
        gallery: [],
        demoUrl: "",
        tags: [],
        files: [],
        isFeatured: false,
        isPopular: false,
        isFlashSale: false,
        discountPrice: undefined,
        platform: "React",
        version: "1.0.0",
        sales: 0,
        reviews: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }, [product, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "preview" | "gallery" | "zip") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingType(type);
    try {
      // Mock File Upload since we dont have storage bucket natively anymore
      const uploadedFiles = Array.from(files).map((file: File) => {
        const fakeUrl = URL.createObjectURL(file);
        return { name: file.name, url: fakeUrl, size: (file.size / (1024 * 1024)).toFixed(2) + " MB" };
      });

      if (type === "preview") {
        setFormData(prev => ({ ...prev, previewUrl: uploadedFiles[0].url }));
      } else if (type === "gallery") {
        setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...uploadedFiles.map(f => f.url)] }));
      } else {
        setFormData(prev => ({ ...prev, files: [...(prev.files || []), ...uploadedFiles] }));
      }
    } catch (error: any) {
      console.warn("Upload error:", error);
      alert("Failed to upload file.");
    } finally {
      setUploadingType(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags?.includes(tagInput)) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tagToRemove) });
  };

  const addReview = () => {
    const newReview = {
      id: Math.random().toString(36).substring(2, 9),
      userName: "Anonymous User",
      rating: 5,
      comment: "Great product!",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      likes: 0
    };
    setFormData({ ...formData, reviews: [...(formData.reviews || []), newReview] });
  };

  const updateReview = (index: number, field: string, value: any) => {
    const updatedReviews = [...(formData.reviews || [])];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const removeReview = (index: number) => {
    setFormData({ ...formData, reviews: formData.reviews?.filter((_, i) => i !== index) });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
          className="relative w-full max-w-5xl bg-app-surface border border-app-border rounded-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="p-6 border-b border-app-border flex justify-between items-center bg-app-bg/5">
            <h2 className="text-xl font-black text-app-primary uppercase tracking-tight">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <button onClick={onClose} className="text-app-secondary hover:text-app-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Info */}
              <div className="space-y-8">
                <BasicInfoSection formData={formData} setFormData={setFormData} />
                <ProductAssetsSection 
                  formData={formData} 
                  setFormData={setFormData} 
                  uploadingType={uploadingType} 
                  handleFileUpload={handleFileUpload} 
                />
              </div>

              {/* Right Column: Media */}
              <div className="space-y-8">
                <VisualsGallerySection 
                  formData={formData} 
                  setFormData={setFormData} 
                  uploadingType={uploadingType} 
                  handleFileUpload={handleFileUpload} 
                />
                <SettingsTagsSection 
                  formData={formData} 
                  setFormData={setFormData} 
                  tagInput={tagInput} 
                  setTagInput={setTagInput} 
                  addTag={addTag} 
                  removeTag={removeTag} 
                />
                <ManualReviewsSection 
                  formData={formData} 
                  addReview={addReview} 
                  updateReview={updateReview} 
                  removeReview={removeReview} 
                />
              </div>
            </div>
          </form>

          <div className="p-6 border-t border-app-border bg-app-bg/5 flex justify-end gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-3 bg-app-primary text-app-surface px-10 py-4 font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity shadow-xl disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {product ? "Update Product" : "Save Product"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
