import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.auditLog.deleteMany()
  await prisma.apiKey.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.proposal.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create demo users
  console.log('👤 Creating demo users...')
  
  const users = [
    {
      clerkId: 'user_demo_free',
      email: 'free@demo.pitchauto.com',
      name: 'Free Demo User',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=free',
      subscriptionPlan: 'free',
      subscriptionStatus: 'active',
    },
    {
      clerkId: 'user_demo_starter',
      email: 'starter@demo.pitchauto.com',
      name: 'Starter Demo User',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=starter',
      subscriptionPlan: 'starter',
      subscriptionStatus: 'active',
      stripeCustomerId: 'cus_demo_starter',
      subscriptionId: 'sub_demo_starter',
    },
    {
      clerkId: 'user_demo_pro',
      email: 'pro@demo.pitchauto.com',
      name: 'Pro Demo User',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pro',
      subscriptionPlan: 'pro',
      subscriptionStatus: 'active',
      stripeCustomerId: 'cus_demo_pro',
      subscriptionId: 'sub_demo_pro',
    },
  ]

  const createdUsers = []
  for (const userData of users) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        lastLoginAt: new Date(),
      },
    })
    createdUsers.push(user)
    console.log(`✅ Created user: ${user.email}`)
  }

  // Create sample proposals for each user
  console.log('📝 Creating sample proposals...')
  
  const proposalTemplates = [
    {
      jobTitle: 'React Developer for E-commerce Platform',
      jobDescription: 'We need an experienced React developer to help build our next-generation e-commerce platform.',
      skills: 'React, TypeScript, Node.js, 5 years experience',
      content: `Dear Hiring Manager,

I am excited about the opportunity to work on your e-commerce platform. With 5 years of experience in React and TypeScript, I have successfully delivered similar projects that increased conversion rates by 40%.

My approach would include:
• Building a scalable component library
• Implementing performance optimizations
• Ensuring mobile-first responsive design
• Setting up comprehensive testing

I can start immediately and would love to discuss your specific requirements in detail.

Best regards`,
      confidence: 0.92,
      wordCount: 87,
      status: 'sent',
    },
    {
      jobTitle: 'WordPress Developer for Corporate Website',
      jobDescription: 'Looking for a WordPress expert to redesign our corporate website with custom functionality.',
      skills: 'WordPress, PHP, MySQL, Custom Themes',
      content: `Hello,

Your corporate website redesign project aligns perfectly with my expertise. I have developed over 50 custom WordPress sites for businesses like yours.

I can deliver:
• Custom theme development from scratch
• Advanced custom fields integration
• Performance optimization
• SEO-friendly structure
• Mobile responsive design

My recent similar project for a Fortune 500 company resulted in 200% increase in user engagement.

Let's schedule a call to discuss your vision.`,
      confidence: 0.88,
      wordCount: 93,
      status: 'accepted',
    },
    {
      jobTitle: 'Python Developer for Data Analysis Tool',
      jobDescription: 'We need a Python developer to build a data analysis tool for our research team.',
      skills: 'Python, Pandas, NumPy, Data Visualization',
      content: `Hi there,

I'm thrilled about your data analysis tool project. With my strong background in Python and data science, I can build exactly what your research team needs.

I will provide:
• Clean, maintainable Python code
• Efficient data processing with Pandas
• Interactive visualizations
• Comprehensive documentation
• Training for your team

I recently built a similar tool that reduced analysis time by 75% for a research institution.

Available to start this week. Looking forward to collaborating!`,
      confidence: 0.90,
      wordCount: 95,
      status: 'draft',
    },
  ]

  for (const user of createdUsers) {
    for (let i = 0; i < proposalTemplates.length; i++) {
      const template = proposalTemplates[i]
      const proposal = await prisma.proposal.create({
        data: {
          userId: user.id,
          ...template,
          tone: 'professional',
          aiModel: 'gpt-3.5-turbo',
          sentAt: template.status === 'sent' || template.status === 'accepted' ? new Date() : null,
          viewedAt: template.status === 'accepted' ? new Date() : null,
          clientResponse: template.status === 'accepted' ? 'Great proposal! When can you start?' : null,
        },
      })
      console.log(`✅ Created proposal for ${user.name}: ${proposal.jobTitle}`)
    }
  }

  // Create sample payments for paid users
  console.log('💳 Creating sample payments...')
  
  const paidUsers = createdUsers.filter(u => u.subscriptionPlan !== 'free')
  for (const user of paidUsers) {
    const amount = user.subscriptionPlan === 'starter' ? 2900 : 9900 // in cents
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentId: `pi_demo_${user.id}`,
        amount,
        currency: 'usd',
        status: 'succeeded',
        description: `${user.subscriptionPlan} Plan Subscription`,
        receiptUrl: `https://stripe.com/receipts/demo/${user.id}`,
      },
    })
    console.log(`✅ Created payment for ${user.name}: $${amount / 100}`)
  }

  // Create API keys for pro users
  console.log('🔑 Creating API keys...')
  
  const proUsers = createdUsers.filter(u => u.subscriptionPlan === 'pro')
  for (const user of proUsers) {
    const apiKey = await prisma.apiKey.create({
      data: {
        userId: user.id,
        key: `pk_demo_${Buffer.from(user.id).toString('base64')}`,
        name: 'Production API Key',
        scopes: ['read:proposals', 'write:proposals', 'read:analytics'],
        lastUsedAt: new Date(),
      },
    })
    console.log(`✅ Created API key for ${user.name}`)
  }

  // Create audit logs
  console.log('📋 Creating audit logs...')
  
  const auditActions = [
    { action: 'login', resource: 'auth' },
    { action: 'proposal_created', resource: 'proposal' },
    { action: 'proposal_sent', resource: 'proposal' },
    { action: 'payment_processed', resource: 'payment' },
  ]

  for (const user of createdUsers) {
    for (const auditAction of auditActions) {
      // Skip payment logs for free users
      if (auditAction.action === 'payment_processed' && user.subscriptionPlan === 'free') {
        continue
      }

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: auditAction.action,
          resource: auditAction.resource,
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          method: 'POST',
          path: `/api/${auditAction.resource}`,
          metadata: {
            demo: true,
            timestamp: new Date().toISOString(),
          },
        },
      })
    }
  }
  console.log('✅ Created audit logs')

  console.log('\n🎉 Database seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Users created: ${createdUsers.length}`)
  console.log(`- Proposals created: ${createdUsers.length * proposalTemplates.length}`)
  console.log(`- Payments created: ${paidUsers.length}`)
  console.log(`- API keys created: ${proUsers.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })