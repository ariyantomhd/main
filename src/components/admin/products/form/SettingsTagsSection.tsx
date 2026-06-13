import React from "react";
import { Plus, X } from "lucide-react";
import { Product } from "../../../../types/product";

interface SettingsTagsSectionProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  addTag: () => void;
  removeTag: (tag: string) => void;
}

export default function SettingsTagsSection({ formData, setFormData, tagInput, setTagInput, addTag, removeTag }: SettingsTagsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-accent border-b border-app-border pb-2">Settings & Tags</h3>
      
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Tags</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            className="flex-1 bg-app-bg border border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
            placeholder="Add tag..."
          />
          <button 
            type="button"
            onClick={addTag}
            className="bg-app-bg border border-app-border px-4 hover:bg-app-primary hover:text-app-surface transition-all"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags?.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-app-accent/10 text-app-accent text-[10px] font-black uppercase tracking-widest border border-app-accent/20">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={formData.isFeatured || false}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="peer sr-only"
          />
          <div className="w-5 h-5 border-2 border-app-border peer-checked:bg-app-accent peer-checked:border-app-accent transition-all flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary group-hover:text-app-primary">Featured</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={formData.isPopular || false}
            onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
            className="peer sr-only"
          />
          <div className="w-5 h-5 border-2 border-app-border peer-checked:bg-app-accent peer-checked:border-app-accent transition-all flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary group-hover:text-app-primary">Popular</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={formData.isFlashSale || false}
            onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
            className="peer sr-only"
          />
          <div className="w-5 h-5 border-2 border-app-border peer-checked:bg-app-accent peer-checked:border-app-accent transition-all flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary group-hover:text-app-primary">Flash Sale</span>
        </label>
      </div>
    </div>
  );
}
