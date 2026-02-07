import { validateCredentials } from '@/lib/auth-credentials'

export async function POST(request) {
  try {
    const body = await request.json()
    let { email, password, role } = body

    if (!email || !password || !role) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let user = null

    if (role === 'faculty_and_staff') {
      user = validateCredentials(email, password, 'teacher')
      if (!user) {
        user = validateCredentials(email, password, 'admin')
      }
    } else {
      user = validateCredentials(email, password, role)
    }

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    return Response.json({
      success: true,
      user: {
        ...user,
        token: `token_${user.id}_${Date.now()}`, // Simple token for demonstration
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
