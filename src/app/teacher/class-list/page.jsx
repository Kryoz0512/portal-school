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
import { Button } from '@/components/ui/button'

const classListData = [
  { id: 1, lrn: '123456789001', name: 'John Garcia', grade: '10', section: 'A' },
  { id: 2, lrn: '123456789002', name: 'Maria Santos', grade: '10', section: 'A' },
  { id: 3, lrn: '123456789003', name: 'Pedro Lopez', grade: '10', section: 'A' },
  { id: 4, lrn: '123456789004', name: 'Rosa Martinez', grade: '10', section: 'A' },
  { id: 5, lrn: '123456789005', name: 'Antonio Reyes', grade: '10', section: 'A' },
]

export default function ClassListPage() {
  const [subject, setSubject] = useState('English')
  const [section, setSection] = useState('A')
  const [schoolYear, setSchoolYear] = useState('2024-2025')

  const columns = [
    { key: 'lrn', label: 'Student LRN' },
    { key: 'name', label: 'Student Name' },
    { key: 'grade', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
  ]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Class List</h2>
        <p className="text-muted-foreground mt-1">
          View and manage your class
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          data={classListData}
          onPrint={handlePrint}
          showActions={false}
        />
      </Card>
    </div>
  )
}
