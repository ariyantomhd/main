// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan akses host/IP lokal untuk development HMR (mencegah blocked cross-origin request)
  allowedDevOrigins: ['192.168.56.1', 'localhost:3000'],

  // 🟢 Proxy semua API request dari Next.js ke Express Backend
  async rewrites() {
    // Ambil URL backend dari .env atau fallback ke port Express lokal (5000)
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.demo.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      // Domain Supabase Storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/**",
      },
      // Domain Flaticon CDN
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
      // Domain Pinterest CDN
      {
        protocol: "https",
        hostname: "*.pinterest.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.pinimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;