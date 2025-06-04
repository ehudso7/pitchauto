import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PitchAuto - AI-Powered Proposal Generation',
  description: 'Generate winning proposals in seconds with AI. Join thousands of freelancers earning more.',
  keywords: 'proposal generator, AI proposals, freelance tools, business proposals',
  authors: [{ name: 'PitchAuto Team' }],
  openGraph: {
    title: 'PitchAuto - AI-Powered Proposal Generation',
    description: 'Generate winning proposals in seconds with AI',
    url: 'https://pitchauto.com',
    siteName: 'PitchAuto',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PitchAuto - AI-Powered Proposal Generation',
    description: 'Generate winning proposals in seconds with AI',
    images: ['/og-image.png'],
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
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <ErrorBoundary>
            {children}
            <Toaster />
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}