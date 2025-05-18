'use client';

import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// We're using dynamic imports with error handling
const WalletMultiButtonDynamic = dynamic(
  async () => {
    try {
      // Try to import the wallet button
      const { WalletMultiButton } = await import('@solana/wallet-adapter-react-ui');
      
      // Return a custom wrapper to modify the button text
      return (props: any) => {
        const [buttonText, setButtonText] = useState<string | null>(null);
        
        useEffect(() => {
          // Override the button text after component mounts
          const modifyButtonText = () => {
            const buttonEl = document.querySelector('.wallet-adapter-button-trigger');
            if (buttonEl) {
              const textNode = Array.from(buttonEl.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE
              );
              
              if (textNode && textNode.textContent?.includes('Connect Phantom')) {
                textNode.textContent = 'Connect';
              }
            }
          };
          
          modifyButtonText();
          // Run again after a short delay to ensure it catches any updates
          const timer = setTimeout(modifyButtonText, 100);
          
          return () => clearTimeout(timer);
        }, []);
        
        return <WalletMultiButton {...props} />;
      };
    } catch (e) {
      // If it fails, return a simple button component
      return () => (
        <button className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-full transition-all">
          Connect
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
          background-color: #21d55a !important;
        }
        .wallet-adapter-button:not([disabled]):hover {
          background-color: #1cb74d !important;
        }
      `}</style>
    </div>
  );
};

export default WalletButton; 