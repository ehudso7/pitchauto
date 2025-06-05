import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client with error handling
let prisma: PrismaClient | null = null

try {
  prisma = new PrismaClient()
} catch (error) {
  console.error('Failed to initialize Prisma client:', error)
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.1',
    checks: {
      database: 'unknown',
      openai: 'unknown',
      stripe: 'unknown',
      smtp: 'unknown',
    },
    performance: {
      responseTime: 0,
      memoryUsage: process.memoryUsage(),
    },
  }

  // Check database connection
  try {
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`
      health.checks.database = 'healthy'
    } else {
      health.checks.database = 'unavailable'
    }
  } catch (error) {
    health.checks.database = 'unhealthy'
    health.status = 'degraded'
    console.error('Database health check failed:', error)
  }

  // Check OpenAI API key
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-demo-key-replace-me') {
    health.checks.openai = 'configured'
  } else {
    health.checks.openai = 'not_configured'
  }

  // Check Stripe configuration
  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET) {
    health.checks.stripe = 'configured'
  } else {
    health.checks.stripe = 'not_configured'
  }

  // Check SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    health.checks.smtp = 'configured'
  } else {
    health.checks.smtp = 'not_configured'
  }

  // Calculate response time
  health.performance.responseTime = Date.now() - startTime

  // Determine overall health status
  if (health.checks.database === 'unhealthy') {
    health.status = 'unhealthy'
  } else if (health.checks.database === 'unavailable' || 
             Object.values(health.checks).some(check => check === 'not_configured')) {
    health.status = 'degraded'
  }

  // Set appropriate HTTP status code
  const statusCode = health.status === 'healthy' ? 200 : 
                     health.status === 'degraded' ? 200 : 503

  return NextResponse.json(health, { status: statusCode })
}

// HEAD request for simple health check
export async function HEAD(request: NextRequest) {
  try {
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`
    }
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse(null, { status: 503 })
  }
}