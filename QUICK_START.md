# Quick Start - PitchAuto

## 🚀 5-Minute Setup

### 1. Clone & Install (1 min)
```bash
# If you haven't already cloned
git clone <your-repo-url> pitchauto
cd pitchauto/pitchauto-lite

# Install dependencies
npm install
```

### 2. Configure Environment (2 min)
```bash
# Create .env.local from example
cp .env.example .env.local

# For demo mode (no API keys needed), keep:
NEXT_PUBLIC_DEMO_MODE=true
DATABASE_URL="file:./dev.db"
```

### 3. Setup Database (1 min)
```bash
# Initialize database
npx prisma generate
npx prisma db push
```

### 4. Run Application (1 min)
```bash
# Start development server
npm run dev
```

Visit http://localhost:3000 ✨

## 🌐 Deploy to Vercel (3 min)

### Option 1: One-Click Deploy
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy with single command
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Visit https://vercel.com/new
3. Import repository
4. Click "Deploy"

## ✅ Test Your Setup

### Local Test
```bash
# Test API endpoint
curl -X POST http://localhost:3000/api/proposals/generate \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Developer","jobDescription":"Build amazing apps"}'
```

### Production Test
Replace `localhost:3000` with your Vercel URL:
```bash
curl -X POST https://your-app.vercel.app/api/proposals/generate \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Developer","jobDescription":"Build amazing apps"}'
```

## 🎯 What to Test

1. **Homepage** - Click "Try Demo"
2. **Demo Page** - Generate a proposal
3. **Navigation** - Test all links
4. **API** - Use curl command above

## 🆘 Troubleshooting

### Nothing works?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Database error?
```bash
rm prisma/dev.db
npx prisma db push
```

### Still stuck?
Check if port 3000 is in use:
```bash
lsof -i :3000
# Kill any process using it
kill -9 <PID>
```

---

**Ready to customize?** Edit `app/page.tsx` to change the homepage!