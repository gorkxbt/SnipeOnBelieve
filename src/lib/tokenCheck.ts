import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// For demo purposes, we're using a placeholder token address
// In a real implementation, this would be the actual $SOB token mint address
const SOB_TOKEN_MINT = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
const MINIMUM_TOKEN_AMOUNT = 1000 * (10 ** 9); // 1000 tokens with 9 decimals

/**
 * Checks if a wallet has the minimum required $SOB tokens
 * @param walletAddress The public key of the user's wallet
 * @param connection A Solana connection instance
 * @returns A promise that resolves to a boolean indicating if the user has enough tokens
 */
export async function hasMinimumTokens(
  walletAddress: PublicKey,
  connection: Connection
): Promise<boolean> {
  try {
    // Find all token accounts owned by this wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Look for the SOB token account
    for (const { account } of tokenAccounts.value) {
      const parsedInfo = account.data.parsed.info;
      const tokenMint = parsedInfo.mint;
      const tokenAmount = parsedInfo.tokenAmount;

      // Check if this is the SOB token and if the amount is sufficient
      if (
        tokenMint === SOB_TOKEN_MINT.toString() &&
        Number(tokenAmount.amount) >= MINIMUM_TOKEN_AMOUNT
      ) {
        return true;
      }
    }

    // SOB token not found or insufficient amount
    return false;
  } catch (error) {
    console.error('Error checking token balance:', error);
    return false;
  }
}

/**
 * For demo purposes: A fake version of the check that always returns true
 * This can be used during development when you don't want to require real tokens
 */
export function fakeHasMinimumTokens(): Promise<boolean> {
  return Promise.resolve(true);
}

/**
 * Calculates how many more tokens the user needs to meet the minimum requirement
 * @param walletAddress The public key of the user's wallet
 * @param connection A Solana connection instance
 * @returns A promise that resolves to the number of additional tokens needed
 */
export async function getAdditionalTokensNeeded(
  walletAddress: PublicKey,
  connection: Connection
): Promise<number> {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Look for the SOB token account
    for (const { account } of tokenAccounts.value) {
      const parsedInfo = account.data.parsed.info;
      const tokenMint = parsedInfo.mint;
      const tokenAmount = parsedInfo.tokenAmount;

      if (tokenMint === SOB_TOKEN_MINT.toString()) {
        const currentAmount = Number(tokenAmount.amount) / (10 ** 9); // Convert to token units
        if (currentAmount >= 1000) {
          return 0;
        } else {
          return 1000 - currentAmount;
        }
      }
    }

    // SOB token not found
    return 1000;
  } catch (error) {
    console.error('Error checking token balance:', error);
    return 1000;
  }
} 