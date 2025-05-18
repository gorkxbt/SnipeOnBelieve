import React from 'react';
import Link from 'next/link';

export default function Analytics() {
  // Sample data for charts and statistics
  const tokenStats = [
    { label: 'Tokens Launched', value: '127', change: '+12%' },
    { label: 'Total Market Cap', value: '$14.7M', change: '+8.3%' },
    { label: 'Avg. Initial MCap', value: '$112K', change: '+5.1%' },
    { label: 'Successful Snipes', value: '1,249', change: '+18.7%' },
  ];

  const topPerformers = [
    { name: 'BelieverCoin', ticker: '$BLV', roi: '+427%', marketCap: '$5.2M' },
    { name: 'SolBridge', ticker: '$SLBR', roi: '+316%', marketCap: '$3.8M' },
    { name: 'MintPower', ticker: '$MPW', roi: '+284%', marketCap: '$2.7M' },
    { name: 'SolFusion', ticker: '$SFUS', roi: '+215%', marketCap: '$1.9M' },
    { name: 'BelieveDAO', ticker: '$BDAO', roi: '+182%', marketCap: '$8.5M' },
  ];

  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Analytics Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive insights into token launches on the BelieveApp launchpad
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-dark mb-4">Launch Volume</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Launch Volume Chart Placeholder]</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-dark mb-4">Success Rate by Market Cap</h2>
            <div className="aspect-[16/9] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">[Success Rate Chart Placeholder]</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xl font-bold text-dark mb-4">Top Performing Tokens</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-gray-500 font-medium">Token</th>
                  <th className="pb-3 text-gray-500 font-medium">ROI Since Launch</th>
                  <th className="pb-3 text-gray-500 font-medium">Market Cap</th>
                  <th className="pb-3 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((token, index) => (
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
                    <td className="py-4 text-green-500 font-medium">{token.roi}</td>
                    <td className="py-4 text-dark">{token.marketCap}</td>
                    <td className="py-4">
                      <button className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-xl font-bold text-dark mb-4">Key Insights</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark">Optimal Launch Time</h3>
              <p className="text-gray-600 mt-1">
                Tokens launched between 14:00-18:00 UTC have shown 27% higher initial market cap on average.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark">X Followers Correlation</h3>
              <p className="text-gray-600 mt-1">
                Projects with 10K+ X followers demonstrated 38% higher 30-day ROI compared to those with fewer followers.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-dark">Early Holder Retention</h3>
              <p className="text-gray-600 mt-1">
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