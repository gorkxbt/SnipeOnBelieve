import '@/styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from '@/lib/ThemeContext';

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
} 