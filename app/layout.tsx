import type React from "react"
import { Space_Mono } from "next/font/google" // Import Space Mono
import "./globals.css"
import ClientLayout from "./ClientLayout"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout children={children} spaceMonoVariable={spaceMono.variable || ""} />
}

export const metadata = {
    };
