import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, CreditCard, AlertCircle, Loader2, ShoppingCart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "../../store/useUIStore";
import { useCartStore } from "../../store/useCartStore";
import { Product } from "../../types/product";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { api } from "../../lib/api";
import { paymentService } from "../../services/payment";

interface PriceBoxProps {
  product: Product;
}

export default function PriceBox({ product }: PriceBoxProps) {
  const { price, discountPrice } = product;
  const [licenseType, setLicenseType] = useState<'regular' | 'extended'>('regular');
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openJoinModal } = useUIStore();
  const addItem = useCartStore(state => state.addItem);

  const regularPrice = discountPrice || price;
  const extendedPrice = regularPrice * 4; 
  
  const currentPrice = licenseType === 'regular' ? regularPrice : extendedPrice;
  const displayPrice = isNaN(currentPrice) ? "0.00" : currentPrice.toFixed(2);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: `${product.name} (${licenseType})`,
      price: currentPrice,
      quantity: 1,
      image: product.previewUrl,
      category: product.categoryId
    });
  };

  const createOrder = async () => {
    if (!user) {
      openJoinModal();
      throw new Error("Auth required");
    }

    try {
      // Connects to the external Next.js Backend via paymentService
      const priceType = licenseType === 'extended' ? 'extended_price' : 'regular_price';
      const orderId = await paymentService.createPayPalOrder({
        productId: product.id,
        priceType
      });
      return orderId;
    } catch (err: any) {
      console.error("Error creating PayPal order:", err);
      setError("Failed to initialize payment. Is Next.js backend running?");
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    setIsProcessing(true);
    try {
      // Passes control to Next.js API to verify and update the database securely!
      const priceType = licenseType === 'extended' ? 'extended_price' : 'regular_price';
      const captureData = await paymentService.capturePayPalOrder({
        orderId: data.orderID,
        productId: product.id,
        priceType
      });

      if (captureData && captureData.success) {
        // Redirection after success!
        navigate('/dashboard/downloads');
      } else {
        throw new Error("Payment not completed");
      }
    } catch (err: any) {
      console.error("Error capturing PayPal order:", err);
      setError("Payment failed. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test" }}>
      <div className="bg-app-surface p-6 rounded-xl border border-app-border shadow-[0_20px_50px_-20_rgba(30,27,75,0.25)] space-y-6 relative overflow-hidden">
        {/* Auth Warning Toast */}
        {showAuthWarning && (
          <div className="absolute top-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-app-accent/10 backdrop-blur-md border border-app-accent/20 p-3 rounded-lg flex items-center gap-3 text-app-accent shadow-lg shadow-app-accent/5">
              <AlertCircle size={16} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Auth Required</p>
                <p className="text-[9px] font-medium opacity-80">Sign in to purchase.</p>
              </div>
              <button 
                onClick={openJoinModal}
                className="px-2 py-1 bg-app-accent text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* Price & License */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-app-primary tracking-tighter">
                ${displayPrice}
              </span>
              <span className="text-[10px] font-black text-app-secondary uppercase tracking-widest opacity-60">
                {licenseType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setLicenseType('regular')}
              className={`py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                licenseType === 'regular' 
                  ? 'bg-app-primary text-app-surface border-app-primary' 
                  : 'bg-transparent text-app-secondary border-app-border hover:border-app-primary'
              }`}
            >
              Regular
            </button>
            <button 
              onClick={() => setLicenseType('extended')}
              className={`py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                licenseType === 'extended' 
                  ? 'bg-app-primary text-app-surface border-app-primary' 
                  : 'bg-transparent text-app-secondary border-app-border hover:border-app-primary'
              }`}
            >
              Extended
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/license')}
              className="text-[9px] font-black uppercase tracking-widest text-app-accent hover:underline opacity-60"
            >
              View License Details
            </button>
          </div>
        </div>

        <div className="h-px bg-app-border w-full" />

        {/* Features - Compact */}
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-2 text-app-secondary">
            <CheckCircle2 size={14} className="text-app-success" />
            <span className="text-[11px] font-medium">Quality checked by PixieCode</span>
          </div>
          <div className="flex items-center gap-2 text-app-secondary">
            <CheckCircle2 size={14} className="text-app-success" />
            <span className="text-[11px] font-medium">Future updates included</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-app-secondary border-b border-app-border pb-2 mb-4">Purchase Now</h3>
          {error && (
            <div className="p-3 bg-app-danger/10 border border-app-danger/20 text-app-danger text-[10px] font-bold uppercase tracking-widest rounded-lg">
              {error}
            </div>
          )}

          <button 
             onClick={handleAddToCart}
             className="w-full bg-app-bg border border-app-border hover:border-app-accent hover:bg-app-accent/10 hover:text-app-primary text-app-secondary py-3.5 rounded-lg flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all mb-4"
          >
             <ShoppingCart size={16} /> Add to Cart
          </button>

          {isProcessing ? (
            <div className="w-full bg-app-bg border border-app-border py-4 rounded-lg flex flex-col items-center justify-center gap-2">
              <Loader2 size={20} className="text-app-accent animate-spin" />
              <span className="text-[9px] font-black uppercase tracking-widest text-app-secondary">Processing...</span>
            </div>
          ) : (
            <div className="relative z-0">
              <PayPalButtons 
                style={{ layout: "vertical", shape: "rect", label: "pay" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={() => setError("PayPal error. Please try again.")}
              />
            </div>
          )}
          
          <div className="flex items-center justify-center gap-2 text-app-success opacity-60">
            <ShieldCheck size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Money Back Guarantee</span>
          </div>
        </div>

        {/* Secure Checkout - Very Compact */}
        <div className="pt-4 border-t border-app-border flex items-center justify-between opacity-40">
          <p className="text-[8px] font-black uppercase tracking-widest">Secure Checkout</p>
          <div className="flex items-center gap-4 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" />
            <CreditCard size={14} />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
