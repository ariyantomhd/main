import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye,
  ArrowUpDown,
  Loader2,
  AlertCircle,
  Star,
  ShoppingBag
} from "lucide-react";
import { Product } from "../../../types/product";

interface ProductsManagerProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onReviewInject: (product: Product) => void;
}

export default function ProductsManager({ 
  products, 
  isLoading, 
  onEdit, 
  onDelete,
  onReviewInject
}: ProductsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoryId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name, category, or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-app-surface border border-app-border px-12 py-4 text-sm font-bold outline-none focus:border-app-primary transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-app-surface border border-app-border text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary transition-colors">
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-app-surface border border-app-border rounded-none shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 size={48} className="text-app-accent animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center px-6">
            <div className="w-16 h-16 bg-app-bg border border-app-border flex items-center justify-center text-app-secondary mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-app-primary uppercase tracking-tight">No Products Found</h3>
            <p className="text-app-secondary text-sm font-medium max-w-xs">We couldn't find any products matching your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-app-bg/5 border-b border-app-border">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary w-16">Image</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Product Name</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Category</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Price</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Stats</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-app-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-app-bg/5 transition-colors group">
                    <td className="p-6">
                      <div className="w-12 h-12 bg-app-bg border border-app-border rounded-none overflow-hidden">
                        <img 
                          src={product.previewUrl || "https://picsum.photos/seed/placeholder/200/200"} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-app-primary uppercase leading-tight">{product.name}</p>
                        <p className="text-[10px] font-medium text-app-secondary opacity-60">ID: {product.id}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary">{product.categoryId}</span>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-app-primary">${product.price.toFixed(2)}</p>
                        {product.discountPrice && (
                          <p className="text-[9px] font-bold text-app-danger line-through">${product.discountPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={12} className="text-app-secondary" />
                          <span className="text-xs font-black text-app-primary">{product.sales}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star size={12} className="text-app-accent fill-app-accent" />
                          <span className="text-xs font-black text-app-primary">{product.rating}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${
                        product.isFeatured 
                          ? "bg-app-accent/10 text-app-accent border-app-accent/20" 
                          : "bg-app-success/10 text-app-success border-app-success/20"
                      }`}>
                        {product.isFeatured ? "Featured" : "Active"}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onReviewInject(product)}
                          className="p-2 text-app-secondary hover:text-app-accent transition-colors"
                          title="Inject Reviews/Sales"
                        >
                          <Star size={16} />
                        </button>
                        <button className="p-2 text-app-secondary hover:text-app-primary transition-colors">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => onEdit(product)}
                          className="p-2 text-app-secondary hover:text-app-accent transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDelete(product.id)}
                          className="p-2 text-app-secondary hover:text-app-danger transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
