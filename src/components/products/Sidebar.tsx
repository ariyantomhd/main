import React from "react";
import { Filter, RotateCcw, LayoutGrid } from "lucide-react";
import Filtering from "./Filtering";
import TechStack from "./TechStack";

interface SidebarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: number) => void;
  techStacks: string[];
  selectedTech: string[];
  onToggleTech: (tech: string) => void;
  onReset: () => void;
}

export default function Sidebar({
  categories,
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  priceRange,
  onPriceChange,
  techStacks,
  selectedTech,
  onToggleTech,
  onReset,
}: SidebarProps) {
  return (
    <aside className="lg:w-1/4 space-y-8">
      <div className="bg-app-surface p-6 rounded-none border border-app-border shadow-sm space-y-8 sticky top-24">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-app-primary uppercase tracking-widest text-xs flex items-center gap-2">
            <Filter size={16} /> Filters
          </h3>
          <button
            onClick={onReset}
            className="text-[10px] font-black text-app-accent uppercase tracking-widest flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-app-secondary uppercase tracking-widest flex items-center gap-2">
            <LayoutGrid size={12} /> Categories
          </label>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-left px-3 py-2 text-[11px] font-bold transition-all border-l-2 ${
                  activeCategory === cat
                    ? "text-app-accent border-app-accent bg-app-accent/5"
                    : "text-app-secondary border-transparent hover:text-app-primary hover:bg-app-bg"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Filtering
          sortBy={sortBy}
          onSortChange={onSortChange}
          priceRange={priceRange}
          onPriceChange={onPriceChange}
        />

        <TechStack
          techStacks={techStacks}
          selectedTech={selectedTech}
          onToggle={onToggleTech}
        />
      </div>
    </aside>
  );
}
