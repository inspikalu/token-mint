import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Connection, 
  Keypair, 
  PublicKey, 
  SystemProgram, 
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  ExtensionType,
  createInitializeTransferHookInstruction
} from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react'; // Import wallet adapter hook

// Types
interface MintConfig {
  name: string;
  ticker: string;
  image: string;
  transferHookProgramId?: string;
  decimals?: number;
}

interface CreateMintResult {
  mintAddress: string;
  signature: string;
  success: boolean;
  error?: string;
}

interface UseCreateMintReturn {
  createMint: (config: MintConfig) => Promise<CreateMintResult>;
  isLoading: boolean;
  error: string | null;
}

// Custom hook for creating mint with Token 2022
function useCreateMint(connection: Connection): UseCreateMintReturn {
  const { publicKey, signTransaction } = useWallet(); // Get wallet info
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMint = useCallback(async (config: MintConfig): Promise<CreateMintResult> => {
    if (!publicKey || !signTransaction) {
      const errorMessage = 'Wallet not connected';
      setError(errorMessage);
      return {
        mintAddress: '',
        signature: '',
        success: false,
        error: errorMessage,
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate new keypair for the mint
      const mintKeypair = Keypair.generate();
      const mintAddress = mintKeypair.publicKey;
      
      // Determine extensions based on config
      const extensions: ExtensionType[] = [];
      
      if (config.transferHookProgramId) {
        extensions.push(ExtensionType.TransferHook);
      }

      // Calculate mint account size with extensions
      const mintLen = getMintLen(extensions);
      
      // Calculate minimum lamports for rent exemption
      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);

      const transaction = new Transaction();

      // Create account instruction
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: publicKey, // Use wallet's public key
          newAccountPubkey: mintAddress,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        })
      );

      // Initialize transfer hook extension if specified
      if (config.transferHookProgramId) {
        try {
          const transferHookProgramId = new PublicKey(config.transferHookProgramId);
          transaction.add(
            createInitializeTransferHookInstruction(
              mintAddress,
              publicKey, // Use wallet's public key
              transferHookProgramId,
              TOKEN_2022_PROGRAM_ID
            )
          );
        } catch (err) {
          throw new Error('Invalid transfer hook program ID');
        }
      }

      // Initialize mint instruction
      transaction.add(
        createInitializeMintInstruction(
          mintAddress,
          config.decimals || 9,
          publicKey, // Use wallet's public key
          null, // freeze authority (optional)
          TOKEN_2022_PROGRAM_ID
        )
      );

      // Set recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Sign transaction with wallet and mint keypair
      const signedTransaction = await signTransaction(transaction);
      signedTransaction.partialSign(mintKeypair);

      // Send and confirm transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      await connection.confirmTransaction(signature, 'confirmed');

      return {
        mintAddress: mintAddress.toString(),
        signature,
        success: true,
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      return {
        mintAddress: '',
        signature: '',
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey, signTransaction]);

  return {
    createMint,
    isLoading,
    error,
  };
}

// Solana connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

export default function CreateMintPage() {
  const { connected } = useWallet(); // Check if wallet is connected
  const { createMint, isLoading, error } = useCreateMint(connection);
  const [formData, setFormData] = useState<MintConfig>({
    name: '',
    ticker: '',
    image: '',
    transferHookProgramId: '',
    decimals: 9,
  });
  const [result, setResult] = useState<CreateMintResult | null>(null);

  const handleInputChange = (field: keyof MintConfig) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.ticker) {
      alert('Please fill in required fields');
      return;
    }

    if (!connected) {
      alert('Please connect your wallet');
      return;
    }

    const config: MintConfig = {
      ...formData,
      transferHookProgramId: formData.transferHookProgramId || undefined,
    };

    const mintResult = await createMint(config);
    setResult(mintResult);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md border border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Mint</CardTitle>
          <CardDescription>Enter the details for your new Token 2022 program.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Token Name *</Label>
            <Input 
              id="name" 
              placeholder="My Awesome Token" 
              className="bg-input border-border text-foreground"
              value={formData.name}
              onChange={handleInputChange('name')}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ticker">Token Ticker *</Label>
            <Input 
              id="ticker" 
              placeholder="MAT" 
              className="bg-input border-border text-foreground"
              value={formData.ticker}
              onChange={handleInputChange('ticker')}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL (Metadata - Coming Soon)</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/token-logo.png"
              className="bg-input border-border text-foreground opacity-60"
              value={formData.image}
              onChange={handleInputChange('image')}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="decimals">Decimals</Label>
            <Input
              id="decimals"
              type="number"
              placeholder="9"
              className="bg-input border-border text-foreground"
              value={formData.decimals}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                decimals: parseInt(e.target.value) || 9
              }))}
              min="0"
              max="18"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="transferHookProgramId">Transfer Hook Program ID</Label>
            <Input
              id="transferHookProgramId"
              placeholder="Enter program ID (optional)"
              className="bg-input border-border text-foreground"
              value={formData.transferHookProgramId}
              onChange={handleInputChange('transferHookProgramId')}
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
              Error: {error}
            </div>
          )}
          
          {result && result.success && (
            <div className="text-green-700 text-sm bg-green-50 p-3 rounded border border-green-200">
              <div><strong>Mint created successfully!</strong></div>
              <div className="mt-1 break-all">
                <strong>Address:</strong> {result.mintAddress}
              </div>
              <div className="mt-1 break-all">
                <strong>Signature:</strong> {result.signature}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading || !connected}
          >
            {isLoading ? 'Creating Mint...' : !connected ? 'Connect Wallet' : 'Create Mint'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}