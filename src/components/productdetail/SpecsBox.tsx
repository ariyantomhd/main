import React from "react";
import { Calendar, RefreshCcw, ShoppingBag, Tag, Cpu, Box } from "lucide-react";
import { Product } from "../../types/product";

interface SpecsBoxProps {
  product: Product;
}

export default function SpecsBox({ product }: SpecsBoxProps) {
  const specs = [
    { 
      label: "Released", 
      value: new Date(product.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), 
      icon: <Calendar size={16} /> 
    },
    { 
      label: "Last Update", 
      value: new Date(product.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), 
      icon: <RefreshCcw size={16} /> 
    },
    { 
      label: "Sales", 
      value: `${product.sales} Assets`, 
      icon: <ShoppingBag size={16} /> 
    },
    { 
      label: "Category", 
      value: product.categoryId, 
      icon: <Tag size={16} /> 
    },
    { 
      label: "Framework", 
      value: product.platform, 
      icon: <Cpu size={16} /> 
    },
  ];

  return (
    <div className="bg-app-surface/40 backdrop-blur-md p-6 rounded-xl border border-app-border shadow-[0_20px_50px_-20px_rgba(30,27,75,0.25)] space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-app-border/50">
        <div className="p-2 bg-app-accent/10 rounded-lg text-app-accent">
          <Box size={18} />
        </div>
        <h3 className="text-xs font-black text-app-primary uppercase tracking-[0.2em]">
          Product Specs
        </h3>
      </div>

      <div className="space-y-5">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-app-secondary group-hover:text-app-primary transition-colors">
              <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                {spec.icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                {spec.label}
              </span>
            </div>
            <span className="text-[11px] font-black text-app-primary tracking-tight">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
