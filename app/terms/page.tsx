'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using PitchAuto ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily use PitchAuto for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      • Modify or copy the materials
      • Use the materials for any commercial purpose or for any public display
      • Attempt to reverse engineer any software contained on PitchAuto
      • Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: '3. Account Terms',
      content: `You must be 18 years or older to use this Service. You are responsible for maintaining the security of your account and password. PitchAuto cannot and will not be liable for any loss or damage from your failure to comply with this security obligation. You are responsible for all content posted and activity that occurs under your account.`
    },
    {
      title: '4. Payment Terms',
      content: `Paid services are billed in advance on a monthly or annual basis and are non-refundable. There will be no refunds or credits for partial months of service, upgrade/downgrade refunds, or refunds for months unused with an open account. All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities.`
    },
    {
      title: '5. Privacy Policy',
      content: `Your use of PitchAuto is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.`
    },
    {
      title: '6. Prohibited Uses',
      content: `You may not use PitchAuto:
      • For any unlawful purpose
      • To solicit others to perform unlawful acts
      • To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
      • To infringe upon or violate our intellectual property rights or the intellectual property rights of others
      • To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
      • To submit false or misleading information`
    },
    {
      title: '7. Intellectual Property',
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of PitchAuto and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`
    },
    {
      title: '8. Disclaimer',
      content: `The information on PitchAuto is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
      • Excludes all representations and warranties relating to this website and its contents
      • Excludes all liability for damages arising out of or in connection with your use of this website`
    },
    {
      title: '9. Limitation of Liability',
      content: `In no event shall PitchAuto, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.`
    },
    {
      title: '10. Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`
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
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: January 1, 2024
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-8">
                Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the PitchAuto website and service operated by PitchAuto, Inc. (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>

              {sections.map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                </div>
              ))}

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Email: legal@pitchauto.com</li>
                  <li>Address: 123 Mission Street, San Francisco, CA 94105</li>
                  <li>Phone: +1 (555) 123-4567</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                By using PitchAuto, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}