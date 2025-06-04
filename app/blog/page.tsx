'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'How AI is Revolutionizing Freelance Proposals',
      excerpt: 'Discover how artificial intelligence is changing the game for freelancers worldwide, helping them win more clients and increase their income.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'AI & Technology',
      featured: true
    },
    {
      id: 2,
      title: '10 Tips for Writing Winning Upwork Proposals',
      excerpt: 'Learn the secrets that top freelancers use to stand out from the competition and land high-paying clients on Upwork.',
      author: 'Marcus Johnson',
      date: '2024-01-12',
      readTime: '8 min read',
      category: 'Freelancing Tips'
    },
    {
      id: 3,
      title: 'From $2k to $20k/Month: A Freelancer Success Story',
      excerpt: 'How one designer used PitchAuto to 10x their monthly income in just 6 months. Read their inspiring journey.',
      author: 'Elena Rodriguez',
      date: '2024-01-10',
      readTime: '10 min read',
      category: 'Success Stories'
    },
    {
      id: 4,
      title: 'The Psychology Behind Successful Proposals',
      excerpt: 'Understanding client psychology can dramatically improve your proposal success rate. Here is what you need to know.',
      author: 'Dr. James Wilson',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Psychology'
    },
    {
      id: 5,
      title: 'PitchAuto vs Traditional Proposal Writing: A Comparison',
      excerpt: 'We analyzed 10,000 proposals to see how AI-generated proposals compare to traditionally written ones. The results might surprise you.',
      author: 'Data Team',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Research'
    },
    {
      id: 6,
      title: 'Building Long-Term Client Relationships',
      excerpt: 'Winning the proposal is just the beginning. Learn how to turn one-time clients into long-term partners.',
      author: 'Michael Park',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'Client Management'
    }
  ]

  const categories = ['All', 'AI & Technology', 'Freelancing Tips', 'Success Stories', 'Psychology', 'Research', 'Client Management']

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
            Insights & Tips
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The PitchAuto Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, success stories, and tips to help you win more clients and grow your freelance business
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              {post.featured && (
                <div className="px-6 pt-6">
                  <Badge className="bg-purple-100 text-purple-700">Featured</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Get weekly tips and insights delivered to your inbox
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}