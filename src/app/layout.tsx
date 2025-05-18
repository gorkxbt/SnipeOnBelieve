import '@/styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { SolanaWalletProvider } from '@/components/WalletProvider';

export const metadata: Metadata = {
  title: 'SnipeOnBelieve | Analytics and Sniping for BelieveApp',
  description: 'The all-in-one analytics and sniping platform for the BelieveApp launchpad on Solana.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
} 