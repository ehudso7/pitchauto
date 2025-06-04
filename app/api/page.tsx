import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Key, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Badge className="mb-4">Developers</Badge>
          <h1 className="text-4xl font-bold mb-4">PitchAuto API</h1>
          <p className="text-xl text-gray-600 mb-8">
            Build powerful integrations with our RESTful API
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <CardTitle>Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                The PitchAuto API allows you to programmatically generate proposals, manage templates, and access analytics.
              </CardDescription>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`curl -X POST https://api.pitchauto.com/v1/proposals \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jobTitle": "Senior Developer",
    "jobDescription": "Looking for...",
    "tone": "professional"
  }'`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-purple-600" />
                <CardTitle>Authentication</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All API requests require authentication using an API key. Include your key in the Authorization header:
              </CardDescription>
              <pre className="bg-gray-100 p-4 rounded-lg mt-4">
                <code>Authorization: Bearer sk_live_your_api_key_here</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-600" />
                <CardTitle>Rate Limits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                API rate limits vary by plan:
              </CardDescription>
              <ul className="mt-4 space-y-2">
                <li>• Free: 100 requests/month</li>
                <li>• Pro: 5,000 requests/month</li>
                <li>• Business: 50,000 requests/month</li>
                <li>• Enterprise: Unlimited</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-600" />
                <CardTitle>SDKs & Libraries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Official SDKs available for popular languages:
              </CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Ruby</Badge>
                <Badge variant="secondary">PHP</Badge>
                <Badge variant="secondary">Go</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6">
            Get your API key and start building today
          </p>
          <Link href="/dashboard">
            <Button size="lg">Get API Key</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}