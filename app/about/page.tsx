'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Target, Lightbulb, Heart, Trophy } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission First',
      description: 'We are committed to helping freelancers succeed by providing tools that actually make a difference.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of AI to create better solutions for our users.'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users needs and challenges.'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our product to our customer support.'
    }
  ]

  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Co-founder',
      bio: 'Former freelancer who struggled with proposals. Built PitchAuto to solve his own problem.'
    },
    {
      name: 'Dr. Sarah Kim',
      role: 'CTO & Co-founder',
      bio: 'AI researcher from Stanford. Leading our AI development to create smarter proposals.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      bio: '10+ years in product design. Ensuring PitchAuto is intuitive and powerful.'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Head of Customer Success',
      bio: 'Passionate about helping freelancers succeed. Leading our support and education initiatives.'
    }
  ]

  const milestones = [
    { year: '2021', event: 'PitchAuto founded in a garage in San Francisco' },
    { year: '2022', event: 'Reached 10,000 active users' },
    { year: '2023', event: 'Series A funding from Sequoia Capital' },
    { year: '2024', event: 'Crossed 100,000 users and 3M proposals generated' }
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
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About PitchAuto
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are on a mission to help freelancers win more clients and build successful businesses
          </p>
        </div>

        <Card className="mb-16">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              PitchAuto was born from frustration. Our founder, Alex, was spending hours writing proposals 
              as a freelance developer, with most of them getting ignored. He realized that there had to be 
              a better way. Teaming up with AI researcher Dr. Sarah Kim, they built the first version of 
              PitchAuto in 2021. What started as a simple tool to help write better proposals has now grown 
              into a comprehensive platform used by over 127,000 freelancers worldwide.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardHeader>
                <value.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-center">{member.name}</h3>
                  <p className="text-purple-600 text-sm text-center mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full px-3 py-1 text-sm font-semibold mr-4">
                    {milestone.year}
                  </div>
                  <p className="text-gray-600">{milestone.event}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us on Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We are always looking for talented people who share our passion for helping freelancers succeed
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg">
                View Open Positions
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}