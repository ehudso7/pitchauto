'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { Sparkles, Copy, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { analytics, performance } from '@/lib/analytics'

export default function DemoPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [skills, setSkills] = useState('')
  const [generating, setGenerating] = useState(false)
  const [proposal, setProposal] = useState('')
  const [confidence, setConfidence] = useState(0)

  const generateProposal = async () => {
    if (!jobTitle || !jobDescription) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in the job title and description',
        variant: 'destructive'
      })
      return
    }

    setGenerating(true)
    const startTime = Date.now()
    
    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          skills,
          tone: 'professional'
        })
      })

      const data = await response.json()
      const duration = Date.now() - startTime
      
      if (data.success) {
        setProposal(data.proposal.content)
        setConfidence(data.proposal.confidence)
        
        // Track analytics
        analytics.proposalCreated(data.proposal.aiModel || 'demo', data.proposal.wordCount)
        performance.proposalGenerationTime(duration, data.proposal.aiModel || 'demo')
        
        toast({
          title: 'Proposal Generated!',
          description: `Confidence score: ${Math.round(data.proposal.confidence * 100)}%`
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate proposal',
        variant: 'destructive'
      })
    } finally {
      setGenerating(false)
    }
  }

  const copyProposal = () => {
    navigator.clipboard.writeText(proposal)
    analytics.proposalCopied()
    toast({
      title: 'Copied!',
      description: 'Proposal copied to clipboard'
    })
  }

  const downloadProposal = () => {
    const blob = new Blob([proposal], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proposal-${jobTitle.replace(/\s+/g, '-')}.txt`
    a.click()
    analytics.proposalDownloaded()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Try PitchAuto Demo</h1>
          <p className="text-xl text-gray-600">Generate a winning proposal in seconds</p>
          <Badge className="mt-2" variant="secondary">
            No signup required • 100% Free
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Enter the job information to generate a proposal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., React Developer for E-commerce Site"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                  className="min-h-[150px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="skills">Your Skills (Optional)</Label>
                <Input
                  id="skills"
                  placeholder="e.g., React, Node.js, 5 years experience"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
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
                  <Badge variant={confidence > 0.8 ? 'default' : 'secondary'}>
                    {Math.round(confidence * 100)}% confidence
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {proposal ? (
                <>
                  <div className="prose prose-sm max-w-none mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="whitespace-pre-wrap">{proposal}</p>
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

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-gray-700">
            For best results, include specific details about the job requirements and your relevant experience. 
            The AI will create a personalized proposal that matches the job description.
          </p>
        </div>
      </div>
    </div>
  )
}