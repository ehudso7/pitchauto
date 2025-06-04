import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update user subscription
        await prisma.user.update({
          where: { stripeCustomerId: session.customer as string },
          data: {
            subscriptionId: session.subscription as string,
            subscriptionStatus: 'active',
            subscriptionPlan: session.metadata?.plan || 'pro',
          },
        })
        
        // Create payment record
        await prisma.payment.create({
          data: {
            userId: session.metadata?.userId!,
            stripePaymentId: session.payment_intent as string,
            amount: session.amount_total!,
            currency: session.currency!,
            status: 'succeeded',
          },
        })
        
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.user.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            subscriptionStatus: subscription.status,
          },
        })
        
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await prisma.user.update({
          where: { stripeCustomerId: subscription.customer as string },
          data: {
            subscriptionStatus: 'inactive',
            subscriptionPlan: 'free',
          },
        })
        
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Create payment record
        await prisma.payment.create({
          data: {
            userId: invoice.metadata?.userId!,
            stripePaymentId: invoice.payment_intent as string,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'succeeded',
            invoiceId: invoice.id,
            receiptUrl: invoice.hosted_invoice_url,
          },
        })
        
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}