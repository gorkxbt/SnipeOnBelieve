import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { fakeHasMinimumTokens } from '../lib/tokenCheck';
import { useTheme } from '@/lib/ThemeContext';
import { createRoot } from 'react-dom/client';

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
  
  return (
    <section id="dashboard" className="py-24 bg-light dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white">
            BelieveApp Sniper Dashboard
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Advanced token sniping for new Meteora pools on BelieveApp
          </p>
        </div>
        
        {!wallet.connected ? (
          <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm border border-gray-100 dark:border-dark-border text-center">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Connect Your Wallet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your wallet to access the sniping tools.
            </p>
            <button 
              className="btn-primary bg-secondary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-full transition-all flex items-center mx-auto"
              onClick={() => {
                try {
                  // More reliable method to click the wallet adapter button
                  const walletBtn = document.querySelector('.wallet-adapter-button-trigger');
                  if (walletBtn && walletBtn instanceof HTMLElement) {
                    walletBtn.click();
                  } else {
                    // Fallback method - create a WalletMultiButton programmatically
                    import('@solana/wallet-adapter-react-ui').then(({ WalletMultiButton }) => {
                      const tempButton = document.createElement('div');
                      document.body.appendChild(tempButton);
                      const root = createRoot(tempButton);
                      root.render(<WalletMultiButton />);
                      
                      setTimeout(() => {
                        const createdBtn = document.querySelector('.wallet-adapter-button-trigger');
                        if (createdBtn && createdBtn instanceof HTMLElement) {
                          createdBtn.click();
                          // Clean up
                          setTimeout(() => {
                            root.unmount();
                            document.body.removeChild(tempButton);
                          }, 500);
                        }
                      }, 100);
                    }).catch(console.error);
                  }
                } catch (error) {
                  console.error("Error clicking wallet button:", error);
                }
              }}
            >
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M21.3853 8.50991C21.3388 8.37356 21.2481 8.25692 21.1278 8.17751C21.0075 8.0981 20.865 8.0603 20.7206 8.07144H15.6301C15.6878 7.62485 15.6909 7.17289 15.6394 6.72561C15.5171 5.65689 15.0911 4.64355 14.4147 3.80141C13.9302 3.21816 13.2857 2.78116 12.5531 2.54549C11.8206 2.30982 11.0343 2.28504 10.2886 2.47446C9.57169 2.69321 8.92487 3.10207 8.41984 3.65854C7.95364 4.20862 7.63047 4.86461 7.47841 5.56982C7.32051 6.37077 7.3225 7.19683 7.48424 7.997C7.54621 8.22383 7.62395 8.44533 7.71667 8.66C7.4253 9.11454 7.05626 9.5102 6.6292 9.8303C6.43402 9.94862 6.26121 10.1009 6.12087 10.2801C6.00383 10.43 5.92179 10.6035 5.88161 10.7882C5.84144 10.9729 5.84417 11.1641 5.88959 11.3473C5.93501 11.5305 6.02189 11.701 6.14285 11.847C6.26381 11.993 6.41559 12.1107 6.59081 12.1918C7.25798 12.452 7.73809 13.0064 7.88651 13.6818C7.96392 14.0576 7.98472 14.4435 7.94818 14.8256C7.90982 15.1891 7.81348 15.5438 7.66317 15.878C7.49613 16.2283 7.18962 16.4922 6.81937 16.609C6.44912 16.7258 6.04718 16.684 5.70968 16.4937C5.1794 16.2097 4.55974 16.11 3.96557 16.2133C3.37139 16.3166 2.84274 16.6158 2.48159 17.0575C2.3213 17.2448 2.21 17.4667 2.15711 17.7043C2.10423 17.9419 2.11119 18.1879 2.17733 18.4221C2.23756 18.657 2.3495 18.8743 2.5033 19.0579C2.6571 19.2414 2.84928 19.387 3.06572 19.4846C3.2839 19.5943 3.52204 19.6574 3.76547 19.6703C4.67413 19.7149 5.57908 19.8424 6.4696 20.0509C8.19334 20.4632 9.99267 20.4632 11.7164 20.0509C12.2991 19.8891 12.8686 19.6845 13.4212 19.4382C13.8857 19.2312 14.3136 18.9497 14.6895 18.605C15.6042 17.7458 16.3173 16.6996 16.7824 15.5375C17.2476 14.3754 17.4547 13.1267 17.3903 11.879C17.3654 11.2834 17.4268 10.6875 17.5732 10.1094C17.7144 9.47942 18.0301 8.90643 18.4826 8.44979C18.5847 8.35205 18.6633 8.23335 18.7123 8.10166C18.7614 7.96996 18.7796 7.82889 18.7656 7.68915C18.7444 7.55052 18.689 7.41853 18.6038 7.30339C18.5186 7.18825 18.4063 7.09299 18.2756 7.02496C18.0044 6.89181 17.6929 6.86271 17.4004 6.94326C16.4193 7.22063 15.35 7.03695 14.5435 6.45101C14.3359 6.28903 14.1727 6.07825 14.0673 5.83669C13.9619 5.59513 13.9171 5.3297 13.9371 5.06511C13.9372 4.75516 14.0208 4.4513 14.1787 4.18675C14.3365 3.9222 14.563 3.70628 14.8351 3.5608C15.1071 3.41531 15.4144 3.34574 15.7243 3.35871C16.0343 3.37168 16.335 3.46668 16.5939 3.63375C16.8527 3.80083 17.061 4.03344 17.1962 4.30861C17.3315 4.58378 17.3889 4.89024 17.3626 5.1973C17.3363 5.50437 17.2272 5.79882 17.046 6.04693C16.919 6.22025 16.7526 6.36066 16.5598 6.4573C16.3671 6.55394 16.1532 6.6046 15.935 6.6049H15.9046C15.8245 6.60475 15.7467 6.63269 15.6861 6.6836C15.6254 6.73451 15.5857 6.80476 15.5741 6.88358C15.5625 6.9624 15.5797 7.0427 15.6227 7.10948C15.6656 7.17626 15.7314 7.2247 15.8086 7.24604C16.0284 7.31173 16.2602 7.32914 16.487 7.29683C16.7138 7.26453 16.9285 7.18339 17.1132 7.06C17.3909 6.87851 17.6241 6.63425 17.795 6.34527C17.9658 6.05628 18.0693 5.72958 18.0972 5.39051C18.1199 5.03795 18.053 4.68553 17.903 4.36713C17.7531 4.04873 17.5246 3.77638 17.241 3.57665C16.9574 3.37692 16.6278 3.25636 16.2861 3.2257C15.9444 3.19504 15.5992 3.25513 15.2835 3.40042C14.9718 3.54503 14.6975 3.76345 14.4835 4.03811C14.2696 4.31278 14.1215 4.6357 14.0508 4.97998C14.0264 5.09518 14.0132 5.21287 14.0115 5.33111C14.0115 5.41639 14.0115 5.50334 14.0115 5.58861C13.2608 5.93911 12.5891 6.45187 12.045 7.09196C11.8765 7.27976 11.7158 7.47548 11.563 7.67816C11.4363 7.53744 11.3036 7.40225 11.1653 7.27282C10.7249 6.84399 10.361 6.33965 10.0938 5.78376C9.95844 5.53093 9.86056 5.25815 9.80368 4.97546C9.63611 4.1265 9.86352 3.25229 10.4197 2.60174C10.6143 2.42086 10.8629 2.30669 11.1271 2.27743C11.3913 2.24817 11.659 2.30538 11.8893 2.44E-07C12.2351 2.54963 12.6334 2.35022 13.008 2.27222C13.3827 2.19422 13.7713 2.24144 14.1219 2.4068C14.8297 2.77022 15.4165 3.32326 15.8177 4.00471C16.219 4.68616 16.4184 5.46753 16.3932 6.25886C16.3922 6.81111 16.2803 7.35662 16.0642 7.86053H18.7387L19.2089 7.93884C19.2739 7.95075 19.3338 7.97929 19.3818 8.02125C19.4297 8.06321 19.4638 8.11698 19.4801 8.17707L21.3788 8.20323C21.5247 8.20323 21.6634 8.26087 21.7649 8.36242C21.8664 8.46397 21.9241 8.60279 21.9241 8.74874C21.9242 8.81916 21.9106 8.8889 21.8853 8.95378L21.3853 8.50991Z" fill="white"/>
              </svg>
              Connect
            </button>
          </div>
        ) : isLoading ? (
          <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm border border-gray-100 dark:border-dark-border text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ) : !hasAccessTokens ? (
          <div className="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm border border-gray-100 dark:border-dark-border text-center">
            <h3 className="text-xl font-bold text-dark dark:text-white mb-4">Insufficient $SOB Tokens</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need at least 1,000 $SOB tokens to access the sniping tools.
            </p>
            <a href="https://raydium.io/swap/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buy $SOB Tokens
            </a>
          </div>
        ) : (
          <>
            {/* Live Status */}
            <div className="bg-white dark:bg-dark-surface rounded-xl p-3 shadow-sm border border-gray-100 dark:border-dark-border mb-8 flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Live - Last scan: {lastScan}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Watching Meteora pools on BelieveApp
              </div>
            </div>
          
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark dark:text-white">Currently Sniping</h3>
                  <span className="text-secondary text-2xl font-bold">{currentlySnipingCount}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Active monitoring jobs</p>
              </div>
              <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark dark:text-white">Success Rate</h3>
                  <div className="text-right">
                    <span className="text-secondary text-2xl font-bold">{snipeSuccess.rate}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({snipeSuccess.count} snipes)</span>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Last 7 days performance</p>
              </div>
              <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark dark:text-white">Tokens Monitored</h3>
                  <span className="text-secondary text-2xl font-bold">{coinsMonitored}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">From BelieveApp in last 24h</p>
              </div>
              <div className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-dark dark:text-white">Total Profit</h3>
                  <span className="text-secondary text-2xl font-bold">{totalProfit}</span>
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
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard; 