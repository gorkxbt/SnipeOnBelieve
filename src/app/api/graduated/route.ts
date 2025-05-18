import { NextResponse } from 'next/server';

export async function GET() {
  // Example data - in a real app, this would come from a database or external API
  const graduated = [
    {
      id: '1',
      name: 'SolanaWave',
      ticker: '$WAVE',
      marketCap: '$4.2M',
      price: '$0.042',
      change: '+12.5%',
      volume: '$980,000',
      logo: '/images/placeholder.png',
    },
    {
      id: '2',
      name: 'BelieveDAO',
      ticker: '$BDAO',
      marketCap: '$8.7M',
      price: '$0.087',
      change: '+5.3%',
      volume: '$1.5M',
      logo: '/images/placeholder.png',
    },
    {
      id: '3',
      name: 'SolMint',
      ticker: '$SLMT',
      marketCap: '$2.1M',
      price: '$0.021',
      change: '-2.1%',
      volume: '$350,000',
      logo: '/images/placeholder.png',
    },
    {
      id: '4',
      name: 'DecentralFi',
      ticker: '$DCFI',
      marketCap: '$12.8M',
      price: '$0.128',
      change: '+8.7%',
      volume: '$2.3M',
      logo: '/images/placeholder.png',
    },
    {
      id: '5',
      name: 'SolPay',
      ticker: '$SPAY',
      marketCap: '$5.5M',
      price: '$0.055',
      change: '-1.2%',
      volume: '$870,000',
      logo: '/images/placeholder.png',
    },
  ];

  return NextResponse.json({ graduated });
} 