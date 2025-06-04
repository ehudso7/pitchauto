import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { validateCSRFToken } from '@/lib/csrf'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const plans = {
  pro: {
    price: 2900, // $29 in cents
    name: 'Pro Plan',
    features: ['Unlimited proposals', 'Advanced AI models', 'Priority support'],
  },
  business: {
    price: 9900, // $99 in cents
    name: 'Business Plan',
    features: ['Everything in Pro', 'Team collaboration', 'API access', 'Custom branding'],
  },
}

export async function POST(req: Request) {
  try {
    // Validate CSRF token
    const isValidCSRF = await validateCSRFToken(req)
    if (!isValidCSRF) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
    }

    // Check authentication
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await req.json()
    
    if (!plans[plan as keyof typeof plans]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
          clerkId: userId,
        },
      })
      
      customerId = customer.id
      
      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plans[plan as keyof typeof plans].name,
              description: plans[plan as keyof typeof plans].features.join(', '),
            },
            unit_amount: plans[plan as keyof typeof plans].price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}