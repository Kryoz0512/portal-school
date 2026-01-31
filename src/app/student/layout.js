'use client'

import React from "react"

import { DashboardLayout } from '@/components/dashboard-layout'
import {
  BookOpen,
  Calendar,
  FileText,
  LayoutDashboard,
  User,
  AlertCircle
} from 'lucide-react'

export default function StudentLayout({ children }) {
  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/student/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Student Clearance',
      href: '/student/clearance',
      icon: <AlertCircle size={20} />,
    },
    {
      label: 'Enrolled Subjects',
      href: '/student/subjects',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Student Schedule',
      href: '/student/schedule',
      icon: <Calendar size={20} />,
    },
    {
      label: 'Report Card',
      href: '/student/report-card',
      icon: <FileText size={20} />,
    },
    {
      label: 'Profile Settings',
      href: '/student/profile',
      icon: <User size={20} />,
    },
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      title="Student Dashboard"
      role="student"
    >
      {children}
    </DashboardLayout>
  )
}
