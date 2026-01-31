'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'

const scheduleData = [
  {
    id: 1,
    day: 'Monday',
    time: '8:00 AM - 9:00 AM',
    subject: 'English',
    section: 'Section A',
    room: 'Room 101',
  },
  {
    id: 2,
    day: 'Monday',
    time: '9:15 AM - 10:15 AM',
    subject: 'English',
    section: 'Section B',
    room: 'Room 102',
  },
  {
    id: 3,
    day: 'Monday',
    time: '10:30 AM - 11:00 AM',
    subject: 'Break Time',
    section: '-',
    room: '-',
  },
  {
    id: 4,
    day: 'Tuesday',
    time: '8:00 AM - 9:00 AM',
    subject: 'English',
    section: 'Section C',
    room: 'Room 103',
  },
  {
    id: 5,
    day: 'Wednesday',
    time: '1:00 PM - 2:00 PM',
    subject: 'English',
    section: 'Section A',
    room: 'Room 101',
  },
]

export default function TeacherSchedulePage() {
  const columns = [
    { key: 'day', label: 'Day' },
    { key: 'time', label: 'Time' },
    { key: 'subject', label: 'Subject' },
    { key: 'section', label: 'Section' },
    { key: 'room', label: 'Room' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Teaching Schedule
        </h2>
        <p className="text-muted-foreground mt-1">
          Your weekly teaching schedule
        </p>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={scheduleData}
          showActions={false}
        />
      </Card>
    </div>
  )
}
