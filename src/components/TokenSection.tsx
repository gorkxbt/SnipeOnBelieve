import React from 'react';

const TokenSection = () => {
  const tokenUtilities = [
    {
      title: 'Access Requirement',
      description: 'Hold at least 1,000 $SOB tokens in your connected Solana wallet to access the platform.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: 'Fee Structure',
      description: 'Each transaction executed through the platform incurs a 0.3% fee, supporting platform development.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Bonding Curve',
      description: '100% bonding curve model where token price increases with each purchase and decreases with each sale.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="token" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            $SOB <span className="text-secondary">Token</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-secondary opacity-5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl mr-4">
                  SOB
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark">$SOB Token</h3>
                  <p className="text-gray-500">Solana Network</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Token Type</span>
                  <span className="font-medium text-dark">SPL (Solana Program Library)</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Total Supply</span>
                  <span className="font-medium text-dark">100,000,000 SOB</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Circulating Supply</span>
                  <span className="font-medium text-dark">35,000,000 SOB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Access Requirement</span>
                  <span className="font-medium text-dark">1,000 SOB</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://raydium.io/swap/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                >
                  Buy $SOB
                </a>
                <a 
                  href="https://solscan.io"
                  target="_blank" 
                  rel="noopener noreferrer"  
                  className="btn-secondary"
                >
                  View on Solscan
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">Token Utility</h3>
            <div className="space-y-6">
              {tokenUtilities.map((utility, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-secondary bg-opacity-10 p-3 rounded-lg text-secondary mr-4">
                    {utility.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-dark">{utility.title}</h4>
                    <p className="text-gray-600 mt-1">{utility.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h4 className="text-lg font-medium text-dark mb-2">Tokenomics: 100% Bonding Curve</h4>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-gray-600 mb-3">
                  The $SOB token operates on a 100% bonding curve model, where:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Token price increases with each purchase</li>
                  <li>Token price decreases with each sale</li>
                  <li>Project team is paid from the 0.3% platform fees</li>
                  <li>No pre-mint or team allocation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection; 