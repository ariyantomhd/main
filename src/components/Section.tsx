import React from "react";
import { ChevronRight } from "lucide-react";
import ItemCard from "./ItemCard";
import { Product } from "../types/product";

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  items: Product[];
  viewAllLink?: string;
  extraHeader?: React.ReactNode;
}

export default function Section({ title, icon, items, viewAllLink, extraHeader }: SectionProps) {
  const getTitleColor = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('featured')) return 'text-app-accent';
    if (lower.includes('popular') || lower.includes('trending')) return 'text-app-brand-gold';
    if (lower.includes('flash') || lower.includes('sale') || lower.includes('deals')) return 'text-app-brand-gold'; // or warning
    return 'text-app-primary';
  };

  const titleColor = getTitleColor(title);

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-3">
            {icon && <div className={`p-2 bg-app-primary text-app-surface rounded-lg transition-colors`}>{icon}</div>}
            <h2 className={`text-2xl font-black tracking-tighter uppercase ${titleColor}`}>{title}</h2>
          </div>
          {extraHeader && (
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-app-border hidden sm:block" />
              {extraHeader}
            </div>
          )}
        </div>
        {viewAllLink && (
          <a href={viewAllLink} className="text-[10px] font-black uppercase tracking-widest text-app-secondary hover:text-app-primary flex items-center gap-2 transition-colors">
            Browse All <ChevronRight size={14} />
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(items) ? items.map((item) => (
          <ItemCard key={item.id} item={item} />
        )) : null}
      </div>
    </section>
  );
}
