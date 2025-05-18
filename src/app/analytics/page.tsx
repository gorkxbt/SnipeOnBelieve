'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TokenStat {
  label: string;
  value: string;
  change: string;
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
}

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenData, setTokenData] = useState<TokenPair[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStat[]>([
    { label: 'Tokens Launched', value: '127', change: '+12%' },
    { label: 'Total Market Cap', value: '$14.7M', change: '+8.3%' },
    { label: 'Avg. Initial MCap', value: '$112K', change: '+5.1%' },
    { label: 'Successful Snipes', value: '1,249', change: '+18.7%' },
  ]);

  // Fetch data from Dexscreener API
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setIsLoading(true);
        // API for getting Solana tokens on major DEXes
        const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112');
        const data = await response.json();
        
        // Sort pairs by liquidity
        const sortedPairs = data.pairs
          .filter((pair: TokenPair) => pair.chainId === 'solana')
          .sort((a: TokenPair, b: TokenPair) => parseFloat(b.liquidity?.usd || '0') - parseFloat(a.liquidity?.usd || '0'))
          .slice(0, 5);
        
        setTokenData(sortedPairs);
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

  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Analytics Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Real-time insights into token performance on Solana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tokenStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-2xl font-bold text-dark">{stat.value}</p>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xl font-bold text-dark mb-4">Top Solana Tokens</h2>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-3 text-gray-500 font-medium">Token</th>
                    <th className="pb-3 text-gray-500 font-medium">Price</th>
                    <th className="pb-3 text-gray-500 font-medium">24h Change</th>
                    <th className="pb-3 text-gray-500 font-medium">24h Volume</th>
                    <th className="pb-3 text-gray-500 font-medium">Liquidity</th>
                    <th className="pb-3 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenData.map((token, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs overflow-hidden">
                            {token.baseToken && token.baseToken.address && token.baseToken.symbol ? (
                              <Image 
                                src={`https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${token.baseToken.address}/logo.png`}
                                alt={token.baseToken.symbol}
                                width={32}
                                height={32}
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${token.baseToken.symbol}&background=21d55a&color=fff`;
                                }}
                              />
                            ) : (
                              token.baseToken?.symbol?.substring(0, 2) || 'XX'
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-dark">{token.baseToken?.name || 'Unknown Token'}</div>
                            <div className="text-xs text-gray-500">${token.baseToken?.symbol || 'XXX'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-dark">{formatPrice(token.priceUsd)}</td>
                      <td className="py-4">
                        <span className={parseFloat(token.priceChange?.h24 || '0') >= 0 ? 'text-green-500' : 'text-red-500'}>
                          {token.priceChange?.h24 ? `${token.priceChange.h24}%` : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 text-dark">${parseFloat(token.volume?.h24 || '0').toLocaleString()}</td>
                      <td className="py-4 text-dark">${parseFloat(token.liquidity?.usd || '0').toLocaleString()}</td>
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
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-dark mb-4">Launch Volume</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <iframe 
                src="https://dexscreener.com/solana/8USGdBsYNmHfUVyeQDYttPS97NM12MUHr1LtxKGRx3Tz/embed?v=8" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '8px' }} 
                title="Volume Chart"
              ></iframe>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-dark mb-4">Success Rate by Market Cap</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <iframe 
                src="https://dexscreener.com/solana/5z9Az7RHQyEiiYgZjH1hp9p6UMBKJKKPqFTnEXPVF9Me/embed?v=8" 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '8px' }} 
                title="Market Cap Chart"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xl font-bold text-dark mb-4">Key Insights</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark mb-1">Optimal Launch Time</h3>
              <p className="text-gray-600">
                Tokens launched between 14:00-18:00 UTC have shown 27% higher initial market cap on average.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark mb-1">X Followers Correlation</h3>
              <p className="text-gray-600">
                Projects with 10K+ X followers demonstrated 38% higher 30-day ROI compared to those with fewer followers.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark mb-1">Early Holder Retention</h3>
              <p className="text-gray-600">
                Tokens maintaining 80%+ of initial holders after 7 days showed 3x better 90-day performance.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 