'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('intro');

  const scrollToSection = (sectionId: string): void => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">SnipeOnBelieve Documentation</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Welcome to SnipeOnBelieve, the all-in-one analytics and sniping platform for the BelieveApp launchpad on Solana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark mb-4">Table of Contents</h3>
              <nav className="space-y-1">
                <button 
                  onClick={() => scrollToSection('intro')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'intro' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  1. Introduction
                </button>
                <button 
                  onClick={() => scrollToSection('platform')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'platform' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  2. Platform Features
                </button>
                <button 
                  onClick={() => scrollToSection('token')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'token' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  3. Token Utility: $SOB
                </button>
                <button 
                  onClick={() => scrollToSection('getting-started')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'getting-started' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  4. Getting Started
                </button>
                <button 
                  onClick={() => scrollToSection('user-guide')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'user-guide' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  5. User Guide
                </button>
                <button 
                  onClick={() => scrollToSection('security')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'security' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  6. Security and Transparency
                </button>
                <button 
                  onClick={() => scrollToSection('support')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'support' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  7. Support and Community
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'faq' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  8. FAQ
                </button>
                <button 
                  onClick={() => scrollToSection('disclaimer')}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md ${activeSection === 'disclaimer' ? 'bg-secondary/10 text-secondary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  9. Disclaimer
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="prose prose-lg max-w-none">
                <section id="intro" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    SnipeOnBelieve is a web-based platform that aggregates, analyzes, and acts on new token launches and project graduations from the BelieveApp launchpad. The platform is intuitive for beginners and powerful for advanced users, offering a customizable dashboard, robust filtering, and automated sniping tools. Access is gated by holding $SOB tokens, ensuring a focused and committed user base.
                  </p>
                </section>

                <section id="platform" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">2. Platform Features</h2>
                  
                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.1 Dashboard</h3>
                  <p className="mb-3">
                    The dashboard is your command center for all activity on BelieveApp. It provides a real-time feed of new token pairs and graduated projects, with comprehensive analytics and monitoring tools.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>New Pairs Feed:</strong> Instantly see every new token pair as it launches on BelieveApp. Each entry includes token name, ticker, pool size, creation time, and source, presented in an easy-to-scan card format with quick filtering options.
                    </li>
                    <li>
                      <strong>Current Snipes:</strong> Monitor all your active snipe operations in one place. View target, type (X Account or Direct Snipe), amount, slippage, status, creation time, and priority level for each active snipe.
                    </li>
                    <li>
                      <strong>Graduated Coins:</strong> Track projects that have successfully completed the launchpad process. View historical performance, price charts, and key metrics to inform your trading decisions.
                    </li>
                    <li>
                      <strong>Live Statistics:</strong> View real-time performance metrics including:
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>Currently Sniping: Number of active monitoring jobs</li>
                        <li>Success Rate: Percentage and count of successful trades</li>
                        <li>Tokens Monitored: Total tokens being tracked from BelieveApp</li>
                        <li>Total Profit: Cumulative trader profit</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Advanced Filtering:</strong> Tailor your dashboard to your strategy. Quick filters for All Pairs, High Liquidity, New pools, and Trending tokens let you focus on opportunities that match your investment criteria.
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.2 Sniper Wallet</h3>
                  <p className="mb-3">
                    The Sniper Wallet is a dedicated wallet for automated trading operations, providing a secure environment for your sniping activities separate from your main wallet.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Secure Generation:</strong> Create a dedicated sniper wallet with a single click, keeping your operations separate from your main funds.
                    </li>
                    <li>
                      <strong>Deposit and Withdraw:</strong> Easily transfer SOL between your connected wallet and your sniper wallet as needed for operations.
                    </li>
                    <li>
                      <strong>Balance Monitoring:</strong> Track your sniper wallet balance in real-time, ensuring you always have sufficient funds for automated operations.
                    </li>
                    <li>
                      <strong>Enhanced Security:</strong> Private keys are encrypted and stored locally, providing both security and convenience.
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.3 Sniper Configuration</h3>
                  <p className="mb-3">
                    The Sniper module is designed for users who want to automate their entry into new tokens, maximizing speed and minimizing manual effort.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>X Account Monitoring:</strong> Enter the handle of any X (Twitter) account. SnipeOnBelieve will monitor this account for token deployment announcements or contract drops. When a new token is deployed by the specified account, the platform will automatically execute a snipe on your behalf.
                    </li>
                    <li>
                      <strong>Direct Snipe by Ticker or Name:</strong> If you know the $ticker or name of an upcoming token, set up a snipe in advance. The system will monitor for the token's deployment and execute your buy order the moment it goes live.
                    </li>
                    <li>
                      <strong>Custom Parameters:</strong> Configure your snipe with detailed parameters:
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>Amount: Set the exact SOL amount for each snipe</li>
                        <li>Slippage Tolerance: Customize slippage settings to balance execution speed against price impact</li>
                        <li>Priority Level: Choose between Low, Medium, and High priority for your snipes</li>
                        <li>Gas Optimization: Adjust gas price strategy from fastest to cheapest</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Execution Engine:</strong> All snipes are powered by our secure, high-performance infrastructure, ensuring low-latency, reliable execution. The system is designed to handle high demand and volatile launches, giving you the best possible entry.
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.4 Analytics</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Project Insights:</strong> Access detailed analytics for each token, including price history, liquidity, holder distribution, and social metrics.
                    </li>
                    <li>
                      <strong>Sniping Performance:</strong> Review your sniping history, including entry prices, slippage, and realized gains or losses.
                    </li>
                    <li>
                      <strong>Market Trends:</strong> See aggregated data on launchpad activity, trending projects, and top-performing tokens.
                    </li>
                    <li>
                      <strong>Visual Dashboards:</strong> Track your performance with intuitive visual indicators, real-time stats, and user-friendly metric displays.
                    </li>
                  </ul>
                </section>

                <section id="token" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">3. Token Utility: $SOB</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Access Requirement:</strong> To use SnipeOnBelieve, users must hold at least 1,000 $SOB tokens in their connected Solana wallet. This requirement is checked automatically when you connect your wallet.
                    </li>
                    <li>
                      <strong>Fee Structure:</strong> Each transaction executed through the platform incurs a 0.3% fee, deducted automatically at the time of the trade. Fees are used to support platform development, infrastructure, and future features.
                    </li>
                  </ul>
                </section>

                <section id="getting-started" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">4. Getting Started</h2>
                  <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Purchase at least 1,000 $SOB tokens:</strong> Acquire the tokens from a supported Solana DEX and hold them in your wallet.
                    </li>
                    <li>
                      <strong>Connect Your Wallet:</strong> Visit the SnipeOnBelieve website and connect your Solana wallet using the integrated Phantom wallet provider.
                    </li>
                    <li>
                      <strong>Verify Access:</strong> The platform will verify your $SOB balance. If you meet the requirement, you'll gain full access to the dashboard and sniping tools.
                    </li>
                    <li>
                      <strong>Create a Sniper Wallet:</strong> Generate a dedicated sniper wallet for your trading operations to keep them separate from your main funds.
                    </li>
                    <li>
                      <strong>Deposit Funds:</strong> Transfer SOL from your connected wallet to your sniper wallet to fuel your sniping operations.
                    </li>
                    <li>
                      <strong>Configure Sniper Settings:</strong> In the Sniper tab, set up X account monitoring or direct token snipes with your preferred parameters.
                    </li>
                    <li>
                      <strong>Monitor Your Operations:</strong> Use the dashboard to track your active snipes, review new pairs, and analyze market activity.
                    </li>
                  </ol>
                </section>

                <section id="user-guide" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">5. User Guide</h2>
                  
                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.1 Managing Your Sniper Wallet</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Generate a Wallet:</strong> Click the "Generate Sniper Wallet" button in the Sniper Wallet section after connecting your main wallet.</li>
                    <li><strong>View Wallet Info:</strong> Once generated, you can view your sniper wallet's public key and current balance.</li>
                    <li><strong>Deposit Funds:</strong> Enter the amount of SOL you wish to deposit and click "Deposit to Sniper Wallet."</li>
                    <li><strong>Withdraw Funds:</strong> To retrieve funds, enter the amount and click "Withdraw to Connected Wallet."</li>
                    <li><strong>Security:</strong> Your wallet's private key is encrypted and stored locally for security.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.2 Using the Dashboard</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Navigation:</strong> Use the tab navigation to switch between New Pairs Feed, Current Snipes, Configure Sniper, and Graduated Coins.</li>
                    <li><strong>Monitoring Stats:</strong> View live statistics at the top of the dashboard to track your sniping performance.</li>
                    <li><strong>Quick Filters:</strong> Use the filter buttons to quickly focus on specific token categories like "High Liquidity" or "New Pools."</li>
                    <li><strong>Direct Snipe:</strong> Click the "Snipe" button on any token card in the New Pairs Feed to immediately set up a direct snipe.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.3 Setting Up a Snipe</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>X Account Monitoring:</strong> In the Configure Sniper tab, enter an X account handle (without the @ symbol) in the X Account field.</li>
                    <li><strong>Configure Parameters:</strong> 
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>Set the SOL amount you wish to invest</li>
                        <li>Adjust slippage tolerance percentage</li>
                        <li>Select priority level (Low, Medium, High)</li>
                      </ul>
                    </li>
                    <li><strong>Enable Monitoring:</strong> Click "Enable X Account Monitoring" to start monitoring the specified account.</li>
                    <li><strong>Direct Token Snipe:</strong> For known upcoming tokens, enter the token ticker/name (without the $ symbol) in the Direct Token Snipe section.</li>
                    <li><strong>Gas Settings:</strong> Adjust the Gas Optimization slider to balance between execution speed and cost efficiency.</li>
                    <li><strong>Activate Direct Snipe:</strong> Click "Set Direct Token Snipe" to activate your snipe operation.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.4 Managing Active Snipes</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>View Active Snipes:</strong> Navigate to the Current Snipes tab to see all your ongoing snipe operations.</li>
                    <li><strong>Monitor Status:</strong> Check the status indicator to see if your snipe is "Monitoring" or "Pending".</li>
                    <li><strong>View Details:</strong> Each snipe card displays comprehensive information including target, type, amount, slippage, creation time, and priority.</li>
                    <li><strong>Cancel Operations:</strong> Click the "Cancel" button on any snipe card to immediately terminate that operation.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.5 Reviewing Analytics</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Performance Metrics:</strong> Track your current statistics in the dashboard header, including active snipes, success rate, monitored tokens, and total profit.</li>
                    <li><strong>Live Status:</strong> The monitoring status indicator shows when the system is actively scanning for new opportunities.</li>
                    <li><strong>Token Analytics:</strong> Click on individual tokens in the dashboard to view detailed performance data and metrics.</li>
                  </ul>
                </section>

                <section id="security" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">6. Security and Transparency</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Secure Sniper Wallet:</strong> Our dedicated sniper wallet system provides a secure, isolated environment for your trading operations. Private keys are encrypted and stored locally on your device, never transmitted to our servers.
                    </li>
                    <li>
                      <strong>Execution Security:</strong> All trading and sniping operations are executed on our secure, high-performance infrastructure, ensuring reliability and safety. Transactions are signed locally and verified before execution.
                    </li>
                    <li>
                      <strong>User Privacy:</strong> SnipeOnBelieve only accesses wallet addresses and public data necessary for platform operation. No personal information is stored or shared with third parties.
                    </li>
                    <li>
                      <strong>Transparent Analytics:</strong> All snipes and platform activity are logged and available for user review in the dashboard, promoting transparency and accountability.
                    </li>
                    <li>
                      <strong>Real-time Monitoring:</strong> The platform provides continuous status updates and monitoring indicators, so you always know exactly what's happening with your operations.
                    </li>
                  </ul>
                </section>

                <section id="support" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">7. Support and Community</h2>
                  <p className="mb-4">
                    If you need help, have feature requests, or want to connect with other users, join our official community channels or reach out via the support form on our website. We encourage feedback and are committed to continuous improvement.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Community Channels:</strong> 
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-secondary hover:underline">Discord</a>
                        <a href="#" className="text-secondary hover:underline">Telegram</a>
                        <a href="#" className="text-secondary hover:underline">X (Twitter)</a>
                      </div>
                    </li>
                    <li>
                      <strong>Support:</strong> Use the contact form on the website or email <a href="mailto:support@snipeonbelieve.com" className="text-secondary hover:underline">support@snipeonbelieve.com</a>
                    </li>
                  </ul>
                </section>

                <section id="faq" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">8. FAQ</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-dark">Q: What is SnipeOnBelieve?</h3>
                      <p>A: SnipeOnBelieve is a platform for analytics and automated sniping on the BelieveApp launchpad, built on Solana.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: How do I access the platform?</h3>
                      <p>A: Hold at least 1,000 $SOB tokens in your Solana wallet and connect it to the SnipeOnBelieve website.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: What is the Sniper Wallet?</h3>
                      <p>A: The Sniper Wallet is a dedicated wallet for your automated trading operations, keeping them separate from your main funds. It's secure, with private keys stored locally on your device.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: How do I set up an automated snipe?</h3>
                      <p>A: Navigate to the Configure Sniper tab, choose between X Account monitoring or Direct Token Snipe, set your parameters (amount, slippage, priority), and activate the monitoring.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: Can I monitor multiple tokens or X accounts simultaneously?</h3>
                      <p>A: Yes, you can set up multiple monitoring operations for different X accounts and tokens, all managed from your dashboard.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: How do I cancel an active snipe?</h3>
                      <p>A: Go to the Current Snipes tab in your dashboard, find the snipe you want to cancel, and click the "Cancel" button on that card.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: What are the fees?</h3>
                      <p>A: Each transaction executed through the platform incurs a 0.3% fee, deducted automatically.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: Is my data safe?</h3>
                      <p>A: Yes. SnipeOnBelieve only accesses your wallet address and public data. Private keys remain on your device and are never shared.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: What happens if I run out of SOL in my Sniper Wallet?</h3>
                      <p>A: The platform will notify you if your balance is insufficient for a planned operation. You can easily deposit more SOL from your connected wallet.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: Can I suggest new features?</h3>
                      <p>A: Absolutely. Join our community channels or use the support form to submit feedback and suggestions.</p>
                    </div>
                  </div>
                </section>

                <section id="disclaimer" className="mb-8">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">9. Disclaimer</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-4">
                      SnipeOnBelieve is intended for experienced users and traders. All trading and sniping activities carry risk, including the potential loss of capital. The platform does not guarantee profits or successful snipes. Please use SnipeOnBelieve responsibly and ensure you understand the risks associated with token launches and automated trading.
                    </p>
                    <p>
                      For more details, including API documentation and advanced configuration options, visit the extended documentation section on our website.
                    </p>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/" className="btn-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 