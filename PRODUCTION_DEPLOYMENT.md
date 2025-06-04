# 🚀 Production Deployment Guide - PitchAuto

## Prerequisites

- Vercel account
- PostgreSQL database (Supabase, Neon, or similar)
- Clerk account for authentication
- Stripe account for payments
- Resend account for emails
- Sentry account for monitoring

## Step 1: Set Up External Services

### 1.1 PostgreSQL Database (Supabase)
```bash
# Create a new Supabase project at https://supabase.com
# Get your connection string from Settings > Database
# Format: postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
```

### 1.2 Clerk Authentication
1. Create account at https://clerk.com
2. Create new application
3. Get your keys from Dashboard > API Keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 1.3 Stripe Payments
1. Create account at https://stripe.com
2. Get API keys from Developers > API keys:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_succeeded`
   - Get `STRIPE_WEBHOOK_SECRET`

### 1.4 Resend Email
1. Create account at https://resend.com
2. Verify your domain
3. Get API key: `RESEND_API_KEY`

### 1.5 Sentry Monitoring
1. Create account at https://sentry.io
2. Create new project (Next.js)
3. Get DSN: `NEXT_PUBLIC_SENTRY_DSN`

## Step 2: Prepare for Deployment

### 2.1 Update Environment Variables
Create `.env.local` with all production values:
```bash
# Database
DATABASE_URL="your-postgresql-connection-string"

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."

# AI APIs (use your own keys)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# App Config
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
JWT_SECRET="generate-with-openssl-rand-base64-32"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@your-domain.com"

# Monitoring
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."

# Security
CSRF_SECRET="generate-with-openssl-rand-base64-32"
SESSION_SECRET="generate-with-openssl-rand-base64-32"

# Features
NEXT_PUBLIC_DEMO_MODE="false"
ENABLE_PAYMENTS="true"
ENABLE_EMAIL_VERIFICATION="true"
```

### 2.2 Generate Secrets
```bash
# Generate secure secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For CSRF_SECRET
openssl rand -base64 32  # For SESSION_SECRET
```

### 2.3 Database Migration
```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="your-postgresql-connection-string"

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Seed initial data
npx prisma db seed
```

## Step 3: Deploy to Vercel

### 3.1 Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Configure project settings
# - Deploy to production
vercel --prod
```

### 3.2 Via GitHub Integration
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3.3 Add Environment Variables in Vercel
1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.production`
3. Ensure proper scoping (Production/Preview/Development)

## Step 4: Post-Deployment Configuration

### 4.1 Configure Clerk
1. Add production URL to Clerk Dashboard > Settings
2. Configure redirect URLs:
   - Sign-in: `https://your-domain.com/sign-in`
   - Sign-up: `https://your-domain.com/sign-up`
   - After sign-in: `https://your-domain.com/dashboard`

### 4.2 Configure Stripe Webhook
1. Add production webhook endpoint in Stripe Dashboard
2. Update `STRIPE_WEBHOOK_SECRET` in Vercel

### 4.3 Configure Custom Domain
1. In Vercel: Settings > Domains
2. Add your domain
3. Update DNS records as instructed

### 4.4 Enable Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

// In body
<Analytics />
```

## Step 5: Security Checklist

- [x] All API keys are in environment variables
- [x] HTTPS enforced via security headers
- [x] CSRF protection enabled
- [x] Rate limiting configured
- [x] Authentication required for protected routes
- [x] Input validation on all forms
- [x] SQL injection protection via Prisma
- [x] XSS protection via React
- [x] Security headers configured

## Step 6: Monitoring & Maintenance

### 6.1 Set Up Monitoring
- Sentry for error tracking
- Vercel Analytics for performance
- Stripe Dashboard for payments
- Clerk Dashboard for users

### 6.2 Regular Maintenance
```bash
# Update dependencies monthly
npm update
npm audit fix

# Backup database regularly
pg_dump $DATABASE_URL > backup.sql

# Monitor logs
vercel logs
```

## Step 7: Launch Checklist

### Pre-Launch
- [ ] All environment variables set in Vercel
- [ ] Database migrated and seeded
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Email sending tested
- [ ] Payment flow tested
- [ ] Error tracking verified

### Launch Day
- [ ] Remove demo mode flag
- [ ] Enable production monitoring
- [ ] Test critical user flows
- [ ] Monitor error rates
- [ ] Check performance metrics

### Post-Launch
- [ ] Set up automated backups
- [ ] Configure uptime monitoring
- [ ] Plan first feature update
- [ ] Gather user feedback

## Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Issues
```bash
# Reset database
npx prisma db push --force-reset
npx prisma db seed
```

### Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify values don't have extra spaces

## Support

- Vercel: https://vercel.com/docs
- Clerk: https://clerk.com/docs
- Stripe: https://stripe.com/docs
- Prisma: https://www.prisma.io/docs

---

**Last Updated**: December 2024
**Version**: 1.0.0