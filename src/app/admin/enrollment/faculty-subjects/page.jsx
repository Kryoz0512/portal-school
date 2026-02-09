'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { FilterCard } from '@/components/filter-card'
import { DataCard } from '@/components/data-card'
import { FormField } from '@/components/form-field'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const subjectsData = [
  { id: 1, code: 'ENG 10', subject: 'English', description: 'Basic English', teacher: 'Mr. Smith' },
  { id: 2, code: 'MATH 10', subject: 'Mathematics', description: 'Algebra & Geometry', teacher: 'Ms. Johnson' },
  { id: 3, code: 'SCI 10', subject: 'Science', description: 'Physics & Chemistry', teacher: 'Mr. Garcia' },
  { id: 4, code: 'HIST 9', subject: 'History', description: 'World History', teacher: 'Ms. Lopez' },
  { id: 5, code: 'PE 10', subject: 'Physical Education', description: 'Sports & Wellness', teacher: 'Mr. Davis' },
]

export default function FacultySubjectsPage() {
  const [gradeLevel, setGradeLevel] = useState('all')
  const [subjectName, setSubjectName] = useState('all')
  const [subjects, setSubjects] = useState(subjectsData)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    subject: '',
    description: '',
    teacher: '',
  })

  const columns = [
    { key: 'code', label: 'Subject Code' },
    { key: 'subject', label: 'Subject Name' },
    { key: 'description', label: 'Subject Description' },
    { key: 'teacher', label: 'Teacher' },
  ]

  const filteredData = subjects.filter((item) => {
    const gradeMatch =
      gradeLevel === 'all' || item.code.includes(gradeLevel.split(' ')[1])
    const subjectMatch =
      subjectName === 'all' || item.subject.toLowerCase().includes(subjectName.toLowerCase())
    return gradeMatch && subjectMatch
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddTeacher = () => {
    if (formData.code && formData.subject && formData.teacher) {
      const newEntry = {
        id: subjects.length + 1,
        code: formData.code,
        subject: formData.subject,
        description: formData.description,
        teacher: formData.teacher,
      }
      setSubjects([...subjects, newEntry])
      setFormData({ code: '', subject: '', description: '', teacher: '' })
      setShowModal(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ code: '', subject: '', description: '', teacher: '' })
  }

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
        action={<Button className="bg-primary text-primary-foreground" size="sm" onClick={() => setShowModal(true)}>Assign Teacher</Button>}
      >
        <DataTable columns={columns} data={filteredData} showActions={false} />
      </DataCard>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 bg-card border border-accent w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Assign Teacher</h3>
              <Button variant="outline" size="sm" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Subject Code</label>
                <Input
                  name="code"
                  placeholder="e.g., ENG 10"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Subject Name</label>
                <Input
                  name="subject"
                  placeholder="e.g., English"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-muted-foreground">Subject Description</label>
                <Input
                  name="description"
                  placeholder="e.g., Basic English"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-muted-foreground">Teacher Name</label>
                <Input
                  name="teacher"
                  placeholder="e.g., Mr. Smith"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <Button variant="outline" size="sm" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-primary-foreground" 
                size="sm" 
                onClick={handleAddTeacher}
              >
                Add
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
