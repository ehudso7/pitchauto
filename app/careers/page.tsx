import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Rocket, Heart, Globe } from 'lucide-react'

const openPositions = [
  {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help us build the future of AI-powered proposals'
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Create beautiful, intuitive experiences for our users'
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help our customers achieve their goals with PitchAuto'
  },
  {
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Improve our AI models and build new ML features'
  }
]

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: '100% covered health, dental, and vision insurance'
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world'
  },
  {
    icon: Rocket,
    title: 'Growth & Learning',
    description: '$2,000 annual learning budget'
  },
  {
    icon: Users,
    title: 'Team Building',
    description: 'Quarterly team retreats and events'
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4">We&apos;re Hiring!</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us revolutionize how freelancers and businesses connect through AI-powered proposals
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why PitchAuto?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardHeader>
                  <benefit.icon className="h-10 w-10 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <Card key={position.title}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{position.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.location}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{position.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don&apos;t see the right role?</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind!
          </p>
          <Button size="lg">Send Resume</Button>
        </div>
      </div>
    </div>
  )
}