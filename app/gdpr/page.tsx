import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, FileText, UserCheck, Download, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const gdprRights = [
  {
    icon: Eye,
    title: 'Right to Access',
    description: 'Request a copy of all personal data we hold about you'
  },
  {
    icon: FileText,
    title: 'Right to Rectification',
    description: 'Request correction of any inaccurate personal data'
  },
  {
    icon: Trash2,
    title: 'Right to Erasure',
    description: 'Request deletion of your personal data'
  },
  {
    icon: Download,
    title: 'Right to Data Portability',
    description: 'Receive your data in a structured, machine-readable format'
  }
]

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <Badge className="mb-4">Privacy</Badge>
          <h1 className="text-4xl font-bold mb-4">GDPR Compliance</h1>
          <p className="text-xl text-gray-600">
            We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR)
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              <CardTitle>Our GDPR Commitment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              PitchAuto is fully committed to GDPR compliance. We process personal data lawfully, 
              fairly, and transparently. We collect only the minimum data necessary to provide our services 
              and protect it with industry-standard security measures.
            </p>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Last updated: January 2024</span>
            </div>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your GDPR Rights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {gdprRights.map((right) => (
              <Card key={right.title}>
                <CardHeader>
                  <right.icon className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">{right.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{right.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Legal Basis</h3>
              <p className="text-gray-600">
                We process your personal data based on:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Your consent (which you can withdraw at any time)</li>
                <li>Performance of a contract with you</li>
                <li>Compliance with legal obligations</li>
                <li>Our legitimate interests (where not overridden by your rights)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Retention</h3>
              <p className="text-gray-600">
                We retain your personal data only for as long as necessary to provide our services 
                and comply with legal obligations. You can request deletion at any time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">International Transfers</h3>
              <p className="text-gray-600">
                When we transfer data outside the EEA, we ensure appropriate safeguards are in place, 
                including Standard Contractual Clauses approved by the European Commission.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Protection Officer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              For any GDPR-related inquiries or to exercise your rights, please contact our 
              Data Protection Officer:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">DPO Contact</p>
              <p className="text-gray-600">Email: dpo@pitchauto.com</p>
              <p className="text-gray-600">Address: PitchAuto Inc., Privacy Department</p>
              <p className="text-gray-600">123 Tech Street, San Francisco, CA 94105</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Exercise Your Rights</h2>
          <p className="text-gray-600 mb-6">
            Access, update, or delete your personal data anytime
          </p>
          <div className="flex gap-4 justify-center">
            <Button>Access My Data</Button>
            <Button variant="outline">Contact DPO</Button>
          </div>
        </div>
      </div>
    </div>
  )
}