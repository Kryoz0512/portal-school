'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

const enrollmentData = [
  { id: 1, studentName: 'Alice Johnson', section: 'Grade 10-A', gradeLevel: '10', adviser: 'Ms. Johnson' },
  { id: 2, studentName: 'Bob Smith', section: 'Grade 10-A', gradeLevel: '10', adviser: 'Ms. Johnson' },
  { id: 3, studentName: 'Carol Davis', section: 'Grade 10-B', gradeLevel: '10', adviser: 'Mr. Smith' },
  { id: 4, studentName: 'David Wilson', section: 'Grade 9-A', gradeLevel: '9', adviser: 'Dr. Garcia' },
  { id: 5, studentName: 'Emma Brown', section: 'Grade 9-A', gradeLevel: '9', adviser: 'Dr. Garcia' },
]

export default function EnrollmentListPage() {
  const [gradeLevel, setGradeLevel] = useState('all')
  const [section, setSection] = useState('all')
  const [advisorSearch, setAdvisorSearch] = useState('')

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'section', label: 'Section' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'adviser', label: 'Adviser' },
  ]

  const filteredData = enrollmentData.filter((item) => {
    const gradeMatch = gradeLevel === 'all' || item.gradeLevel === gradeLevel
    const sectionMatch = section === 'all' || item.section === section
    const adviserMatch =
      advisorSearch === '' || item.adviser.toLowerCase().includes(advisorSearch.toLowerCase())
    return gradeMatch && sectionMatch && adviserMatch
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Enrollment List</h2>
        <p className="text-muted-foreground mt-1">View enrolled students by section and adviser</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Grade Level</label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Section</label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="Grade 9-A">Grade 9-A</SelectItem>
                <SelectItem value="Grade 10-A">Grade 10-A</SelectItem>
                <SelectItem value="Grade 10-B">Grade 10-B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Adviser (Search)</label>
            <Input
              placeholder="Search adviser name..."
              value={advisorSearch}
              onChange={(e) => setAdvisorSearch(e.target.value)}
              className="bg-background"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <DataTable columns={columns} data={filteredData} showActions={false} />
      </Card>
    </div>
  )
}
