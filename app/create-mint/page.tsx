import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateMintPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md border border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Mint</CardTitle>
          <CardDescription>Enter the details for your new Token 2022 program.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Token Name</Label>
            <Input id="name" placeholder="My Awesome Token" className="bg-input border-border text-foreground" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ticker">Token Ticker</Label>
            <Input id="ticker" placeholder="MAT" className="bg-input border-border text-foreground" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/token-logo.png"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="transferHookProgramId">Transfer Hook Program ID</Label>
            <Input
              id="transferHookProgramId"
              placeholder="Enter program ID (optional)"
              className="bg-input border-border text-foreground"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Create Mint</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
