import React, { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletButton: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className="wallet-button-container">
      <WalletMultiButton className="btn-primary !bg-secondary hover:!bg-opacity-90 !h-auto !py-2 !rounded-full !min-w-[140px]" />
      
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
      `}</style>
    </div>
  );
};

export default WalletButton; 