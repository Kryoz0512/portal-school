'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

const subjectsData = [
  { id: 1, code: 'ENG 10', subject: 'English', description: 'Basic English' },
  { id: 2, code: 'MATH 10', subject: 'Mathematics', description: 'Algebra & Geometry' },
  { id: 3, code: 'SCI 10', subject: 'Science', description: 'Physics & Chemistry' },
  { id: 4, code: 'HIST 9', subject: 'History', description: 'World History' },
  { id: 5, code: 'PE 10', subject: 'Physical Education', description: 'Sports & Wellness' },
]

export default function FacultySubjectsPage() {
  const [gradeLevel, setGradeLevel] = useState('all')
  const [subjectName, setSubjectName] = useState('all')

  const columns = [
    { key: 'code', label: 'Subject Code' },
    { key: 'subject', label: 'Subject Name' },
    { key: 'description', label: 'Subject Description' },
  ]

  const filteredData = subjectsData.filter((item) => {
    const gradeMatch =
      gradeLevel === 'all' || item.code.includes(gradeLevel.split(' ')[1])
    const subjectMatch =
      subjectName === 'all' || item.subject.toLowerCase().includes(subjectName.toLowerCase())
    return gradeMatch && subjectMatch
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Faculty & Subjects</h2>
        <p className="text-muted-foreground mt-1">Manage subject catalog</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Grade Level
            </label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subject Name
            </label>
            <Select value={subjectName} onValueChange={setSubjectName}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-foreground">Subjects List</h3>
          <Button className="bg-primary text-primary-foreground" size="sm">
            Print Results
          </Button>
        </div>
        <DataTable columns={columns} data={filteredData} showActions={false} />
      </Card>
    </div>
  )
}
