import React from "react";

interface CategoryProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function Category({ categories, activeCategory, onSelect }: CategoryProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-widest transition-all ${
            activeCategory === cat
              ? "bg-app-primary text-app-surface shadow-lg scale-105"
              : "bg-app-surface text-app-secondary border border-app-border hover:border-app-primary"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
