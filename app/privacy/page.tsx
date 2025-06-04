'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include:
      • Name and contact information
      • Account credentials
      • Payment information
      • Proposal content and job application data
      • Communications with us`
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:
      • Provide, maintain, and improve our services
      • Process transactions and send related information
      • Send technical notices, updates, security alerts, and support messages
      • Respond to your comments, questions, and requests
      • Monitor and analyze trends, usage, and activities
      • Detect, investigate, and prevent fraudulent transactions and other illegal activities`
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:
      • With your consent or at your direction
      • With service providers who perform services on our behalf
      • To comply with legal obligations
      • To protect and defend our rights and property
      • With your employer or client if you use PitchAuto through an enterprise account`
    },
    {
      title: '4. Data Security',
      content: `We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. These measures include:
      • Encryption of data in transit and at rest
      • Regular security assessments
      • Access controls and authentication
      • Employee training on data protection`
    },
    {
      title: '5. Data Retention',
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. When we no longer need your information, we will securely delete or anonymize it.`
    },
    {
      title: '6. Your Rights and Choices',
      content: `You have the right to:
      • Access and receive a copy of your personal information
      • Update or correct your personal information
      • Delete your personal information
      • Object to or restrict certain processing
      • Data portability
      • Withdraw consent where we rely on consent for processing`
    },
    {
      title: '7. Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.`
    },
    {
      title: '8. International Data Transfers',
      content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. We will ensure that appropriate safeguards are in place to protect your personal information.`
    },
    {
      title: '9. Children\'s Privacy',
      content: `Our service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.`
    },
    {
      title: '10. Changes to This Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.`
    }
  ]

  const highlights = [
    {
      icon: Shield,
      title: 'SOC2 Certified',
      description: 'Industry-standard security certification'
    },
    {
      icon: Lock,
      title: 'Encrypted Data',
      description: 'Your data is encrypted at rest and in transit'
    },
    {
      icon: Eye,
      title: 'No Data Selling',
      description: 'We never sell your personal information'
    },
    {
      icon: UserCheck,
      title: 'GDPR Compliant',
      description: 'Full compliance with privacy regulations'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: January 1, 2024
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {highlights.map((highlight) => (
            <Card key={highlight.title} className="text-center">
              <CardContent className="p-6">
                <highlight.icon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{highlight.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-8">
                At PitchAuto, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully.
              </p>

              {sections.map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                </div>
              ))}

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Email: privacy@pitchauto.com</li>
                  <li>Address: 123 Mission Street, San Francisco, CA 94105</li>
                  <li>Phone: +1 (555) 123-4567</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  For EU residents, you may also contact our Data Protection Officer at dpo@pitchauto.com
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-700 text-center">
                Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}