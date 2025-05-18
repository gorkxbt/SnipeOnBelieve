import React from 'react';
import Link from 'next/link';

export default function Whitepaper() {
  return (
    <main className="pt-24 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">SnipeOnBelieve Whitepaper</h1>
          <p className="text-gray-600 text-lg">
            Introducing the future of token sniping on the BelieveApp launchpad
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            SnipeOnBelieve is a specialized platform designed to provide traders with advanced tools 
            for analyzing and executing trades on tokens launched through the BelieveApp launchpad on Solana. 
            Our mission is to give users a competitive edge in identifying promising projects early and 
            executing trades with speed and precision.
          </p>

          <h2>2. Platform Overview</h2>
          <p>
            The SnipeOnBelieve platform consists of several key components:
          </p>
          <ul>
            <li>Real-time token launch monitoring</li>
            <li>Advanced analytics dashboard</li>
            <li>Automated sniping mechanisms</li>
            <li>Community insights and social signals</li>
            <li>Portfolio management tools</li>
          </ul>

          <h2>3. Technical Architecture</h2>
          <p>
            Our platform is built on a robust technical foundation:
          </p>
          <ul>
            <li>Solana blockchain integration for high-speed transaction processing</li>
            <li>Custom RPC nodes for reduced latency</li>
            <li>Advanced order routing algorithms for optimal execution</li>
            <li>Secure wallet connections with multi-factor authentication</li>
            <li>Real-time data processing pipeline</li>
          </ul>

          <h2>4. $SOB Token Utility</h2>
          <p>
            The $SOB token serves as the backbone of our ecosystem:
          </p>
          <ul>
            <li>Platform access: Minimum 1,000 $SOB tokens required</li>
            <li>Fee structure: 0.3% transaction fee</li>
            <li>Governance: Token holders can vote on platform development</li>
            <li>Staking rewards: Earn additional benefits by staking tokens</li>
          </ul>

          <h2>5. Roadmap</h2>
          <p>
            Our development roadmap includes:
          </p>
          <ul>
            <li><strong>Q1 2023:</strong> Beta platform launch and initial token distribution</li>
            <li><strong>Q2 2023:</strong> Enhanced analytics dashboard and portfolio tracking</li>
            <li><strong>Q3 2023:</strong> Mobile application release</li>
            <li><strong>Q4 2023:</strong> Advanced trading automation features</li>
            <li><strong>Q1 2024:</strong> Expansion to additional launchpads</li>
          </ul>

          <h2>6. Team</h2>
          <p>
            SnipeOnBelieve is backed by a team of experienced developers, traders, and blockchain experts 
            with a proven track record in creating successful DeFi products.
          </p>

          <h2>7. Conclusion</h2>
          <p>
            SnipeOnBelieve represents a significant advancement in the tools available for Solana 
            traders focused on new token launches. By combining real-time data, advanced analytics, 
            and automated execution, we enable users to capitalize on opportunities with unprecedented 
            efficiency.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 