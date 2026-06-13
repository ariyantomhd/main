import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DollarSign, Users, BarChart3, Rocket, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Affiliate() {
  return (
    <div className="min-h-screen bg-app-bg font-sans transition-colors duration-300">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-4 overflow-hidden bg-app-primary text-app-surface">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-app-accent via-transparent to-transparent" />
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-app-accent/20 text-app-accent px-4 py-1 rounded-none border border-app-accent/30 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Zap size={12} /> Partner Program
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none"
            >
              Earn <span className="text-app-accent">30%</span> Commission <br />
              on Every Sale
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-app-surface/70 max-w-2xl mx-auto font-medium"
            >
              Join the TEMAVIA Affiliate Program and start earning by promoting the world's most elite digital assets.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8"
            >
              <Link 
                to="/dashboard/affiliate"
                className="inline-block bg-app-accent text-white px-12 py-4 rounded-none font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats/Benefits */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <DollarSign size={32} />, 
                title: "High Payouts", 
                desc: "Industry-leading 30% commission on all digital asset sales referred by you." 
              },
              { 
                icon: <Users size={32} />, 
                title: "60-Day Cookie", 
                desc: "We track referrals for 60 days, giving you more time to earn from your traffic." 
              },
              { 
                icon: <BarChart3 size={32} />, 
                title: "Real-time Tracking", 
                desc: "Access your own dashboard to track clicks, conversions, and earnings in real-time." 
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-app-surface p-10 border-2 border-app-primary shadow-xl space-y-6 group hover:border-app-accent transition-colors">
                <div className="text-app-accent group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-app-primary uppercase tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-app-secondary font-medium leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-app-surface border-y border-app-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-app-primary tracking-tighter uppercase">
                How It <span className="text-app-accent">Works</span>
              </h2>
              <p className="text-app-secondary font-medium uppercase tracking-widest text-xs">Three simple steps to start earning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-app-border -translate-y-1/2 z-0" />
              
              {[
                { step: "01", title: "Join", desc: "Sign up for free and get your unique affiliate link instantly." },
                { step: "02", title: "Promote", desc: "Share TEMAVIA assets with your audience via social media or blog." },
                { step: "03", title: "Earn", desc: "Get paid monthly for every successful referral you make." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-app-primary text-app-surface flex items-center justify-center text-3xl font-black border-4 border-app-accent shadow-xl">
                    {item.step}
                  </div>
                  <div className="bg-app-bg p-8 border border-app-border w-full">
                    <h3 className="text-xl font-black text-app-primary uppercase mb-2">{item.title}</h3>
                    <p className="text-sm text-app-secondary font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto bg-app-accent p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none relative z-10">
              Ready to build your <br />
              passive income?
            </h2>
            <p className="text-white/80 font-medium text-lg relative z-10">
              Join 5,000+ partners already earning with TEMAVIA.
            </p>
            <div className="pt-4 relative z-10">
              <Link 
                to="/dashboard/affiliate"
                className="bg-white text-app-accent px-12 py-4 rounded-none font-black uppercase text-sm tracking-widest hover:bg-app-primary hover:text-white transition-all flex items-center gap-3 mx-auto w-fit"
              >
                Apply to Program <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
