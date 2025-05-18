'use client';

import React, { FC, ReactNode, useMemo, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import the wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: ReactNode;
}

const ClientWalletProvider: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint - using a more reliable RPC for better connection
  const endpoint = useMemo(() => {
    // Use a more reliable RPC endpoint than the default
    return "https://solana-mainnet.g.alchemy.com/v2/demo";
  }, [network]);

  // Initialize Phantom wallet adapter with improved config for better detection
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({ 
        detectPhantom: true,
        appIdentity: { name: "SnipeOnBelieve" },
        network,
      })
    ],
    [network]
  );
  
  // Fix for hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Define global error handler for wallet issues
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason?.message?.includes('wallet')) {
        console.error('Wallet connection error:', event.reason);
      }
    });
    
    return () => {
      window.removeEventListener('unhandledrejection', () => {});
    };
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false} 
        onError={(error) => {
          console.error("Wallet error:", error);
          // Display an error notification if needed
        }}
      >
        <WalletModalProvider>
          {mounted && children}
          
          {/* Custom styles to ensure Phantom is the only option shown and modal stays visible */}
          <style jsx global>{`
            /* Hide all other wallet options */
            .wallet-adapter-modal-wrapper .wallet-adapter-button:not([data-wallet="Phantom"]) {
              display: none !important;
            }
            
            /* Style for Phantom button */
            .wallet-adapter-modal-wrapper .wallet-adapter-button[data-wallet="Phantom"] {
              background-color: #21d55a !important;
              color: white !important;
              font-weight: bold;
              padding: 12px !important;
              height: auto !important;
              margin: 16px 0 !important;
              font-size: 16px !important;
            }
            
            /* Modal background in dark mode - made more visible */
            .wallet-adapter-modal-wrapper {
              background-color: #121212 !important;
              color: white;
              border: 1px solid #1E1E1E;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
              min-height: 300px !important;
              padding: 30px 20px !important;
            }
            
            /* Modal background in light mode */
            html:not(.dark) .wallet-adapter-modal-wrapper {
              background-color: white !important;
              color: black;
              border: 1px solid #e5e7eb;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Modal title */
            .wallet-adapter-modal-title {
              color: #21d55a !important;
              font-size: 24px !important;
              margin-bottom: 20px !important;
            }
            
            /* Ensure modal stays visible */
            .wallet-adapter-modal {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              z-index: 1000 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            /* Prevent immediate closure */
            .wallet-adapter-modal-button-close {
              opacity: 0.8 !important;
            }
          `}</style>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default ClientWalletProvider; 