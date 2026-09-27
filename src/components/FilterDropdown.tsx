'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FilterDropdownProps {
  selectedTech: string;
  onTechChange: (tech: string) => void;
  availableTechs: string[];
}

export default function FilterDropdown({
  selectedTech,
  onTechChange,
  availableTechs,
}: FilterDropdownProps) {
  return (
    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
      <Filter className="w-4 h-4 text-slate-100" />
      <span className="text-xs font-bold text-slate-100 uppercase">Tech:</span>
      <select
        value={selectedTech}
        onChange={(e) => onTechChange(e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 transition-colors"
      >
        <option value="ALL">All Technologies</option>
        {availableTechs.map((tech) => (
          <option key={tech} value={tech}>
            {tech}
          </option>
        ))}
      </select>
    </div>
  );
}