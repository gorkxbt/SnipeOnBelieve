import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the request data
    if (!data.type) {
      return NextResponse.json(
        { error: 'Missing snipe type' },
        { status: 400 }
      );
    }
    
    // Handle different types of snipes
    switch (data.type) {
      case 'ticker':
        if (!data.ticker) {
          return NextResponse.json(
            { error: 'Missing ticker for ticker-based snipe' },
            { status: 400 }
          );
        }
        
        // In a real app, this would set up a monitoring job
        return NextResponse.json({
          success: true,
          message: `Snipe set up for token with ticker ${data.ticker}`,
          snipeId: `SNIPE-${Date.now()}`,
        });
        
      case 'account':
        if (!data.accountHandle) {
          return NextResponse.json(
            { error: 'Missing X account handle for account-based snipe' },
            { status: 400 }
          );
        }
        
        // In a real app, this would set up a monitoring job
        return NextResponse.json({
          success: true,
          message: `Monitoring set up for X account @${data.accountHandle}`,
          snipeId: `SNIPE-${Date.now()}`,
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid snipe type' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  // Example data - in a real app, this would come from a database of user's active snipes
  const snipes = [
    {
      id: 'SNIPE-1652345678',
      type: 'ticker',
      target: '$BLV',
      status: 'active',
      created: '2025-05-17T12:30:45Z',
    },
    {
      id: 'SNIPE-1652345679',
      type: 'account',
      target: '@BelieveAppOfficial',
      status: 'active',
      created: '2025-05-17T14:22:10Z',
    },
    {
      id: 'SNIPE-1652345680',
      type: 'ticker',
      target: '$SOL',
      status: 'completed',
      created: '2025-05-16T09:15:30Z',
      executed: '2025-05-16T10:05:12Z',
      amount: '0.5 SOL',
      price: '$0.023',
    },
  ];

  return NextResponse.json({ snipes });
} 