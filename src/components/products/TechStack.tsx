import React from "react";

interface TechStackProps {
  techStacks: string[];
  selectedTech: string[];
  onToggle: (tech: string) => void;
}

export default function TechStack({ techStacks, selectedTech, onToggle }: TechStackProps) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-app-secondary uppercase tracking-widest">
        Tech Stack
      </label>
      <div className="flex flex-wrap gap-2">
        {techStacks.map((tech) => (
          <button
            key={tech}
            onClick={() => onToggle(tech)}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
              selectedTech.includes(tech)
                ? "bg-app-accent text-black shadow-md"
                : "bg-app-bg text-app-secondary border border-app-border hover:border-app-accent"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
