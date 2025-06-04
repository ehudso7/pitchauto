import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: process.env.NODE_ENV === 'development',
    environment: process.env.NODE_ENV,
    beforeSend(event, hint) {
      // Filter out sensitive data
      if (event.request?.data) {
        const data = event.request.data as Record<string, any>
        if (typeof data === 'object' && data !== null) {
          const sensitiveKeys = ['password', 'token', 'key', 'secret', 'api', 'authorization']
          Object.keys(data).forEach(key => {
            if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
              data[key] = '[REDACTED]'
            }
          })
        }
      }
      return event
    },
  })
}