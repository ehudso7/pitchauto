import { track } from '@vercel/analytics'

// Custom event tracking functions
export const analytics = {
  // User events
  userSignUp: (method: string) => {
    track('user_signup', { method })
  },
  
  userSignIn: (method: string) => {
    track('user_signin', { method })
  },
  
  // Proposal events
  proposalCreated: (model: string, wordCount: number) => {
    track('proposal_created', { model, wordCount })
  },
  
  proposalSent: (proposalId: string) => {
    track('proposal_sent', { proposalId })
  },
  
  proposalCopied: () => {
    track('proposal_copied')
  },
  
  proposalDownloaded: () => {
    track('proposal_downloaded')
  },
  
  // Payment events
  checkoutStarted: (plan: string, price: number) => {
    track('checkout_started', { plan, price })
  },
  
  paymentCompleted: (plan: string, amount: number) => {
    track('payment_completed', { plan, amount })
  },
  
  subscriptionCanceled: (plan: string) => {
    track('subscription_canceled', { plan })
  },
  
  // Feature usage
  featureUsed: (feature: string) => {
    track('feature_used', { feature })
  },
  
  // Page views with custom properties
  pageViewed: (pageName: string, properties?: Record<string, any>) => {
    track('page_viewed', { page: pageName, ...properties })
  },
  
  // Error tracking
  errorOccurred: (error: string, context?: string) => {
    track('error_occurred', { error, context: context || 'unknown' })
  },
}

// Performance monitoring helpers
export const performance = {
  // Track API response times
  apiCallCompleted: (endpoint: string, duration: number, status: number) => {
    track('api_call_completed', { endpoint, duration, status })
  },
  
  // Track page load performance
  pageLoadCompleted: (page: string, loadTime: number) => {
    track('page_load_completed', { page, loadTime })
  },
  
  // Track proposal generation time
  proposalGenerationTime: (duration: number, model: string) => {
    track('proposal_generation_time', { duration, model })
  },
}

// Conversion tracking
export const conversions = {
  // Track demo to signup conversion
  demoToSignup: () => {
    track('conversion_demo_to_signup')
  },
  
  // Track free to paid conversion
  freeToPaid: (plan: string) => {
    track('conversion_free_to_paid', { plan })
  },
  
  // Track proposal success rate
  proposalAccepted: (proposalId: string) => {
    track('proposal_accepted', { proposalId })
  },
  
  proposalRejected: (proposalId: string) => {
    track('proposal_rejected', { proposalId })
  },
}