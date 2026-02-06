'use client'

import { Card } from '@/components/ui/card'
import { Users, BookOpen, Users2, Calendar } from 'lucide-react'

export default function TeacherDashboard() {
  const stats = [
    {
      label: 'Total Students',
      value: '156',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
    },
    {
      label: 'Subjects Handled',
      value: '4',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-green-600',
    },
    {
      label: 'Sections Assigned',
      value: '6',
      icon: <Users2 className="w-6 h-6" />,
      color: 'text-purple-600',
    },
    {
      label: 'Current School Year',
      value: '2024-2025',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Welcome, Teacher!
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's your teaching overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} opacity-70`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-linear-to-br from-primary/5 to-secondary/5">
        <h3 className="font-semibold text-foreground mb-3">
          Quick Access
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a
            href="/teacher/grade-sheets"
            className="p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <p className="font-medium text-foreground">Grade Sheets</p>
            <p className="text-sm text-muted-foreground">
              Enter and manage grades
            </p>
          </a>

          <a
            href="/teacher/class-list"
            className="p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <p className="font-medium text-foreground">Class List</p>
            <p className="text-sm text-muted-foreground">
              View your students
            </p>
          </a>
        </div>
      </Card>
    </div>
  )
}
