import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Loader2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    setCheckoutError(null);
    
    try {
      // Create Checkout Intent
      const intentResponse = await fetch('/api/checkout/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity }))
        })
      });
      
      const text = await intentResponse.text();
      let intentData;
      try {
        intentData = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid API response format");
      }

      if (!intentResponse.ok) {
        throw new Error(intentData.message || 'Failed to create checkout intent');
      }

      // Capture intent
      const captureResponse = await fetch('/api/checkout/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intentId: intentData.id
        })
      });

      if (!captureResponse.ok) {
        throw new Error('Failed to capture checkout intent');
      }
      
      setCheckoutSuccess(true);
      setTimeout(() => {
        clearCart();
        closeCart();
        navigate('/dashboard/orders');
        setCheckoutSuccess(false);
      }, 2000);
      
    } catch (err: any) {
      setCheckoutError(err.message || 'Checkout failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#0F1035]/80 backdrop-blur-md z-[100]"
          />
          
          {/* Popup Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] bg-app-surface border border-app-border z-[101] flex flex-col shadow-2xl rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-app-border bg-app-bg/50">
              <h2 className="flex items-center gap-3 text-lg font-black uppercase tracking-widest text-app-primary">
                <ShoppingBag className="text-app-accent" />
                Your Cart
              </h2>
              <button 
                onClick={closeCart}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} className="text-app-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag size={48} className="text-app-secondary" />
                  <p className="text-xs font-black uppercase tracking-widest text-app-secondary">Cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-app-border rounded-xl bg-app-bg/20 group">
                      <div className="w-20 h-20 bg-app-bg rounded-lg border border-app-border flex items-center justify-center overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag className="text-app-secondary opacity-20" size={32} />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-widest text-app-secondary">{item.category || "Product"}</p>
                          <h3 className="text-sm font-bold text-app-primary leading-tight">{item.name}</h3>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded-md border border-app-border flex items-center justify-center hover:bg-white/5 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md border border-app-border flex items-center justify-center hover:bg-white/5"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-black text-app-accent">${(item.price * item.quantity).toFixed(2)}</p>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-app-secondary hover:text-app-danger transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-app-border bg-app-bg/80 space-y-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-app-secondary">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-app-primary text-lg">
                    <span>Total</span>
                    <span className="text-app-accent">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                {checkoutSuccess ? (
                  <div className="bg-app-success/10 text-app-success p-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                    Checkout Successful! Redirecting...
                  </div>
                ) : (
                  <div className="space-y-4">
                    {checkoutError && (
                      <p className="text-xs text-app-danger font-medium text-center">{checkoutError}</p>
                    )}
                    <button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-app-accent text-white py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} /> Checkout Now
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
