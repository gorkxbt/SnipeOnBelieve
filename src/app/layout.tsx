import '@/styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the SolanaWalletProvider to avoid SSR issues
const SolanaWalletProviderDynamic = dynamic(
  () => import('@/components/WalletProvider').then(mod => mod.default),
  { ssr: false }
);

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
        <SolanaWalletProviderDynamic>
          {children}
        </SolanaWalletProviderDynamic>
      </body>
    </html>
  );
} 