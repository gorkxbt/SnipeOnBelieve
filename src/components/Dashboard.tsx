import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { fakeHasMinimumTokens } from '../lib/tokenCheck';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('newPairs');
  const [hasAccessTokens, setHasAccessTokens] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlySnipingCount, setCurrentlySnipingCount] = useState(0);
  const [snipeSuccess, setSnipeSuccess] = useState({ count: 0, rate: '0%' });
  const [coinsMonitored, setCoinsMonitored] = useState(0);
  const wallet = useWallet();
  
  useEffect(() => {
    async function checkToken() {
      if (wallet.connected && wallet.publicKey) {
        try {
          setIsLoading(true);
          // For demo purposes, we're using the fake check
          // In production, this would be:
          // const hasTokens = await hasMinimumTokens(wallet.publicKey, connection);
          const hasTokens = await fakeHasMinimumTokens();
          setHasAccessTokens(hasTokens);
          
          // Set fake stats for demo
          if (hasTokens) {
            setCurrentlySnipingCount(3);
            setSnipeSuccess({ count: 17, rate: '85%' });
            setCoinsMonitored(42);
          }
        } catch (error) {
          console.error('Error checking tokens:', error);
          setHasAccessTokens(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setHasAccessTokens(false);
        setIsLoading(false);
      }
    }

    checkToken();
  }, [wallet.connected, wallet.publicKey]);
  
  const tokens = [
    {
      name: 'BelieverCoin',
      ticker: '$BLV',
      marketCap: '$125,000',
      contractAge: '2 hours',
      holders: '324',
      xFollowers: '5.2K',
      logo: '/images/placeholder.png',
      liquidity: '$42,500',
      pool: 'Raydium',
    },
    {
      name: 'SolBridge',
      ticker: '$SLBR',
      marketCap: '$345,000',
      contractAge: '5 hours',
      holders: '872',
      xFollowers: '12.7K',
      logo: '/images/placeholder.png',
      liquidity: '$78,000',
      pool: 'Meteora',
    },
    {
      name: 'Mintech Finance',
      ticker: '$MTF',
      marketCap: '$687,000',
      contractAge: '1 day',
      holders: '1,024',
      xFollowers: '8.9K',
      logo: '/images/placeholder.png',
      liquidity: '$112,000',
      pool: 'Raydium',
    },
    {
      name: 'SolRevolution',
      ticker: '$SOLR',
      marketCap: '$95,000',
      contractAge: '35 minutes',
      holders: '124',
      xFollowers: '3.2K',
      logo: '/images/placeholder.png',
      liquidity: '$32,000',
      pool: 'Meteora',
    },
    {
      name: 'BelieveSwap',
      ticker: '$BSWAP',
      marketCap: '$215,000',
      contractAge: '8 hours',
      holders: '482',
      xFollowers: '7.5K',
      logo: '/images/placeholder.png',
      liquidity: '$53,000',
      pool: 'Raydium',
    },
  ];
  
  const graduated = [
    {
      name: 'SolanaWave',
      ticker: '$WAVE',
      marketCap: '$4.2M',
      price: '$0.042',
      change: '+12.5%',
      logo: '/images/placeholder.png',
      volume: '$230K',
      txCount: '1.2K',
    },
    {
      name: 'BelieveDAO',
      ticker: '$BDAO',
      marketCap: '$8.7M',
      price: '$0.087',
      change: '+5.3%',
      logo: '/images/placeholder.png',
      volume: '$450K',
      txCount: '3.5K',
    },
    {
      name: 'SolMint',
      ticker: '$SLMT',
      marketCap: '$2.1M',
      price: '$0.021',
      change: '-2.1%',
      logo: '/images/placeholder.png',
      volume: '$115K',
      txCount: '0.9K',
    },
    {
      name: 'MeteoraPad',
      ticker: '$METEOR',
      marketCap: '$12.4M',
      price: '$0.124',
      change: '+8.7%',
      logo: '/images/placeholder.png',
      volume: '$775K',
      txCount: '5.2K',
    },
  ];

  // Mock active snipes data
  const activeSnipes = [
    {
      target: '@SolanaProject',
      type: 'X Account',
      amount: '0.5 SOL',
      slippage: '2.5%',
      status: 'Monitoring',
      created: '2 hours ago',
      priority: 'High',
    },
    {
      target: '$NEWTOKEN',
      type: 'Direct Snipe',
      amount: '0.2 SOL',
      slippage: '3.0%',
      status: 'Pending',
      created: '30 minutes ago',
      priority: 'Medium',
    },
    {
      target: '@BelieveDevs',
      type: 'X Account',
      amount: '0.75 SOL',
      slippage: '2.0%',
      status: 'Monitoring',
      created: '1 hour ago',
      priority: 'High',
    }
  ];
  
  return (
    <section id="dashboard" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Sniper Dashboard
          </h2>
        </div>
        
        {!wallet.connected ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-dark mb-4">Connect Your Wallet</h3>
            <p className="text-gray-600 mb-6">
              Connect your Solana wallet to access the sniping tools.
            </p>
            <button className="btn-primary" onClick={() => window.dispatchEvent(new Event('wallet-connect-click'))}>
              Connect Wallet
            </button>
          </div>
        ) : isLoading ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : !hasAccessTokens ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-dark mb-4">Insufficient $SOB Tokens</h3>
            <p className="text-gray-600 mb-6">
              You need at least 1,000 $SOB tokens to access the sniping tools.
            </p>
            <a href="https://raydium.io/swap/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buy $SOB Tokens
            </a>
          </div>
        ) : (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark">Currently Sniping</h3>
                  <span className="text-secondary text-2xl font-bold">{currentlySnipingCount}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Active monitoring jobs</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark">Success Rate</h3>
                  <div className="text-right">
                    <span className="text-secondary text-2xl font-bold">{snipeSuccess.rate}</span>
                    <span className="text-gray-500 text-sm ml-2">({snipeSuccess.count} snipes)</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2">Last 7 days performance</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark">Coins Monitored</h3>
                  <span className="text-secondary text-2xl font-bold">{coinsMonitored}</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Tracked in last 24 hours</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'newPairs'
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('newPairs')}
                >
                  New Pairs Feed
                </button>
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'active'
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('active')}
                >
                  Current Snipes
                </button>
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'sniper'
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('sniper')}
                >
                  Configure Sniper
                </button>
                <button
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'graduated'
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('graduated')}
                >
                  Graduated Coins
                </button>
              </div>
              
              {activeTab === 'newPairs' && (
                <div className="px-6 py-6 overflow-x-auto">
                  <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Market Cap</label>
                      <select className="bg-white border border-gray-300 rounded w-full p-2 text-sm">
                        <option>Any Market Cap</option>
                        <option>$0 - $100K</option>
                        <option>$100K - $500K</option>
                        <option>$500K - $1M</option>
                        <option>$1M+</option>
                      </select>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Contract Age</label>
                      <select className="bg-white border border-gray-300 rounded w-full p-2 text-sm">
                        <option>Any Age</option>
                        <option>Less than 1 hour</option>
                        <option>Less than 24 hours</option>
                        <option>Less than 7 days</option>
                      </select>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Holders</label>
                      <select className="bg-white border border-gray-300 rounded w-full p-2 text-sm">
                        <option>Any Holders</option>
                        <option>Less than 100</option>
                        <option>100 - 500</option>
                        <option>500 - 1,000</option>
                        <option>1,000+</option>
                      </select>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="block text-xs text-gray-500 mb-1">Liquidity Pool</label>
                      <select className="bg-white border border-gray-300 rounded w-full p-2 text-sm">
                        <option>Any Pool</option>
                        <option>Raydium</option>
                        <option>Meteora</option>
                        <option>Orca</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="pb-3 text-gray-500 font-medium">Token</th>
                          <th className="pb-3 text-gray-500 font-medium">Market Cap</th>
                          <th className="pb-3 text-gray-500 font-medium">Liquidity</th>
                          <th className="pb-3 text-gray-500 font-medium">Pool</th>
                          <th className="pb-3 text-gray-500 font-medium">Contract Age</th>
                          <th className="pb-3 text-gray-500 font-medium">Holders</th>
                          <th className="pb-3 text-gray-500 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tokens.map((token, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="py-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                                  {token.ticker.substring(1, 3)}
                                </div>
                                <div>
                                  <div className="font-medium text-dark">{token.name}</div>
                                  <div className="text-xs text-gray-500">{token.ticker}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-dark">{token.marketCap}</td>
                            <td className="py-4 text-dark">{token.liquidity}</td>
                            <td className="py-4 text-dark">{token.pool}</td>
                            <td className="py-4 text-dark">{token.contractAge}</td>
                            <td className="py-4 text-dark">{token.holders}</td>
                            <td className="py-4">
                              <button 
                                className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                                onClick={() => setActiveTab('sniper')}
                              >
                                Snipe
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 text-right">
                      <button className="text-secondary text-sm font-medium hover:underline">
                        Load More Tokens
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'graduated' && (
                <div className="px-6 py-6 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="pb-3 text-gray-500 font-medium">Token</th>
                        <th className="pb-3 text-gray-500 font-medium">Price</th>
                        <th className="pb-3 text-gray-500 font-medium">24h Change</th>
                        <th className="pb-3 text-gray-500 font-medium">Market Cap</th>
                        <th className="pb-3 text-gray-500 font-medium">24h Volume</th>
                        <th className="pb-3 text-gray-500 font-medium">Transactions</th>
                        <th className="pb-3 text-gray-500 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graduated.map((token, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                                {token.ticker.substring(1, 3)}
                              </div>
                              <div>
                                <div className="font-medium text-dark">{token.name}</div>
                                <div className="text-xs text-gray-500">{token.ticker}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-dark">{token.price}</td>
                          <td className="py-4">
                            <span className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                              {token.change}
                            </span>
                          </td>
                          <td className="py-4 text-dark">{token.marketCap}</td>
                          <td className="py-4 text-dark">{token.volume}</td>
                          <td className="py-4 text-dark">{token.txCount}</td>
                          <td className="py-4">
                            <a 
                              href={`https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=${token.ticker.substring(1)}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                            >
                              Trade
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'sniper' && (
                <div className="px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-bold text-dark mb-4">X Account Monitoring</h3>
                      <p className="text-gray-600 mb-4">Enter the handle of any X (Twitter) account. We will monitor this account for token deployment announcements or contract drops.</p>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">X Account Handle</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">@</span>
                          </div>
                          <input type="text" className="focus:ring-secondary focus:border-secondary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="solanaproject" />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Snipe (SOL)</label>
                        <input type="number" min="0.01" step="0.01" className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.1" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slippage Tolerance (%)</label>
                        <input type="number" min="0.1" max="100" step="0.1" className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="2.5" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border">
                          <option>Medium</option>
                          <option>High</option>
                          <option>Low</option>
                        </select>
                      </div>
                      
                      <button className="w-full btn-primary">Enable Monitoring</button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-bold text-dark mb-4">Direct Snipe by Ticker or Name</h3>
                      <p className="text-gray-600 mb-4">If you know the $ticker or name of an upcoming token, set up a snipe in advance. We'll monitor for the token's deployment.</p>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Token Ticker or Name</label>
                        <input type="text" className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="$EXAMPLE" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Snipe (SOL)</label>
                        <input type="number" min="0.01" step="0.01" className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="0.1" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slippage Tolerance (%)</label>
                        <input type="number" min="0.1" max="100" step="0.1" className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 rounded-md py-2 border" placeholder="2.5" />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gas Optimization</label>
                        <div className="mt-1 flex items-center space-x-4">
                          <span className="text-sm text-gray-700">Lower</span>
                          <input type="range" 
                            min="1" 
                            max="5" 
                            value="3" 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                          />
                          <span className="text-sm text-gray-700">Higher</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Higher gas ensures faster transaction execution</p>
                      </div>
                      
                      <button className="w-full btn-primary">Set Snipe</button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'active' && (
                <div className="px-6 py-6">
                  <h3 className="font-bold text-dark mb-4">Active Snipes</h3>
                  
                  {activeSnipes.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-gray-200">
                            <th className="pb-3 text-gray-500 font-medium">Target</th>
                            <th className="pb-3 text-gray-500 font-medium">Type</th>
                            <th className="pb-3 text-gray-500 font-medium">Amount</th>
                            <th className="pb-3 text-gray-500 font-medium">Slippage</th>
                            <th className="pb-3 text-gray-500 font-medium">Priority</th>
                            <th className="pb-3 text-gray-500 font-medium">Status</th>
                            <th className="pb-3 text-gray-500 font-medium">Created</th>
                            <th className="pb-3 text-gray-500 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSnipes.map((snipe, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                              <td className="py-4 text-dark">{snipe.target}</td>
                              <td className="py-4 text-dark">{snipe.type}</td>
                              <td className="py-4 text-dark">{snipe.amount}</td>
                              <td className="py-4 text-dark">{snipe.slippage}</td>
                              <td className="py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  snipe.priority === 'High' ? 'bg-red-100 text-red-800' : 
                                  snipe.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {snipe.priority}
                                </span>
                              </td>
                              <td className="py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary bg-opacity-10 text-secondary">
                                  {snipe.status}
                                </span>
                              </td>
                              <td className="py-4 text-gray-500 text-sm">{snipe.created}</td>
                              <td className="py-4">
                                <button className="text-red-500 hover:text-red-700 text-xs font-medium">
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                      <p className="text-gray-500">No active snipes. Configure a snipe to get started.</p>
                      <button 
                        className="mt-4 btn-primary"
                        onClick={() => setActiveTab('sniper')}
                      >
                        Configure Sniper
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard; 