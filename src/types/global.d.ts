// Global type declarations for browser-specific APIs and extensions

interface Window {
  solana?: {
    isPhantom?: boolean;
    connect: () => Promise<{ publicKey: string }>;
    disconnect: () => Promise<void>;
    on: (event: string, callback: Function) => void;
    request: (request: { method: string; params?: any }) => Promise<any>;
  };
} 