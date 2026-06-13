import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { Zap, Star } from "lucide-react";

// Mock data for bundles
const bundles = [
  {
    id: "b1",
    name: "Full-Stack SaaS Bundle",
    description: "Get everything you need to launch your SaaS in one package.",
    categoryId: "Bundle",
    tags: ["SaaS", "Full-Stack"],
    previewUrl: "https://picsum.photos/seed/bundle1/800/450",
    price: 199,
    rating: 5.0,
    sales: 450,
    version: "1.0.0",
    platform: "React/Node.js",
    demoUrl: "#",
    files: [{ name: "saas-bundle.zip", url: "#" }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "b2",
    name: "Design & Development Kit",
    description: "A perfect blend of UI kits and development tools.",
    categoryId: "Bundle",
    tags: ["Design", "Development"],
    previewUrl: "https://picsum.photos/seed/bundle2/800/450",
    price: 149,
    rating: 4.8,
    sales: 320,
    version: "2.0.0",
    platform: "React",
    demoUrl: "#",
    files: [{ name: "design-dev-kit.zip", url: "#" }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Bundles() {
  return (
    <div className="min-h-screen bg-app-bg font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-app-primary mb-4 tracking-tighter uppercase">
            Special <span className="text-app-warning">Bundles</span>
          </h1>
          <p className="text-app-secondary max-w-2xl mx-auto font-medium">
            Save big with our curated bundles. Get more value for less.
          </p>
        </header>

        <Section 
          title="Hot Bundles" 
          icon={<Zap size={20} />} 
          items={bundles} 
          viewAllLink="#"
        />
        
        <Section 
          title="Featured Bundles" 
          icon={<Star size={20} />} 
          items={bundles.slice().reverse()} 
          viewAllLink="#"
        />
      </main>

      <Footer />
    </div>
  );
}
