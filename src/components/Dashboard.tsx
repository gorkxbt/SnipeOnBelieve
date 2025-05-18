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

  // Function to properly connect to Phantom wallet
  const connectPhantomWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.solana) {
        // Check if Phantom is installed
        const isPhantomInstalled = window.solana && window.solana.isPhantom;
        
        if (isPhantomInstalled) {
          // Direct connection to Phantom
          try {
            const response = await window.solana.connect();
            console.log("Connected to Phantom wallet:", response.publicKey.toString());
            
            // Force a page refresh to update wallet state
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } catch (err) {
            console.error("Connection error:", err);
            // Try alternative connect method if the first fails
            try {
              await window.solana.connect({ onlyIfTrusted: false });
            } catch (finalErr) {
              console.error("Final connection error:", finalErr);
              alert("Could not connect to Phantom wallet. Please make sure it's unlocked and try again.");
            }
          }
        } else {
          alert("Phantom wallet is not installed. Please install it from https://phantom.app/");
          window.open("https://phantom.app/", "_blank");
        }
      } else {
        alert("Phantom wallet extension not detected. Please install it from https://phantom.app/");
        window.open("https://phantom.app/", "_blank");
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
      alert("Failed to connect to Phantom wallet. Please try again.");
    }
  };

  return (
    <section id="dashboard" className="py-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sniper Wallet Section - Improved Design */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
              <span className="relative inline-block">
                Sniper Wallet
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></div>
              </span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Manage your dedicated sniper wallet for automated token sniping
            </p>
          </div>

          {!wallet.connected ? (
            <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-lg border border-gray-100 dark:border-dark-border">
              <div className="text-center max-w-xl mx-auto">
                <div className="mb-6 bg-secondary/10 rounded-full p-5 w-20 h-20 mx-auto flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">Connect Your Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect your Phantom wallet to generate a secure sniper wallet for automated trading operations
                </p>
                <button 
                  className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all flex items-center mx-auto"
                  onClick={connectPhantomWallet}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Connect Phantom Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-dark-surface rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-dark-border overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-5 transform rotate-45">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              
              {!sniperWallet ? (
                <div className="text-center max-w-xl mx-auto">
                  <div className="mb-6 bg-secondary/10 rounded-full p-5 w-20 h-20 mx-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Generate Your Sniper Wallet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Create a dedicated wallet for automated sniping operations. All your trades will be executed from this wallet.
                  </p>
                  <button
                    className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all flex items-center mx-auto transform hover:scale-105"
                    onClick={generateSniperWallet}
                    disabled={isGeneratingWallet}
                  >
                    {isGeneratingWallet ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        Generate Sniper Wallet
                      </>
                    )}
                  </button>
                  {walletError && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {walletError}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-surface/60 dark:to-dark-surface/40 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border/50 transform transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="bg-secondary/20 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-dark dark:text-white text-xl">Sniper Wallet Info</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Public Key</label>
                        <div className="bg-white dark:bg-dark-surface p-3 rounded-md border border-gray-200 dark:border-dark-border/50 break-all text-sm text-gray-700 dark:text-gray-300 font-mono">
                          {sniperWallet.publicKey}
                        </div>
                        <button 
                          className="mt-1 text-xs text-secondary hover:text-secondary/80 flex items-center"
                          onClick={() => {
                            navigator.clipboard.writeText(sniperWallet.publicKey);
                            alert('Public key copied to clipboard');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy address
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Balance</label>
                        <div className="bg-gradient-to-r from-secondary/10 to-transparent p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#9945FF]/20 mr-3 flex items-center justify-center text-xs text-[#9945FF] font-medium">
                              SOL
                            </div>
                            <div>
                              <div className="text-3xl font-bold text-dark dark:text-white">
                                {sniperWallet.balance.toFixed(4)} SOL
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Last updated: {new Date().toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Security Info</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          This wallet's private key is encrypted and stored locally. Never share your private key with anyone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border transform transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-dark dark:text-white text-xl">Deposit SOL</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Amount (SOL)</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(e.target.value)}
                              className="focus:ring-secondary focus:border-secondary block w-full pl-3 pr-12 sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-3 border dark:bg-dark-surface dark:text-white"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">SOL</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md transition-all flex items-center justify-center"
                          onClick={handleDeposit}
                          disabled={isProcessing || !depositAmount}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Deposit...
                            </>
                          ) : (
                            <>Deposit to Sniper Wallet</>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border transform transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-dark dark:text-white text-xl">Withdraw SOL</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">Amount (SOL)</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              max={sniperWallet.balance}
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value)}
                              className="focus:ring-secondary focus:border-secondary block w-full pl-3 pr-12 sm:text-sm border-gray-300 dark:border-dark-border rounded-md py-3 border dark:bg-dark-surface dark:text-white"
                              placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">SOL</span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition-all flex items-center justify-center"
                          onClick={handleWithdraw}
                          disabled={isProcessing || !withdrawAmount || Number(withdrawAmount) > sniperWallet.balance}
                        >
                          {isProcessing ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Withdrawal...
                            </>
                          ) : (
                            <>Withdraw to Connected Wallet</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Dashboard Section - Improved Design */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
              <span className="relative inline-block">
                BelieveApp Sniper Dashboard
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-secondary rounded-full"></div>
              </span>
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Advanced token sniping for new Meteora pools on BelieveApp
            </p>
          </div>
          
          {/* Optional Wallet Connection Section - Improved */}
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
                  onClick={connectPhantomWallet}
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
            
            {/* Tab Content - Add proper closing tags */}
            {activeTab === 'newPairs' && (
              <div className="px-6 py-6 overflow-x-auto">
                {/* New Pairs Content */}
              </div>
            )}
            
            {activeTab === 'active' && (
              <div className="px-6 py-6">
                {/* Active Content */}
              </div>
            )}
            
            {activeTab === 'sniper' && (
              <div className="px-6 py-6" data-section="sniper">
                {/* Sniper Content */}
              </div>
            )}
            
            {activeTab === 'graduated' && (
              <div className="px-6 py-6 overflow-x-auto">
                {/* Graduated Content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard; 