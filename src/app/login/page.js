'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { setAuthUser } from '@/lib/auth-utils'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Store user in sessionStorage
      setAuthUser(data.user)

      // Route based on actual user role (returned from API)
      switch (data.user.role) {
        case 'student':
          router.push('/student/dashboard')
          break
        case 'teacher':
          router.push('/teacher/dashboard')
          break
        case 'admin':
          router.push('/admin/dashboard')
          break
        default:
          break
      }
    } catch (err) {
      setError('An error occurred during login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-35 h-35 flex items-center justify-center mx-auto mb-4">
              <img src='/santorlogo.png' alt=''></img>
            </div>
            <h1 className="text-2xl font-bold text-green-700">Santor National Highschool</h1>
            <p className="text-black text-sm mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-900 text-primary-foreground font-medium mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {error && (
            <Alert className="flex mt-4 bg-red-50 border border-red-200 text-red-700">
              {error}
            </Alert>
          )}

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">Test Credentials:</p>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Student:</strong> student@school.edu / student123</p>
              <p><strong>Faculty & Staff:</strong></p>
              <p className="ml-2">Teacher: teacher@school.edu / teacher123</p>
              <p className="ml-2">Admin: admin@school.edu / admin123</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
