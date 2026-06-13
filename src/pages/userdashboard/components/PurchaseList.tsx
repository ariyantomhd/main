import React from "react";
import { PurchaseOrderItem } from "../../../types/order";
import { Download, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PurchaseListProps {
  items: PurchaseOrderItem[];
}

export default function PurchaseList({ items }: PurchaseListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-app-surface border border-app-border p-16 text-center rounded-2xl flex flex-col items-center gap-4">
         <div className="w-20 h-20 bg-app-bg border border-app-border rounded-full flex items-center justify-center">
           <Download size={32} className="text-app-secondary opacity-50" />
         </div>
         <div>
           <h3 className="text-sm font-black text-app-primary uppercase tracking-widest mb-2">No library items</h3>
           <p className="text-[11px] font-medium text-app-secondary uppercase tracking-widest">You haven't made any purchases yet.</p>
         </div>
         <Link to="/products" className="mt-4 px-6 py-3 bg-app-accent text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-app-accent/20">
           Browse Store <ArrowRight size={14} />
         </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary border-b border-app-border pb-3">My Library</h2>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, idx) => {
          const product = item.products;
          const imgUrl = product?.previewUrl || (product?.images && product.images[0]) || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400";
          
          return (
            <div key={item.id || idx} className="bg-app-surface border border-app-border p-4 pr-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-app-accent/50 transition-colors shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-24 h-16 bg-app-bg rounded-xl overflow-hidden shadow-inner border border-app-border flex-shrink-0 relative group">
                  <img src={imgUrl} alt={product?.name || "Product"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-app-primary uppercase tracking-tight mb-1 group-hover:text-app-accent transition-colors">
                    {product?.name || "Unknown Product"}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-[9px] text-app-secondary tracking-widest uppercase font-bold">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    {product?.version && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-app-border"></span>
                        <p className="text-[9px] text-app-accent tracking-widest uppercase font-black">
                          v{product.version}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-app-border sm:border-none pt-4 sm:pt-0">
                <span className="text-lg font-black text-app-primary tracking-tighter">
                  ${Number(item.price || product?.price || 0).toFixed(2)}
                </span>
                <Link to={`/products/${product?.id || ''}`} className="h-10 w-10 bg-app-bg border border-app-border text-app-secondary rounded-full flex items-center justify-center hover:bg-app-accent hover:text-white hover:border-app-accent transition-all shadow-sm group-hover:scale-105">
                  <Download size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
