import React from "react";
import { Product } from "../../../../types/product";
import { PRODUCT_CATEGORIES } from "../../../../constants/categories";

interface BasicInfoSectionProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
}

export default function BasicInfoSection({ formData, setFormData }: BasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-accent border-b border-app-border pb-2">Basic Information</h3>
      
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Product Name</label>
        <input 
          type="text" 
          required
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          placeholder="e.g. DeFi Dashboard Pro"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Description</label>
        <textarea 
          required
          rows={4}
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors resize-none"
          placeholder="Describe your product features..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Category</label>
          <select 
            value={formData.categoryId || ""}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          >
            <option value="" disabled>Select Category</option>
            {PRODUCT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Framework / Platform</label>
          <input 
            type="text" 
            value={formData.platform || ""}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
            placeholder="e.g. React, Next.js"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Sales Count</label>
          <input 
            type="number" 
            value={formData.sales || 0}
            onChange={(e) => setFormData({ ...formData, sales: parseInt(e.target.value) || 0 })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Released Date</label>
          <input 
            type="date" 
            value={formData.createdAt ? new Date(formData.createdAt).toISOString().split('T')[0] : ""}
            onChange={(e) => setFormData({ ...formData, createdAt: new Date(e.target.value).toISOString() })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Last Update</label>
          <input 
            type="date" 
            value={formData.updatedAt ? new Date(formData.updatedAt).toISOString().split('T')[0] : ""}
            onChange={(e) => setFormData({ ...formData, updatedAt: new Date(e.target.value).toISOString() })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Price ($)</label>
          <input 
            type="number" 
            required
            step="0.01"
            value={formData.price || 0}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Discount Price ($)</label>
          <input 
            type="number" 
            step="0.01"
            value={(formData.discountPrice == null || Number.isNaN(formData.discountPrice)) ? "" : formData.discountPrice}
            onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value ? (parseFloat(e.target.value) || 0) : undefined })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Average Rating (0-5)</label>
          <input 
            type="number" 
            step="0.1"
            min="0"
            max="5"
            value={formData.rating || 0}
            onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Demo URL</label>
          <input 
            type="url" 
            value={formData.demoUrl || ""}
            onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
            className="w-full bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
            placeholder="https://demo.example.com"
          />
        </div>
      </div>
    </div>
  );
}
