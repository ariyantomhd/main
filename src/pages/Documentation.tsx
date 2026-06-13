import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Book, Search, ChevronRight } from "lucide-react";

export default function Documentation() {
  const sections = [
    { title: "Getting Started", items: ["Introduction", "Installation", "Quick Start Guide"] },
    { title: "UI Templates", items: ["Structure", "Customization", "Best Practices"] },
    { title: "Scripts & Plugins", items: ["Integration", "API Reference", "Troubleshooting"] },
  ];

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm font-bold text-app-primary hover:text-app-accent transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
          
          <div className="flex-1 space-y-12">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-app-accent">
                <Book size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Documentation</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-app-primary tracking-tighter uppercase leading-none">
                Build Faster with <br />
                <span className="text-app-accent">TEMAVIA Assets</span>
              </h1>
              <div className="relative max-w-xl pt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="w-full bg-app-surface border-2 border-app-border px-12 py-4 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                />
              </div>
            </header>

            <div className="prose prose-invert max-w-none space-y-8">
              <section className="bg-app-surface p-8 border border-app-border">
                <h2 className="text-2xl font-black text-app-primary uppercase tracking-tight mb-4">Introduction</h2>
                <p className="text-app-secondary font-medium leading-relaxed">
                  Welcome to the official TEMAVIA documentation. Here you'll find everything you need to get started with our premium digital assets, from UI kits to complex scripts.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
