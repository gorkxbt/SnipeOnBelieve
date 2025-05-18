'use client';

import React, { FC, ReactNode, useMemo } from 'react';
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
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize ONLY Phantom wallet adapter
  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
          
          {/* Custom styles to ensure Phantom is the only option shown */}
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
            }
            
            /* Modal background in dark mode */
            .wallet-adapter-modal-wrapper {
              background-color: #121212 !important;
              color: white;
              border: 1px solid #1E1E1E;
            }
            
            /* Modal background in light mode */
            html:not(.dark) .wallet-adapter-modal-wrapper {
              background-color: white !important;
              color: black;
              border: 1px solid #e5e7eb;
            }
            
            /* Modal title */
            .wallet-adapter-modal-title {
              color: #21d55a !important;
            }
          `}</style>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default ClientWalletProvider; 