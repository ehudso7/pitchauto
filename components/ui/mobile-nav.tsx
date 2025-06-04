'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from './button'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white top-16">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/features"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-purple-600"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-purple-600"
            >
              Enterprise
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-purple-600"
            >
              Blog
            </Link>
            <div className="pt-4 border-t space-y-4">
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/demo" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Try Demo</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}