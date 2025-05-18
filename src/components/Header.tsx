'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import with error boundary fallback
const WalletButton = dynamic(() => import('./WalletButton'), { 
  ssr: false,
  loading: () => <button className="btn-primary">Connect Wallet</button>
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-primary border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-dark">
                Snipe<span className="text-secondary">On</span>Believe
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/#features" className="nav-link">
              Home
            </Link>
            <Link href="/#dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/whitepaper" className="nav-link">
              Whitepaper
            </Link>
            <Link href="/analytics" className="nav-link">
              Analytics
            </Link>
          </nav>
          
          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Suspense fallback={<button className="btn-primary">Connect Wallet</button>}>
              <WalletButton />
            </Suspense>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/#features" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
              >
                Home
              </Link>
              <Link 
                href="/#dashboard" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
              >
                Dashboard
              </Link>
              <Link 
                href="/whitepaper" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
              >
                Whitepaper
              </Link>
              <Link 
                href="/analytics" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
              >
                Analytics
              </Link>
              <div className="pt-2">
                <Suspense fallback={<button className="btn-primary w-full">Connect Wallet</button>}>
                  <WalletButton />
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 