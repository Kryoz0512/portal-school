'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { FilterCard } from '@/components/filter-card'
import { DataCard } from '@/components/data-card'
import { FormField } from '@/components/form-field'
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
      <PageHeader
        title="Faculty & Subjects"
        description="Manage subject catalog"
      />

      <FilterCard>
        <FormField
          label="Grade Level"
          value={gradeLevel}
          onSelectChange={setGradeLevel}
          options={[
            { value: 'all', label: 'All Grades' },
            { value: 'Grade 9', label: 'Grade 9' },
            { value: 'Grade 10', label: 'Grade 10' },
          ]}
        />
        <FormField
          label="Subject Name"
          value={subjectName}
          onSelectChange={setSubjectName}
          options={[
            { value: 'all', label: 'All Subjects' },
            { value: 'English', label: 'English' },
            { value: 'Mathematics', label: 'Mathematics' },
            { value: 'Science', label: 'Science' },
          ]}
        />
      </FilterCard>

      <DataCard
        title="Subjects List"
        action={<Button className="bg-primary text-primary-foreground" size="sm">Print Results</Button>}
      >
        <DataTable columns={columns} data={filteredData} showActions={false} />
      </DataCard>
    </div>
  )
}
