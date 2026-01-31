'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const reportCardData = [
  {
    id: 1,
    subject: 'English',
    teacher: 'Ms. Johnson',
    q1: 88,
    q2: 90,
    q3: 92,
    q4: 91,
    average: 90.25,
    remarks: 'Passed',
  },
  {
    id: 2,
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    q1: 78,
    q2: 82,
    q3: 85,
    q4: 86,
    average: 82.75,
    remarks: 'Passed',
  },
  {
    id: 3,
    subject: 'Science',
    teacher: 'Dr. Garcia',
    q1: 92,
    q2: 94,
    q3: 95,
    q4: 94,
    average: 93.75,
    remarks: 'Passed',
  },
  {
    id: 4,
    subject: 'Social Studies',
    teacher: 'Ms. Williams',
    q1: 85,
    q2: 87,
    q3: 88,
    q4: 89,
    average: 87.25,
    remarks: 'Passed',
  },
]

export default function StudentReportCardPage() {
  const [schoolYear, setSchoolYear] = useState('2024-2025')

  const columns = [
    { key: 'subject', label: 'Subject Name' },
    { key: 'teacher', label: 'Subject Teacher' },
    { key: 'q1', label: 'Quarter 1' },
    { key: 'q2', label: 'Quarter 2' },
    { key: 'q3', label: 'Quarter 3' },
    { key: 'q4', label: 'Quarter 4' },
    { key: 'average', label: 'Final Average' },
    {
      key: 'remarks',
      label: 'Remarks',
      render: (value) => (
        <Badge variant={value === 'Passed' ? 'default' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Report Card</h2>
        <p className="text-muted-foreground mt-1">
          Your academic performance
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="bg-background p-4 rounded-lg space-y-3">
            <p className="font-medium text-foreground">
              Student LRN: 123456789012
            </p>
            <p className="font-medium text-foreground">
              Student Name: Maria Santos
            </p>
            <p className="font-medium text-foreground">
              Grade & Section: Grade 10 - A
            </p>
            <p className="font-medium text-foreground">
              Section Adviser: Mr. Rodriguez
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 max-w-xs">
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by School Year
              </label>
              <Select value={schoolYear} onValueChange={setSchoolYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={reportCardData}
          showActions={false}
        />
      </Card>
    </div>
  )
}
