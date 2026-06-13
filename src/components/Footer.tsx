import { Twitter, Github, Send, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0F1035] text-white py-12 px-4 md:px-8 border-t border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-0 group cursor-pointer select-none">
              <div className="text-3xl md:text-4xl font-black tracking-tighter flex items-center">
                <span className="text-white transition-transform group-hover:scale-105">THEM</span>
                <span className="flex items-center transition-transform group-hover:scale-105">
                  <span className="text-[#D8B4FE]">Λ</span>
                  <span className="text-[#A855F7]">V</span>
                  <span className="text-[#3B82F6]">I</span>
                  <span className="text-[#22D3EE]">Λ</span>
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-medium">
              "The world's leading marketplace for premium digital assets. Empowering creators to build faster."
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-3 bg-white/5 hover:bg-app-accent hover:text-white rounded-lg transition-all duration-300 border border-white/10">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-app-accent hover:text-white rounded-lg transition-all duration-300 border border-white/10">
                <Send size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-app-accent hover:text-white rounded-lg transition-all duration-300 border border-white/10">
                <Github size={20} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-app-success">
              <span className="w-2 h-2 bg-app-success rounded-full animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
          
          {/* Column 2: Marketplace */}
          <div>
            <h4 className="font-black mb-4 uppercase text-xs tracking-[0.2em] text-white/40">EXPLORE ASSETS</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><Link to="/products?category=ui-templates" className="hover:text-app-accent transition-colors text-white/80">UI TEMPLATES</Link></li>
              <li><Link to="/products?category=scripts-plugins" className="hover:text-app-accent transition-colors text-white/80">SCRIPTS & PLUGINS</Link></li>
              <li><Link to="/products?category=graphics-icons" className="hover:text-app-accent transition-colors text-white/80">GRAPHICS & ICONS</Link></li>
              <li>
                <Link to="/bundles" className="flex items-center gap-2 text-app-accent hover:opacity-80 transition-opacity">
                  BUNDLES 
                  <span className="text-[9px] bg-app-accent text-white px-2 py-0.5 rounded-md font-black">SAVE 30%</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h4 className="font-black mb-4 uppercase text-xs tracking-[0.2em] text-white/40">DEVELOPER TOOLS</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><Link to="/documentation" className="hover:text-app-accent transition-colors text-white/80">DOCUMENTATION</Link></li>
              <li><Link to="/blog" className="hover:text-app-accent transition-colors text-white/80">BLOG</Link></li>
              <li><Link to="/faq" className="hover:text-app-accent transition-colors text-white/80">HELP CENTER / FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-app-accent transition-colors text-white/80">CONTACT US</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-black mb-4 uppercase text-xs tracking-[0.2em] text-white/40">COMPANY</h4>
            <ul className="space-y-2 text-sm font-bold">
              <li><Link to="/about" className="hover:text-app-accent transition-colors text-white/80">ABOUT US</Link></li>
              <li><Link to="/partnership" className="hover:text-app-accent transition-colors text-white/80">PARTNERSHIP</Link></li>
              <li><Link to="/privacy" className="hover:text-app-accent transition-colors text-white/80">PRIVACY POLICY</Link></li>
              <li><Link to="/terms" className="hover:text-app-accent transition-colors text-white/80">TERMS OF SERVICE</Link></li>
              <li><Link to="/license" className="hover:text-app-accent transition-colors text-white/80">LICENSE</Link></li>
            </ul>
          </div>
          
          {/* Column 5: Stay Updated */}
          <div className="space-y-4">
            <h4 className="font-black uppercase text-xs tracking-[0.2em] text-white/40">JOIN THEMAVIA</h4>
            <p className="text-white/60 text-sm font-medium">
              Get notified about new assets and exclusive weekly deals.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors text-white rounded-lg"
                />
              </div>
              <button className="w-full bg-app-accent text-white py-3 font-black uppercase text-xs tracking-widest hover:bg-app-brand-green transition-colors rounded-lg">
                SUBSCRIBE
              </button>
            </div>
            <div className="flex items-center gap-3 pt-2 opacity-50 grayscale hover:grayscale-0 transition-all">
              <CreditCard size={24} />
              <div className="flex gap-2 font-black italic text-xs">
                <span>PayPal</span>
                <span>VISA</span>
                <span>MASTERCARD</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
          <p>© 2026 THEMAVIA. BUILT FOR CREATORS.</p>
        </div>
      </div>
    </footer>
  );
}
