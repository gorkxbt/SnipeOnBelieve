import { NextResponse } from 'next/server';

export async function GET() {
  // Example data - in a real app, this would come from a database or external API
  const tokens = [
    {
      id: '1',
      name: 'BelieverCoin',
      ticker: '$BLV',
      marketCap: '$125,000',
      contractAge: '2 hours',
      holders: 324,
      xFollowers: 5200,
      logo: '/images/placeholder.png',
    },
    {
      id: '2',
      name: 'SolBridge',
      ticker: '$SLBR',
      marketCap: '$345,000',
      contractAge: '5 hours',
      holders: 872,
      xFollowers: 12700,
      logo: '/images/placeholder.png',
    },
    {
      id: '3',
      name: 'Mintech Finance',
      ticker: '$MTF',
      marketCap: '$687,000',
      contractAge: '1 day',
      holders: 1024,
      xFollowers: 8900,
      logo: '/images/placeholder.png',
    },
    {
      id: '4',
      name: 'SolanaPlus',
      ticker: '$SOLP',
      marketCap: '$210,000',
      contractAge: '3 hours',
      holders: 543,
      xFollowers: 7600,
      logo: '/images/placeholder.png',
    },
    {
      id: '5',
      name: 'CryptoBeliever',
      ticker: '$CBLV',
      marketCap: '$95,000',
      contractAge: '1 hour',
      holders: 226,
      xFollowers: 3800,
      logo: '/images/placeholder.png',
    },
  ];

  return NextResponse.json({ tokens });
}

export async function POST(request: Request) {
  // Example endpoint for adding a new token to watch or snipe
  // In a real app, this would be processed and stored in a database
  try {
    const data = await request.json();
    
    // Validate the request data
    if (!data.ticker || !data.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Mock successful response
    return NextResponse.json({ 
      success: true, 
      message: `Successfully added token ${data.ticker} to your watchlist.` 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
} 