'use client'

import React from 'react'

import { DashboardLayout } from '@/components/dashboard-layout'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  Calendar,
  File,
} from 'lucide-react'

export default function TeacherLayout({ children }) {
  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/teacher/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Grade Sheets',
      href: '/teacher/grade-sheets',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Class List',
      href: '/teacher/class-list',
      icon: <Users size={20} />,
    },
    {
      label: 'Final Report',
      href: '/teacher/final-report',
      icon: <FileText size={20} />,
    },
    {
      label: 'Transcript of Records',
      href: '/teacher/transcript',
      icon: <File size={20} />,
    },
    {
      label: 'Schedule',
      href: '/teacher/schedule',
      icon: <Calendar size={20} />,
    },
    {
      label: 'Documents',
      href: '/teacher/documents',
      icon: <BookOpen size={20} />,
    },
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      title="Teacher Dashboard"
      role="teacher"
    >
      {children}
    </DashboardLayout>
  )
}
