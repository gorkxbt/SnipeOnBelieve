'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import components without wallet dependencies
import Hero from '@/components/Hero';

// Dynamically import components with wallet dependencies
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const WalletProviderWrapper = dynamic(() => import('@/components/ClientWalletProvider'), { ssr: false });

export default function Home() {
  // State to track if we're on client side
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render wallet-dependent components when on client
  if (!isMounted) {
    return (
      <main className="min-h-screen">
        <div className="h-16 bg-primary" /> {/* Placeholder for header */}
        <Hero />
        <div className="py-20 bg-dark" /> {/* Placeholder for dashboard */}
        <div className="py-12 bg-primary" /> {/* Placeholder for footer */}
      </main>
    );
  }

  return (
    <WalletProviderWrapper>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Dashboard />
        <Footer />
      </main>
    </WalletProviderWrapper>
  );
} 