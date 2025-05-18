'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create animated background
    const createParticles = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      // Clear existing particles
      const existingParticles = container.querySelectorAll('.particle');
      existingParticles.forEach(p => p.remove());
      
      // Create new particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Random size
        const size = Math.random() * 6 + 2; // 2-8px
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
        
        // Style the particle
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity.toString();
        
        // Add the particle to the container
        container.appendChild(particle);
        
        // Animate the particle
        setTimeout(() => {
          particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
          particle.style.opacity = '0';
        }, 100);
        
        // Remove the particle after animation
        setTimeout(() => {
          particle.remove();
        }, 5000);
      }
    };
    
    // Initial creation
    createParticles();
    
    // Recreate particles every 3 seconds
    const interval = setInterval(createParticles, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-light to-gray-50 dark:from-dark-bg dark:to-dark-surface relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6">
            Snipe<span className="text-secondary">On</span>Believe
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced token sniping for Meteora pools on BelieveApp
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard" className="btn-primary">
              Launch App
            </Link>
            <Link href="/whitepaper" className="btn-secondary">
              Documentation
            </Link>
          </div>
        </div>

        {/* Key features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <div className="text-secondary text-3xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Real-Time Sniping</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Instantly detect and snipe new Meteora pools on BelieveApp launchpad with market-leading execution speed.
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <div className="text-secondary text-3xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track performance, analyze token metrics, and make data-driven decisions with our comprehensive dashboard.
            </p>
          </div>
          
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fadeIn" style={{ animationDelay: '600ms' }}>
            <div className="text-secondary text-3xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your funds and data stay secure with non-custodial infrastructure and complete privacy protection.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm border border-gray-100 dark:border-dark-border mb-16 animate-fadeIn" style={{ animationDelay: '800ms' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-dark dark:text-white mb-2">Connect Wallet</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Link your Solana wallet and hold at least 1,000 $SOB tokens to access the platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-dark dark:text-white mb-2">Configure Sniper</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Set up monitoring for X accounts or specific tokens from BelieveApp with your desired parameters.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-dark dark:text-white mb-2">Auto-Snipe & Profit</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our system automatically detects and snipes new Meteora pools according to your settings.
              </p>
            </div>
          </div>
        </div>

        {/* Tokenomics */}
        <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm border border-gray-100 dark:border-dark-border animate-fadeIn" style={{ animationDelay: '1000ms' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-6 text-center">$SOB Tokenomics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-dark dark:text-white mb-3">Token Utility</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Platform access (minimum 1,000 $SOB)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Governance voting rights</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fee reductions (tiered by holdings)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Revenue sharing to stakers</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-dark dark:text-white mb-3">Distribution Model</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                100% bonding curve allocation on Pumpfun with team funded by platform fees.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark dark:text-white">Community</span>
                    <span className="text-dark dark:text-white">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  The SnipeOnBelieve team will be compensated exclusively through fees collected from the platform's operations, ensuring alignment with the community's success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background styles */}
      <style jsx>{`
        .particle {
          position: absolute;
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 213, 90, 0.1)'};
          border-radius: 50%;
          pointer-events: none;
          transition: transform 5s ease-out, opacity 5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Home; 