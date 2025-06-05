import { NextRequest, NextResponse } from 'next/server'
import { contactFormAdminTemplate, contactFormAutoReplyTemplate } from '@/lib/email-templates'

// Email configuration - in production, these would be environment variables
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'support@pitchauto.com'
const SMTP_ENABLED = process.env.SMTP_HOST && process.env.SMTP_PORT

// Contact form subject mapping
const SUBJECT_MAPPING: Record<string, string> = {
  general: 'General Inquiry',
  support: 'Technical Support Request',
  billing: 'Billing Question',
  enterprise: 'Enterprise Sales Inquiry',
  feedback: 'Product Feedback'
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields. Please provide name, email, subject, and message.' 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate subject
    if (!SUBJECT_MAPPING[subject]) {
      return NextResponse.json(
        { success: false, error: 'Invalid subject selection' },
        { status: 400 }
      )
    }

    // Rate limiting check (simple in-memory for demo)
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `contact_${clientIp}_${email}`
    
    // In production, use Redis or similar for rate limiting
    // For now, we'll just log the attempt
    console.log(`Contact form submission from ${email} (${clientIp})`)

    // Generate reference ID
    const referenceId = `contact_${Date.now()}`
    
    // Format the email content using templates
    const emailSubject = `[PitchAuto Contact] ${SUBJECT_MAPPING[subject]} - ${name}`
    const emailBody = contactFormAdminTemplate({
      name,
      email,
      subject: SUBJECT_MAPPING[subject],
      message,
      referenceId
    })

    // Send email if SMTP is configured
    if (SMTP_ENABLED) {
      try {
        // In production, use nodemailer or similar
        // Example with nodemailer:
        // const transporter = nodemailer.createTransport({
        //   host: process.env.SMTP_HOST,
        //   port: process.env.SMTP_PORT,
        //   secure: true,
        //   auth: {
        //     user: process.env.SMTP_USER,
        //     pass: process.env.SMTP_PASS,
        //   },
        // })
        
        // await transporter.sendMail({
        //   from: process.env.SMTP_FROM || 'noreply@pitchauto.com',
        //   to: CONTACT_EMAIL,
        //   replyTo: email,
        //   subject: emailSubject,
        //   html: emailBody,
        // })

        console.log('Email would be sent:', { to: CONTACT_EMAIL, subject: emailSubject })
      } catch (error) {
        console.error('Email sending error:', error)
        // Don't fail the request if email fails, still save to database
      }
    }

    // Store in database (if configured)
    // In production, you would save this to your database
    const contactSubmission = {
      id: referenceId,
      name,
      email,
      subject,
      message,
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent') || 'unknown',
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    // Log for demo purposes
    console.log('Contact submission stored:', contactSubmission)

    // Send auto-reply to user
    const autoReplySubject = `Thank you for contacting PitchAuto`
    const autoReplyBody = contactFormAutoReplyTemplate({
      name,
      subject: SUBJECT_MAPPING[subject],
      referenceId
    })

    // In production, send auto-reply email
    if (SMTP_ENABLED) {
      console.log('Auto-reply would be sent:', { to: email, subject: autoReplySubject })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
      referenceId: contactSubmission.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check if contact form is working
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Contact API is operational',
    smtpEnabled: SMTP_ENABLED,
    contactEmail: CONTACT_EMAIL
  })
}