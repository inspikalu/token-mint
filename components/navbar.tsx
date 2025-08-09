"use client"
import type React from "react"
import { useState } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Link from "next/link"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Create Liquidity Pool", href: "/create-liquidity-pool" },
    { name: "Swap Tokens", href: "/swap" },
    { name: "Create Mint", href: "/create-mint" },
    { name: "Governance", href: "/governance" },
  ]

  return (
    <nav className="w-full bg-card h-16 flex items-center justify-between px-6 md:px-12 border-b border-border">
      {/* Logo */}
      <div className="text-primary text-xl font-bold">TACTICAL OPS</div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-foreground hover:text-primary text-lg font-medium transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
      </div>
      {/* Wallet Button (Desktop) */}
      <div className="hidden md:block">
        <WalletMultiButton className="!bg-primary !text-primary-foreground !px-4 !py-2 !rounded-sm hover:!bg-primary/90" />
      </div>
      {/* Mobile Menu Button */}
      <button className="md:hidden text-foreground focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-card shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden transition-all duration-300 ease-in-out z-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary text-lg font-medium transition-colors duration-200 hover:bg-muted px-4 py-2 rounded-sm w-3/4 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <WalletMultiButton className="!bg-primary !text-primary-foreground !px-4 !py-2 !rounded-sm hover:!bg-primary/90 w-3/4" />
        </div>
      )}
    </nav>
  )
}

export default Navbar
