'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/lib/ThemeContext';

interface TokenStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface TokenPair {
  baseToken?: {
    name?: string;
    symbol?: string;
    address?: string;
  };
  chainId?: string;
  pairAddress?: string;
  priceUsd?: string;
  priceChange?: {
    h24?: string;
  };
  volume?: {
    h24?: string;
  };
  liquidity?: {
    usd?: string;
  };
  dexId?: string;
  pairCreatedAt?: string;
}

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenPair[]>([]);
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('recent');
  
  const tokenStats: TokenStat[] = [
    { 
      label: 'Tokens Launched', 
      value: '127', 
      change: '+12%',
      icon: (
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: 'Total Market Cap', 
      value: '$14.7M', 
      change: '+8.3%',
      icon: (
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: 'Avg. Initial MCap', 
      value: '$112K', 
      change: '+5.1%',
      icon: (
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      label: 'Successful Snipes', 
      value: '1,249', 
      change: '+18.7%',
      icon: (
        <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  // Fetch data from Dexscreener API
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setIsLoading(true);
        // API for getting Solana tokens on major DEXes
        const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/meteora');
        const data = await response.json();
        
        // Get current time
        const currentTime = new Date();
        // One hour ago
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
        
        // Filter pairs that are on Solana Meteora and less than 1 hour old
        const recentPairs = data.pairs
          .filter((pair: TokenPair) => {
            // Check if it's a Meteora pool
            if (!pair.dexId?.toLowerCase().includes('meteora')) {
              return false;
            }
            
            // Check if timestamp is available
            if (!pair.pairCreatedAt) {
              return false;
            }
            
            // Convert timestamp to date and check if it's less than 1 hour old
            const pairCreatedAt = new Date(parseInt(pair.pairCreatedAt) * 1000);
            return pairCreatedAt >= oneHourAgo;
          })
          .sort((a: TokenPair, b: TokenPair) => {
            // Sort by creation time (newest first)
            const timeA = a.pairCreatedAt ? parseInt(a.pairCreatedAt) : 0;
            const timeB = b.pairCreatedAt ? parseInt(b.pairCreatedAt) : 0;
            return timeB - timeA;
          })
          .slice(0, 5);
        
        setTokenData(recentPairs);
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  // Format price to show only significant digits
  const formatPrice = (price: string | undefined): string => {
    if (!price) return 'N/A';
    const numPrice = parseFloat(price);
    if (numPrice < 0.0001) return '<$0.0001';
    return `$${numPrice.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 6 
    })}`;
  };

  // Generate fallback image URL
  const getAvatarUrl = (symbol: string | undefined): string => {
    return `https://ui-avatars.com/api/?name=${symbol || 'XX'}&background=21d55a&color=fff`;
  };

  return (
    <main className={`pt-24 pb-16 ${theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-white text-dark'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center relative">
          <div className="absolute right-0 top-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-black hover:bg-gray-900'} transition-colors`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'} mb-4`}>Analytics Dashboard</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Real-time insights into token performance on Solana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenStats.map((stat, index) => (
            <div 
              key={index} 
              className={`${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border transition-transform duration-300 hover:scale-105 hover:shadow-md`}
            >
              <div className="flex justify-between items-center mb-3">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                <div className="bg-secondary/10 rounded-full p-2">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>{stat.value}</p>
                <span className={`text-sm px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-green-500 bg-green-100/10' : 'text-red-500 bg-red-100/10'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100'} rounded-xl shadow-sm border overflow-hidden mb-12`}>
          <div className="flex border-b border-gray-200 dark:border-dark-border">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'recent'
                  ? 'text-secondary border-b-2 border-secondary'
                  : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`
              }`}
              onClick={() => setActiveTab('recent')}
            >
              Latest Tokens
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'trending'
                  ? 'text-secondary border-b-2 border-secondary'
                  : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`
              }`}
              onClick={() => setActiveTab('trending')}
            >
              Trending Coins
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                {activeTab === 'recent' ? 'Latest Meteora Pools (< 1 Hour)' : 'Trending on BelieveApp'}
              </h2>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse mr-2"></span>
                Live Data
              </span>
            </div>

            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                {tokenData.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left border-b ${theme === 'dark' ? 'border-dark-border' : 'border-gray-200'}`}>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Token</th>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Price</th>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>24h Change</th>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>24h Volume</th>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Liquidity</th>
                        <th className={`pb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tokenData.map((token, index) => (
                        <tr 
                          key={index} 
                          className={`border-b ${theme === 'dark' ? 'border-dark-border hover:bg-dark-surface/80' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                        >
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs overflow-hidden">
                                {token.baseToken?.symbol ? (
                                  <Image 
                                    src={getAvatarUrl(token.baseToken?.symbol)}
                                    alt={token.baseToken?.symbol || 'Token'}
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  'XX'
                                )}
                              </div>
                              <div>
                                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                                  {token.baseToken?.name || 'Unknown Token'}
                                </div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  ${token.baseToken?.symbol || 'XXX'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className={`py-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>{formatPrice(token.priceUsd)}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(token.priceChange?.h24 || '0') >= 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                              {token.priceChange?.h24 ? `${token.priceChange.h24}%` : 'N/A'}
                            </span>
                          </td>
                          <td className={`py-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                            ${parseFloat(token.volume?.h24 || '0').toLocaleString()}
                          </td>
                          <td className={`py-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                            ${parseFloat(token.liquidity?.usd || '0').toLocaleString()}
                          </td>
                          <td className="py-4">
                            <a 
                              href={`https://dexscreener.com/${token.chainId}/${token.pairAddress}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                            >
                              View Chart
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className={`py-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>No new Meteora pools created in the last hour. Check back later!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className={`${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Launch Volume</h2>
              <span className="px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">Live Chart</span>
            </div>
            <div className={`aspect-[16/9] ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg flex items-center justify-center overflow-hidden`}>
              <iframe 
                src={`https://dexscreener.com/solana/8USGdBsYNmHfUVyeQDYttPS97NM12MUHr1LtxKGRx3Tz/embed?v=${theme === 'dark' ? '1' : '8'}`}
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '8px' }} 
                title="Volume Chart"
              ></iframe>
            </div>
          </div>
          
          <div className={`${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Success Rate by Market Cap</h2>
              <span className="px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary">Live Chart</span>
            </div>
            <div className={`aspect-[16/9] ${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg flex items-center justify-center overflow-hidden`}>
              <iframe 
                src={`https://dexscreener.com/solana/5z9Az7RHQyEiiYgZjH1hp9p6UMBKJKKPqFTnEXPVF9Me/embed?v=${theme === 'dark' ? '1' : '8'}`}
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '8px' }} 
                title="Market Cap Chart"
              ></iframe>
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border mb-12`}>
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark'} mb-4`}>Key Insights</h2>
          
          <div className="space-y-4">
            <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md`}>
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                  <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Optimal Launch Time</h3>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} ml-8`}>
                Tokens launched between 14:00-18:00 UTC have shown 27% higher initial market cap on average.
              </p>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md`}>
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                  <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>X Followers Correlation</h3>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} ml-8`}>
                Projects with 10K+ X followers demonstrated 38% higher 30-day ROI compared to those with fewer followers.
              </p>
            </div>
            
            <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} p-4 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md`}>
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
                  <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Early Holder Retention</h3>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} ml-8`}>
                Tokens maintaining 80%+ of initial holders after 7 days showed 3x better 90-day performance.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/dashboard" 
            className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-medium py-2.5 px-6 rounded-full transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
} 