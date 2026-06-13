import { useState, useEffect, useMemo } from "react";
import { RotateCcw, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { Product } from "../types/product";
import { productsService } from "../services/products";

// --- Sub-components ---
import Search from "../components/products/Search";
import Pagination from "../components/products/Pagination";
import NavbarTab from "../components/products/NavbarTab";
import { ListFilter } from "lucide-react";

import { PRODUCT_CATEGORIES, ALL_CATEGORIES } from "../constants/categories";

// --- Types ---
interface SidebarFilters {
  priceRange: [number, number];
  techStack: string[];
}

type SortOption = "newest" | "price-low" | "price-high";

const TECH_STACKS = ["React", "Laravel", "Solidity", "Figma", "Node.js", "Flutter", "PHP"];
const ITEMS_PER_PAGE = 20;

// --- Skeleton Component ---
const SkeletonCard = () => (
  <div className="bg-app-surface rounded-none overflow-hidden border border-app-border animate-pulse h-[450px]">
    <div className="aspect-[16/9] bg-app-border" />
    <div className="p-5 space-y-4">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-app-border rounded" />
        <div className="h-3 w-12 bg-app-border rounded" />
      </div>
      <div className="h-6 w-full bg-app-border rounded" />
      <div className="h-4 w-2/3 bg-app-border rounded" />
      <div className="flex gap-4">
        <div className="h-3 w-10 bg-app-border rounded" />
        <div className="h-3 w-16 bg-app-border rounded" />
      </div>
      <div className="pt-4 border-t border-app-border flex justify-between">
        <div className="h-8 w-16 bg-app-border rounded" />
        <div className="h-8 w-24 bg-app-border rounded-full" />
      </div>
    </div>
  </div>
);

export default function Products() {
  // --- State ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(ALL_CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [sidebarFilters, setSidebarFilters] = useState<SidebarFilters>({
    priceRange: [0, 1000],
    techStack: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await productsService.fetchAllProducts();
        if (fetchedProducts && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          // fallback to product service or mock dat if empty
          const fallback = await productsService.fetchAllProducts();
          setProducts(fallback);
        }
      } catch (error) {
        console.warn("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category Filter
    if (activeCategory !== "ALL") {
      result = result.filter((p) => {
        // Robust check capturing both category and category_id and ignoring dashes
        const cat = String((p as any).category || (p as any).category_id || p.categoryId || "");
        return cat.toUpperCase() === activeCategory || cat.toUpperCase().replace(/-/g, ' ') === activeCategory;
      });
    }

    // Tech Stack Filter
    if (sidebarFilters.techStack.length > 0) {
      result = result.filter((p) =>
        sidebarFilters.techStack.some(
          (tech) => 
            p.platform.toLowerCase() === tech.toLowerCase() ||
            p.tags?.some(tag => tag.toLowerCase() === tech.toLowerCase())
        )
      );
    }

    // Price Range Filter
    result = result.filter(
      (p) =>
        p.price >= sidebarFilters.priceRange[0] &&
        p.price <= sidebarFilters.priceRange[1]
    );

    // Sorting Logic
    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [products, searchQuery, activeCategory, sidebarFilters, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sidebarFilters, sortBy]);

  // --- Handlers ---
  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("ALL");
    setSortBy("newest");
    setSidebarFilters({
      priceRange: [0, 1000],
      techStack: [],
    });
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
    <div className="min-h-screen bg-app-bg font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header Area */}
        <header className="mb-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-app-primary tracking-tighter uppercase">
              Digital <span className="text-app-accent">Marketplace</span>
            </h1>
            <p className="text-app-secondary max-w-2xl mx-auto font-medium">
              Browse our collection of high-quality digital assets, scripts, and tools.
            </p>
          </div>

          <div className="space-y-6">
            <Search value={searchQuery} onChange={setSearchQuery} />
            <NavbarTab
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              priceRange={sidebarFilters.priceRange}
              onPriceChange={(value) => setSidebarFilters({ ...sidebarFilters, priceRange: [0, value] })}
              techStacks={TECH_STACKS}
              selectedTech={sidebarFilters.techStack}
              onToggleTech={toggleTechStack}
              onReset={resetAllFilters}
            />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[10px] font-black uppercase tracking-widest text-app-secondary">
                Showing <span className="text-app-primary">{paginatedProducts.length}</span> of <span className="text-app-primary">{filteredProducts.length}</span> results
              </div>
              <div className="flex items-center gap-3 bg-app-surface border border-app-border px-4 py-2 rounded-none shadow-sm">
                <ListFilter size={14} className="text-app-accent" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-app-primary outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {Array.isArray(paginatedProducts) ? paginatedProducts.map((product) => (
                      <ItemCard key={product.id} item={product} />
                    )) : null}
                  </AnimatePresence>
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-app-surface p-12 rounded-none border-2 border-dashed border-app-border text-center space-y-4"
              >
                <div className="w-16 h-16 bg-app-bg rounded-none flex items-center justify-center mx-auto text-app-secondary">
                  <SearchIcon size={32} />
                </div>
                <h3 className="text-xl font-black text-app-primary tracking-tight">No products found</h3>
                <p className="text-app-secondary font-medium max-w-xs mx-auto">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="bg-app-primary text-app-surface px-8 py-3 rounded-none font-black uppercase text-xs tracking-widest shadow-lg hover:scale-105 transition-transform"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
