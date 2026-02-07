'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getAuthUser } from '@/lib/auth-utils'

export function Header({ title, onMenuToggle, mobileMenuOpen }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authUser = getAuthUser()
    setUser(authUser)
  }, [])

  const formatRole = (role) => {
    if (role === 'teacher') return 'Teacher'
    if (role === 'student') return 'Student'
    if (role === 'admin') return 'Admin'
    return role?.charAt(0).toUpperCase() + role?.slice(1)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <h1 className="font-bold">{title}</h1>
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-primary/80 rounded-lg"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-card border-b border-border px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {user && (
              <div className="text-sm border-l border-border pl-6 flex items-center gap-3">
                <div className="text-right">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{formatRole(user.role)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
