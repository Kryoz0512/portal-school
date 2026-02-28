'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { X, ChevronRight, Save, AlertCircle } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

const notEnrolledData = [
  { id: 1, studentName: 'John Martinez', lrn: '123456789', gender: 'Male', age: 16, gradeLevel: '', section: '' },
  { id: 2, studentName: 'Maria Santos', lrn: '123456790', gender: 'Female', age: 15, gradeLevel: '', section: '' },
  { id: 3, studentName: 'Carlos Reyes', lrn: '123456791', gender: 'Male', age: 17, gradeLevel: '', section: '' },
  { id: 4, studentName: 'Ana Cruz', lrn: '123456792', gender: 'Female', age: 16, gradeLevel: '', section: '' },
]

const gradeLevels = [
  { value: 'grade7', label: 'Grade 7' },
  { value: 'grade8', label: 'Grade 8' },
  { value: 'grade9', label: 'Grade 9' },
  { value: 'grade10', label: 'Grade 10' },
]

const sections = [
  { value: 'A', label: 'Section A' },
  { value: 'B', label: 'Section B' },
  { value: 'C', label: 'Section C' },
  { value: 'D', label: 'Section D' },
]

export default function NotEnrolledStudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [studentData, setStudentData] = useState(notEnrolledData)
  const [formChanges, setFormChanges] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [tempGradeLevel, setTempGradeLevel] = useState('')
  const [tempSection, setTempSection] = useState('')

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'gender', label: 'Gender' },
    { key: 'age', label: 'Age' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
  ]

  const handleViewInfo = (row) => {
    setSelectedStudent(row)
    setTempGradeLevel(row.gradeLevel)
    setTempSection(row.section)
    setFormChanges({})
    setShowInfo(true)
  }

  const handleGradeLevelChange = (value) => {
    setTempGradeLevel(value)
    setFormChanges((prev) => ({ ...prev, gradeLevel: value }))
  }

  const handleSectionChange = (value) => {
    setTempSection(value)
    setFormChanges((prev) => ({ ...prev, section: value }))
  }

  const hasChanges = Object.keys(formChanges).length > 0

  const handleSaveChanges = async () => {
    if (!selectedStudent || !hasChanges) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const updated = { ...selectedStudent, ...formChanges }
      setSelectedStudent(updated)
      setStudentData(studentData.map(s => s.id === updated.id ? updated : s))
      setFormChanges({})
      
      // Show success feedback
      setTimeout(() => {
        setShowInfo(false)
      }, 500)
    } catch (error) {
      console.error('Error saving changes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setShowInfo(false)
    setSelectedStudent(null)
    setFormChanges({})
  }

  const enrolledCount = studentData.filter(s => s.gradeLevel && s.section).length
  const pendingCount = studentData.filter(s => !s.gradeLevel || !s.section).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Not Enrolled"
        description="Manage and assign grade levels and sections to students"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Students</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{studentData.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending Assignment</p>
          <p className="text-3xl font-bold text-yellow-800 mt-1">{pendingCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Assigned</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{enrolledCount}</p>
        </Card>
      </div>

      {/* Students Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Students List</h3>
          <p className="text-sm text-muted-foreground mt-1">Click on a student to assign grade level and section</p>
        </div>
        <DataTable
          columns={columns}
          data={studentData}
          onEdit={handleViewInfo}
          showActions={true}
          customActionLabel="Edit Assignment"
        />
      </Card>

      {/* Edit Modal */}
      {showInfo && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-foreground">
                Edit Student Assignment
              </h3>
              <button
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info Display */}
              <div className="bg-slate-50 rounded-lg p-4 border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Student Name</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {selectedStudent.studentName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">LRN</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {selectedStudent.lrn}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Gender</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {selectedStudent.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Age</p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {selectedStudent.age}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grade Level Selection */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Grade Level <span className="text-red-500">*</span>
                </label>
                <Select value={tempGradeLevel} onValueChange={handleGradeLevelChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Grade Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeLevels.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Section Selection */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Section <span className="text-red-500">*</span>
                </label>
                <Select value={tempSection} onValueChange={handleSectionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.value} value={section.value}>
                        {section.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info message */}
              {!tempGradeLevel || !tempSection ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
                  <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    Both grade level and section are required to proceed
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex gap-3 p-6 border-t bg-slate-50 rounded-b-lg">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={!hasChanges || !tempGradeLevel || !tempSection || isSaving}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
