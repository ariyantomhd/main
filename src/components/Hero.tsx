import React, { useState } from "react";
import { Search, Code2, LayoutTemplate, Palette, Blocks } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: "Scripts", icon: <Code2 size={14} />, path: "/products?category=SCRIPTS" },
    { name: "Themes", icon: <LayoutTemplate size={14} />, path: "/products?category=THEMES" },
    { name: "Plugins", icon: <Blocks size={14} />, path: "/products?category=PLUGINS" },
    { name: "UI Kits", icon: <Palette size={14} />, path: "/products?category=UI KITS" },
  ];

  return (
    <div className="relative min-h-[15vh] py-6 flex flex-col justify-center overflow-hidden transition-colors duration-300 bg-app-bg border-b border-app-border">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-app-accent/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-app-brand-green/10 to-transparent" />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-app-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-app-brand-green/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 px-4 md:px-8 w-full text-center space-y-4">
        
        {/* Texts */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-app-primary tracking-tight uppercase animate-in fade-in slide-in-from-bottom duration-700">
            Discover <span className="text-app-accent">Thousands</span> of Code Scripts & Assets
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-app-secondary group-focus-within:text-app-accent transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-28 py-2.5 bg-app-surface border border-app-border rounded-lg text-app-primary placeholder-app-secondary/60 focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-all text-sm shadow-sm"
              placeholder="Search for scripts, themes, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-1 right-1 bg-app-accent text-white px-6 rounded-md font-bold hover:bg-app-accent/90 transition-colors shadow flex items-center text-sm"
            >
              Search
            </button>
          </form>
        </div>

        {/* Category Quick Links */}
        <div className="pt-2 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => navigate(cat.path)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-app-surface border border-app-border hover:border-app-accent hover:text-app-accent text-app-secondary rounded-full text-xs font-semibold transition-all group shadow-sm"
              >
                <span className="text-app-secondary/70 group-hover:text-app-accent transition-colors">
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
