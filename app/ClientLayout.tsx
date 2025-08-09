"use client"

import type React from "react"
import { useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

import Navbar from "@/components/navbar"
import "@solana/wallet-adapter-react-ui/styles.css" // Import wallet adapter styles

interface ClientLayoutProps {
  children: React.ReactNode
  spaceMonoVariable: string
}

export default function ClientLayout({ children, spaceMonoVariable }: ClientLayoutProps) {
  const network = WalletAdapterNetwork.Devnet // You can change this to Mainnet-beta, Testnet, etc.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()],
    [network],
  )

  return (
    <html lang="en" className={`dark ${spaceMonoVariable}`}>
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Navbar />
              <main>{children}</main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  )
}
