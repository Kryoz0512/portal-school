'use client'

import React, { useState } from 'react'
import { Book, FileText, LayoutDashboard, Users, NotebookPen, Archive, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Header } from '@/components/header'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({
    Enrollment: pathname?.startsWith('/admin/enrollment') || false,
    Admission: pathname?.startsWith('/admin/admission') || false,
    Registrar: pathname?.startsWith('/admin/registrar') || false,
    Records: pathname?.startsWith('/admin/records') || false,
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
      icon: <NotebookPen size={20} />,
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
    {
      label:'Admission',
      href:'#',
      icon:<FileText size={20}/>,
      onClick: () => handleToggleMenu('Admission'),
      submenu: [
        { label: 'Registration', href: '/admin/admission/registration' },
        { label: 'Accreditation', href: '/admin/admission/accreditation' },
        { label: 'Upload or Delete Picture', href: '/admin/admission/upload-or-delete-picture' },
        { label: 'View Edit Student Information', href: '/admin/admission/view-edit-student-information' },
      ],
    },
    {
      label: 'Registrar',
      href:'#',
      icon:<Book size={20}/>,
      onClick: () => handleToggleMenu('Registrar'),
      submenu: [
        { label: 'Subject Listings', href: '/admin/registrar/subject-listings'}
      ]
    },
    {
      label: 'Records',
      href:'#',
      icon:<Archive size={20}/>,
      onClick: () => handleToggleMenu('Records'),
      submenu: [
        { label: 'Final Reports', href: '/admin/records/final-reports'},
        { label: 'Transcript of Records (TOR)', href: '/admin/records/transcript-of-records'},
      ]
    },
    {
      label: 'User Management',
      href:'#',
      icon:<Users size={20}/>,
      onClick: () => handleToggleMenu('User Management'),
      submenu: [
        {label:'Admin', href:'/admin/user-management/create-admin'},
        {label:'Teacher', href:'/admin/user-management/create-teacher'},
      ]
    },
    {
      label: 'Documents',
      href: '/admin/documents',
      icon: <FileText size={20} />,
    },
    {
      label: 'Profile',
      href: '/admin/profile',
      icon: <User size={20} />,
    },
  ]

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Admin Dashboard'
    if (pathname === '/admin/profile') return 'Profile Settings'
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

