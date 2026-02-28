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
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

// Sample teachers with their specializations
const TEACHERS_DATABASE = [
  { id: 1, name: 'Mr. Smith', specializations: ['English', 'Literature'], gradeLevel: ['9', '10'] },
  { id: 2, name: 'Ms. Johnson', specializations: ['Mathematics', 'Algebra', 'Geometry'], gradeLevel: ['7', '8', '9', '10'] },
  { id: 3, name: 'Mr. Garcia', specializations: ['Science', 'Physics', 'Chemistry'], gradeLevel: ['9', '10'] },
  { id: 4, name: 'Ms. Lopez', specializations: ['History', 'Social Studies'], gradeLevel: ['7', '8', '9', '10'] },
  { id: 5, name: 'Mr. Davis', specializations: ['Physical Education', 'Sports'], gradeLevel: ['7', '8', '9', '10'] },
]

const subjectsData = [
  { id: 1, code: 'ENG 10', gradeLevel: '10', subject: 'English', description: 'Basic English', teacher: 'Mr. Smith', teacherId: 1, aligned: true },
  { id: 2, code: 'MATH 10', gradeLevel: '10', subject: 'Mathematics', description: 'Algebra & Geometry', teacher: 'Ms. Johnson', teacherId: 2, aligned: true },
  { id: 3, code: 'SCI 10', gradeLevel: '10', subject: 'Science', description: 'Physics & Chemistry', teacher: 'Mr. Garcia', teacherId: 3, aligned: true },
  { id: 4, code: 'HIST 9', gradeLevel: '9', subject: 'History', description: 'World History', teacher: 'Ms. Lopez', teacherId: 4, aligned: true },
  { id: 5, code: 'PE 10', gradeLevel: '10', subject: 'Physical Education', description: 'Sports & Wellness', teacher: 'Mr. Davis', teacherId: 5, aligned: true },
]

export default function FacultySubjectsPage() {
  const [gradeLevel, setGradeLevel] = useState('all')
  const [subjectName, setSubjectName] = useState('all')
  const [subjects, setSubjects] = useState(subjectsData)
  const [showModal, setShowModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [assignmentMessage, setAssignmentMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const columns = [
    { key: 'code', label: 'Subject Code' },
    { key: 'subject', label: 'Subject Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'description', label: 'Description' },
    { key: 'teacher', label: 'Assigned Teacher' },
    { 
      key: 'aligned', 
      label: 'Status',
      render: (value) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
          {value ? 'Aligned' : 'Check Alignment'}
        </span>
      )
    },
  ]

  const filteredData = subjects.filter((item) => {
    const gradeMatch = gradeLevel === 'all' || item.gradeLevel === gradeLevel
    const subjectMatch = subjectName === 'all' || item.subject.toLowerCase().includes(subjectName.toLowerCase())
    return gradeMatch && subjectMatch
  })

  const validateSubjectTeacherAlignment = (subject, teacherId) => {
    const teacher = TEACHERS_DATABASE.find(t => t.id === teacherId)
    if (!teacher) return { isAligned: false, reason: 'Teacher not found' }

    // Check if teacher has subject specialization
    const hasSpecialization = teacher.specializations.some(spec =>
      subject.toLowerCase().includes(spec.toLowerCase()) || 
      spec.toLowerCase().includes(subject.toLowerCase())
    )

    // Check if teacher teaches this grade level
    const teachesGradeLevel = teacher.gradeLevel.includes(subject.gradeLevel || '10')

    if (!hasSpecialization) {
      return { 
        isAligned: false, 
        reason: `${teacher.name} is not specialized in ${subject}` 
      }
    }

    if (!teachesGradeLevel) {
      return { 
        isAligned: false, 
        reason: `${teacher.name} does not teach grade ${subject.gradeLevel || '10'}` 
      }
    }

    return { isAligned: true, reason: 'Perfect match' }
  }

  const handleAddTeacher = (formData) => {
    const teacher = TEACHERS_DATABASE.find(t => t.id === parseInt(formData.teacherId))
    if (!teacher) {
      setAssignmentMessage('Teacher not found')
      setMessageType('error')
      return
    }

    const alignment = validateSubjectTeacherAlignment(formData.subject, teacher.id)

    if (editingSubject) {
      const updated = {
        ...editingSubject,
        ...formData,
        teacher: teacher.name,
        teacherId: teacher.id,
        aligned: alignment.isAligned
      }
      setSubjects(subjects.map(s => s.id === editingSubject.id ? updated : s))
      setAssignmentMessage(`Subject updated. ${alignment.isAligned ? 'Alignment verified!' : 'Warning: ' + alignment.reason}`)
    } else {
      const newEntry = {
        id: subjects.length + 1,
        ...formData,
        teacher: teacher.name,
        teacherId: teacher.id,
        aligned: alignment.isAligned
      }
      setSubjects([...subjects, newEntry])
      setAssignmentMessage(`${teacher.name} assigned to ${formData.subject}. ${alignment.isAligned ? 'Alignment verified!' : 'Warning: ' + alignment.reason}`)
    }

    setMessageType(alignment.isAligned ? 'success' : 'warning')
    setEditingSubject(null)
    setShowModal(false)

    setTimeout(() => setAssignmentMessage(''), 4000)
  }

  const handleEdit = (row) => {
    setEditingSubject(row)
    setShowModal(true)
  }

  const handleDelete = (row) => {
    setSubjects(subjects.filter(s => s.id !== row.id))
    setAssignmentMessage(`${row.subject} assignment removed`)
    setMessageType('info')
    setTimeout(() => setAssignmentMessage(''), 3000)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSubject(null)
  }

  // Statistics
  const alignedCount = subjects.filter(s => s.aligned).length
  const misalignedCount = subjects.filter(s => !s.aligned).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Faculty & Subjects"
        description="Manage subject assignments and validate teacher-subject alignment"
        action={
          <Button 
            className="bg-primary text-primary-foreground" 
            size="sm" 
            onClick={() => setShowModal(true)}
          >
            + Assign Subject
          </Button>
        }
      />

      {/* Assignment Message */}
      {assignmentMessage && (
        <Card className={`p-4 border-l-4 flex items-start gap-3 ${
          messageType === 'success'
            ? 'border-l-green-500 bg-green-50 text-green-800'
            : messageType === 'warning'
            ? 'border-l-yellow-500 bg-yellow-50 text-yellow-800'
            : 'border-l-blue-500 bg-blue-50 text-blue-800'
        }`}>
          {messageType === 'success' ? (
            <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
          ) : (
            <AlertTriangle size={20} className="mt-0.5 flex-shrink-0" />
          )}
          <p className="font-medium">{assignmentMessage}</p>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Subjects</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{subjects.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Aligned Assignments</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{alignedCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Check Alignment</p>
          <p className="text-3xl font-bold text-yellow-800 mt-1">{misalignedCount}</p>
        </Card>
      </div>

      {/* Filters */}
      <FilterCard>
        <FormField
          label="Grade Level"
          value={gradeLevel}
          onSelectChange={setGradeLevel}
          options={[
            { value: 'all', label: 'All Grades' },
            { value: '7', label: 'Grade 7' },
            { value: '8', label: 'Grade 8' },
            { value: '9', label: 'Grade 9' },
            { value: '10', label: 'Grade 10' },
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
            { value: 'History', label: 'History' },
            { value: 'Physical Education', label: 'Physical Education' },
          ]}
        />
      </FilterCard>

      {/* Subjects Table */}
      <DataCard title="Subject Assignments">
        <div className="mb-4 text-sm text-muted-foreground">
          <p>Showing {filteredData.length} of {subjects.length} subjects</p>
        </div>
        <DataTable 
          columns={columns} 
          data={filteredData} 
          showActions={true} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </DataCard>

      {/* Info Box */}
      <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold">About Teacher-Subject Alignment</p>
            <p className="mt-1">The system validates that assigned teachers have the proper specialization and teach the assigned grade level. Review alignment status and adjust assignments as needed.</p>
          </div>
        </div>
      </Card>

      {/* Assign Teacher Modal */}
      <AssignTeacherModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleAddTeacher}
        initialData={editingSubject}
        teachers={TEACHERS_DATABASE}
      />
    </div>
  )
}
