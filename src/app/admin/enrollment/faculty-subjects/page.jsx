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
import { AssignTeacherModal } from '@/components/assign-teacher-modal'

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
  const [editingSubject, setEditingSubject] = useState(null)

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

  const handleAddTeacher = (formData) => {
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...formData, id: editingSubject.id } : s))
      setEditingSubject(null)
    } else {
      const newEntry = {
        id: subjects.length + 1,
        ...formData
      }
      setSubjects([...subjects, newEntry])
    }
  }

  const handleEdit = (row) => {
    setEditingSubject(row)
    setShowModal(true)
  }

  const handleDelete = (row) => {
    setSubjects(subjects.filter(s => s.id !== row.id))
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSubject(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty & Subjects"
        description="Manage subject catalog"
        action={
          <Button 
            className="bg-primary text-primary-foreground" 
            size="sm" 
            onClick={() => setShowModal(true)}
          >
            Assign Teacher
          </Button>
        }
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

      <DataCard title="Subjects List">
        <DataTable 
          columns={columns} 
          data={filteredData} 
          showActions={true} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </DataCard>

      <AssignTeacherModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleAddTeacher}
        initialData={editingSubject}
      />
    </div>
  )
}
