// Email template for successful proposal generation

export const proposalSuccessTemplate = (data: {
  name: string
  jobTitle: string
  proposalId: string
  confidence: number
  wordCount: number
  proposalSnippet: string
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Proposal is Ready!</title>
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
      background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
    }
    .content {
      padding: 40px 30px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 30px 0;
    }
    .stat-box {
      text-align: center;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #7c3aed;
    }
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .proposal-preview {
      background-color: #f3f4f6;
      border-left: 4px solid #7c3aed;
      padding: 20px;
      margin: 30px 0;
      border-radius: 0 8px 8px 0;
      font-style: italic;
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
      background-color: white;
      color: #7c3aed;
      border: 2px solid #7c3aed;
    }
    .tips-box {
      background-color: #fef3c7;
      border: 1px solid #fcd34d;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
    }
    .tips-box h3 {
      margin-top: 0;
      color: #92400e;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Your Proposal is Ready!</h1>
      <p style="font-size: 18px; margin-top: 10px;">For: ${data.jobTitle}</p>
    </div>
    
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Great news! Your AI-powered proposal has been generated and is ready for you to review and send.</p>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-value">${data.confidence}%</div>
          <div class="stat-label">Confidence Score</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${data.wordCount}</div>
          <div class="stat-label">Words</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">2-3 min</div>
          <div class="stat-label">Read Time</div>
        </div>
      </div>
      
      <h3>Preview:</h3>
      <div class="proposal-preview">
        "${data.proposalSnippet}..."
      </div>
      
      <div class="cta-section">
        <a href="https://pitchauto.com/proposals/${data.proposalId}" class="button">View Full Proposal</a>
        <a href="https://pitchauto.com/proposals/${data.proposalId}/edit" class="button secondary">Edit & Customize</a>
      </div>
      
      <div class="tips-box">
        <h3>💡 Pro Tips for Higher Success Rates:</h3>
        <ul style="margin-bottom: 0;">
          <li>Personalize the opening with specific details about the client</li>
          <li>Add 1-2 relevant portfolio examples</li>
          <li>Include a clear timeline and next steps</li>
          <li>Follow up within 48 hours if you don't hear back</li>
        </ul>
      </div>
      
      <div style="background-color: #e3f2fd; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h4 style="margin-top: 0; color: #1976d2;">📊 Track Your Success</h4>
        <p style="margin-bottom: 0;">Remember to update the proposal status in your dashboard when you hear back. This helps our AI learn and improve future proposals!</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Need to make changes?</strong></p>
      <p>You can edit this proposal anytime from your dashboard.</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #999;">
        © 2024 PitchAuto. All rights reserved.<br>
        Proposal ID: ${data.proposalId}<br>
        <a href="#" style="color: #999;">Unsubscribe from notifications</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}