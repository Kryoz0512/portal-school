'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const reportData = [
  { id: 1, lrn: '123456789001', name: 'John Garcia', grade: '10', section: 'A', average: 85, remarks: 'Passed' },
  { id: 2, lrn: '123456789002', name: 'Maria Santos', grade: '10', section: 'A', average: 92, remarks: 'Passed' },
  { id: 3, lrn: '123456789003', name: 'Pedro Lopez', grade: '10', section: 'A', average: 68, remarks: 'Failed' },
  { id: 4, lrn: '123456789004', name: 'Rosa Martinez', grade: '10', section: 'A', average: 88, remarks: 'Passed' },
]

export default function FinalReportPage() {
  const [gradeLevel, setGradeLevel] = useState('10')
  const [section, setSection] = useState('A')
  const [subject, setSubject] = useState('English')
  const [schoolYear, setSchoolYear] = useState('2024-2025')

  const columns = [
    { key: 'lrn', label: 'Student LRN' },
    { key: 'name', label: 'Student Name' },
    { key: 'grade', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
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
        <h2 className="text-3xl font-bold text-foreground">
          Final Grade Report
        </h2>
        <p className="text-muted-foreground mt-1">
          Read-only final grades summary
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Grade Level
            </label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Section
            </label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subject
            </label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              School Year
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
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={reportData}
          onPrint={() => window.print()}
          showActions={false}
        />
      </Card>
    </div>
  )
}
