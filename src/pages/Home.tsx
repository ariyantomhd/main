import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStackTicker from "../components/TechStackTicker";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import { Star, TrendingUp, Zap, RotateCcw, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { productsService } from "../services/products";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<Product[]>([]);
  const [popularItems, setPopularItems] = useState<Product[]>([]);
  const [flashSaleItems, setFlashSaleItems] = useState<Product[]>([]);
  const [newItems, setNewItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        // Menggunakan getNewReleases() sesuai dengan definisi service Anda
        const [featured, popular, flashSale, newArrivals] = await Promise.all([
          productsService.getFeaturedProducts(),
          productsService.getPopularProducts(),
          productsService.getFlashSaleProducts(),
          productsService.getNewReleases(), 
        ]);
        
        setFeaturedItems(featured);
        setPopularItems(popular);
        setFlashSaleItems(flashSale);
        setNewItems(newArrivals);
      } catch (error) {
        console.warn("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-app-bg font-sans selection:bg-app-accent/20 selection:text-app-accent transition-colors duration-300">
      <Navbar />
      
      <Hero />
      
      <TechStackTicker />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RotateCcw size={48} className="animate-spin-slow text-app-accent" />
          </div>
        ) : (
          <>
            {/* New Releases Section */}
            <Section 
              title="New Releases" 
              icon={<Sparkles size={20} />} 
              items={newItems} 
              badgeType="NEW"
              viewAllLink="/products"
            />

            {/* Featured Section */}
            <Section 
              title="Featured Best Sellers" 
              icon={<Star size={20} />} 
              items={featuredItems} 
              badgeType="FEATURED"
              viewAllLink="/products"
            />

            {/* Flash Sale Section */}
            <Section 
              title="Weekly Flash Deals" 
              icon={<Zap size={20} />} 
              items={flashSaleItems} 
              badgeType="SALE"
              viewAllLink="/products"
              extraHeader={<CountdownTimer />}
            />
            
            {/* Trending Section */}
            <Section 
              title="Trending Now" 
              icon={<TrendingUp size={20} />} 
              items={popularItems} 
              badgeType="TRENDING"
              viewAllLink="/products"
            />
            
            {/* Why Choose Us Section */}
            <div className="mt-24 mb-16 px-4 py-16 bg-app-surface rounded-2xl border border-app-border text-center">
              <h2 className="text-3xl font-black text-app-primary mb-12">Why Choose TheMavia Marketplace?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-app-accent/10 text-app-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-app-primary">Quality Checked</h3>
                  <p className="text-app-secondary text-sm">Every template, plugin, and script is rigorously reviewed to meet our high-quality standards.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-app-brand-gold/10 text-app-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-app-primary">Fast & Easy Setup</h3>
                  <p className="text-app-secondary text-sm">Clear documentation and clean code means you can launch your project in minutes, not days.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-app-brand-green/10 text-app-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-app-primary">Community Driven</h3>
                  <p className="text-app-secondary text-sm">Join a growing community of creators and developers. Regular updates and top-tier support.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}