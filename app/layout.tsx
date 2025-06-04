import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs' // Commented for demo mode
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PitchAuto - AI-Powered Proposals That Win',
  description: 'Generate winning proposals in seconds with AI. Trusted by 100,000+ freelancers.',
  keywords: 'proposal generator, ai proposals, freelance tools, upwork proposals, fiverr proposals',
  authors: [{ name: 'PitchAuto Team' }],
  openGraph: {
    title: 'PitchAuto - AI-Powered Proposals That Win',
    description: 'Generate winning proposals in seconds with AI',
    url: 'https://pitchauto.com',
    siteName: 'PitchAuto',
    images: [
      {
        url: 'https://pitchauto.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PitchAuto - AI-Powered Proposals That Win',
    description: 'Generate winning proposals in seconds with AI',
    creator: '@pitchauto',
    images: ['https://pitchauto.com/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}