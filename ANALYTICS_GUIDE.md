# 📊 Analytics & Performance Monitoring Guide

## Overview

PitchAuto uses Vercel Analytics and Speed Insights for comprehensive monitoring of user behavior and application performance.

## Setup Complete ✅

### 1. Vercel Analytics
- Tracks page views automatically
- Custom event tracking implemented
- Conversion funnel monitoring
- User behavior insights

### 2. Speed Insights
- Web Vitals monitoring (LCP, FID, CLS)
- Performance metrics tracking
- Real-time performance data
- User experience scoring

## Custom Analytics Events

### User Events
```javascript
analytics.userSignUp(method) // Track signup method
analytics.userSignIn(method) // Track signin method
```

### Proposal Events
```javascript
analytics.proposalCreated(model, wordCount) // Track proposal creation
analytics.proposalSent(proposalId) // Track proposal sending
analytics.proposalCopied() // Track copy action
analytics.proposalDownloaded() // Track download action
```

### Payment Events
```javascript
analytics.checkoutStarted(plan, price) // Track checkout initiation
analytics.paymentCompleted(plan, amount) // Track successful payment
analytics.subscriptionCanceled(plan) // Track cancellation
```

### Performance Tracking
```javascript
performance.apiCallCompleted(endpoint, duration, status)
performance.pageLoadCompleted(page, loadTime)
performance.proposalGenerationTime(duration, model)
```

### Conversion Tracking
```javascript
conversions.demoToSignup() // Demo to signup conversion
conversions.freeToPaid(plan) // Free to paid conversion
conversions.proposalAccepted(proposalId) // Proposal success
conversions.proposalRejected(proposalId) // Proposal rejection
```

## Viewing Analytics

### Development
Analytics events are logged to console in development mode. Check browser console for:
- Event names
- Event properties
- Timing information

### Production
1. Deploy to Vercel
2. Navigate to your project dashboard
3. Click "Analytics" tab for:
   - Page views
   - Unique visitors
   - Custom events
   - Conversion funnels

4. Click "Speed Insights" tab for:
   - Web Vitals scores
   - Performance metrics
   - User experience data

## Best Practices

### 1. Event Naming
- Use snake_case for event names
- Be descriptive but concise
- Group related events with prefixes

### 2. Properties
- Include relevant context
- Avoid PII (personally identifiable information)
- Keep property names consistent

### 3. Performance
- Track key user journeys
- Monitor API response times
- Measure feature adoption

## Custom Dashboards

### Key Metrics to Monitor
1. **User Acquisition**
   - Sign-up rate
   - Demo usage
   - Activation rate

2. **Feature Usage**
   - Proposals generated per user
   - AI model preferences
   - Export format usage

3. **Business Metrics**
   - Conversion to paid
   - Revenue per user
   - Churn rate

4. **Performance**
   - Page load times
   - API response times
   - Error rates

## Implementation Examples

### Track Feature Usage
```javascript
// In your component
import { analytics } from '@/lib/analytics'

const handleFeatureClick = () => {
  analytics.featureUsed('advanced_editing')
  // ... feature logic
}
```

### Track Conversions
```javascript
// After successful payment
analytics.paymentCompleted('pro', 2900)
conversions.freeToPaid('pro')
```

### Track Errors
```javascript
// In error handlers
analytics.errorOccurred(error.message, 'proposal_generation')
```

## Privacy Considerations

- No PII is tracked by default
- IP addresses are anonymized
- Users can opt out via browser settings
- GDPR compliant

## Troubleshooting

### Events Not Showing
1. Check if ad blockers are disabled
2. Verify deployment to Vercel
3. Wait 30 seconds after events
4. Check console for errors

### Missing Data
1. Ensure components are imported
2. Verify environment is production
3. Check Vercel project settings
4. Review event implementation

## Advanced Usage

### Custom Funnels
Create conversion funnels in Vercel Analytics:
1. Go to Analytics > Funnels
2. Define steps (e.g., Visit → Demo → Signup → Payment)
3. Monitor drop-off rates

### Alerts
Set up alerts for:
- Performance degradation
- Error rate spikes
- Conversion drops
- Traffic anomalies

## Support

- Vercel Analytics Docs: https://vercel.com/docs/analytics
- Speed Insights Docs: https://vercel.com/docs/speed-insights
- Support: analytics@vercel.com

---

**Last Updated**: December 2024
**Version**: 1.0.0