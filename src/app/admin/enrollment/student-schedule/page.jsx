'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

const scheduleData = [
  { id: 1, studentName: 'Alice Johnson', section: 'Grade 10-A', subject: 'English', room: '101', day: 'Monday', time: '08:00 AM' },
  { id: 2, studentName: 'Alice Johnson', section: 'Grade 10-A', subject: 'Mathematics', room: '102', day: 'Monday', time: '09:15 AM' },
  { id: 3, studentName: 'Bob Smith', section: 'Grade 10-A', subject: 'Science', room: 'Lab 201', day: 'Tuesday', time: '10:30 AM' },
  { id: 4, studentName: 'Carol Davis', section: 'Grade 10-B', subject: 'English', room: '103', day: 'Wednesday', time: '08:00 AM' },
]

export default function StudentSchedulePage() {
  const [schedules, setSchedules] = useState(scheduleData)
  const [searchStudent, setSearchStudent] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'section', label: 'Section' },
    { key: 'subject', label: 'Subject' },
    { key: 'room', label: 'Room' },
    { key: 'day', label: 'Day' },
    { key: 'time', label: 'Time' },
  ]

  const filteredData = schedules.filter((item) =>
    item.studentName.toLowerCase().includes(searchStudent.toLowerCase())
  )

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id))
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Student Schedule</h2>
          <p className="text-muted-foreground mt-1">Assign and manage student schedules</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">+ Assign Schedule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Assign'} Student Schedule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Student Name" className="bg-background" />
              <Input placeholder="Section" className="bg-background" />
              <Input placeholder="Subject" className="bg-background" />
              <Input placeholder="Room" className="bg-background" />
              <Input placeholder="Day" className="bg-background" />
              <Input placeholder="Time" className="bg-background" />
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-primary-foreground">
                  Confirm
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showActions={true}
        />
      </Card>
    </div>
  )
}
