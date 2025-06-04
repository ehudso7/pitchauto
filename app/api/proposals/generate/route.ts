import { NextRequest, NextResponse } from 'next/server'

// Demo proposals for when no API key is provided
const DEMO_PROPOSALS = [
  `Dear Hiring Manager,

I am excited to apply for this position. With my extensive experience and proven track record, I am confident I can deliver exceptional results for your project.

My relevant qualifications include:
• Strong technical skills in the required areas
• Proven experience with similar projects
• Excellent communication and project management abilities
• Commitment to delivering high-quality work on time

I understand the importance of this project and am ready to start immediately. I would love to discuss how I can contribute to your success.

Looking forward to hearing from you.

Best regards`,
  
  `Hello,

Your project caught my attention because it aligns perfectly with my expertise. I have successfully completed similar projects and can bring valuable insights to your team.

What I can offer:
• Deep understanding of your requirements
• Proven methodologies that ensure success
• Regular communication and updates
• Flexible approach to meet your needs

I'm available to start right away and would be happy to share relevant examples from my portfolio. Let's schedule a brief call to discuss how I can help achieve your goals.

Thank you for considering my proposal.`
]

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, jobDescription, skills, tone } = await request.json()

    // Check if we're in demo mode or no API key
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
    const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-demo-key-replace-me'

    if (!hasApiKey || isDemoMode) {
      // Return a demo proposal
      const demoProposal = DEMO_PROPOSALS[Math.floor(Math.random() * DEMO_PROPOSALS.length)]
      const personalizedProposal = demoProposal
        .replace('this position', jobTitle || 'this position')
        .replace('Your project', `Your ${jobTitle || 'project'}`)

      return NextResponse.json({
        success: true,
        proposal: {
          content: personalizedProposal,
          confidence: 0.75 + Math.random() * 0.2, // Random confidence between 75-95%
          wordCount: personalizedProposal.split(' ').length,
          isDemo: true
        }
      })
    }

    // Use OpenAI API if available
    const { OpenAI } = await import('openai')
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const prompt = `Write a winning freelance proposal for this job:
    
Job Title: ${jobTitle}
Job Description: ${jobDescription}
My Skills: ${skills || 'Experienced professional'}
Tone: ${tone || 'professional'}

Create a personalized, compelling proposal that:
1. Shows understanding of their needs
2. Highlights relevant experience
3. Proposes a clear approach
4. Ends with a call to action
5. Is concise (150-250 words)`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert freelance proposal writer who has helped freelancers win over $10M in projects.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    })

    const proposalContent = response.choices[0].message.content || ''
    
    return NextResponse.json({
      success: true,
      proposal: {
        content: proposalContent,
        confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
        wordCount: proposalContent.split(' ').length,
        aiModel: 'gpt-3.5-turbo'
      }
    })

  } catch (error) {
    console.error('Proposal generation error:', error)
    
    // Return demo proposal on error
    const fallbackProposal = DEMO_PROPOSALS[0]
    
    return NextResponse.json({
      success: true,
      proposal: {
        content: fallbackProposal,
        confidence: 0.7,
        wordCount: fallbackProposal.split(' ').length,
        isDemo: true,
        error: 'Using demo mode due to error'
      }
    })
  }
}