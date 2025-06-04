'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Shield, Users, Building, Lock, BarChart, Headphones, CheckCircle, Globe } from 'lucide-react'

export default function EnterprisePage() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC2 Type II certification, SSO, and dedicated infrastructure.'
    },
    {
      icon: Users,
      title: 'Unlimited Team Members',
      description: 'Add your entire organization with role-based permissions and admin controls.'
    },
    {
      icon: Building,
      title: 'White Label Solutions',
      description: 'Custom branding, domains, and fully customizable UI to match your brand.'
    },
    {
      icon: Lock,
      title: 'Compliance & Privacy',
      description: 'GDPR, CCPA, HIPAA compliant with data residency options.'
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Custom dashboards, API access, and detailed reporting for data-driven decisions.'
    },
    {
      icon: Headphones,
      title: 'Priority Support',
      description: 'Dedicated account manager, 24/7 support, and custom onboarding.'
    }
  ]

  const benefits = [
    'Custom AI model training on your data',
    'Unlimited proposal generation',
    'API access with 99.9% SLA',
    'Multi-language support (50+ languages)',
    'Custom integrations',
    'Quarterly business reviews',
    'Training and certification programs',
    'Volume-based pricing'
  ]

  const companies = [
    'Fortune 500 Companies',
    'Leading Consulting Firms',
    'Global Agencies',
    'Tech Unicorns'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            Enterprise Grade
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PitchAuto for Enterprise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower your entire organization with AI-powered proposals. 
            Trusted by Fortune 500 companies and leading agencies worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Everything in Pro, Plus:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {companies.map((company, idx) => (
              <div key={idx} className="text-gray-600">
                {company}
              </div>
            ))}
          </div>
          <p className="text-gray-600">
            Join 500+ enterprises using PitchAuto to win more business
          </p>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <Globe className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Proposals?</h2>
            <p className="text-xl mb-8 text-white/90">
              Get a personalized demo and see how PitchAuto can transform your business
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}