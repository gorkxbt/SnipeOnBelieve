import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('newPairs');
  
  const tokens = [
    {
      name: 'BelieverCoin',
      ticker: '$BLV',
      marketCap: '$125,000',
      contractAge: '2 hours',
      holders: '324',
      xFollowers: '5.2K',
      logo: '/images/placeholder.png',
    },
    {
      name: 'SolBridge',
      ticker: '$SLBR',
      marketCap: '$345,000',
      contractAge: '5 hours',
      holders: '872',
      xFollowers: '12.7K',
      logo: '/images/placeholder.png',
    },
    {
      name: 'Mintech Finance',
      ticker: '$MTF',
      marketCap: '$687,000',
      contractAge: '1 day',
      holders: '1,024',
      xFollowers: '8.9K',
      logo: '/images/placeholder.png',
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
    },
    {
      name: 'BelieveDAO',
      ticker: '$BDAO',
      marketCap: '$8.7M',
      price: '$0.087',
      change: '+5.3%',
      logo: '/images/placeholder.png',
    },
    {
      name: 'SolMint',
      ticker: '$SLMT',
      marketCap: '$2.1M',
      price: '$0.021',
      change: '-2.1%',
      logo: '/images/placeholder.png',
    },
  ];
  
  return (
    <section id="dashboard" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            Dashboard <span className="text-secondary">Preview</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Get a glimpse of our powerful dashboard, your command center for all activity on BelieveApp.
          </p>
        </div>
        
        <div className="card overflow-hidden">
          <div className="flex border-b border-gray-800 mb-6">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'newPairs'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('newPairs')}
            >
              New Pairs Feed
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'graduated'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('graduated')}
            >
              Graduated Coins
            </button>
          </div>
          
          {activeTab === 'newPairs' && (
            <div>
              <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary rounded-lg p-3">
                  <label className="block text-xs text-gray-400 mb-1">Market Cap</label>
                  <select className="bg-dark border border-gray-700 rounded w-full p-2 text-sm">
                    <option>Any Market Cap</option>
                    <option>$0 - $100K</option>
                    <option>$100K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M+</option>
                  </select>
                </div>
                <div className="bg-primary rounded-lg p-3">
                  <label className="block text-xs text-gray-400 mb-1">Contract Age</label>
                  <select className="bg-dark border border-gray-700 rounded w-full p-2 text-sm">
                    <option>Any Age</option>
                    <option>Less than 1 hour</option>
                    <option>Less than 24 hours</option>
                    <option>Less than 7 days</option>
                  </select>
                </div>
                <div className="bg-primary rounded-lg p-3">
                  <label className="block text-xs text-gray-400 mb-1">Holders</label>
                  <select className="bg-dark border border-gray-700 rounded w-full p-2 text-sm">
                    <option>Any Holders</option>
                    <option>Less than 100</option>
                    <option>100 - 500</option>
                    <option>500 - 1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
                <div className="bg-primary rounded-lg p-3">
                  <label className="block text-xs text-gray-400 mb-1">X Followers</label>
                  <select className="bg-dark border border-gray-700 rounded w-full p-2 text-sm">
                    <option>Any Followers</option>
                    <option>Less than 1K</option>
                    <option>1K - 10K</option>
                    <option>10K - 100K</option>
                    <option>100K+</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-3 text-gray-400 font-medium">Token</th>
                      <th className="pb-3 text-gray-400 font-medium">Market Cap</th>
                      <th className="pb-3 text-gray-400 font-medium">Contract Age</th>
                      <th className="pb-3 text-gray-400 font-medium">Holders</th>
                      <th className="pb-3 text-gray-400 font-medium">X Followers</th>
                      <th className="pb-3 text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-primary/20 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                              {token.ticker.substring(1, 3)}
                            </div>
                            <div>
                              <div className="font-medium">{token.name}</div>
                              <div className="text-xs text-gray-400">{token.ticker}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{token.marketCap}</td>
                        <td className="py-4">{token.contractAge}</td>
                        <td className="py-4">{token.holders}</td>
                        <td className="py-4">{token.xFollowers}</td>
                        <td className="py-4">
                          <button className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all">
                            Snipe
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'graduated' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="pb-3 text-gray-400 font-medium">Token</th>
                    <th className="pb-3 text-gray-400 font-medium">Price</th>
                    <th className="pb-3 text-gray-400 font-medium">24h Change</th>
                    <th className="pb-3 text-gray-400 font-medium">Market Cap</th>
                    <th className="pb-3 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {graduated.map((token, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-primary/20 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                            {token.ticker.substring(1, 3)}
                          </div>
                          <div>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-xs text-gray-400">{token.ticker}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{token.price}</td>
                      <td className="py-4">
                        <span className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {token.change}
                        </span>
                      </td>
                      <td className="py-4">{token.marketCap}</td>
                      <td className="py-4">
                        <button className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all">
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
          <button className="btn-primary">
            Access Full Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard; 