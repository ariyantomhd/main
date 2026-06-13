import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Mail, Share2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ReferralBoxProps {
  productId: string;
  productName?: string;
}

export default function ReferralBox({ productId, productName = "Product" }: ReferralBoxProps) {
  const { profile, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/products/${productId}?ref=${profile?.username || 'guest'}`;

  const shareButtons = [
    { name: "Facebook", icon: <Facebook size={14} /> },
    { name: "Twitter", icon: <Twitter size={14} /> },
    { name: "Linkedin", icon: <Linkedin size={14} /> },
    { name: "Email", icon: <Mail size={14} /> },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Error copying or tracking link:", err);
    }
  };

  return (
    <div className="bg-app-surface border border-app-border rounded-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(30,27,75,0.25)]">
      <div className="px-6 py-4 bg-app-bg/5 border-b border-app-border flex items-center justify-between">
        <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-app-primary">
          Partner Program
        </h3>
        <Share2 size={16} className="text-app-secondary" />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-app-brand-green uppercase tracking-widest">Commission: 15%</p>
            <p className="text-[11px] text-app-secondary font-medium leading-relaxed uppercase tracking-tight">
              Earn money for every sale you refer to TEMAVIA.
            </p>
          </div>
          {!profile && (
            <Link 
              to="/affiliate" 
              className="inline-block bg-app-accent text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-sm rounded-lg"
            >
              Join Program
            </Link>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-[9px] font-black text-app-secondary uppercase tracking-[0.2em]">Quick Share</p>
          <div className="flex flex-wrap gap-2">
            {shareButtons.map((btn) => (
              <button
                key={btn.name}
                className="w-10 h-10 bg-app-bg border border-app-border flex items-center justify-center text-app-secondary hover:text-app-primary hover:border-app-accent transition-all rounded-lg"
                title={`Share on ${btn.name}`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[9px] font-black text-app-secondary uppercase tracking-[0.2em]">Your Unique Link</p>
          <div className="flex border border-app-border rounded-lg overflow-hidden">
            <input 
              type="text" 
              readOnly 
              value={referralLink}
              className="flex-1 bg-app-bg px-4 py-3 text-[10px] font-mono text-app-secondary outline-none min-w-0"
            />
            <button 
              onClick={copyToClipboard}
              className={`cursor-pointer px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-l border-app-border flex items-center gap-2 min-w-[100px] justify-center group ${
                copied 
                  ? "bg-app-success text-white" 
                  : "bg-app-primary text-app-surface hover:bg-app-accent hover:text-app-primary"
              }`}
            >
              {copied ? (
                <>
                  <Check size={12} />
                  Copied
                </>
              ) : (
                <span className="group-hover:scale-110 transition-transform">
                  Copy
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
