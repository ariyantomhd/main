import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-app-primary tracking-tighter uppercase leading-none">
                Get in <span className="text-app-accent">Touch</span>
              </h1>
              <p className="text-app-secondary font-medium max-w-md">
                Have a question or need assistance? Our team is here to help you with anything you need.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail />, label: "Email", value: "support@temavia.com" },
                { icon: <MessageSquare />, label: "Live Chat", value: "Available 24/7" },
                { icon: <MapPin />, label: "Office", value: "Elite Tower, Digital City" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-app-surface border border-app-border">
                  <div className="text-app-accent">{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">{item.label}</p>
                    <p className="text-sm font-black text-app-primary uppercase">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-app-surface p-10 border-4 border-app-primary shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Name</label>
                  <input type="text" className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Email</label>
                  <input type="email" className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Subject</label>
                <input type="text" className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Message</label>
                <textarea rows={5} className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors resize-none"></textarea>
              </div>
              <button className="w-full bg-app-primary text-app-surface py-4 font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
