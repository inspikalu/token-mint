"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useEffect } from "react"

const Home: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/swap")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div>Redirecting to Swap page...</div>
    </div>
  )
}

export default Home
