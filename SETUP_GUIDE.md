# PitchAuto Setup Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- Vercel account (for deployment)

## Local Development Setup

### 1. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your actual API keys
# Required for full functionality:
# - OPENAI_API_KEY (get from https://platform.openai.com)
# - CLERK_SECRET_KEY & NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (get from https://dashboard.clerk.com)
# 
# Optional:
# - STRIPE keys for payments
# - Email configuration for notifications
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates SQLite database)
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

The app will be available at http://localhost:3000

### 5. Test the Application
- Visit http://localhost:3000
- Click "Try Demo" to test proposal generation
- Sign up for an account to access the dashboard
- Generate a proposal using the demo interface

## Vercel Deployment

### 1. Prepare for Deployment
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"

# Push to GitHub (if not already)
git remote add origin https://github.com/yourusername/pitchauto-lite.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Select the pitchauto-lite directory
# - Use default build settings
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./ (or pitchauto-lite if in subdirectory)
   - Build Command: `npm run build`
   - Output Directory: Leave default

### 3. Configure Environment Variables in Vercel
Go to your project settings in Vercel and add these environment variables:

```
# Required for Demo Mode
NEXT_PUBLIC_DEMO_MODE=true
DATABASE_URL=file:./dev.db

# For full functionality add:
OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here

# Production settings
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Testing End-to-End

### Local Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] "Try Demo" button opens demo interface
- [ ] Proposal generation works (returns demo content)
- [ ] All pages load without errors (/about, /pricing, /features, etc.)
- [ ] Sign up/Sign in pages display correctly
- [ ] API endpoint works: `curl -X POST http://localhost:3000/api/proposals/generate -H "Content-Type: application/json" -d '{"jobTitle":"Test","jobDescription":"Test"}'`

### Production Testing Checklist
- [ ] Visit your Vercel URL
- [ ] Test all navigation links
- [ ] Test proposal generation in demo mode
- [ ] Check responsive design on mobile
- [ ] Verify all static pages load
- [ ] Test API: `curl -X POST https://your-app.vercel.app/api/proposals/generate -H "Content-Type: application/json" -d '{"jobTitle":"Test","jobDescription":"Test"}'`

## Common Issues & Solutions

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npx prisma db push
```

### Environment Variable Issues
- Ensure all required variables are set in .env.local
- For Vercel, add variables in project settings
- Restart dev server after changing .env.local

## Quick Start Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests

# Database
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations

# Deployment
vercel               # Deploy to Vercel
vercel --prod        # Deploy to production
```

## Support

For issues or questions:
- Check the console for error messages
- Verify all environment variables are set
- Ensure Node.js version is 18+
- Check Vercel deployment logs for production issues