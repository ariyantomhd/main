import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";

export default function License() {
  return (
    <div className="min-h-screen bg-app-bg font-sans selection:bg-app-accent/20 selection:text-app-accent transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <header className="text-center mb-16 space-y-4">
          <div className="w-20 h-20 mx-auto mb-6">
            <img 
              src="https://placehold.co/200x50/31343C/FFFFFF.png?text=LOGO" 
              alt="TEMAVIA" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-app-primary tracking-tighter uppercase">License Agreement</h1>
          <p className="text-app-secondary font-medium max-w-2xl mx-auto">
            Please read our license terms carefully before purchasing or using any of our digital assets.
          </p>
        </header>

        <div className="space-y-12">
          {/* Regular License */}
          <section className="bg-app-surface border-2 border-app-border p-8 md:p-12 rounded-none relative overflow-hidden group hover:border-app-accent transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 size={80} />
            </div>
            <h2 className="text-2xl font-black text-app-primary mb-6 uppercase tracking-tight">Regular License</h2>
            <div className="space-y-4 text-app-secondary font-medium leading-relaxed">
              <p>The Regular License allows you to use the item in one single end product which end users are not charged for.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-app-success shrink-0 mt-1" />
                  <span>Use in one single personal or commercial project.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-app-success shrink-0 mt-1" />
                  <span>Modify the item to suit your needs.</span>
                </li>
                <li className="flex items-start gap-3 text-app-accent">
                  <AlertCircle size={18} className="shrink-0 mt-1" />
                  <span>You cannot redistribute or resell the item as-is.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Extended License */}
          <section className="bg-app-surface border-2 border-app-border p-8 md:p-12 rounded-none relative overflow-hidden group hover:border-app-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield size={80} />
            </div>
            <h2 className="text-2xl font-black text-app-primary mb-6 uppercase tracking-tight">Extended License</h2>
            <div className="space-y-4 text-app-secondary font-medium leading-relaxed">
              <p>The Extended License allows you to use the item in one single end product which end users can be charged for (SaaS, marketplaces, etc.).</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-app-success shrink-0 mt-1" />
                  <span>Use in one single project where end users are charged.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-app-success shrink-0 mt-1" />
                  <span>Redistribution as part of a larger product is allowed.</span>
                </li>
                <li className="flex items-start gap-3 text-app-accent">
                  <AlertCircle size={18} className="shrink-0 mt-1" />
                  <span>You still cannot resell the item as a standalone asset.</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-16 p-8 bg-app-bg border-2 border-dashed border-app-border text-center">
          <p className="text-app-secondary text-sm font-bold uppercase tracking-widest">
            Need a custom license for your enterprise? 
            <a href="mailto:support@themavia.com" className="text-app-accent ml-2 hover:underline">Contact Us</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
