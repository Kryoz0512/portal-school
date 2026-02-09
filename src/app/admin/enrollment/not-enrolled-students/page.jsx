'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

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

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'gender', label: 'Gender' },
    { key: 'age', label: 'Age' },
  ]

  const handleViewInfo = (row) => {
    setSelectedStudent(row)
    setShowInfo(true)
  }

  const handleGradeLevelChange = (value) => {
    const updated = { ...selectedStudent, gradeLevel: value }
    setSelectedStudent(updated)
    setStudentData(studentData.map(s => s.id === updated.id ? updated : s))
  }

  const handleSectionChange = (value) => {
    const updated = { ...selectedStudent, section: value }
    setSelectedStudent(updated)
    setStudentData(studentData.map(s => s.id === updated.id ? updated : s))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Students Not Enrolled</h2>
        <p className="text-muted-foreground mt-1">View students pending enrollment</p>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={studentData}
          onEdit={handleViewInfo}
          showActions={true}
          customActionLabel="View Student Info"
        />
      </Card>

      {showInfo && selectedStudent && (
        <Card className="p-6 bg-card border border-accent">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-foreground">Student Information</h3>
            <Button variant="outline" size="sm" onClick={() => setShowInfo(false)}>
              Close
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="text-foreground font-medium">{selectedStudent.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LRN</p>
              <p className="text-foreground font-medium">{selectedStudent.lrn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="text-foreground font-medium">{selectedStudent.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="text-foreground font-medium">{selectedStudent.age}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grade Level</p>
              <Select value={selectedStudent.gradeLevel} onValueChange={handleGradeLevelChange}>
                <SelectTrigger className="w-xs">
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
            <div>
              <p className="text-sm text-muted-foreground">Section</p>
              <Select value={selectedStudent.section} onValueChange={handleSectionChange}>
                <SelectTrigger className="w-xs">
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
          </div>
        </Card>
      )}
    </div>
  )
}
