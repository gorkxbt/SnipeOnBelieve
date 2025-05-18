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
                    The dashboard is your command center for all activity on BelieveApp. It provides a real-time feed of new token pairs and graduated projects, with the ability to drill down into each project's details.
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>New Pairs Feed:</strong> Instantly see every new token pair as it launches on BelieveApp. Each entry includes token name, $ticker, market cap, contract age, number of holders, volume, and a link to the project's X (Twitter) page.
                    </li>
                    <li>
                      <strong>Graduated Coins:</strong> Track projects that have successfully completed the launchpad process. View historical performance, price charts, and key metrics to inform your trading decisions.
                    </li>
                    <li>
                      <strong>Advanced Filtering:</strong> Tailor your dashboard to your strategy. Filters include:
                      <ul className="list-circle pl-6 mt-2 space-y-1">
                        <li>Market Cap: Set minimum and maximum thresholds to focus on projects within your risk profile.</li>
                        <li>Contract Age: Filter by how recently a token contract was deployed, helping you spot the freshest opportunities or avoid unproven projects.</li>
                        <li>Number of Holders: Specify a range to find projects with growing or established communities.</li>
                        <li>X Followers: Filter by the number of followers on the project's official X account, helping you gauge social traction and potential hype.</li>
                        <li>Volume: Set minimum and maximum volume thresholds (e.g., 24-hour volume) to identify tokens with sufficient liquidity and trading activity.</li>
                      </ul>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.2 Sniper</h3>
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
                      <strong>Execution Engine:</strong> All snipes are powered by Mintech's infrastructure, ensuring low-latency, reliable execution. The system is designed to handle high demand and volatile launches, giving you the best possible entry.
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">2.3 Analytics</h3>
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
                      <strong>Connect Your Wallet:</strong> Visit the SnipeOnBelieve website and connect your Solana wallet using the integrated wallet provider.
                    </li>
                    <li>
                      <strong>Verify Access:</strong> The platform will verify your $SOB balance. If you meet the requirement, you'll gain full access to the dashboard and sniping tools.
                    </li>
                    <li>
                      <strong>Customize Your Dashboard:</strong> Set your preferred filters for market cap, contract age, number of holders, X followers, and volume to tailor the feed to your interests.
                    </li>
                    <li>
                      <strong>Set Up Snipes:</strong> In the Sniper section, enter the X account you want to monitor or specify a $ticker/coin name for direct sniping.
                    </li>
                    <li>
                      <strong>Monitor and Act:</strong> The platform will handle monitoring and execution, notifying you of successful snipes and providing analytics on your activity.
                    </li>
                  </ol>
                </section>

                <section id="user-guide" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">5. User Guide</h2>
                  
                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.1 Dashboard Filters</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Market Cap: Enter minimum and maximum values to filter projects by their current market capitalization.</li>
                    <li>Contract Age: Set a range (in hours or days) to focus on newly deployed or more established contracts.</li>
                    <li>Number of Holders: Filter projects by the number of unique wallet holders.</li>
                    <li>X Followers: Specify a range to see projects with a certain level of social following.</li>
                    <li>Volume: Set minimum and maximum volume thresholds (e.g., 24-hour volume) to identify tokens with sufficient liquidity and trading activity.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.2 Setting Up a Snipe</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>X Account Monitoring: In the Sniper section, input the X account handle you wish to monitor. The platform will track this account for new token deployments and execute a snipe when detected.</li>
                    <li>Direct Snipe: Enter the $ticker or coin name of an anticipated launch. The system will monitor for the token's deployment and execute your buy order as soon as it's live.</li>
                    <li>Snipe Settings: Configure your snipe amount, slippage tolerance, and any additional parameters as needed.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-dark mt-6 mb-3">5.3 Reviewing Analytics</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Project Analytics: Click on any token in the dashboard to view detailed analytics, including price charts, liquidity, and holder distribution.</li>
                    <li>Sniping History: Access your personal sniping history to review past trades, entry prices, and outcomes.</li>
                    <li>Market Trends: Explore aggregated data on launchpad activity, trending tokens, and overall market sentiment.</li>
                  </ul>
                </section>

                <section id="security" className="mb-12">
                  <h2 className="text-2xl font-bold text-dark border-b border-gray-200 pb-2 mb-4">6. Security and Transparency</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      <strong>Powered by Mintech:</strong> All trading and sniping operations are executed on Mintech's secure, audited infrastructure, ensuring reliability and safety.
                    </li>
                    <li>
                      <strong>User Privacy:</strong> SnipeOnBelieve only accesses wallet addresses and public data necessary for platform operation. No personal information is stored or shared.
                    </li>
                    <li>
                      <strong>Transparent Analytics:</strong> All snipes and platform activity are logged and available for user review in the analytics section, promoting transparency and trust.
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
                      <h3 className="font-bold text-dark">Q: What are the fees?</h3>
                      <p>A: Each transaction executed through the platform incurs a 0.3% fee, deducted automatically.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-dark">Q: Is my data safe?</h3>
                      <p>A: Yes. SnipeOnBelieve only accesses your wallet address and public data. No personal information is stored.</p>
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