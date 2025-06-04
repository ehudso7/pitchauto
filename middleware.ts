import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Simple in-memory rate limiting (in production, use Redis)
const rateLimit = new Map()

function rateLimiter(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const userRateData = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs }
  
  if (now > userRateData.resetTime) {
    userRateData.count = 0
    userRateData.resetTime = now + windowMs
  }
  
  userRateData.count++
  rateLimit.set(ip, userRateData)
  
  return userRateData.count <= limit
}

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/user(.*)',
])

export default clerkMiddleware((auth, req) => {
  // Handle rate limiting for API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    // Different rate limits for authenticated vs anonymous users
    const { userId } = auth()
    const limit = userId ? 100 : 10
    const window = 60000 // 1 minute
    
    if (!rateLimiter(ip, limit, window)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }
  
  // Protect routes that require authentication
  if (isProtectedRoute(req) && !auth().userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}