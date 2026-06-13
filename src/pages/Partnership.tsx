import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Handshake, Rocket, BarChart } from "lucide-react";

export default function Partnership() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black text-app-primary tracking-tighter uppercase leading-none">
              Grow with <br />
              <span className="text-app-accent">TEMAVIA</span>
            </h1>
            <p className="text-xl text-app-secondary font-medium leading-relaxed">
              Join our partnership program and unlock new opportunities for your business. We collaborate with agencies, influencers, and technology providers.
            </p>
            <button className="bg-app-primary text-app-surface px-10 py-4 font-black uppercase text-sm tracking-widest hover:opacity-90 transition-opacity">
              Apply Now
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Rocket />, title: "Accelerate", text: "Get early access to new tools and features." },
              { icon: <BarChart />, title: "Revenue", text: "Earn competitive commissions on referrals." },
              { icon: <Handshake />, title: "Support", text: "Dedicated account manager for partners." },
              { icon: <Handshake />, title: "Co-Marketing", text: "Featured spots on our platform and blog." },
            ].map((item, i) => (
              <div key={i} className="bg-app-surface p-8 border border-app-border space-y-3">
                <div className="text-app-accent">{item.icon}</div>
                <h3 className="text-sm font-black text-app-primary uppercase tracking-widest">{item.title}</h3>
                <p className="text-xs text-app-secondary font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
