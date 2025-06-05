import { NextRequest, NextResponse } from 'next/server'

// Mock user data for demo purposes
const MOCK_USER = {
  id: 'user_demo_123',
  email: 'demo@pitchauto.com',
  name: 'Demo User',
  imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  subscription: {
    plan: 'free',
    status: 'active',
    proposalsUsed: 5,
    proposalsLimit: 10,
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  stats: {
    totalProposals: 47,
    acceptedProposals: 12,
    successRate: 25.5,
    avgConfidence: 87.3
  },
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  lastLoginAt: new Date().toISOString()
}

// GET user profile
export async function GET(request: NextRequest) {
  try {
    // In production, you would:
    // 1. Verify authentication token from headers
    // 2. Get user ID from token
    // 3. Fetch user data from database
    
    // Check for authorization header (mock check)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please provide a valid token.' },
        { status: 401 }
      )
    }

    // Mock token validation
    const token = authHeader.replace('Bearer ', '')
    if (token === 'invalid-token') {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Return user profile
    return NextResponse.json({
      success: true,
      user: MOCK_USER
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

// PUT/PATCH update user profile
export async function PUT(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    let updates
    try {
      updates = await request.json()
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate allowed fields
    const allowedFields = ['name', 'email', 'imageUrl', 'preferences']
    const updateKeys = Object.keys(updates)
    const invalidFields = updateKeys.filter(key => !allowedFields.includes(key))
    
    if (invalidFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid fields: ${invalidFields.join(', ')}. Allowed fields: ${allowedFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (updates.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updates.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    // In production, update database
    const updatedUser = {
      ...MOCK_USER,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    console.log('User profile updated:', updatedUser)

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

// PATCH for partial updates
export async function PATCH(request: NextRequest) {
  return PUT(request)
}

// DELETE user account
export async function DELETE(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In production:
    // 1. Verify user wants to delete account (maybe require password)
    // 2. Cancel any active subscriptions
    // 3. Soft delete or anonymize user data
    // 4. Send confirmation email

    console.log('User account deletion requested')

    return NextResponse.json({
      success: true,
      message: 'Account scheduled for deletion. You will receive a confirmation email.'
    })

  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}