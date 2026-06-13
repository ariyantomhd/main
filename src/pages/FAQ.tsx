import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    { q: "How do I download my purchased items?", a: "Once your payment is confirmed, you can access your downloads from your account dashboard under the 'Downloads' section." },
    { q: "What is the difference between Regular and Extended licenses?", a: "A Regular License allows use in a single end product. An Extended License allows use in an end product that is sold to end users." },
    { q: "Do you offer refunds?", a: "Due to the digital nature of our products, we generally do not offer refunds unless the item is broken or doesn't match the description." },
    { q: "Can I get support for the items I buy?", a: "Yes! Every item comes with 6 months of support from the creator. You can contact them directly through the item page." },
  ];

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <div className="p-3 bg-app-accent/10 text-app-accent rounded-none">
              <HelpCircle size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-app-primary tracking-tighter uppercase">Help Center & FAQ</h1>
          <p className="text-app-secondary font-medium">Everything you need to know about TEMAVIA.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-app-surface border border-app-border rounded-none overflow-hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="text-sm font-black uppercase tracking-widest text-app-primary">{faq.q}</span>
                <ChevronDown size={18} className="text-app-secondary group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-app-secondary font-medium text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
