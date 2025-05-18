'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tokenomicsVisible, setTokenomicsVisible] = useState(false);
  const tokenomicsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state after component mounts to ensure animations run properly
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    // Optimized particle animation with reduced DOM operations
    const createParticles = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      // Create particles in batches for better performance
      const fragment = document.createDocumentFragment();
      const particleCount = Math.min(20, Math.floor((width * height) / 50000)); // Adaptive count based on screen size
      
      // Create new particles
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Random size - smaller particles for better performance
        const size = Math.random() * 4 + 2; // 2-6px
        
        // Random opacity
        const opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5
        
        // Style the particle
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity.toString();
        
        // Add the particle to the fragment
        fragment.appendChild(particle);
        
        // Schedule removal to prevent memory leaks
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      }
      
      // Add all particles at once to minimize DOM reflows
      container.appendChild(fragment);
      
      // Animate particles after a short delay to ensure they're in the DOM
      requestAnimationFrame(() => {
        const particles = container.querySelectorAll('.particle');
        particles.forEach(particle => {
          if (particle instanceof HTMLElement) {
            particle.style.transform = `translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px)`;
            particle.style.opacity = '0';
          }
        });
      });
    };
    
    // Initial creation with a slight delay to ensure component is fully mounted
    const initialTimer = setTimeout(createParticles, 500);
    
    // Create new particles less frequently to improve performance
    const interval = setInterval(createParticles, 4000);

    // Set up intersection observer for tokenomics section with higher threshold
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTokenomicsVisible(true);
          // Once triggered, disconnect to prevent unnecessary calculations
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (tokenomicsRef.current) {
      observer.observe(tokenomicsRef.current);
    }
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-light to-gray-50 dark:from-dark-bg dark:to-dark-surface relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-6 relative inline-block">
            Snipe<span className="text-secondary">On</span>Believe
            <div className={`absolute -bottom-2 w-full h-1 bg-secondary rounded-full transform scale-x-0 ${isLoaded ? 'animate-expand' : ''}`}></div>
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 ${isLoaded ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
            Advanced token sniping for Meteora pools on BelieveApp
          </p>
          <div className={`mt-10 flex flex-col sm:flex-row justify-center gap-4 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <Link href="/dashboard" className="btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Launch App
            </Link>
            <Link href="/whitepaper" className="btn-secondary transform transition-all duration-300 hover:scale-105">
              Documentation
            </Link>
          </div>
        </div>

        {/* Key features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              title: "Real-Time Sniping",
              description: "Instantly detect and snipe new Meteora pools on BelieveApp launchpad with market-leading execution speed.",
              delay: 200
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
              title: "Advanced Analytics",
              description: "Track performance, analyze token metrics, and make data-driven decisions with our comprehensive dashboard.",
              delay: 400
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
              title: "Secure & Private",
              description: "Your funds and data stay secure with non-custodial infrastructure and complete privacy protection.",
              delay: 600
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-dark-surface rounded-xl p-8 shadow-md border border-gray-100 dark:border-dark-border transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`} 
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className="text-secondary text-3xl mb-4 bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className={`bg-white dark:bg-dark-surface rounded-xl p-10 shadow-lg border border-gray-100 dark:border-dark-border mb-20 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-10 text-center relative inline-block">
            How It Works
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line - enhanced for better visibility */}
            <div className="hidden md:block absolute top-14 left-0 right-0 h-1 bg-secondary z-0" style={{ width: '80%', margin: '0 auto' }}></div>
            
            {/* Steps with staggered animation */}
            {[
              {
                number: 1,
                title: "Connect Wallet",
                description: "Link your Solana wallet and hold at least 1,000 $SOB tokens to access the platform."
              },
              {
                number: 2,
                title: "Configure Sniper",
                description: "Set up monitoring for X accounts or specific tokens from BelieveApp with your desired parameters."
              },
              {
                number: 3,
                title: "Auto-Snipe & Profit",
                description: "Our system automatically detects and snipes new Meteora pools according to your settings."
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative z-10" style={{ animationDelay: `${800 + index * 200}ms` }}>
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-secondary transform transition-all duration-300 hover:scale-110">
                  <span className="text-secondary font-bold text-2xl">{step.number}</span>
                </div>
                <h3 className="font-bold text-dark dark:text-white mb-3 text-xl">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tokenomics */}
        <div 
          ref={tokenomicsRef}
          className={`bg-white dark:bg-dark-surface rounded-xl p-10 shadow-lg border border-gray-100 dark:border-dark-border ${tokenomicsVisible ? 'animate-fadeIn' : 'opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-10 text-center">
            <span className="relative inline-block">
              $SOB Tokenomics
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-secondary rounded-full"></div>
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-dark dark:text-white mb-5 text-xl flex items-center">
                <span className="bg-secondary/10 text-secondary rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                Token Utility
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Platform access (minimum 1,000 $SOB)</span>
                </li>
                <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Governance voting rights</span>
                </li>
                <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Fee reductions (tiered by holdings)</span>
                </li>
                <li className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Revenue sharing to stakers</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-dark dark:text-white mb-5 text-xl flex items-center">
                <span className="bg-secondary/10 text-secondary rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Distribution Model
              </h3>
              <div className="rounded-xl p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 transform transition-all duration-500 hover:shadow-lg hover:from-secondary/10 hover:to-secondary/20">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-dark dark:text-white">Community</span>
                    <span className="text-secondary font-bold">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-secondary h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ 
                        width: tokenomicsVisible ? '100%' : '0%', 
                        transition: 'width 1.5s ease-out',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow-sm border border-gray-100 dark:border-dark-border">
                  <h4 className="font-medium text-dark dark:text-white mb-3 flex items-center">
                    <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Team Compensation
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    The SnipeOnBelieve team will be compensated exclusively through fees collected from the platform's operations, ensuring alignment with the community's success.
                  </p>
                  <div className="mt-4 flex items-center">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-medium">
                      100% PumpFun Bonding Curve
                    </span>
                  </div>
                </div>
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
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards 0.5s;
        }
      `}</style>
    </section>
  );
};

export default Home; 