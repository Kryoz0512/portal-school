import { validateCredentials } from '@/lib/auth-credentials'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // try each role automatically
    let user =
      validateCredentials(email, password, 'student') ||
      validateCredentials(email, password, 'teacher') ||
      validateCredentials(email, password, 'admin')

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
        token: `token_${user.id}_${Date.now()}`,
      },
    })
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}