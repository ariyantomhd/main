import { Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Product } from "../../types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-20 space-y-8">
      <div className="flex items-center justify-between border-b border-app-border pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-app-primary uppercase tracking-tight">Related Products</h2>
          <p className="text-[10px] font-bold text-app-secondary uppercase tracking-widest">You might also like these premium assets</p>
        </div>
        <Link 
          to="/products" 
          className="flex items-center gap-2 text-[10px] font-black text-app-accent uppercase tracking-widest hover:gap-3 transition-all"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/products/${product.id}`}
            className="group bg-app-surface border border-app-border rounded-xl overflow-hidden hover:border-app-accent transition-all hover:shadow-[0_20px_50px_-20px_rgba(30,27,75,0.25)] flex flex-col"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-app-bg">
              <img 
                src={product.previewUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-app-surface/90 backdrop-blur-md border border-app-border rounded-lg text-[9px] font-black text-app-primary uppercase tracking-widest">
                  {product.categoryId}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-black text-app-primary uppercase tracking-tight text-sm line-clamp-1 group-hover:text-app-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-app-accent">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-black">{product.rating}</span>
                  </div>
                  <span className="text-[10px] font-bold text-app-secondary uppercase tracking-widest">
                    {product.sales} Sales
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-app-border/50">
                <div className="text-lg font-black text-app-primary tracking-tighter">
                  ${product.price}
                </div>
                <div className="w-8 h-8 bg-app-bg border border-app-border rounded-lg flex items-center justify-center text-app-secondary group-hover:bg-app-accent group-hover:text-white group-hover:border-app-accent transition-all">
                  <ShoppingCart size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
