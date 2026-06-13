import React from "react";
import { Loader2, FileText, X } from "lucide-react";
import { Product } from "../../../../types/product";

interface ProductAssetsSectionProps {
  formData: Partial<Product>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  uploadingType: "preview" | "gallery" | "zip" | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, type: "preview" | "gallery" | "zip") => void;
}

export default function ProductAssetsSection({ formData, setFormData, uploadingType, handleFileUpload }: ProductAssetsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-accent border-b border-app-border pb-2">Product Assets</h3>
      
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Main ZIP File</label>
        <div className="relative">
          <input 
            type="file" 
            accept=".zip,.rar,.7z"
            onChange={(e) => handleFileUpload(e, "zip")}
            className="hidden"
            id="zip-upload"
          />
          <label 
            htmlFor="zip-upload"
            className="flex items-center justify-center gap-3 w-full bg-app-bg border border-app-border py-4 cursor-pointer hover:bg-app-primary hover:text-app-surface transition-all group"
          >
            {uploadingType === "zip" ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <FileText size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Upload ZIP File
                </span>
              </>
            )}
          </label>
        </div>
        
        <div className="space-y-2">
          {formData.files?.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-app-bg border border-app-border">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-app-accent" />
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-tight text-app-primary truncate max-w-[150px]">{file.name}</p>
                  <p className="text-[8px] font-bold text-app-secondary opacity-60 uppercase">{file.size}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, files: formData.files?.filter((_, i) => i !== idx) })}
                className="text-app-danger hover:scale-110 transition-transform"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
