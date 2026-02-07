'use client'

import { useEffect, useState } from 'react'
import { getAuthUser, clearAuth } from '@/lib/auth-utils'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function AuthInfo() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const authUser = getAuthUser()
    setUser(authUser)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    clearAuth()
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg">
      <div className="text-sm">
        <p className="font-medium">{user.name}</p>
        <p className="text-gray-600 text-xs">{user.email}</p>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="ml-auto"
      >
        Logout
      </Button>
    </div>
  )
}
