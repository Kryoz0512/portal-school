'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { NewTeacherModal } from "@/components/new-teacher-modal"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"

const initialTeachers = [
  { id: 1, employeeNo: 'T-001', name: 'Maria Santos', email: 'maria.santos@snhs.edu.ph', gradeLevel: '10', section: 'A', subject: 'Mathematics', position: 'Teacher I' },
  { id: 2, employeeNo: 'T-002', name: 'Pedro Garcia', email: 'pedro.garcia@snhs.edu.ph', gradeLevel: '9', section: 'B', subject: 'Science', position: 'Teacher III' },
]

const TEACHER_POSITIONS = {
  'Teacher I': { level: 1, salary_grade: 11 },
  'Teacher II': { level: 2, salary_grade: 12 },
  'Teacher III': { level: 3, salary_grade: 13 },
  'Teacher IV': { level: 4, salary_grade: 14 },
  'Teacher V': { level: 5, salary_grade: 15 },
  'Teacher VI': { level: 6, salary_grade: 16 },
  'Teacher VII': { level: 7, salary_grade: 17 },
  'Master Teacher I': { level: 8, salary_grade: 18 },
  'Master Teacher II': { level: 9, salary_grade: 19 },
  'Master Teacher III': { level: 10, salary_grade: 20 },
  'Master Teacher IV': { level: 11, salary_grade: 21 },
  'Master Teacher V': { level: 12, salary_grade: 22 },
}

const VALID_SUBJECTS = [
  'Mathematics', 'Science', 'English', 'Filipino', 'Araling Panlipunan', 'MAPEH',
  'Technology and Livelihood Education', 'Values Education', 'Physical Education'
]

export default function CreateTeacherPage() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [saveMessage, setSaveMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const columns = [
    { key: 'employeeNo', label: 'Employee No.' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { key: 'gradeLevel', label: 'Grade' },
    { key: 'position', label: 'Position' },
  ]

  const validateTeacherData = (teacher) => {
    // Check if subject is valid
    if (!VALID_SUBJECTS.includes(teacher.subject)) {
      setSaveMessage(`Invalid subject. Please select from: ${VALID_SUBJECTS.slice(0, 3).join(', ')}...`)
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return false
    }

    // Check email format
    if (!teacher.email.includes('@snhs.edu.ph')) {
      setSaveMessage('Email must end with @snhs.edu.ph')
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return false
    }

    // Check for duplicate email
    const emailExists = teachers.some(t => t.email === teacher.email && t.id !== editingTeacher?.id)
    if (emailExists) {
      setSaveMessage('Email already exists in the system')
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return false
    }

    // Check for duplicate employee number
    const empNoExists = teachers.some(t => t.employeeNo === teacher.employeeNo && t.id !== editingTeacher?.id)
    if (empNoExists) {
      setSaveMessage('Employee number already exists in the system')
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return false
    }

    return true
  }

  const handleAddTeacher = (newTeacher) => {
    if (!validateTeacherData(newTeacher)) return

    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...newTeacher, id: editingTeacher.id } : t))
      setSaveMessage(`Teacher ${newTeacher.name} updated successfully`)
      setEditingTeacher(null)
    } else {
      setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }])
      setSaveMessage(`Teacher ${newTeacher.name} created successfully`)
    }

    setMessageType('success')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleDelete = (row) => {
    setTeachers(teachers.filter(t => t.id !== row.id))
    setSaveMessage(`Teacher ${row.name} has been removed from the system`)
    setMessageType('info')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleEdit = (row) => {
    setEditingTeacher(row)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTeacher(null)
  }

  // Statistics
  const totalTeachers = teachers.length
  const teacherByGrade = {
    '7': teachers.filter(t => t.gradeLevel === '7').length,
    '8': teachers.filter(t => t.gradeLevel === '8').length,
    '9': teachers.filter(t => t.gradeLevel === '9').length,
    '10': teachers.filter(t => t.gradeLevel === '10').length,
  }
  const activeTeachers = teachers.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teacher Management"
        description="Create and manage teacher accounts with assignment tracking"
        action={
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground">
            <Plus size={18} className="mr-2" />
            New Teacher
          </Button>
        }
      />

      {/* Messages */}
      {saveMessage && (
        <Card className={`p-4 border-l-4 flex items-center gap-3 ${
          messageType === 'success'
            ? 'border-l-green-500 bg-green-50 text-green-800'
            : messageType === 'error'
            ? 'border-l-red-500 bg-red-50 text-red-800'
            : 'border-l-blue-500 bg-blue-50 text-blue-800'
        }`}>
          {messageType === 'success' || messageType === 'info' ? (
            <CheckCircle2 size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <p className="font-medium">{saveMessage}</p>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Teachers</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{totalTeachers}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Grade 7</p>
          <p className="text-3xl font-bold text-purple-800 mt-1">{teacherByGrade['7']}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Grade 8</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{teacherByGrade['8']}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Grade 9</p>
          <p className="text-3xl font-bold text-yellow-800 mt-1">{teacherByGrade['9']}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <p className="text-sm text-red-600 font-medium">Grade 10</p>
          <p className="text-3xl font-bold text-red-800 mt-1">{teacherByGrade['10']}</p>
        </Card>
      </div>

      {/* Validation Info Box */}
      <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-2">Teacher Account Requirements:</p>
            <ul className="space-y-1 ml-4">
              <li>✓ Email must be in format: firstname.lastname@snhs.edu.ph</li>
              <li>✓ Employee number must be unique (e.g., T-001, T-002)</li>
              <li>✓ Subject assignment is required from approved list</li>
              <li>✓ Grade level and section must be specified</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Teachers Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Teacher Accounts</h3>
          <p className="text-sm text-muted-foreground mt-1">Total: {teachers.length} teacher(s) in the system</p>
        </div>
        <DataTable
          columns={columns}
          data={teachers}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Card>

      {/* Create Teacher Modal */}
      <NewTeacherModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddTeacher}
        initialData={editingTeacher}
        validSubjects={VALID_SUBJECTS}
      />
    </div>
  )
}
