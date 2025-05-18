'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import components without wallet dependencies
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TokenSection from '@/components/TokenSection';

// Dynamically import components with wallet dependencies
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Dashboard />
      <TokenSection />
      <Footer />
    </main>
  );
} 