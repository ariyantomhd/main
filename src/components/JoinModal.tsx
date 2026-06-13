import { authService } from "../services/auth";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, ArrowRight, Loader2, CheckCircle2, User, Eye, EyeOff, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  }, [password]);

  const strengthLabel = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong", "Elite"];
  const strengthColor = ["bg-app-danger", "bg-app-danger", "bg-app-warning", "bg-app-success", "bg-app-success", "bg-app-accent"];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (activeTab === "signup") {
      if (username.length < 3) {
        setError("Username must be at least 3 characters long.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }
      if (!agreeTerms) {
        setError("You must agree to the terms and privacy policy.");
        setIsLoading(false);
        return;
      }
    }

    try {
      console.log("Starting auth process...", { activeTab, email });
      
      if (activeTab === "signin") {
        await authService.loginUser({ email, password });
      } else {
        await authService.registerUser({ email, password, username });
      }

      onClose();
      if (activeTab === "signup") {
        navigate("/confirm-email");
      } else {
        // Trigger a refresh/reload so auth context updates
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let message = err.message || "An error occurred during authentication.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google') => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Demo logic for OAuth
      console.log('Initiating OAuth login with', provider);
      await authService.loginUser({ email: "demo@example.com", password: "password" });
      onClose();
      window.location.reload();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      let message = err.message || "An error occurred during Google authentication.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-app-surface border border-app-border rounded-none shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-app-secondary hover:text-app-primary transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Tabs */}
          <div className="flex border-b border-app-border">
            <button 
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                activeTab === "signin" ? "text-app-accent" : "text-app-secondary hover:text-app-primary"
              }`}
            >
              Sign In
              {activeTab === "signin" && (
                <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${
                activeTab === "signup" ? "text-app-accent" : "text-app-secondary hover:text-app-primary"
              }`}
            >
              Sign Up
              {activeTab === "signup" && (
                <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-1 bg-app-accent" />
              )}
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-0 select-none">
                <div className="text-3xl md:text-4xl font-black tracking-tighter flex items-center">
                  <span className="text-app-primary">THEM</span>
                  <span className="flex items-center">
                    <span className="text-[#D8B4FE]">Λ</span>
                    <span className="text-[#A855F7]">V</span>
                    <span className="text-[#3B82F6]">I</span>
                    <span className="text-[#22D3EE]">Λ</span>
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-app-primary tracking-tighter uppercase">
                  {activeTab === "signin" ? "Welcome Back" : "Join the Elite"}
                </h2>
                <p className="text-[10px] font-bold text-app-secondary uppercase tracking-widest opacity-60">
                  {activeTab === "signin" 
                    ? "Access your premium assets and tools." 
                    : "Start your journey with the best digital assets."}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-app-danger/10 border border-app-danger/20 text-app-danger text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <X size={14} />
                {error}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {activeTab === "signup" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="elite_creator"
                      className="w-full bg-app-bg border-2 border-app-border px-12 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-app-bg border-2 border-app-border px-12 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-app-bg border-2 border-app-border px-12 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-app-secondary hover:text-app-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {activeTab === "signup" && password && (
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                      <span className="text-app-secondary">Strength</span>
                      <span className={strengthColor[passwordStrength].replace('bg-', 'text-')}>{strengthLabel[passwordStrength]}</span>
                    </div>
                    <div className="flex gap-1 h-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 transition-all duration-500 ${
                            i < passwordStrength ? strengthColor[passwordStrength] : "bg-app-border"
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {activeTab === "signup" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-app-secondary" size={18} />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-app-bg border-2 border-app-border px-12 py-3 text-sm font-bold outline-none focus:border-app-accent transition-colors"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-app-secondary hover:text-app-primary transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <div className="w-4 h-4 border-2 border-app-border peer-checked:border-app-accent peer-checked:bg-app-accent transition-all" />
                      <Check size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-bold text-app-secondary uppercase tracking-widest leading-relaxed group-hover:text-app-primary transition-colors">
                      I agree to the <span className="text-app-accent underline">Terms of Service</span> and <span className="text-app-accent underline">Privacy Policy</span>
                    </span>
                  </label>
                </>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-app-primary text-app-surface py-4 rounded-none font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : (activeTab === "signin" ? "Sign In" : "Create Account")}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-app-border"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-app-surface px-4 text-app-secondary">Or continue with</span>
              </div>
            </div>

            <button 
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-3 py-4 border-2 border-app-border hover:border-app-primary transition-all font-black uppercase text-[10px] tracking-widest"
            >
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-[9px] font-bold text-app-secondary text-center uppercase tracking-widest opacity-40">
              {activeTab === "signin" ? "Don't have an account?" : "Already have an account?"} 
              <button 
                onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                className="ml-1 text-app-accent hover:underline"
              >
                {activeTab === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
