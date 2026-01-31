'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'

const enrolledSubjects = [
  {
    id: 1,
    subjectName: 'English',
    enrolledDate: '08/15/2024',
  },
  {
    id: 2,
    subjectName: 'Mathematics',
    enrolledDate: '08/15/2024',
  },
  {
    id: 3,
    subjectName: 'Science',
    enrolledDate: '08/16/2024',
  },
  {
    id: 4,
    subjectName: 'Social Studies',
    enrolledDate: '08/16/2024',
  },
  {
    id: 5,
    subjectName: 'Physical Education',
    enrolledDate: '08/17/2024',
  },
  {
    id: 6,
    subjectName: 'Filipino',
    enrolledDate: '08/17/2024',
  },
]

export default function StudentSubjectsPage() {
  const columns = [
    { key: 'subjectName', label: 'Subject Name' },
    {
      key: 'enrolledDate',
      label: 'Date Officially Enrolled',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Enrolled Subjects
        </h2>
        <p className="text-muted-foreground mt-1">
          Your registered courses for this school year
        </p>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={enrolledSubjects}
          showActions={false}
        />
      </Card>
    </div>
  )
}
