'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export function DashboardLayout({
  children,
  sidebarItems,
  title,
  role,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        items={sidebarItems}
        role={role}
        onClose={() => setMobileMenuOpen(false)}
        isOpen={mobileMenuOpen}
      />

      <main className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
        <Header
          title={title}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </main>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
