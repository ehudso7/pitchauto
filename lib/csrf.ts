import { randomBytes, createHash } from 'crypto'
import { cookies } from 'next/headers'

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = '__Host-csrf-token'
const CSRF_HEADER_NAME = 'x-csrf-token'

export function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export async function getCSRFToken(): Promise<string> {
  const cookieStore = cookies()
  const existingToken = cookieStore.get(CSRF_COOKIE_NAME)
  
  if (existingToken) {
    return existingToken.value
  }
  
  const newToken = generateCSRFToken()
  
  // Set secure cookie with strict options
  cookieStore.set(CSRF_COOKIE_NAME, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return newToken
}

export async function validateCSRFToken(request: Request): Promise<boolean> {
  // Skip CSRF validation for GET requests
  if (request.method === 'GET') {
    return true
  }
  
  const cookieStore = cookies()
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
  const headerToken = request.headers.get(CSRF_HEADER_NAME)
  
  if (!cookieToken || !headerToken) {
    return false
  }
  
  // Constant time comparison
  return timingSafeEqual(cookieToken, headerToken)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  
  return result === 0
}