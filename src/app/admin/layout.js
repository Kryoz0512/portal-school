'use client'

import React, { useState } from 'react'
import { LayoutDashboard, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Header } from '@/components/header'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({
    Enrollment: pathname?.startsWith('/admin/enrollment') || false,
  })

  const handleToggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Enrollment',
      href: '#',
      icon: <Users size={20} />,
      onClick: () => handleToggleMenu('Enrollment'),
      submenu: [
        { label: 'Room Schedule', href: '/admin/enrollment/room-schedule' },
        { label: 'Room Listings', href: '/admin/enrollment/room-listings' },
        { label: 'Class Sections', href: '/admin/enrollment/class-sections' },
        { label: 'Faculty & Subjects', href: '/admin/enrollment/faculty-subjects' },
        { label: 'Load Scheduling', href: '/admin/enrollment/load-scheduling' },
        { label: 'Adviser Assignment', href: '/admin/enrollment/adviser-assignment' },
        { label: 'Students Not Enrolled', href: '/admin/enrollment/not-enrolled-students' },
        { label: 'Enrollment List', href: '/admin/enrollment/enrollment-list' },
        { label: 'Student Schedule', href: '/admin/enrollment/student-schedule' },
      ],
    },
  ]

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Admin Dashboard'
    const allItems = sidebarItems.flatMap((item) => item.submenu || [])
    const currentPage = allItems.find((item) => item.href === pathname)
    return currentPage?.label || 'Admin'
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        items={sidebarItems}
        expandedMenus={expandedMenus}
        onToggleMenu={handleToggleMenu}
        onClose={() => setMobileMenuOpen(false)}
        isOpen={mobileMenuOpen}
      />

      <main className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
        <Header
          title={getPageTitle()}
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
