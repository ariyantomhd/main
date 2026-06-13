import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";

import { useAffiliate } from "./hooks/useAffiliate";
import JoinModal from "./components/JoinModal";
import CartDrawer from "./components/cart/CartDrawer";
import { useUIStore } from "./store/useUIStore";

import { AuthProvider } from "./contexts/AuthContext";
import { BlogProvider } from "./components/BlogContext";

import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function AppContent() {
  useAffiliate(); // Initialize affiliate tracking
  const { isJoinModalOpen, closeJoinModal, theme } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Handle system theme changes dynamically
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/dashboard/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={closeJoinModal} 
      />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BlogProvider>
        <Router>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </Router>
      </BlogProvider>
    </HelmetProvider>
  );
}
