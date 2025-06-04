import { prisma } from './prisma'
import { auth } from '@clerk/nextjs/server'

interface AuditLogEntry {
  action: string
  resource?: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  method?: string
  path?: string
}

export async function createAuditLog(entry: AuditLogEntry) {
  try {
    const { userId } = auth()
    
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action: entry.action,
        resource: entry.resource,
        resourceId: entry.resourceId,
        metadata: entry.metadata || {},
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
        method: entry.method,
        path: entry.path,
      },
    })
  } catch (error) {
    // Don't fail the request if audit logging fails
    console.error('Audit log error:', error)
  }
}

// Audit log actions
export const AuditActions = {
  // Authentication
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_REGISTER: 'user.register',
  
  // Proposals
  PROPOSAL_CREATE: 'proposal.create',
  PROPOSAL_UPDATE: 'proposal.update',
  PROPOSAL_DELETE: 'proposal.delete',
  PROPOSAL_SEND: 'proposal.send',
  PROPOSAL_VIEW: 'proposal.view',
  
  // Payments
  PAYMENT_CREATE: 'payment.create',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  SUBSCRIPTION_CREATE: 'subscription.create',
  SUBSCRIPTION_UPDATE: 'subscription.update',
  SUBSCRIPTION_CANCEL: 'subscription.cancel',
  
  // API
  API_KEY_CREATE: 'api_key.create',
  API_KEY_REVOKE: 'api_key.revoke',
  API_KEY_USE: 'api_key.use',
  
  // Security
  PASSWORD_CHANGE: 'password.change',
  EMAIL_CHANGE: 'email.change',
  TWO_FACTOR_ENABLE: 'two_factor.enable',
  TWO_FACTOR_DISABLE: 'two_factor.disable',
  
  // Admin
  ADMIN_ACCESS: 'admin.access',
  ADMIN_USER_UPDATE: 'admin.user_update',
  ADMIN_SYSTEM_CONFIG: 'admin.system_config',
}

// Helper to extract request metadata
export function getRequestMetadata(request: Request) {
  return {
    ipAddress: request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    method: request.method,
    path: new URL(request.url).pathname,
  }
}

// Middleware helper for automatic audit logging
export async function withAuditLog<T>(
  action: string,
  resource: string,
  fn: () => Promise<T>,
  request?: Request
): Promise<T> {
  const startTime = Date.now()
  let result: T
  let error: any
  
  try {
    result = await fn()
  } catch (e) {
    error = e
    throw e
  } finally {
    const duration = Date.now() - startTime
    const metadata: Record<string, any> = { duration }
    
    if (error) {
      metadata.error = error.message
      metadata.success = false
    } else {
      metadata.success = true
    }
    
    await createAuditLog({
      action,
      resource,
      metadata,
      ...(request ? getRequestMetadata(request) : {}),
    })
  }
  
  return result!
}