'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const scheduleData = [
  {
    id: 1,
    room: '101',
    subject: 'English',
    teacher: 'Ms. Johnson',
    dateTime: '2024-12-01 08:00 AM',
  },
  {
    id: 2,
    room: '102',
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    dateTime: '2024-12-01 09:15 AM',
  },
  {
    id: 3,
    room: 'Lab 201',
    subject: 'Science',
    teacher: 'Dr. Garcia',
    dateTime: '2024-12-01 01:00 PM',
  },
]

export default function RoomSchedulePage() {
  const [searchRoom, setSearchRoom] = useState('')

  const columns = [
    { key: 'room', label: 'Room' },
    { key: 'subject', label: 'Subject' },
    { key: 'teacher', label: 'Teacher' },
    { key: 'dateTime', label: 'Date / Time' },
  ]

  const filteredData = scheduleData.filter((schedule) =>
    schedule.room.toLowerCase().includes(searchRoom.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Room Schedule</h2>
        <p className="text-muted-foreground mt-1">
          View and manage room schedules
        </p>
      </div>

      <Card className="p-6">
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search by Room Number
          </label>
          <Input
            placeholder="Enter room number..."
            value={searchRoom}
            onChange={(e) => setSearchRoom(e.target.value)}
            className="bg-background"
          />
        </div>
      </Card>

      <Card className="p-6">
        <DataTable columns={columns} data={filteredData} showActions={false} />
      </Card>
    </div>
  )
}
