'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Dummy student data
const dummyStudents = [
  { id: 1, name: 'Juan dela Cruz', lrn: 'LRN-001' },
  { id: 2, name: 'Maria Santos', lrn: 'LRN-002' },
  { id: 3, name: 'Pedro Garcia', lrn: 'LRN-003' },
  { id: 4, name: 'Rosa Reyes', lrn: 'LRN-004' },
  { id: 5, name: 'Carlos Lopez', lrn: 'LRN-005' },
]

// Dummy data for dropdowns
const dummyData = {
  sections: ['Grade 7-A', 'Grade 8-B', 'Grade 9-C'],
  subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Filipino', 'Physical Education'],
  rooms: ['Room 101', 'Room 102', 'Lab 201', 'Room 103', 'Room 104', 'Gym'],
}

const scheduleData = [
  { id: 1, studentName: 'Alice Johnson', section: 'Grade 10-A', subject: 'English', room: '101', day: 'Monday', time: '08:00 AM' },
  { id: 2, studentName: 'Alice Johnson', section: 'Grade 10-A', subject: 'Mathematics', room: '102', day: 'Monday', time: '09:15 AM' },
  { id: 3, studentName: 'Bob Smith', section: 'Grade 10-A', subject: 'Science', room: 'Lab 201', day: 'Tuesday', time: '10:30 AM' },
  { id: 4, studentName: 'Carol Davis', section: 'Grade 10-B', subject: 'English', room: '103', day: 'Wednesday', time: '08:00 AM' },
]

export default function StudentSchedulePage() {
  const [schedules, setSchedules] = useState(scheduleData)
  const [searchStudent, setSearchStudent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return []
    return dummyStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lrn.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const tableData = schedules.filter((item) =>
    item.studentName.toLowerCase().includes(searchStudent.toLowerCase())
  )

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
    setSearchQuery('')
  }

  const handleAddSchedule = () => {
    if (selectedStudent && selectedSection && selectedSubject && selectedRoom) {
      console.log({
        student: selectedStudent,
        section: selectedSection,
        subject: selectedSubject,
        room: selectedRoom,
      })
      // Reset form
      setSelectedStudent(null)
      setSelectedSection('')
      setSelectedSubject('')
      setSelectedRoom('')
      setIsModalOpen(false)
    }
  }

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id))
  }
  
  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'section', label: 'Section' },
    { key: 'subject', label: 'Subject' },
    { key: 'room', label: 'Room' },
    { key: 'day', label: 'Day' },
    { key: 'time', label: 'Time' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Student Schedule</h2>
          <p className="text-muted-foreground mt-1">Assign and manage student schedules</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground gap-2"
        >
          + Assign Schedule
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Search</h3>
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-foreground mb-2">
            Student Name
          </label>
          <Input
            placeholder="Search student..."
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            className="bg-background"
          />
        </div>
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={tableData}
          onDelete={handleDelete}
          showActions={true}
        />
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Search & Assign Schedule</h3>

              {/* Student Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Student (Name or LRN)</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Type student name or LRN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>

                {/* Search Results Dropdown */}
                {searchQuery && filteredStudents.length > 0 && (
                  <div className="border border-border rounded-md bg-card shadow-sm">
                    {filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        onClick={() => handleSelectStudent(student)}
                        className="w-full px-4 py-2 text-left hover:bg-muted transition-colors border-b border-border last:border-0"
                      >
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.lrn}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Student Display */}
                {selectedStudent && (
                  <div className="p-3 bg-muted rounded-md">
                    <div className="font-medium">{selectedStudent.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedStudent.lrn}</div>
                  </div>
                )}
              </div>

              {/* Dropdowns - Show only after student is selected */}
              {selectedStudent && (
                <div className="space-y-4">
                  {/* Section Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section</label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Select a section...</option>
                      {dummyData.sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Select a subject...</option>
                      {dummyData.subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Room</label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Select a room...</option>
                      {dummyData.rooms.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSchedule}
                  disabled={!selectedStudent || !selectedSection || !selectedSubject || !selectedRoom}
                  className="flex-1"
                >
                  Assign Schedule
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
