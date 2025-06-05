// Email template for contact form submissions

export const contactFormAdminTemplate = (data: {
  name: string
  email: string
  subject: string
  message: string
  referenceId: string
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #7c3aed;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      margin: -30px -30px 30px -30px;
      text-align: center;
    }
    .field {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 6px;
    }
    .field-label {
      font-weight: bold;
      color: #666;
      margin-bottom: 5px;
    }
    .message-content {
      white-space: pre-wrap;
      background-color: #fff;
      padding: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .reference {
      background-color: #e3f2fd;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      font-family: monospace;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    
    <div class="field">
      <div class="field-label">From:</div>
      <div>${data.name} (${data.email})</div>
    </div>
    
    <div class="field">
      <div class="field-label">Subject:</div>
      <div>${data.subject}</div>
    </div>
    
    <div class="reference">
      Reference ID: ${data.referenceId}
    </div>
    
    <div class="field">
      <div class="field-label">Message:</div>
      <div class="message-content">${data.message}</div>
    </div>
    
    <div class="footer">
      <p>This email was sent via the PitchAuto contact form.</p>
      <p>Reply directly to this email to respond to ${data.name}.</p>
    </div>
  </div>
</body>
</html>
  `
}

export const contactFormAutoReplyTemplate = (data: {
  name: string
  subject: string
  referenceId: string
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting PitchAuto</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #7c3aed;
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .content {
      padding: 40px 30px;
    }
    .reference-box {
      background-color: #f3e8ff;
      border: 1px solid #e9d5ff;
      border-radius: 6px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .reference-id {
      font-family: monospace;
      font-size: 18px;
      color: #7c3aed;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      background-color: #7c3aed;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      margin: 0 10px;
      color: #7c3aed;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank you for reaching out!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours.</p>
      
      <div class="reference-box">
        <p style="margin: 0 0 10px 0;">Your reference number is:</p>
        <div class="reference-id">${data.referenceId}</div>
        <p style="margin: 10px 0 0 0; font-size: 14px;">Please include this in any follow-up communication</p>
      </div>
      
      <h3>What happens next?</h3>
      <ul>
        <li>Our support team will review your message</li>
        <li>We'll respond within 24 hours (usually much sooner!)</li>
        <li>For urgent matters, please use our live chat</li>
      </ul>
      
      <p>In the meantime, you might find these resources helpful:</p>
      <ul>
        <li><a href="https://pitchauto.com/demo" style="color: #7c3aed;">Try our free demo</a></li>
        <li><a href="https://pitchauto.com/features" style="color: #7c3aed;">Explore our features</a></li>
        <li><a href="https://pitchauto.com/pricing" style="color: #7c3aed;">View pricing plans</a></li>
      </ul>
      
      <p style="text-align: center;">
        <a href="https://pitchauto.com" class="button">Visit PitchAuto</a>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>Need immediate assistance?</strong></p>
      <p>Call us at +1 (555) 123-4567 or use our live chat at pitchauto.com</p>
      
      <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
        <a href="#">Facebook</a>
      </div>
      
      <p style="margin-top: 20px; font-size: 12px;">
        © 2024 PitchAuto. All rights reserved.<br>
        You received this email because you submitted a contact form on our website.
      </p>
    </div>
  </div>
</body>
</html>
  `
}