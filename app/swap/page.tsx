import type React from "react"

const SwapPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-start justify-center bg-background text-foreground pt-20">
      <div className="w-full max-w-md p-6">
        <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
          <div className="space-y-4">
            {/* From Section */}
            <div>
              <label className="text-foreground text-sm block mb-2">From</label>
              <div className="flex items-center justify-between bg-input p-3 rounded-md border border-border">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-primary rounded-full"></span>
                  <span className="text-foreground font-medium">SOL</span>
                  <span className="text-foreground text-sm">▼</span>
                </div>
                <div className="space-x-2">
                  <button className="text-foreground text-sm bg-secondary px-2 py-1 rounded hover:bg-secondary/80">
                    Max
                  </button>
                  <button className="text-foreground text-sm bg-secondary px-2 py-1 rounded hover:bg-secondary/80">
                    50%
                  </button>
                </div>
              </div>
              <div className="text-right text-muted-foreground text-xs mt-1">$0</div>
            </div>
            {/* Swap Arrow */}
            <div className="flex justify-center">
              <button className="text-foreground bg-secondary p-2 rounded-full border border-border hover:bg-secondary/80">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {/* To Section */}
            <div>
              <label className="text-foreground text-sm block mb-2">To</label>
              <div className="flex items-center justify-between bg-input p-3 rounded-md border border-border">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-primary rounded-full"></span>
                  <span className="text-foreground font-medium">RAY</span>
                  <span className="text-foreground text-sm">▼</span>
                </div>
                <div className="space-x-2">
                  <button className="text-foreground text-sm bg-secondary px-2 py-1 rounded hover:bg-secondary/80">
                    Max
                  </button>
                  <button className="text-foreground text-sm bg-secondary px-2 py-1 rounded hover:bg-secondary/80">
                    50%
                  </button>
                </div>
              </div>
              <div className="text-right text-muted-foreground text-xs mt-1">$0</div>
            </div>
            {/* Connect Wallet Button */}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SwapPage
