// src/app/layout.tsx
'use client';

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { UserProvider } from "@/providers/UserContext";
import { CartProvider } from "@/providers/CartContext";
import { StoreProvider } from "@/providers/StoreContext";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <CartProvider>
              <StoreProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <CookieBanner />
              </StoreProvider>
            </CartProvider>
          </UserProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}