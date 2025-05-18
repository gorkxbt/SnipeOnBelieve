'use client';

import React, { FC } from 'react';
import dynamic from 'next/dynamic';

// We're using dynamic imports with error handling
const WalletMultiButtonDynamic = dynamic(
  async () => {
    try {
      // Try to import the wallet button
      return (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton;
    } catch (e) {
      // If it fails, return a simple button component
      return () => (
        <button className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-full transition-all">
          Connect Wallet
        </button>
      );
    }
  },
  { 
    ssr: false,
    loading: () => (
      <button className="btn-primary">
        Loading...
      </button>
    )
  }
);

const WalletButton: FC = () => {
  return (
    <div className="wallet-button-container">
      <WalletMultiButtonDynamic className="btn-primary !bg-secondary hover:!bg-opacity-90 !h-auto !py-2 !rounded-full !min-w-[140px]" />
      
      <style jsx global>{`
        .wallet-adapter-dropdown-list {
          background-color: #0A0A20;
          border: 1px solid #2A2A50;
          border-radius: 12px;
        }
        .wallet-adapter-dropdown-list-item {
          color: white;
        }
        .wallet-adapter-dropdown-list-item:hover {
          background-color: #1A1A40;
        }
        .wallet-adapter-button-trigger {
          background-color: #7B41FF !important;
        }
        .wallet-adapter-button:not([disabled]):hover {
          background-color: #6934e0 !important;
        }
      `}</style>
    </div>
  );
};

export default WalletButton; 