// Welcome email template for new users

export const welcomeEmailTemplate = (data: {
  name: string
  email: string
  plan: string
}) => {
  const planFeatures = {
    free: {
      name: 'Free Plan',
      features: [
        '10 proposals per month',
        'Basic AI assistance',
        'Standard templates',
        'Email support'
      ]
    },
    starter: {
      name: 'Starter Plan',
      features: [
        '100 proposals per month',
        'Advanced AI with GPT-4',
        'Custom templates',
        'Priority support',
        'Analytics dashboard'
      ]
    },
    pro: {
      name: 'Pro Plan',
      features: [
        'Unlimited proposals',
        'Premium AI models',
        'Custom branding',
        'API access',
        '24/7 phone support',
        'Advanced analytics'
      ]
    }
  }

  const currentPlan = planFeatures[data.plan] || planFeatures.free

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PitchAuto!</title>
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
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      color: white;
      padding: 60px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
    }
    .feature-box {
      background-color: #f3e8ff;
      border-radius: 8px;
      padding: 25px;
      margin: 30px 0;
    }
    .feature-list {
      list-style: none;
      padding: 0;
    }
    .feature-list li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }
    .feature-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #7c3aed;
      font-weight: bold;
    }
    .cta-section {
      text-align: center;
      margin: 40px 0;
    }
    .button {
      display: inline-block;
      background-color: #7c3aed;
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 10px;
    }
    .button.secondary {
      background-color: #e9d5ff;
      color: #7c3aed;
    }
    .tips-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 25px;
      margin: 30px 0;
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
      <h1>Welcome to PitchAuto! 🎉</h1>
      <p style="font-size: 18px; margin-top: 10px;">Your journey to winning more freelance projects starts here</p>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for joining PitchAuto! We're excited to have you on board and can't wait to help you create winning proposals that get results.</p>
      
      <div class="feature-box">
        <h2 style="color: #7c3aed; margin-top: 0;">Your ${currentPlan.name} includes:</h2>
        <ul class="feature-list">
          ${currentPlan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div class="tips-section">
        <h3 style="margin-top: 0;">🚀 Quick Start Tips</h3>
        <ol>
          <li><strong>Complete your profile:</strong> Add your skills and experience for better proposal personalization</li>
          <li><strong>Try the demo:</strong> Generate your first proposal in seconds with our demo</li>
          <li><strong>Save templates:</strong> Create reusable templates for common project types</li>
          <li><strong>Track performance:</strong> Monitor your proposal success rate in the dashboard</li>
        </ol>
      </div>
      
      <div class="cta-section">
        <h3>Ready to create your first winning proposal?</h3>
        <a href="https://pitchauto.com/dashboard" class="button">Go to Dashboard</a>
        <a href="https://pitchauto.com/demo" class="button secondary">Try Demo</a>
      </div>
      
      <div style="background-color: #e3f2fd; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h4 style="margin-top: 0; color: #1976d2;">💡 Did you know?</h4>
        <p style="margin-bottom: 0;">Users who personalize their proposals with PitchAuto see an average 3x increase in response rates!</p>
      </div>
      
      <p><strong>Need help getting started?</strong></p>
      <ul>
        <li>Check out our <a href="https://pitchauto.com/docs" style="color: #7c3aed;">documentation</a></li>
        <li>Watch our <a href="https://pitchauto.com/tutorials" style="color: #7c3aed;">video tutorials</a></li>
        <li>Contact our <a href="https://pitchauto.com/support" style="color: #7c3aed;">support team</a></li>
      </ul>
    </div>
    
    <div class="footer">
      <p><strong>Questions? We're here to help!</strong></p>
      <p>Reply to this email or contact us at support@pitchauto.com</p>
      
      <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
        <a href="#">YouTube</a>
        <a href="#">Blog</a>
      </div>
      
      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        © 2024 PitchAuto. All rights reserved.<br>
        You're receiving this email because you signed up for PitchAuto.<br>
        <a href="#" style="color: #999;">Unsubscribe</a> | <a href="#" style="color: #999;">Update preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}