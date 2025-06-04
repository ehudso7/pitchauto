'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Copy, 
  Download,
  Share2,
  BarChart,
  Zap
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Proposal {
  id: string
  jobTitle: string
  content: string
  confidence: number
  createdAt: Date
  status: 'draft' | 'sent' | 'won' | 'lost'
}

export default function DashboardPage() {
  // const { user } = useUser() // Commented for demo mode
  const user = { emailAddresses: [{ emailAddress: 'demo@pitchauto.com' }] } // Demo user
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [generating, setGenerating] = useState(false)
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [skills, setSkills] = useState('')
  const [tone, setTone] = useState('professional')
  const [currentProposal, setCurrentProposal] = useState<string>('')
  const [confidence, setConfidence] = useState<number>(0)

  const stats = {
    totalProposals: proposals.length,
    sentProposals: proposals.filter(p => p.status === 'sent').length,
    wonProposals: proposals.filter(p => p.status === 'won').length,
    successRate: proposals.length > 0 
      ? Math.round((proposals.filter(p => p.status === 'won').length / proposals.filter(p => p.status !== 'draft').length) * 100) || 0
      : 0
  }

  async function generateProposal() {
    if (!jobTitle || !jobDescription) {
      toast({
        title: 'Missing information',
        description: 'Please fill in the job title and description',
        variant: 'destructive'
      })
      return
    }

    setGenerating(true)
    
    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          skills,
          tone
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setCurrentProposal(data.proposal.content)
        setConfidence(data.proposal.confidence)
        
        // Add to proposals list
        const newProposal: Proposal = {
          id: Date.now().toString(),
          jobTitle,
          content: data.proposal.content,
          confidence: data.proposal.confidence,
          createdAt: new Date(),
          status: 'draft'
        }
        
        setProposals([newProposal, ...proposals])
        
        toast({
          title: 'Proposal generated!',
          description: `Confidence score: ${Math.round(data.proposal.confidence * 100)}%`
        })
      }
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: 'Please try again',
        variant: 'destructive'
      })
    } finally {
      setGenerating(false)
    }
  }

  function copyProposal() {
    navigator.clipboard.writeText(currentProposal)
    toast({
      title: 'Copied!',
      description: 'Proposal copied to clipboard'
    })
  }

  function downloadProposal() {
    const blob = new Blob([currentProposal], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proposal-${jobTitle.replace(/\s+/g, '-')}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <Badge variant="secondary">
                {user?.emailAddresses[0].emailAddress}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                <Zap className="h-3 w-3 mr-1" />
                Pro Plan
              </Badge>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProposals}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sentProposals}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Won</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.wonProposals}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                  <CardDescription>
                    Enter the job information to generate a proposal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g., React Developer for E-commerce Site"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the full job description here..."
                      className="min-h-[200px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Your Relevant Skills</Label>
                    <Input
                      id="skills"
                      placeholder="e.g., React, Node.js, 5 years experience"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="confident">Confident</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={generateProposal}
                    disabled={generating}
                  >
                    {generating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Proposal
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Proposal */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Generated Proposal</CardTitle>
                    {confidence > 0 && (
                      <Badge variant={confidence > 0.8 ? 'default' : confidence > 0.6 ? 'secondary' : 'outline'}>
                        {Math.round(confidence * 100)}% confidence
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {currentProposal ? (
                    <>
                      <div className="prose prose-sm max-w-none mb-4 p-4 bg-gray-50 rounded-lg">
                        <p className="whitespace-pre-wrap">{currentProposal}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={copyProposal} variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button onClick={downloadProposal} variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Your generated proposal will appear here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Proposal History</CardTitle>
                <CardDescription>
                  View and manage all your generated proposals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{proposal.jobTitle}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(proposal.createdAt).toLocaleDateString()} • {Math.round(proposal.confidence * 100)}% confidence
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          proposal.status === 'won' ? 'default' : 
                          proposal.status === 'sent' ? 'secondary' : 
                          proposal.status === 'lost' ? 'destructive' : 'outline'
                        }>
                          {proposal.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {proposals.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No proposals yet. Generate your first one above!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Templates</CardTitle>
                <CardDescription>
                  Browse and use proven proposal templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Templates coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track your proposal performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Analytics coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}