// src/components/product-detail/AffiliateBox.tsx
'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface AffiliateBoxProps {
  slug: string;
}

export default function AffiliateBox({ slug }: AffiliateBoxProps) {
  const [promoAffId, setPromoAffId] = useState('');
  const [isAffLinkCopied, setIsAffLinkCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateAffiliateLink = () => {
    setErrorMessage('');
    const cleanId = promoAffId.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    
    if (!cleanId) {
      setErrorMessage('Masukkan ID Afiliasi yang valid!');
      return;
    }

    // Format link afiliasi produk milik user
    const link = `${window.location.origin}/products/${slug}?ref=${cleanId}`;
    setGeneratedLink(link);
    
    navigator.clipboard.writeText(link).then(() => {
      setIsAffLinkCopied(true);
      setTimeout(() => setIsAffLinkCopied(false), 3000);
    });
  };

  return (
    <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wider font-mono flex items-center space-x-1.5">
          <Share2 className="h-3.5 w-3.5" />
          <span>Affiliate Program</span>
        </span>
        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 font-bold uppercase">
          Earn 20%
        </span>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed">
        Masukkan ID Afiliasi Anda yang telah disetujui untuk menghasilkan tracking link produk ini dan dapatkan komisi 20%.
      </p>

      <div className="space-y-2.5">
        <div>
          <input
            type="text"
            value={promoAffId}
            onChange={(e) => setPromoAffId(e.target.value)}
            placeholder="Masukkan ID Afiliasi Anda (contoh: user123)"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-mono"
          />
          {errorMessage && (
            <span className="text-[10px] text-red-500 mt-1 block font-medium">
              {errorMessage}
            </span>
          )}
        </div>

        <button
          onClick={handleGenerateAffiliateLink}
          className="w-full py-2.5 bg-slate-900 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center space-x-2 uppercase tracking-wider transition-colors cursor-pointer"
        >
          <Copy className="h-3.5 w-3.5" />
          <span>Generate & Copy Link</span>
        </button>
      </div>

      {generatedLink && (
        <div className="bg-slate-50 border border-slate-200 p-3 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
              {isAffLinkCopied && <Check className="h-3 w-3" />}
              <span>{isAffLinkCopied ? 'Link Copied to Clipboard!' : 'Affiliate Link Ready'}</span>
            </span>
          </div>
          <code className="text-[10px] font-mono break-all text-slate-800 block bg-white p-2 border border-slate-200 select-all">
            {generatedLink}
          </code>
        </div>
      )}
    </div>
  );
}