import React from "react";
import { ArrowUpDown } from "lucide-react";

interface FilteringProps {
  sortBy?: string;
  onSortChange?: (value: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: number) => void;
  hideSort?: boolean; // New prop to optionally hide standard sorting
}

export default function Filtering({ sortBy, onSortChange, priceRange, onPriceChange, hideSort = false }: FilteringProps) {
  return (
    <div className="space-y-8">
      {/* Sorting Dropdown */}
      {!hideSort && onSortChange && sortBy !== undefined && (
        <div className="space-y-3">
          <label className="text-[10px] font-black text-app-secondary uppercase tracking-widest flex items-center gap-2">
            <ArrowUpDown size={12} /> Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full bg-app-bg border border-app-border px-4 py-2 rounded-lg text-xs font-bold text-app-primary outline-none focus:border-app-accent"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-app-secondary uppercase tracking-widest">
          Price Range (${priceRange[0]} - ${priceRange[1]})
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={Number.isNaN(priceRange[1]) ? 0 : (priceRange[1] || 0)}
          onChange={(e) => onPriceChange(parseInt(e.target.value) || 0)}
          className="w-full accent-app-accent h-2 bg-app-bg rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
