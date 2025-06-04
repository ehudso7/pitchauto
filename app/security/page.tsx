import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Key, Eye, CheckCircle } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using AES-256 encryption'
  },
  {
    icon: Key,
    title: 'Secure Authentication',
    description: 'Multi-factor authentication and OAuth 2.0 support'
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Annual third-party audits ensure our security practices meet industry standards'
  },
  {
    icon: Eye,
    title: 'Privacy by Design',
    description: 'We collect only essential data and never sell your information'
  }
]

const certifications = [
  'SOC 2 Type II',
  'GDPR Compliant',
  'CCPA Compliant',
  'ISO 27001',
  'HIPAA Compliant',
  'PCI DSS Level 1'
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <Badge className="mb-4">Security</Badge>
          <h1 className="text-4xl font-bold mb-4">Your Security is Our Priority</h1>
          <p className="text-xl text-gray-600">
            We use industry-leading security measures to protect your data and ensure your privacy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {securityFeatures.map((feature) => (
            <Card key={feature.title}>
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

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Security Certifications</CardTitle>
            <CardDescription>
              We maintain compliance with the highest security standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Data Encryption</h3>
              <p className="text-gray-600">
                All customer data is encrypted using AES-256 encryption both in transit and at rest. 
                We use TLS 1.3 for all communications between your browser and our servers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Access Control</h3>
              <p className="text-gray-600">
                We implement strict access controls and regularly audit access logs. 
                Employee access is granted on a least-privilege basis and requires multi-factor authentication.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Regular Security Audits</h3>
              <p className="text-gray-600">
                We conduct regular penetration testing and security audits by independent third parties. 
                All findings are promptly addressed and verified.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reporting Security Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you discover a security vulnerability, please email us at{' '}
              <a href="mailto:security@pitchauto.com" className="text-purple-600 hover:underline">
                security@pitchauto.com
              </a>
            </p>
            <p className="text-gray-600">
              We appreciate responsible disclosure and will acknowledge your contribution 
              in our security hall of fame.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}