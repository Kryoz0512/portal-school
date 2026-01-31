'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'

const schedule = [
  {
    id: 1,
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    subject: 'English',
    room: 'Room 101',
  },
  {
    id: 2,
    day: 'Monday',
    time: '9:15 AM - 10:15 AM',
    subject: 'Mathematics',
    room: 'Room 102',
  },
  {
    id: 3,
    day: 'Tuesday',
    time: '8:00 AM - 9:00 AM',
    subject: 'Science',
    room: 'Lab 201',
  },
  {
    id: 4,
    day: 'Tuesday',
    time: '10:30 AM - 11:30 AM',
    subject: 'Social Studies',
    room: 'Room 103',
  },
  {
    id: 5,
    day: 'Wednesday',
    time: '8:00 AM - 9:00 AM',
    subject: 'Filipino',
    room: 'Room 104',
  },
  {
    id: 6,
    day: 'Thursday',
    time: '2:00 PM - 3:00 PM',
    subject: 'Physical Education',
    room: 'Gym',
  },
]

export default function StudentSchedulePage() {
  const columns = [
    { key: 'day', label: 'Day' },
    { key: 'time', label: 'Time' },
    { key: 'subject', label: 'Subject' },
    { key: 'room', label: 'Room' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Class Schedule
        </h2>
        <p className="text-muted-foreground mt-1">
          Your timetable for this semester
        </p>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={schedule}
          showActions={false}
        />
      </Card>
    </div>
  )
}
