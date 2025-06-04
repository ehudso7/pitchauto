'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Zap, Shield, TrendingUp, Users, Globe, Star, Brain, Lock, Rocket, BarChart } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Engine',
      description: 'Powered by GPT-4 and Claude 3 for superior proposal quality',
      details: [
        'Context-aware proposal generation',
        'Industry-specific language optimization',
        'Tone and style customization',
        'Multi-language support'
      ]
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate proposals in under 10 seconds',
      details: [
        'Real-time AI processing',
        'Instant preview and editing',
        'Batch proposal generation',
        'Quick templates library'
      ]
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security for your data',
      details: [
        'SOC2 Type II certified',
        'End-to-end encryption',
        'GDPR & CCPA compliant',
        'Regular security audits'
      ]
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Track performance and optimize',
      details: [
        'Proposal success rates',
        'Client engagement metrics',
        'A/B testing capabilities',
        'ROI tracking'
      ]
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly',
      details: [
        'Role-based permissions',
        'Proposal templates sharing',
        'Real-time collaboration',
        'Activity tracking'
      ]
    },
    {
      icon: Rocket,
      title: 'Integrations',
      description: 'Connect with your favorite tools',
      details: [
        'Upwork & Fiverr integration',
        'CRM connections',
        'Slack notifications',
        'API access'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Everything You Need
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for Modern Freelancers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PitchAuto provides everything you need to write winning proposals faster and close more deals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Proposals?</h2>
          <div className="flex gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg">
                Try Demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}