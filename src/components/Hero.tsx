import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="pt-24 pb-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark">
              Snipe<span className="text-secondary">On</span>Believe
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Next-gen token sniping powered by Mintech infrastructure
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="/#dashboard" className="btn-primary">
                Launch App
              </Link>
              <Link href="/whitepaper" className="btn-secondary">
                Documentation
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl text-secondary">100+</h3>
                <p className="text-sm text-gray-600">Daily Snipes</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl text-secondary">24/7</h3>
                <p className="text-sm text-gray-600">Monitoring</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl text-secondary">0.3%</h3>
                <p className="text-sm text-gray-600">Low Fees</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative p-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 w-full max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-dark">New Token Alert</h2>
                  <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Token Name</p>
                        <p className="font-medium text-dark">BelieverCoin</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Market Cap</p>
                        <p className="font-medium text-dark">$125,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Ticker</p>
                        <p className="font-medium text-dark">$BLV</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Holders</p>
                        <p className="font-medium text-dark">324</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Contract Age</p>
                        <p className="font-medium text-dark">2 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">X Followers</p>
                        <p className="font-medium text-dark">5.2K</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/#dashboard" className="btn-primary w-full mt-6 block text-center">
                  Snipe Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 