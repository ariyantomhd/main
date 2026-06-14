'use client';

import { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { Product } from "../types/index";
import { productsService } from "../services/products";

// --- Sub-components ---
import Search from "../components/products/Search";
import Pagination from "../components/products/Pagination";
import NavbarTab from "../components/products/NavbarTab";
import { ALL_CATEGORIES } from "../constants/categories";

const TECH_STACKS = ["React", "Laravel", "Solidity", "Figma", "Node.js", "Flutter", "PHP"];
const ITEMS_PER_PAGE = 20;

// --- Skeleton Component ---
const SkeletonCard = () => (
  <div className="bg-app-surface rounded-none overflow-hidden border border-app-border animate-pulse h-[450px]">
    <div className="aspect-video bg-app-border" />
    <div className="p-5 space-y-4">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-app-border rounded" />
        <div className="h-3 w-12 bg-app-border rounded" />
      </div>
      <div className="h-6 w-full bg-app-border rounded" />
      <div className="h-4 w-2/3 bg-app-border rounded" />
    </div>
  </div>
);

export default function Products() {
  // --- State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [sidebarFilters, setSidebarFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    techStack: [] as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);

  // --- Fetch Data from API ---
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Objek parameter yang hanya berisi nilai valid
        const params: any = {
          sort: sortBy,
          minPrice: sidebarFilters.priceRange[0],
          maxPrice: sidebarFilters.priceRange[1],
          page: currentPage,
          limit: ITEMS_PER_PAGE
        };

        // Tambahkan filter hanya jika ada nilai yang relevan
        if (searchQuery.trim()) params.search = searchQuery;
        if (activeCategory !== "ALL") params.category = activeCategory;
        if (sidebarFilters.techStack.length > 0) params.techStack = sidebarFilters.techStack.join(',');

        const data = await productsService.fetchAllProducts(params);
        
        // Memastikan state selalu berupa array
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, activeCategory, sortBy, sidebarFilters, currentPage]);

  // --- Handlers ---
  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("ALL");
    setSortBy("newest");
    setSidebarFilters({ priceRange: [0, 1000], techStack: [] });
    setCurrentPage(1);
  };

  const toggleTechStack = (tech: string) => {
    setSidebarFilters((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <header className="mb-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-app-primary uppercase tracking-tighter">
              Digital <span className="text-app-accent">Marketplace</span>
            </h1>
          </div>
          <div className="space-y-6">
            <Search value={searchQuery} onChange={setSearchQuery} />
            <NavbarTab
              categories={ALL_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              priceRange={sidebarFilters.priceRange}
              onPriceChange={(val) => setSidebarFilters(prev => ({...prev, priceRange: [0, val]}))}
              techStacks={TECH_STACKS}
              selectedTech={sidebarFilters.techStack}
              onToggleTech={toggleTechStack}
              onReset={resetAllFilters}
            />
          </div>
        </header>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
             <div className="text-[10px] font-black uppercase tracking-widest text-app-secondary">
               Showing {products.length} results
             </div>
             <div className="flex items-center gap-3 bg-app-surface border border-app-border px-4 py-2">
               <ListFilter size={14} className="text-app-accent" />
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value as any)}
                 className="bg-transparent text-[10px] font-black uppercase tracking-widest text-app-primary outline-none"
               >
                 <option value="newest">Newest</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
               </select>
             </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ItemCard key={product.id} item={product} />
                  ))}
                </AnimatePresence>
              </div>
              <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
            </div>
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-app-border">
              <h3 className="text-xl font-black text-app-primary">No products found</h3>
              <button onClick={resetAllFilters} className="mt-4 bg-app-primary text-app-surface px-8 py-3 uppercase text-xs font-black">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}