'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="fixed w-full z-50 bg-primary dark:bg-dark-bg border-b border-gray-100 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-dark dark:text-white">
                Snipe<span className="text-secondary">On</span>Believe
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link dark:text-gray-300 dark:hover:text-secondary">
              Home
            </Link>
            <Link href="/dashboard" className="nav-link dark:text-gray-300 dark:hover:text-secondary">
              Dashboard
            </Link>
            <Link href="/whitepaper" className="nav-link dark:text-gray-300 dark:hover:text-secondary">
              Whitepaper
            </Link>
            <Link href="/analytics" className="nav-link dark:text-gray-300 dark:hover:text-secondary">
              Analytics
            </Link>
          </nav>
          
          {/* Theme Toggle */}
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              type="button"
              className="text-dark dark:text-white ml-3"
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
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link dark:text-gray-300 dark:hover:text-secondary"
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link dark:text-gray-300 dark:hover:text-secondary"
              >
                Dashboard
              </Link>
              <Link 
                href="/whitepaper" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link dark:text-gray-300 dark:hover:text-secondary"
              >
                Whitepaper
              </Link>
              <Link 
                href="/analytics" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-link dark:text-gray-300 dark:hover:text-secondary"
              >
                Analytics
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 