import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="bg-hero-pattern pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display">
              <span className="text-white">Snipe</span>
              <span className="text-secondary">On</span>
              <span className="text-white">Believe</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              The all-in-one analytics and sniping platform for the BelieveApp launchpad on Solana.
              Discover new opportunities and act faster than the competition.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button className="btn-primary">
                Launch App
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
              <div className="bg-dark bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="font-bold text-2xl text-accent">100+</h3>
                <p className="text-sm text-gray-400">Daily Snipes</p>
              </div>
              <div className="bg-dark bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="font-bold text-2xl text-accent">24/7</h3>
                <p className="text-sm text-gray-400">Monitoring</p>
              </div>
              <div className="bg-dark bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="font-bold text-2xl text-accent">0.3%</h3>
                <p className="text-sm text-gray-400">Low Fees</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] hidden md:block">
            <div className="absolute inset-0 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="bg-dark rounded-2xl p-6 w-full max-w-[400px] shadow-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">New Token Alert</h2>
                  <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-primary/40 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Token Name</p>
                        <p className="font-medium">BelieverCoin</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Market Cap</p>
                        <p className="font-medium">$125,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/40 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Ticker</p>
                        <p className="font-medium">$BLV</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Holders</p>
                        <p className="font-medium">324</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/40 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Contract Age</p>
                        <p className="font-medium">2 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">X Followers</p>
                        <p className="font-medium">5.2K</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full mt-6">Snipe Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 