'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'

export function Header({ title, onMenuToggle, mobileMenuOpen }) {
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
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    </>
  )
}
