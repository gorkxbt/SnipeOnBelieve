import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { fakeHasMinimumTokens } from '../lib/tokenCheck';
import { useTheme } from '@/lib/ThemeContext';
import { createRoot } from 'react-dom/client';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';

// Define types for user positions and balances
interface TokenPosition {
  token: string;
  ticker: string;
  amount: string;
  value: string;
  buyPrice: string;
  currentPrice: string;
  profit: string;
  profitValue: string;
}

interface UserBalances {
  sol: string;
  sob: string;
  positions: TokenPosition[];
}

interface ActiveSnipe {
  target: string;
  type: string;
  amount: string;
  slippage: string;
  status: string;
  created: string;
  priority: string;
  pool: string;
}

interface SniperWallet {
  publicKey: string;
  balance: number;
  isInitialized: boolean;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('newPairs');
  const [hasAccessTokens, setHasAccessTokens] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlySnipingCount, setCurrentlySnipingCount] = useState(0);
  const [snipeSuccess, setSnipeSuccess] = useState({ count: 0, rate: '0%' });
  const [coinsMonitored, setCoinsMonitored] = useState(0);
  const [totalProfit, setTotalProfit] = useState('0 SOL');
  const [lastScan, setLastScan] = useState('');
  const [userBalances, setUserBalances] = useState<UserBalances>({
    sol: '0.00',
    sob: '0.00',
    positions: []
  });
  
  // State for button interactions
  const [isSnipeEnabled, setIsSnipeEnabled] = useState(false);
  const [isDirectSnipeSet, setIsDirectSnipeSet] = useState(false);
  const [snipeFeedback, setSnipeFeedback] = useState('');
  const [monitoringFeedback, setMonitoringFeedback] = useState('');
  const [xAccountValue, setXAccountValue] = useState('');
  const [snipeAmount, setSnipeAmount] = useState('0.1');
  const [slippageTolerance, setSlippageTolerance] = useState('2.5');
  const [priority, setPriority] = useState('Medium');
  const [tokenTickerValue, setTokenTickerValue] = useState('');
  const [directSnipeAmount, setDirectSnipeAmount] = useState('0.1');
  const [directSnipeSlippage, setDirectSnipeSlippage] = useState('2.5');
  const [gasOptimization, setGasOptimization] = useState(3);
  const [activeSnipes, setActiveSnipes] = useState<ActiveSnipe[]>([
    {
      target: '@SolanaProject',
      type: 'X Account',
      amount: '0.5 SOL',
      slippage: '2.5%',
      status: 'Monitoring',
      created: '2 hours ago',
      priority: 'High',
      pool: 'Meteora',
    },
    {
      target: '$NEWTOKEN',
      type: 'Direct Snipe',
      amount: '0.2 SOL',
      slippage: '3.0%',
      status: 'Pending',
      created: '30 minutes ago',
      priority: 'Medium',
      pool: 'Meteora',
    },
    {
      target: '@BelieveDevs',
      type: 'X Account',
      amount: '0.75 SOL',
      slippage: '2.0%',
      status: 'Monitoring',
      created: '1 hour ago',
      priority: 'High',
      pool: 'Meteora',
    }
  ]);
  
  const wallet = useWallet();
  const { theme } = useTheme();
  const { connection } = useConnection();
  
  const [sniperWallet, setSniperWallet] = useState<SniperWallet | null>(null);
  const [isGeneratingWallet, setIsGeneratingWallet] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletError, setWalletError] = useState('');
  
  // Simulated user positions
  const userPositions: TokenPosition[] = [
    {
      token: 'BelieverCoin',
      ticker: '$BLV',
      amount: '4,750',
      value: '0.68 SOL',
      buyPrice: '0.00012 SOL',
      currentPrice: '0.00014 SOL',
      profit: '+17.3%',
      profitValue: '+0.1 SOL'
    },
    {
      token: 'SolBridge',
      ticker: '$SLBR',
      amount: '12,300',
      value: '1.23 SOL',
      buyPrice: '0.00009 SOL',
      currentPrice: '0.0001 SOL',
      profit: '+11.2%',
      profitValue: '+0.12 SOL'
    },
    {
      token: 'SolanaPulse',
      ticker: '$PULSE',
      amount: '8,900',
      value: '0.89 SOL',
      buyPrice: '0.00008 SOL',
      currentPrice: '0.0001 SOL',
      profit: '+24.8%',
      profitValue: '+0.17 SOL'
    }
  ];
  
  useEffect(() => {
    async function checkToken() {
      if (wallet.connected && wallet.publicKey) {
        try {
          setIsLoading(true);
          // For demo purposes, we're using the fake check
          // In production, this would be:
          // const hasTokens = await hasMinimumTokens(wallet.publicKey, connection);
          const hasTokens = await fakeHasMinimumTokens();
          setHasAccessTokens(hasTokens);
          
          // Set fake stats for demo
          if (hasTokens) {
            setCurrentlySnipingCount(3);
            setSnipeSuccess({ count: 17, rate: '85%' });
            setCoinsMonitored(42);
            setTotalProfit('5.87 SOL');
            setLastScan(new Date().toLocaleTimeString());
            setUserBalances({
              sol: '12.45',
              sob: '2,580',
              positions: userPositions
            });
          }
        } catch (error) {
          console.error('Error checking tokens:', error);
          setHasAccessTokens(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setHasAccessTokens(false);
        setIsLoading(false);
      }
    }

    checkToken();
    
    // Update scan time periodically
    const interval = setInterval(() => {
      if (hasAccessTokens) {
        setLastScan(new Date().toLocaleTimeString());
      }
    }, 30000);
    
    // Set up an event listener for Phantom wallet
    if (typeof window !== 'undefined' && window.solana) {
      // Listen for account changes
      window.solana.on('accountChanged', () => {
        console.log('Phantom account changed');
        checkToken();
      });
      
      // Listen for connect event
      window.solana.on('connect', () => {
        console.log('Phantom connected');
        checkToken();
      });
    }
    
    return () => clearInterval(interval);
  }, [wallet.connected, wallet.publicKey, hasAccessTokens]);
  
  const tokens = [
    {
      name: 'BelieverCoin',
      ticker: '$BLV',
      marketCap: '$125,000',
      contractAge: '35 minutes',
      holders: '324',
      xFollowers: '5.2K',
      liquidity: '$42,500',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 14:32',
    },
    {
      name: 'SolBridge',
      ticker: '$SLBR',
      marketCap: '$345,000',
      contractAge: '2.5 hours',
      holders: '872',
      xFollowers: '12.7K',
      liquidity: '$78,000',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 12:07',
    },
    {
      name: 'Mintech Finance',
      ticker: '$MTF',
      marketCap: '$687,000',
      contractAge: '8 hours',
      holders: '1,024',
      xFollowers: '8.9K',
      liquidity: '$112,000',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 06:42',
    },
    {
      name: 'SolRevolution',
      ticker: '$SOLR',
      marketCap: '$95,000',
      contractAge: '12 minutes',
      holders: '124',
      xFollowers: '3.2K',
      liquidity: '$32,000',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 14:55',
    },
    {
      name: 'BelieveSwap',
      ticker: '$BSWAP',
      marketCap: '$215,000',
      contractAge: '1.5 hours',
      holders: '482',
      xFollowers: '7.5K',
      liquidity: '$53,000',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 13:25',
    },
    {
      name: 'SolanaPulse',
      ticker: '$PULSE',
      marketCap: '$178,000',
      contractAge: '45 minutes',
      holders: '286',
      xFollowers: '4.9K',
      liquidity: '$45,800',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
      pairCreated: 'Today at 14:22',
    },
  ];
  
  const graduated = [
    {
      name: 'SolanaWave',
      ticker: '$WAVE',
      marketCap: '$4.2M',
      price: '$0.042',
      change: '+12.5%',
      logo: '/images/placeholder.png',
      volume: '$230K',
      txCount: '1.2K',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
    },
    {
      name: 'BelieveDAO',
      ticker: '$BDAO',
      marketCap: '$8.7M',
      price: '$0.087',
      change: '+5.3%',
      logo: '/images/placeholder.png',
      volume: '$450K',
      txCount: '3.5K',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
    },
    {
      name: 'SolMint',
      ticker: '$SLMT',
      marketCap: '$2.1M',
      price: '$0.021',
      change: '-2.1%',
      logo: '/images/placeholder.png',
      volume: '$115K',
      txCount: '0.9K',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
    },
    {
      name: 'MeteoraPad',
      ticker: '$METEOR',
      marketCap: '$12.4M',
      price: '$0.124',
      change: '+8.7%',
      logo: '/images/placeholder.png',
      volume: '$775K',
      txCount: '5.2K',
      pool: 'Meteora',
      deployedBy: 'BelieveApp',
    },
  ];

  // Event handlers for buttons
  const handleEnableMonitoring = () => {
    if (!xAccountValue) {
      setMonitoringFeedback('Please enter an X account handle');
      return;
    }
    
    if (parseFloat(snipeAmount) <= 0) {
      setMonitoringFeedback('Please enter a valid amount to snipe');
      return;
    }
    
    setIsSnipeEnabled(true);
    setCurrentlySnipingCount(prev => prev + 1);
    setMonitoringFeedback(`Monitoring enabled for @${xAccountValue}`);
    
    // Add to active snipes
    const newSnipe: ActiveSnipe = {
      target: `@${xAccountValue}`,
      type: 'X Account',
      amount: `${snipeAmount} SOL`,
      slippage: `${slippageTolerance}%`,
      status: 'Monitoring',
      created: 'Just now',
      priority: priority,
      pool: 'Meteora'
    };
    
    setActiveSnipes(prev => [...prev, newSnipe]);
  };
  
  const handleSetDirectSnipe = () => {
    if (!tokenTickerValue) {
      setSnipeFeedback('Please enter a token ticker or name');
      return;
    }
    
    if (parseFloat(directSnipeAmount) <= 0) {
      setSnipeFeedback('Please enter a valid amount to snipe');
      return;
    }
    
    setIsDirectSnipeSet(true);
    setCurrentlySnipingCount(prev => prev + 1);
    setSnipeFeedback(`Snipe set for ${tokenTickerValue}`);
    
    // Add to active snipes
    const newSnipe: ActiveSnipe = {
      target: tokenTickerValue,
      type: 'Direct Snipe',
      amount: `${directSnipeAmount} SOL`,
      slippage: `${directSnipeSlippage}%`,
      status: 'Pending',
      created: 'Just now',
      priority: 'Medium',
      pool: 'Meteora'
    };
    
    setActiveSnipes(prev => [...prev, newSnipe]);
  };
  
  const handleSnipeToken = (tokenName: string) => {
    // Simulate a snipe action
    const tokenToSnipe = tokens.find(t => t.name === tokenName);
    if (!tokenToSnipe) return;
    
    setActiveTab('sniper');
    setTokenTickerValue(tokenToSnipe.ticker);
    // Scroll to the sniper section
    setTimeout(() => {
      const sniperSection = document.querySelector('[data-section="sniper"]');
      if (sniperSection) {
        sniperSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const handleCancelSnipe = (target: string) => {
    // Remove from active snipes
    setActiveSnipes(prev => prev.filter(snipe => snipe.target !== target));
    setCurrentlySnipingCount(prev => Math.max(0, prev - 1));
  };
  
  const handleSellPosition = (token: string) => {
    // Simulate selling a position
    alert(`Selling ${token} position...`);
    
    // Remove from positions
    const newPositions = userBalances.positions.filter(pos => pos.token !== token);
    setUserBalances(prev => ({
      ...prev,
      positions: newPositions
    }));
    
    // Update profit
    const position = userBalances.positions.find(pos => pos.token === token);
    if (position) {
      const profit = position.profitValue.startsWith('+') 
        ? parseFloat(position.profitValue.substring(1).split(' ')[0])
        : 0;
      
      setTotalProfit(`${(parseFloat(totalProfit.split(' ')[0]) + profit).toFixed(2)} SOL`);
    }
  };

  // Function to generate a new sniper wallet
  const generateSniperWallet = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setWalletError('Please connect your wallet first');
      return;
    }

    try {
      setIsGeneratingWallet(true);
      setWalletError('');

      // Generate new keypair
      const newKeypair = Keypair.generate();
      
      // Store the wallet info (in production, you'd want to encrypt this)
      const sniperWalletInfo: SniperWallet = {
        publicKey: newKeypair.publicKey.toString(),
        balance: 0,
        isInitialized: true
      };

      // In production, you'd want to securely store the private key
      // For demo purposes, we're just storing the public key
      localStorage.setItem('sniperWallet', JSON.stringify(sniperWalletInfo));
      
      setSniperWallet(sniperWalletInfo);
    } catch (error) {
      console.error('Error generating wallet:', error);
      setWalletError('Failed to generate wallet. Please try again.');
    } finally {
      setIsGeneratingWallet(false);
    }
  };

  // Function to deposit SOL to sniper wallet
  const handleDeposit = async () => {
    if (!wallet.connected || !wallet.publicKey || !sniperWallet) {
      setWalletError('Please connect your wallet and generate a sniper wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setWalletError('');

      const amount = parseFloat(depositAmount);
      if (isNaN(amount) || amount <= 0) {
        setWalletError('Please enter a valid amount');
        return;
      }

      // Create transfer instruction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(sniperWallet.publicKey),
          lamports: amount * LAMPORTS_PER_SOL
        })
      );

      // Send transaction
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);

      // Update balance
      const newBalance = await connection.getBalance(new PublicKey(sniperWallet.publicKey));
      setSniperWallet(prev => prev ? {
        ...prev,
        balance: newBalance / LAMPORTS_PER_SOL
      } : null);

      setDepositAmount('');
    } catch (error) {
      console.error('Error depositing:', error);
      setWalletError('Failed to deposit. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to withdraw SOL from sniper wallet
  const handleWithdraw = async () => {
    if (!wallet.connected || !wallet.publicKey || !sniperWallet) {
      setWalletError('Please connect your wallet and generate a sniper wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      setWalletError('');

      const amount = parseFloat(withdrawAmount);
      if (isNaN(amount) || amount <= 0) {
        setWalletError('Please enter a valid amount');
        return;
      }

      // In production, you'd need to sign with the sniper wallet's private key
      // For demo purposes, we're just showing the UI
      alert('Withdrawal functionality would be implemented here with proper private key management');

      setWithdrawAmount('');
    } catch (error) {
      console.error('Error withdrawing:', error);
      setWalletError('Failed to withdraw. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Load sniper wallet on component mount
  useEffect(() => {
    const storedWallet = localStorage.getItem('sniperWallet');
    if (storedWallet) {
      setSniperWallet(JSON.parse(storedWallet));
    }
  }, []);

  // Update sniper wallet balance periodically
  useEffect(() => {
    if (sniperWallet?.publicKey) {
      const updateBalance = async () => {
        try {
          const balance = await connection.getBalance(new PublicKey(sniperWallet.publicKey));
          setSniperWallet(prev => prev ? {
            ...prev,
            balance: balance / LAMPORTS_PER_SOL
          } : null);
        } catch (error) {
          console.error('Error updating balance:', error);
        }
      };

      updateBalance();
      const interval = setInterval(updateBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [sniperWallet?.publicKey, connection]);

  return (
    <section id="dashboard" className="py-24 bg-light dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sniper Wallet Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
              Sniper Wallet
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Manage your dedicated sniper wallet for automated trading
            </p>
          </div>

          <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-lg border border-gray-100 dark:border-dark-border">
            {!sniperWallet ? (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Generate a dedicated wallet for automated sniping operations
                </p>
                <button
                  className="btn-primary"
                  onClick={generateSniperWallet}
                  disabled={isGeneratingWallet || !wallet.connected}
                >
                  {isGeneratingWallet ? 'Generating...' : 'Generate Sniper Wallet'}
                </button>
                {walletError && (
                  <p className="mt-4 text-red-500 dark:text-red-400">{walletError}</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-6">
                  <h3 className="font-bold text-dark dark:text-white mb-4">Wallet Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Public Key</label>
                      <div className="bg-white dark:bg-dark-surface p-3 rounded-md border border-gray-200 dark:border-dark-border break-all">
                        {sniperWallet.publicKey}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Balance</label>
                      <div className="text-2xl font-bold text-dark dark:text-white">
                        {sniperWallet.balance.toFixed(4)} SOL
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-6">
                    <h3 className="font-bold text-dark dark:text-white mb-4">Deposit SOL</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Amount (SOL)</label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface"
                          placeholder="0.00"
                        />
                      </div>
                      <button
                        className="btn-primary w-full"
                        onClick={handleDeposit}
                        disabled={isProcessing || !depositAmount}
                      >
                        {isProcessing ? 'Processing...' : 'Deposit'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-6">
                    <h3 className="font-bold text-dark dark:text-white mb-4">Withdraw SOL</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Amount (SOL)</label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface"
                          placeholder="0.00"
                        />
                      </div>
                      <button
                        className="btn-primary w-full"
                        onClick={handleWithdraw}
                        disabled={isProcessing || !withdrawAmount}
                      >
                        {isProcessing ? 'Processing...' : 'Withdraw'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
            BelieveApp Sniper Dashboard
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Advanced token sniping for new Meteora pools on BelieveApp
          </p>
        </div>
        
        {/* Optional Wallet Connection Section */}
        {!wallet.connected && (
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 mb-8 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-dark dark:text-white">Connect Your Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect your wallet to enable token sniping features
                </p>
              </div>
              <button 
                className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all flex items-center mt-4 md:mt-0"
                onClick={async () => {
                  try {
                    if (window.solana && window.solana.isPhantom) {
                      // Direct connection to Phantom if it's available
                      console.log('Connecting directly to Phantom wallet');
                      await window.solana.connect({ onlyIfTrusted: false });
                      
                      // Refresh the page after connection to ensure wallet state is updated
                      setTimeout(() => {
                        window.location.reload();
                      }, 500);
                    } else {
                      // Fallback to button clicking
                      console.log('Phantom not detected, trying wallet adapter');
                      const walletBtn = document.querySelector('.wallet-adapter-button-trigger');
                      if (walletBtn && walletBtn instanceof HTMLElement) {
                        walletBtn.click();
                      } else {
                        console.error('No wallet adapter button found');
                        alert('Please install Phantom wallet from https://phantom.app/');
                      }
                    }
                  } catch (error) {
                    console.error("Error connecting wallet:", error);
                    alert('Please install Phantom wallet from https://phantom.app/');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Connect
              </button>
            </div>
          </div>
        )}
        
        {/* Live Status - Always visible */}
        <div className="bg-white dark:bg-dark-surface rounded-xl p-3 shadow-sm border border-gray-100 dark:border-dark-border mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">Live - Last scan: {wallet.connected ? lastScan : new Date().toLocaleTimeString()}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Watching Meteora pools on BelieveApp
          </div>
        </div>
        
        {/* Dashboard Stats - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark dark:text-white">Currently Sniping</h3>
              <span className="text-secondary text-2xl font-bold">{wallet.connected ? currentlySnipingCount : '0'}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Active monitoring jobs</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark dark:text-white">Success Rate</h3>
              <div className="text-right">
                <span className="text-secondary text-2xl font-bold">{wallet.connected ? snipeSuccess.rate : '0%'}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({wallet.connected ? snipeSuccess.count : '0'} snipes)</span>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Last 7 days performance</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark dark:text-white">Tokens Monitored</h3>
              <span className="text-secondary text-2xl font-bold">{wallet.connected ? coinsMonitored : '--'}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">From BelieveApp in last 24h</p>
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark dark:text-white">Total Profit</h3>
              <span className="text-secondary text-2xl font-bold">{wallet.connected ? totalProfit : '--'}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Cumulative trader profit</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-dark-border">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'newPairs'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('newPairs')}
            >
              New Pairs Feed
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'active'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Current Snipes
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'sniper'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('sniper')}
            >
              Configure Sniper
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'graduated'
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('graduated')}
            >
              Graduated Coins
            </button>
          </div>
          
          {activeTab === 'newPairs' && (
            <div className="px-6 py-6 overflow-x-auto">
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Market Cap</label>
                  <select className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded w-full p-2 text-sm dark:text-white">
                    <option>Any Market Cap</option>
                    <option>$0 - $100K</option>
                    <option>$100K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M+</option>
                  </select>
                </div>
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Age</label>
                  <select className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded w-full p-2 text-sm dark:text-white">
                    <option>Any Age</option>
                    <option>Less than 1 hour</option>
                    <option>Less than 24 hours</option>
                    <option>Less than 7 days</option>
                  </select>
                </div>
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Holders</label>
                  <select className="bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded w-full p-2 text-sm dark:text-white">
                    <option>Any Holders</option>
                    <option>Less than 100</option>
                    <option>100 - 500</option>
                    <option>500 - 1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-dark-border">
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Token</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Market Cap</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Liquidity</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Pair Created</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Contract Age</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Holders</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                              {token.ticker.substring(1, 3)}
                            </div>
                            <div>
                              <div className="font-medium text-dark dark:text-white">{token.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                {token.ticker} 
                                <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-secondary/10 text-secondary rounded-full">Meteora</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-dark dark:text-white">{token.marketCap}</td>
                        <td className="py-4 text-dark dark:text-white">{token.liquidity}</td>
                        <td className="py-4 text-dark dark:text-white">{token.pairCreated}</td>
                        <td className="py-4 text-dark dark:text-white">{token.contractAge}</td>
                        <td className="py-4 text-dark dark:text-white">{token.holders}</td>
                        <td className="py-4">
                          <button 
                            className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                            onClick={() => handleSnipeToken(token.name)}
                          >
                            Snipe
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <button className="text-secondary text-sm font-medium hover:underline">
                    Load More Tokens
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'graduated' && (
            <div className="px-6 py-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-dark-border">
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Token</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Price</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">24h Change</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Market Cap</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">24h Volume</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Transactions</th>
                    <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {graduated.map((token, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                            {token.ticker.substring(1, 3)}
                          </div>
                          <div>
                            <div className="font-medium text-dark dark:text-white">{token.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              {token.ticker}
                              <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-secondary/10 text-secondary rounded-full">Meteora</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-dark dark:text-white">{token.price}</td>
                      <td className="py-4">
                        <span className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {token.change}
                        </span>
                      </td>
                      <td className="py-4 text-dark dark:text-white">{token.marketCap}</td>
                      <td className="py-4 text-dark dark:text-white">{token.volume}</td>
                      <td className="py-4 text-dark dark:text-white">{token.txCount}</td>
                      <td className="py-4">
                        <a 
                          href={`https://app.meteora.ag/swap?inputMint=So11111111111111111111111111111111111111112&outputMint=${token.ticker.substring(1)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                        >
                          Trade
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'sniper' && (
            <div className="px-6 py-6" data-section="sniper">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-6">
                  <h3 className="font-bold text-dark dark:text-white mb-4">X Account Monitoring</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Enter the handle of any X (Twitter) account. We will monitor this account for token deployment announcements from BelieveApp.</p>
                  
                  {monitoringFeedback && (
                    <div className={`p-3 mb-4 rounded-md ${isSnipeEnabled ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {monitoringFeedback}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">X Account Handle</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">@</span>
                      </div>
                      <input 
                        type="text" 
                        className="focus:ring-secondary focus:border-secondary block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                        placeholder="solanaproject" 
                        value={xAccountValue}
                        onChange={(e) => setXAccountValue(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount to Snipe (SOL)</label>
                    <input 
                      type="number" 
                      min="0.01" 
                      step="0.01" 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                      placeholder="0.1" 
                      value={snipeAmount}
                      onChange={(e) => setSnipeAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slippage Tolerance (%)</label>
                    <input 
                      type="number" 
                      min="0.1" 
                      max="100" 
                      step="0.1" 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                      placeholder="2.5" 
                      value={slippageTolerance}
                      onChange={(e) => setSlippageTolerance(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                      <div className="ml-auto text-xs text-secondary">Meteora Pool</div>
                    </div>
                    <select 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option>Medium</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>
                  
                  <button 
                    className={`w-full ${isSnipeEnabled ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'btn-primary'}`}
                    onClick={handleEnableMonitoring}
                    disabled={isSnipeEnabled}
                  >
                    {isSnipeEnabled ? 'Monitoring Enabled' : 'Enable Monitoring'}
                  </button>
                </div>
                
                <div className="bg-gray-50 dark:bg-dark-surface/60 rounded-lg p-6">
                  <h3 className="font-bold text-dark dark:text-white mb-4">Direct Snipe by Ticker or Name</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">If you know the $ticker or name of an upcoming BelieveApp Meteora pool, set up a snipe in advance.</p>
                  
                  {snipeFeedback && (
                    <div className={`p-3 mb-4 rounded-md ${isDirectSnipeSet ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {snipeFeedback}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token Ticker or Name</label>
                    <input 
                      type="text" 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                      placeholder="$EXAMPLE" 
                      value={tokenTickerValue}
                      onChange={(e) => setTokenTickerValue(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount to Snipe (SOL)</label>
                    <input 
                      type="number" 
                      min="0.01" 
                      step="0.01" 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                      placeholder="0.1" 
                      value={directSnipeAmount}
                      onChange={(e) => setDirectSnipeAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slippage Tolerance (%)</label>
                    <input 
                      type="number" 
                      min="0.1" 
                      max="100" 
                      step="0.1" 
                      className="focus:ring-secondary focus:border-secondary block w-full sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-2 border dark:bg-dark-surface dark:text-white" 
                      placeholder="2.5" 
                      value={directSnipeSlippage}
                      onChange={(e) => setDirectSnipeSlippage(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gas Optimization</label>
                    <div className="mt-1 flex items-center space-x-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Lower</span>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={gasOptimization} 
                        onChange={(e) => setGasOptimization(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Higher</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Higher gas ensures faster transaction execution</p>
                  </div>
                  
                  <button 
                    className={`w-full ${isDirectSnipeSet ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'btn-primary'}`}
                    onClick={handleSetDirectSnipe}
                    disabled={isDirectSnipeSet}
                  >
                    {isDirectSnipeSet ? 'Snipe Set' : 'Set Snipe'}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'active' && (
            <div className="px-6 py-6">
              <h3 className="font-bold text-dark dark:text-white mb-4">Active Snipes</h3>
              
              {activeSnipes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-200 dark:border-dark-border">
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Target</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Type</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Amount</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Slippage</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Priority</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Created</th>
                        <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSnipes.map((snipe, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition-colors">
                          <td className="py-4 text-dark dark:text-white">{snipe.target}</td>
                          <td className="py-4 text-dark dark:text-white">{snipe.type}</td>
                          <td className="py-4 text-dark dark:text-white">{snipe.amount}</td>
                          <td className="py-4 text-dark dark:text-white">{snipe.slippage}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              snipe.priority === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 
                              snipe.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : 
                              'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            }`}>
                              {snipe.priority}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary bg-opacity-10 text-secondary">
                              {snipe.status}
                            </span>
                          </td>
                          <td className="py-4 text-gray-500 dark:text-gray-400 text-sm">{snipe.created}</td>
                          <td className="py-4">
                            <button 
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-xs font-medium"
                              onClick={() => handleCancelSnipe(snipe.target)}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-dark-surface/60 p-8 rounded-lg text-center">
                  <p className="text-gray-500 dark:text-gray-400">No active snipes. Configure a snipe to get started.</p>
                  <button 
                    className="mt-4 btn-primary"
                    onClick={() => setActiveTab('sniper')}
                  >
                    Configure Sniper
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Dashboard */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
              User Dashboard
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Manage your positions and track your performance
            </p>
          </div>

          {/* User Balances */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
              <h3 className="text-lg font-bold text-dark dark:text-white mb-2">SOL Balance</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#9945FF]/20 mr-3 flex items-center justify-center text-xs text-[#9945FF]">
                  SOL
                </div>
                <span className="text-2xl font-bold text-dark dark:text-white">{userBalances.sol} SOL</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
              <h3 className="text-lg font-bold text-dark dark:text-white mb-2">$SOB Balance</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs text-secondary">
                  SOB
                </div>
                <span className="text-2xl font-bold text-dark dark:text-white">{userBalances.sob} $SOB</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
              <h3 className="text-lg font-bold text-dark dark:text-white mb-2">Total Portfolio Value</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                  <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-dark dark:text-white">
                  {parseFloat(userBalances.sol) + 2.8} SOL
                </span>
                <span className="ml-2 text-green-500 text-sm">
                  +18.5%
                </span>
              </div>
            </div>
          </div>

          {/* User Token Positions */}
          <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border">
              <h3 className="font-bold text-dark dark:text-white">Your Positions</h3>
            </div>
            
            <div className="px-6 py-6 overflow-x-auto">
              {userBalances.positions.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-dark-border">
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Token</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Amount</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Value</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Buy Price</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Current Price</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Profit/Loss</th>
                      <th className="pb-3 text-gray-500 dark:text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBalances.positions.map((position, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 mr-3 flex items-center justify-center text-xs">
                              {position.ticker.substring(1, 3)}
                            </div>
                            <div>
                              <div className="font-medium text-dark dark:text-white">{position.token}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                {position.ticker}
                                <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-secondary/10 text-secondary rounded-full">Meteora</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-dark dark:text-white">{position.amount}</td>
                        <td className="py-4 text-dark dark:text-white">{position.value}</td>
                        <td className="py-4 text-dark dark:text-white">{position.buyPrice}</td>
                        <td className="py-4 text-dark dark:text-white">{position.currentPrice}</td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-green-500">{position.profit}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{position.profitValue}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <button 
                            className="bg-secondary text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-all"
                            onClick={() => handleSellPosition(position.token)}
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No positions yet. Start sniping to build your portfolio!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard; 