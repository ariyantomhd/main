import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, RotateCcw, Monitor, Bookmark, ThumbsUp } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/productdetail/Gallery";
import ProductHeader from "../components/productdetail/ProductHeader";
import PriceBox from "../components/productdetail/PriceBox";
import SpecsBox from "../components/productdetail/SpecsBox";
import ReferralBox from "../components/productdetail/ReferralBox";
import Describe from "../components/productdetail/Describe";
import Review from "../components/productdetail/Review";
import RelatedProducts from "../components/productdetail/RelatedProducts";
import { Product } from "../types/product";
import { productsService } from "../services/products";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(true);
  const [activeTab, setActiveTab] = useState<"describe" | "review">("describe");
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setIsLoading(true);
      try {
        const productData = await productsService.getProduct(id!);
        
        if (productData) {
          setProduct(productData);
          
          // Fetch related products
          const allProducts = await productsService.fetchAllProducts();
          const related = allProducts.filter(p => p.categoryId === productData.categoryId && p.id !== productData.id).slice(0, 4);
          setRelatedProducts(related.length > 0 ? related : allProducts.filter(p => p.id !== productData.id).slice(0, 4));
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error: any) {
        console.warn("Error fetching product:", error);
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndRelated();
  }, [id, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="animate-spin-slow text-app-accent">
          <RotateCcw size={48} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-black text-app-primary uppercase tracking-tight">Product Not Found</h2>
        <Link to="/products" className="text-app-accent font-black uppercase tracking-widest text-xs hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg font-sans transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-app-secondary hover:text-app-primary transition-colors font-black uppercase tracking-widest text-[10px] mb-8"
        >
          <ChevronLeft size={16} />
          Back to Marketplace
        </Link>

        {/* Product Header (Title, Category) */}
        <div className="mb-8">
          <ProductHeader product={product} />
        </div>

        {/* Features Tags (Above Gallery) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(product.tags && product.tags.length > 0 ? product.tags : ["Clean Codebase", "Fully Responsive", "Web3 Ready", "Tailwind CSS", "Modern UI/UX"]).map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-app-surface border border-app-border rounded-lg text-[10px] font-bold text-app-secondary uppercase tracking-widest hover:border-app-accent hover:text-app-primary transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery & Details (65%) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Container 1: Gallery & Action Buttons */}
            <div className="bg-app-surface border border-app-border rounded-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(30,27,75,0.25)]">
              <div className="p-6 md:p-8">
                <Gallery 
                  images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.previewUrl]} 
                  activeIndex={galleryIndex}
                  setActiveIndex={setGalleryIndex}
                  demoUrl={product.demoUrl}
                  likes={Math.floor(product.sales / 5)}
                />
              </div>
            </div>

            {/* Container 3: Tabbed Container for Describe & Review */}
            <div className="bg-app-surface border border-app-border rounded-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(30,27,75,0.25)]">
              {/* Tab Navigation */}
              <div className="flex border-b border-app-border bg-app-bg/5">
                <button
                  onClick={() => setActiveTab("describe")}
                  className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                    activeTab === "describe" 
                      ? "text-app-accent" 
                      : "text-app-secondary hover:text-app-primary"
                  }`}
                >
                  Description
                  {activeTab === "describe" && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                    activeTab === "review" 
                      ? "text-app-accent" 
                      : "text-app-secondary hover:text-app-primary"
                  }`}
                >
                  Reviews ({Math.floor(product.sales / 10)})
                  {activeTab === "review" && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent"
                    />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-12">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "describe" ? (
                    <Describe 
                      description={product.description} 
                    />
                  ) : (
                    <Review 
                      reviews={product.reviews || []} 
                      averageRating={product.rating} 
                      totalReviews={product.reviews?.length || Math.floor(product.sales / 10)} 
                    />
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Price & Info (35%) */}
          <div className="lg:col-span-4 space-y-8">
            <PriceBox product={product} />
            <SpecsBox product={product} />
            <ReferralBox productId={product.id} productName={product.name} />
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
}

