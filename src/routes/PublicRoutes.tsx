import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Bundles from "../pages/Bundles";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Customize from "../pages/Customize";
import License from "../pages/License";
import ConfirmEmail from "../pages/ConfirmEmail";
import Documentation from "../pages/Documentation";
import FAQ from "../pages/FAQ";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Partnership from "../pages/Partnership";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import Affiliate from "../pages/Affiliate";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/bundles" element={<Bundles />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/license" element={<License />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/affiliate" element={<Affiliate />} />
    </Routes>
  );
}
