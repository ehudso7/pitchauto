import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from || process.env.EMAIL_FROM || 'PitchAuto <noreply@pitchauto.com>',
      to,
      subject,
      html,
    })

    if (error) {
      console.error('Email send error:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to PitchAuto!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7C3AED;">Welcome to PitchAuto, ${name}!</h1>
        <p>We're excited to have you on board. With PitchAuto, you can:</p>
        <ul>
          <li>Generate winning proposals in seconds</li>
          <li>Increase your response rates</li>
          <li>Win more clients</li>
        </ul>
        <p>Get started by creating your first proposal:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="display: inline-block; background: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Create Proposal
        </a>
        <p style="margin-top: 30px; color: #666;">
          If you have any questions, reply to this email or visit our help center.
        </p>
        <p style="color: #666;">
          Best regards,<br>
          The PitchAuto Team
        </p>
      </div>
    `,
  }),

  proposalSent: (proposalTitle: string) => ({
    subject: 'Your proposal has been sent!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7C3AED;">Proposal Sent Successfully!</h1>
        <p>Your proposal "${proposalTitle}" has been sent to the client.</p>
        <p>We'll notify you when the client views your proposal.</p>
        <p>Tips for success:</p>
        <ul>
          <li>Follow up within 24-48 hours</li>
          <li>Be ready to answer questions</li>
          <li>Keep your calendar open for meetings</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="display: inline-block; background: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          View Dashboard
        </a>
        <p style="margin-top: 30px; color: #666;">
          Good luck!<br>
          The PitchAuto Team
        </p>
      </div>
    `,
  }),

  paymentSuccess: (amount: number, plan: string) => ({
    subject: 'Payment confirmed - Welcome to PitchAuto Pro!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #7C3AED;">Payment Confirmed!</h1>
        <p>Thank you for upgrading to PitchAuto ${plan}!</p>
        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Amount:</strong> $${(amount / 100).toFixed(2)}</p>
          <p style="margin: 0;"><strong>Plan:</strong> ${plan}</p>
          <p style="margin: 0;"><strong>Billing:</strong> Monthly</p>
        </div>
        <p>Your upgraded features are now active:</p>
        <ul>
          <li>Unlimited proposal generation</li>
          <li>Advanced AI models</li>
          <li>Priority support</li>
          <li>Analytics dashboard</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="display: inline-block; background: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
          Start Using Pro Features
        </a>
        <p style="margin-top: 30px; color: #666;">
          Thank you for choosing PitchAuto!<br>
          The PitchAuto Team
        </p>
      </div>
    `,
  }),
}