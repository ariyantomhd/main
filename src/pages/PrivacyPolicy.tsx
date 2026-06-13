import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-app-surface p-12 border border-app-border space-y-12">
          <header className="space-y-4 border-b border-app-border pb-8">
            <h1 className="text-4xl md:text-5xl font-black text-app-primary tracking-tighter uppercase">Privacy Policy</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Last Updated: April 2026</p>
          </header>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">1. Information We Collect</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This may include your name, email address, and payment information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">2. How We Use Your Information</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you about your account and purchases.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black text-app-primary uppercase tracking-widest">3. Data Security</h2>
              <p className="text-app-secondary font-medium leading-relaxed">
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
