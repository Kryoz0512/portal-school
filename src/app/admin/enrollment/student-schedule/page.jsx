'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

// Dummy schedule data with LRN
const scheduleData = [
  { id: 1, studentName: 'Alice Johnson', lrn: 'LRN-001', section: 'Grade 10-A', subject: 'English', room: '101', day: 'Monday', time: '08:00 AM' },
  { id: 2, studentName: 'Alice Johnson', lrn: 'LRN-001', section: 'Grade 10-A', subject: 'Mathematics', room: '102', day: 'Monday', time: '09:15 AM' },
  { id: 3, studentName: 'Bob Smith', lrn: 'LRN-002', section: 'Grade 10-A', subject: 'Science', room: 'Lab 201', day: 'Tuesday', time: '10:30 AM' },
  { id: 4, studentName: 'Carol Davis', lrn: 'LRN-003', section: 'Grade 10-B', subject: 'English', room: '103', day: 'Wednesday', time: '08:00 AM' },
  { id: 5, studentName: 'Carol Davis', lrn: 'LRN-003', section: 'Grade 10-B', subject: 'Mathematics', room: '104', day: 'Wednesday', time: '09:30 AM' },
]

export default function StudentSchedulePage() {
  const [schedules] = useState(scheduleData)
  const [searchStudent, setSearchStudent] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedStudentSchedules, setSelectedStudentSchedules] = useState([])


  // Get unique students from schedules
  const uniqueStudents = useMemo(() => {
    const seen = new Map()
    return schedules.filter((schedule) => {
      const key = schedule.lrn
      if (seen.has(key)) return false
      seen.set(key, true)
      return true
    })
  }, [schedules])

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    return uniqueStudents.filter((student) =>
      student.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.lrn.toLowerCase().includes(searchStudent.toLowerCase()) ||
      student.section.toLowerCase().includes(searchStudent.toLowerCase())
    )
  }, [searchStudent, uniqueStudents])

  const handleStudentClick = (student) => {
    const studentSchedules = schedules.filter((schedule) => schedule.lrn === student.lrn)
    setSelectedStudent(student)
    setSelectedStudentSchedules(studentSchedules)
    setShowScheduleModal(true)
  }

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'section', label: 'Section' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Student Schedule</h2>
        <p className="text-muted-foreground mt-1">View student schedules</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Search</h3>
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-foreground mb-2">
            Student Name or LRN
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-3 text-left font-semibold text-foreground">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.lrn}
                  onClick={() => handleStudentClick(student)}
                  className="border-b border-border hover:bg-muted cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-foreground">{student.studentName}</td>
                  <td className="px-4 py-3 text-foreground">{student.lrn}</td>
                  <td className="px-4 py-3 text-foreground">{student.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No students found</div>
          )}
        </div>
      </Card>

      {/* Schedule Modal */}
      {showScheduleModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header with close button */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Student Schedule</h3>
                  <p className="text-muted-foreground mt-1">View schedule details</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Student Information */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">Student Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{selectedStudent.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LRN</p>
                    <p className="font-medium text-foreground">{selectedStudent.lrn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Section</p>
                    <p className="font-medium text-foreground">{selectedStudent.section}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Subjects & Schedule</h4>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Subject</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Room</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Day</th>
                        <th className="px-4 py-3 text-left font-semibold text-foreground">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStudentSchedules.map((schedule) => (
                        <tr key={schedule.id} className="border-b border-border hover:bg-muted transition-colors">
                          <td className="px-4 py-3 text-foreground">{schedule.subject}</td>
                          <td className="px-4 py-3 text-foreground">{schedule.room}</td>
                          <td className="px-4 py-3 text-foreground">{schedule.day}</td>
                          <td className="px-4 py-3 text-foreground">{schedule.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setShowScheduleModal(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}