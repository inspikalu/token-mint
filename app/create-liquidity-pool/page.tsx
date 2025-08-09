import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateLiquidityPoolPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Liquidity Pool</CardTitle>
          <CardDescription>Provide liquidity for a token pair.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="tokenA">Token A</Label>
            <Select>
              <SelectTrigger id="tokenA">
                <SelectValue placeholder="Select Token A" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sol">SOL</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="ray">RAY</SelectItem>
              </SelectContent>
            </Select>
            <Input id="amountA" type="number" placeholder="Amount of Token A" className="mt-2" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tokenB">Token B</Label>
            <Select>
              <SelectTrigger id="tokenB">
                <SelectValue placeholder="Select Token B" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sol">SOL</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="ray">RAY</SelectItem>
              </SelectContent>
            </Select>
            <Input id="amountB" type="number" placeholder="Amount of Token B" className="mt-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Pool</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
