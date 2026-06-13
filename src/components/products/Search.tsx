import React from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={20} />
      <input
        type="text"
        placeholder="Search products, scripts, or UI kits..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-app-surface border-2 border-app-border px-12 py-4 rounded-lg text-app-primary outline-none focus:border-app-accent transition-all font-bold shadow-sm"
      />
    </div>
  );
}
