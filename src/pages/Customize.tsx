import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { api } from "../lib/api";

export default function Customize() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "Web Development",
    details: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.custom.submitRequest(formData);

      setIsSuccess(true);
      setFormData({ fullName: "", email: "", projectType: "Web Development", details: "" });
    } catch (err: any) {
      console.warn("Error submitting request:", err);
      setError(err.message || "Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-app-primary mb-4 tracking-tighter uppercase">
            High-Ticket <span className="text-app-accent">Services</span>
          </h1>
          <p className="text-app-secondary max-w-2xl mx-auto font-medium">
            Need a custom solution? Our team of experts is ready to help you build your dream project.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-app-primary tracking-tight leading-tight">
              Why Choose Our <br />
              <span className="text-app-accent">Custom Services?</span>
            </h2>
            <p className="text-app-secondary font-medium leading-relaxed">
              We provide end-to-end solutions for businesses and individuals looking to build high-quality digital products. From design to deployment, we've got you covered.
            </p>
            <ul className="space-y-4">
              {[
                "Custom UI/UX Design",
                "Full-Stack Web Development",
                "Mobile App Development",
                "API Integration & Development",
                "Performance Optimization",
                "Ongoing Support & Maintenance",
              ].map((service) => (
                <li key={service} className="flex items-center gap-3 text-app-primary font-bold">
                  <CheckCircle className="text-app-success" size={20} />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-app-surface p-8 rounded-none border-4 border-app-primary shadow-2xl">
            <h3 className="text-2xl font-black text-app-primary mb-6 tracking-tight">Request a Quote</h3>
            
            {isSuccess ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-app-success/10 text-app-success rounded-none flex items-center justify-center mx-auto">
                  <CheckCircle size={48} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-app-primary uppercase tracking-tight">Request Sent!</h4>
                  <p className="text-app-secondary text-sm font-medium">We'll get back to you within 24-48 hours.</p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-app-accent font-black uppercase tracking-widest text-xs hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-app-danger/10 border border-app-danger/20 text-app-danger text-[10px] font-bold uppercase tracking-widest">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-app-bg border-2 border-app-border px-4 py-3 rounded-none text-app-primary outline-none focus:border-app-primary transition-colors font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com" 
                      className="w-full bg-app-bg border-2 border-app-border px-4 py-3 rounded-none text-app-primary outline-none focus:border-app-primary transition-colors font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Project Type</label>
                  <select 
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 rounded-none text-app-primary outline-none focus:border-app-primary transition-colors font-bold"
                  >
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Project Details</label>
                  <textarea 
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Tell us about your project..." 
                    rows={4}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 rounded-none text-app-primary outline-none focus:border-app-primary transition-colors font-bold resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-app-primary text-app-surface py-4 rounded-none font-black uppercase text-xs tracking-widest shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {isLoading ? "Sending..." : "Send Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
