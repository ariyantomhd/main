import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-app-surface p-12 border border-app-border space-y-12">
          <header className="space-y-4 border-b border-app-border pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-app-primary tracking-tighter uppercase">Terms of Service</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Last Updated: April 2026</p>
          </header>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">1. Acceptance of Terms</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                By accessing or using TEMAVIA, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">2. Use License</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                Permission is granted to temporarily download one copy of the materials on TEMAVIA's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">3. Disclaimer</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                The materials on TEMAVIA's website are provided on an 'as is' basis. TEMAVIA makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
