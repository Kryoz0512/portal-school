'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function Sidebar({ items, role, onClose, isOpen = true }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
  }

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick()
    }
    if (item.href && item.href !== '#') {
      router.push(item.href)
      onClose?.()
    }
  }

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground shadow-lg
        transition-transform duration-300 ease-in-out z-50
        md:translate-x-0 md:relative flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="shrink-0 p-6 border-b border-sidebar-border md:border-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="font-bold text-sidebar-primary-foreground text-sm">SNHS</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Santor National Highschool</h1>
            <p className="text-xs text-white">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {items.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                  pathname === item.href
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                    : 'hover:bg-sidebar-accent/10 text-sidebar-foreground'
                }`}
              >
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
              </button>

              {item.submenu && item.submenu.length > 0 && (
                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                  {item.submenu.map((submenu) => (
                    <button
                      key={submenu.href}
                      onClick={() => handleItemClick(submenu)}
                      className={`w-full block px-4 py-2 rounded-lg text-sm transition-all text-left ${
                        pathname === submenu.href
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                      }`}
                    >
                      {submenu.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
      </nav>

      {/* Logout Button */}
      <div className="shrink-0 p-6 border-t border-sidebar-border bg-sidebar">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-red-500 cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </aside>
  )
}
