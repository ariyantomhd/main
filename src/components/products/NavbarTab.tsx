import React from "react";
import { LayoutGrid, SlidersHorizontal, RotateCcw } from "lucide-react";
import Filtering from "./Filtering";
import TechStack from "./TechStack";

interface NavbarTabProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: number) => void;
  techStacks: string[];
  selectedTech: string[];
  onToggleTech: (tech: string) => void;
  onReset: () => void;
}

export default function NavbarTab({
  categories,
  activeCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  techStacks,
  selectedTech,
  onToggleTech,
  onReset,
}: NavbarTabProps) {
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="w-full bg-app-surface border border-app-border rounded-xl shadow-sm mb-8">
      {/* Top Tab Bar for Categories */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-app-border overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          <div className="flex items-center gap-2 text-[10px] font-black text-app-secondary uppercase tracking-widest mr-4">
            <LayoutGrid size={14} /> Categories
          </div>
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 text-[11px] font-bold rounded-lg transition-all ${
                  activeCategory === cat
                    ? "bg-app-accent text-white shadow-md shadow-app-accent/20"
                    : "bg-app-bg text-app-secondary hover:text-app-primary hover:bg-app-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 text-[11px] font-bold rounded-lg transition-all ml-4 shrink-0 ${
            showFilters
              ? "bg-app-primary text-app-surface"
              : "bg-app-bg text-app-secondary hover:text-app-primary"
          }`}
        >
          <SlidersHorizontal size={14} />
          {showFilters ? "Hide Filters" : "Filters"}
        </button>
      </div>

      {/* Expandable Filter Area */}
      {showFilters && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-app-bg/5 rounded-b-xl border-t border-app-border/50">
          <div className="relative">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-app-primary mb-6">Price Range</h4>
            <div className="bg-app-surface p-6 rounded-xl border border-app-border">
              <Filtering
                priceRange={priceRange}
                onPriceChange={onPriceChange}
                hideSort={true}
              />
            </div>
            
            <button
              onClick={onReset}
              className="absolute -top-1 right-0 text-[10px] font-black text-app-accent uppercase tracking-widest flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-app-primary mb-6">Technologies</h4>
            <div className="bg-app-surface p-6 rounded-xl border border-app-border">
              <TechStack
                techStacks={techStacks}
                selectedTech={selectedTech}
                onToggle={onToggleTech}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
