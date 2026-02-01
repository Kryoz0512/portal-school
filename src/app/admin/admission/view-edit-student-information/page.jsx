'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

const studentsData = [
  {
    id: 1,
    studentName: 'John Doe',
    lrn: 'LRN-001',
    gradeLevel: '10',
    section: 'Grade 10-A',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    lrn: 'LRN-002',
    gradeLevel: '11',
    section: 'Grade 11-B',
  },
  {
    id: 3,
    studentName: 'Michael Johnson',
    lrn: 'LRN-003',
    gradeLevel: '9',
    section: 'Grade 9-C',
  },
  {
    id: 4,
    studentName: 'Sarah Williams',
    lrn: 'LRN-004',
    gradeLevel: '12',
    section: 'Grade 12-A',
  },
  {
    id: 5,
    studentName: 'Robert Brown',
    lrn: 'LRN-005',
    gradeLevel: '10',
    section: 'Grade 10-B',
  },
]

const gradeSectionMap = {
  '9': ['Grade 9-C'],
  '10': ['Grade 10-A', 'Grade 10-B'],
  '11': ['Grade 11-B'],
  '12': ['Grade 12-A'],
}

export default function ViewEditStudentInformationPage() {
  const [students] = useState(studentsData)
  const [filteredStudents, setFilteredStudents] = useState(studentsData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [filters, setFilters] = useState({
    studentName: '',
    lrn: '',
    gradeLevel: 'all',
    section: '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const handleSelectFilterChange = (name, value) => {
    let newFilters = { ...filters, [name]: value }
    
    // Reset section when grade level changes
    if (name === 'gradeLevel') {
      newFilters.section = ''
    }
    
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (currentFilters) => {
    const filtered = students.filter((student) => {
      return (
        (currentFilters.studentName === '' ||
          student.studentName.toLowerCase().includes(currentFilters.studentName.toLowerCase())) &&
        (currentFilters.lrn === '' ||
          student.lrn.toLowerCase().includes(currentFilters.lrn.toLowerCase())) &&
        (currentFilters.gradeLevel === 'all' ||
          currentFilters.gradeLevel === '' ||
          student.gradeLevel === currentFilters.gradeLevel) &&
        (currentFilters.section === '' ||
          student.section === currentFilters.section)
      )
    })
    setFilteredStudents(filtered)
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">View & Edit Student Information</h2>
        <p className="text-muted-foreground mt-1">Search and manage student records</p>
      </div>

      {/* Filter Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Filter Students</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Student Name
            </label>
            <Input
              type="text"
              name="studentName"
              placeholder="Search by name"
              value={filters.studentName}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              LRN
            </label>
            <Input
              type="text"
              name="lrn"
              placeholder="Search by LRN"
              value={filters.lrn}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Grade Level
            </label>
            <Select value={filters.gradeLevel} onValueChange={(value) => handleSelectFilterChange('gradeLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom">
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Section
            </label>
            {filters.gradeLevel && filters.gradeLevel !== 'all' ? (
              <Select value={filters.section} onValueChange={(value) => handleSelectFilterChange('section', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom">
                  {gradeSectionMap[filters.gradeLevel]?.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="h-9 px-4 py-2 rounded-md border border-input bg-muted text-muted-foreground text-sm flex items-center">
                Select a specific grade level first
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Table Card */}
      <Card className="p-6">
        <DataTable
          columns={columns}
          data={filteredStudents}
          onEdit={handleViewStudent}
          showActions={true}
          customActionLabel="View"
        />
      </Card>

      {/* View Student Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                <p className="text-foreground">{selectedStudent.studentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">LRN</label>
                <p className="text-foreground">{selectedStudent.lrn}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Grade Level</label>
                <p className="text-foreground">{selectedStudent.gradeLevel}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Section</label>
                <p className="text-foreground">{selectedStudent.section}</p>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
                <Button className="bg-primary text-primary-foreground">Edit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
