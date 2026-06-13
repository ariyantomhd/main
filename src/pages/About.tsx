import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Target, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-app-primary tracking-tighter uppercase leading-none">
            Empowering <br />
            <span className="text-app-accent">Digital Creators</span>
          </h1>
          <p className="text-xl text-app-secondary font-medium leading-relaxed">
            TEMAVIA is the world's leading marketplace for premium digital assets. We provide high-quality scripts, themes, and plugins to help developers and designers build faster and better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target />, title: "Our Mission", text: "To democratize high-end design and development tools for everyone." },
            { icon: <Users />, title: "Our Community", text: "A global network of elite creators and innovative developers." },
            { icon: <Shield />, title: "Our Quality", text: "Every asset is manually reviewed to ensure it meets our elite standards." },
          ].map((item, i) => (
            <div key={i} className="bg-app-surface p-10 border border-app-border text-center space-y-4">
              <div className="flex justify-center text-app-accent">{item.icon}</div>
              <h3 className="text-xl font-black text-app-primary uppercase tracking-tight">{item.title}</h3>
              <p className="text-app-secondary font-medium text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
