import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GovernancePage() {
  // Placeholder data for proposals
  const proposals = [
    {
      id: "1",
      programId: "Abcdef1234567890abcdef1234567890abcdef1234567890",
      description: "Enable new transfer hook for enhanced security features.",
      votesFor: 150000,
      votesAgainst: 50000,
    },
    {
      id: "2",
      programId: "Ghijklmnopqrstuvwxyzabcdefghijklmnopqr",
      description: "Integrate a new fee structure via transfer hook.",
      votesFor: 80000,
      votesAgainst: 120000,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center p-4 pt-20 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-8">
        {/* Submit New Proposal Section */}
        <Card className="border border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Submit New Proposal</CardTitle>
            <CardDescription>Propose a new transfer hook program ID for community voting.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newProgramId">Transfer Hook Program ID</Label>
              <Input
                id="newProgramId"
                placeholder="Enter program ID"
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="proposalDescription">Description</Label>
              <Input
                id="proposalDescription"
                placeholder="Briefly describe the proposal"
                className="bg-input border-border text-foreground"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Proposal</Button>
          </CardFooter>
        </Card>

        {/* Existing Proposals Section */}
        <h2 className="text-3xl font-bold text-center text-foreground">Active Proposals</h2>
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="border border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-xl">Proposal #{proposal.id}</CardTitle>
                <CardDescription>{proposal.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <p className="text-foreground">
                  <span className="font-medium">Program ID:</span> {proposal.programId}
                </p>
                <div className="flex justify-between text-sm text-foreground">
                  <span>
                    Votes For: <span className="font-bold text-success">{proposal.votesFor.toLocaleString()} RAY</span>
                  </span>
                  <span>
                    Votes Against:{" "}
                    <span className="font-bold text-destructive">{proposal.votesAgainst.toLocaleString()} RAY</span>
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-success text-primary-foreground hover:bg-success/90">Vote For</Button>
                <Button className="flex-1 bg-destructive text-primary-foreground hover:bg-destructive/90">
                  Vote Against
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
