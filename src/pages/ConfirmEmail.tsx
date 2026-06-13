import React from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-app-surface p-10 border border-app-border rounded-none shadow-2xl space-y-8"
        >
          <div className="w-20 h-20 bg-app-accent/10 text-app-accent rounded-none flex items-center justify-center mx-auto">
            <Mail size={40} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-app-primary tracking-tighter uppercase">Check Your Email</h1>
            <p className="text-app-secondary font-medium opacity-60">
              We've sent a confirmation link to your email address. Please click the link to verify your account.
            </p>
          </div>

          <div className="p-4 bg-app-bg border border-app-border rounded-none flex items-start gap-3 text-left">
            <CheckCircle2 size={18} className="text-app-success shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-app-secondary uppercase tracking-widest leading-relaxed">
              After confirmation, you will be automatically redirected to the marketplace.
            </p>
          </div>

          <div className="pt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-app-accent font-black uppercase tracking-widest text-xs hover:underline"
            >
              Return to Home
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
