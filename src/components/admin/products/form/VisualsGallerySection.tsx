import React from "react";
import { Loader2, Trash2, Image as ImageIcon, X, Plus } from "lucide-react";
import { Product } from "../../../../types/product";

interface VisualsGallerySectionProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  uploadingType: "preview" | "gallery" | "zip" | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "preview" | "gallery" | "zip") => void;
}

export default function VisualsGallerySection({ formData, setFormData, uploadingType, handleFileUpload }: VisualsGallerySectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-accent border-b border-app-border pb-2">Visuals & Gallery</h3>
      
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Main Thumbnail</label>
        <div className="flex flex-col gap-4">
          {formData.previewUrl ? (
            <div className="relative aspect-video w-full bg-app-bg border border-app-border overflow-hidden group">
              <img src={formData.previewUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, previewUrl: "" })}
                  className="p-2 bg-app-danger text-white rounded-full hover:scale-110 transition-transform"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "preview")}
                className="hidden"
                id="preview-upload"
              />
              <label 
                htmlFor="preview-upload"
                className="flex flex-col items-center justify-center gap-3 w-full aspect-video bg-app-bg border-2 border-dashed border-app-border cursor-pointer hover:border-app-accent transition-colors group"
              >
                {uploadingType === "preview" ? (
                  <Loader2 className="animate-spin text-app-accent" size={32} />
                ) : (
                  <>
                    <ImageIcon className="text-app-secondary group-hover:text-app-accent" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary group-hover:text-app-primary">
                      Upload Main Thumbnail
                    </span>
                  </>
                )}
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Gallery Images</label>
        <div className="grid grid-cols-3 gap-4">
          {formData.gallery?.map((url, idx) => (
            <div key={idx} className="relative aspect-square bg-app-bg border border-app-border overflow-hidden group">
              <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, gallery: formData.gallery?.filter((_, i) => i !== idx) })}
                className="absolute top-1 right-1 p-1 bg-app-danger text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center aspect-square bg-app-bg border-2 border-dashed border-app-border cursor-pointer hover:border-app-accent transition-colors group">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={(e) => handleFileUpload(e, "gallery")} 
              className="hidden" 
            />
            {uploadingType === "gallery" ? (
              <Loader2 className="animate-spin text-app-accent" size={20} />
            ) : (
              <>
                <Plus className="text-app-secondary group-hover:text-app-accent" size={20} />
                <span className="text-[8px] font-black uppercase tracking-widest text-app-secondary mt-1">Add More</span>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
