import { Product } from "../../types/product";

interface InfoBoxProps {
  product: Product;
}

export default function ProductHeader({ product }: InfoBoxProps) {
  return (
    <div className="space-y-4">
      {/* Category & Badge */}
      <div className="flex items-center gap-3">
        <span className="px-4 py-1.5 bg-app-accent/10 text-app-accent text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-app-accent/20">
          {product.categoryId}
        </span>
        {product.isPopular && (
          <span className="px-4 py-1.5 bg-app-primary text-app-surface text-[10px] font-black uppercase tracking-[0.2em] rounded-lg shadow-sm">
            Popular Choice
          </span>
        )}
      </div>

      {/* Title */}
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-app-primary tracking-tighter uppercase leading-none drop-shadow-xl">
          {product.name}
        </h1>
      </div>
    </div>
  );
}
