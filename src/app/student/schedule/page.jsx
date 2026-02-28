'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Eye, Clock, MapPin, BookOpen } from 'lucide-react'

const scheduleData = [
  {
    id: 1,
    subject: 'English',
    time: '8:00 AM - 9:00 AM',
    days: 'Monday, Wednesday, Friday',
    room: 'Room 101',
    teacher: 'Mr. Johnson',
  },
  {
    id: 2,
    subject: 'Mathematics',
    time: '9:15 AM - 10:15 AM',
    days: 'Monday, Tuesday, Thursday, Friday',
    room: 'Room 102',
    teacher: 'Ms. Garcia',
  },
  {
    id: 3,
    subject: 'Science',
    time: '10:30 AM - 11:30 AM',
    days: 'Tuesday, Thursday, Friday',
    room: 'Lab 201',
    teacher: 'Dr. Smith',
  },
  {
    id: 4,
    subject: 'History',
    time: '1:00 PM - 2:00 PM',
    days: 'Monday, Tuesday, Wednesday, Friday',
    room: 'Room 305',
    teacher: 'Mr. Lopez',
  },
  {
    id: 5,
    subject: 'Computer Science',
    time: '2:15 PM - 3:15 PM',
    days: 'Monday, Tuesday, Thursday, Friday',
    room: 'IT Lab 1',
    teacher: 'Ms. Chen',
  },
  {
    id: 6,
    subject: 'Art Appreciation',
    time: '8:00 AM - 9:30 AM',
    days: 'Tuesday, Thursday, Friday',
    room: 'Studio A',
    teacher: 'Mr. Rivera',
  },
  {
    id: 7,
    subject: 'Physical Education',
    time: '11:00 AM - 12:00 PM',
    days: 'Monday, Wednesday, Friday',
    room: 'Gymnasium',
    teacher: 'Coach Martinez',
  },
  {
    id: 8,
    subject: 'Social Studies',
    time: '3:30 PM - 4:30 PM',
    days: 'Wednesday, Thursday, Friday',
    room: 'Room 202',
    teacher: 'Ms. Davis',
  },
]

export default function StudentSchedulePage() {
  // Mock student info
  const studentInfo = {
    name: 'Juan Dela Cruz',
    studentId: 'STU-2025-001',
    section: 'Grade 10 - Section A',
  }

  const handleViewSchedule = (subject) => {
    alert(`Viewing full schedule for ${subject}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Schedule"
        description="Your timetable for this school year"
      />

      {/* Student Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Student Name</p>
            <p className="text-lg font-semibold text-gray-900">{studentInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Student ID</p>
            <p className="text-lg font-semibold text-gray-900">{studentInfo.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Section</p>
            <p className="text-lg font-semibold text-gray-900">{studentInfo.section}</p>
          </div>
        </div>
      </Card>

      {/* Summary Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Days</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Room</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map(class_ => (
                <tr key={class_.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{class_.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{class_.time}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{class_.days}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {class_.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

