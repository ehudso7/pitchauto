'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
// import { useAuth } from '@clerk/nextjs' // Commented for demo mode
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Shield, TrendingUp, Users, Globe, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Active Users', value: '127,394', change: '+12.5%' },
  { label: 'Proposals Generated', value: '3.2M', change: '+23.1%' },
  { label: 'Success Rate', value: '84%', change: '+5.2%' },
  { label: 'Countries', value: '147', change: '+18' },
]

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Advanced AI analyzes job posts and creates perfectly tailored proposals in seconds.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2 Type II certified with bank-level encryption and GDPR compliance.',
  },
  {
    icon: TrendingUp,
    title: '84% Success Rate',
    description: 'Our users win more jobs with data-driven proposals that convert.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team to create and manage proposals at scale.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Generate proposals in 50+ languages for global opportunities.',
  },
  {
    icon: Star,
    title: 'White Label',
    description: 'Custom branding and domains for agencies and enterprises.',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Freelance Designer',
    image: '/testimonials/sarah.jpg',
    content: 'PitchAuto transformed my freelance business. I went from $2k to $15k/month in just 3 months!',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Agency Owner',
    image: '/testimonials/marcus.jpg',
    content: 'We use PitchAuto for our entire team. It saves us 20+ hours per week on proposals.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Consultant',
    image: '/testimonials/elena.jpg',
    content: 'The AI understands exactly what clients want. My response rate went from 10% to 85%!',
    rating: 5,
  },
]

export default function HomePage() {
  // const { isSignedIn } = useAuth() // Commented for demo mode
  const isSignedIn = false // Demo mode
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
              <span className="text-xl font-bold">PitchAuto</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
              <Link href="/enterprise" className="text-gray-700 hover:text-gray-900">Enterprise</Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/demo">
                    <Button>Try Demo</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="mb-4" variant="secondary">
              🎉 Series A Funded - Backed by Sequoia & Andreessen Horowitz
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              AI Proposals That Win Jobs
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate personalized, high-converting proposals in seconds. Join 127,394 freelancers earning more with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Win More Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for freelancers and agencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Freelancers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about PitchAuto
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to 10x Your Freelance Income?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful freelancers using AI to win more jobs
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-white/80 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg" />
                <span className="text-xl font-bold text-white">PitchAuto</span>
              </div>
              <p className="text-sm">AI-powered proposals that win jobs.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">Enterprise</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
                <li><Link href="/gdpr" className="hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 PitchAuto, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}