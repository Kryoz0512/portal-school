'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Phone, Users } from 'lucide-react'

export default function StudentDashboard() {
  const studentData = {
    name: 'Maria Santos',
    lrn: '123456789012',
    mobileNumber: '+63 912 345 6789',
    parentMobileNumber: '+63 987 654 3210',
  }

  const stats = [
    {
      label: 'Student Name',
      value: studentData.name,
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'Student LRN',
      value: studentData.lrn,
      icon: <Badge className="w-5 h-5" />,
    },
    {
      label: 'Mobile Number',
      value: studentData.mobileNumber,
      icon: <Phone className="w-5 h-5" />,
    },
    {
      label: 'Parent Mobile Number',
      value: studentData.parentMobileNumber,
      icon: <Users className="w-5 h-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Welcome, {studentData.name}!
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's your academic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="text-primary ml-4 opacity-70">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="font-semibold text-foreground mb-3">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href="/student/subjects"
            className="p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <p className="font-medium text-foreground">Enrolled Subjects</p>
            <p className="text-sm text-muted-foreground">View your courses</p>
          </a>

          <a
            href="/student/schedule"
            className="p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <p className="font-medium text-foreground">Class Schedule</p>
            <p className="text-sm text-muted-foreground">Your timetable</p>
          </a>

          <a
            href="/student/report-card"
            className="p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <p className="font-medium text-foreground">Report Card</p>
            <p className="text-sm text-muted-foreground">Your grades</p>
          </a>
        </div>
      </Card>
    </div>
  )
}
