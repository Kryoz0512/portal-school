'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

const initialSchedules = [
  { id: 1, section: 'Grade 10-A', dateTime: 'Mon 08:00 AM', room: '101', subject: 'English', teacher: 'Ms. Johnson' },
  { id: 2, section: 'Grade 10-A', dateTime: 'Mon 09:15 AM', room: '102', subject: 'Mathematics', teacher: 'Mr. Smith' },
  { id: 3, section: 'Grade 10-B', dateTime: 'Tue 10:30 AM', room: '103', subject: 'Science', teacher: 'Dr. Garcia' },
  { id: 4, section: 'Grade 9-A', dateTime: 'Wed 01:00 PM', room: 'Lab 201', subject: 'Biology', teacher: 'Mr. Lee' },
]

export default function LoadSchedulingPage() {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [gradeLevel, setGradeLevel] = useState('all')
  const [subject, setSubject] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    section: '',
    dateTime: '',
    room: '',
    subject: '',
    teacher: '',
  })

  const subjects = Array.from(new Set(initialSchedules.map((s) => s.subject)))

  const columns = [
    { key: 'section', label: 'Section' },
    { key: 'dateTime', label: 'Date / Time' },
    { key: 'room', label: 'Room' },
    { key: 'subject', label: 'Subject' },
    { key: 'teacher', label: 'Teacher' },
  ]

  const filteredData = schedules.filter((item) => {
    const gradeMatch = gradeLevel === 'all' || item.section.includes(gradeLevel.split(' ')[1])
    const subjectMatch = subject === 'all' || item.subject.toLowerCase() === subject.toLowerCase()
    return gradeMatch && subjectMatch
  })

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id))
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setFormData({
      section: row.section,
      dateTime: row.dateTime,
      room: row.room,
      subject: row.subject,
      teacher: row.teacher,
    })
    setDialogOpen(true)
  }

  const handleConfirm = () => {
    if (editingId) {
      setSchedules(
        schedules.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
      )
    } else {
      setSchedules([...schedules, { id: schedules.length + 1, ...formData }])
    }
    setDialogOpen(false)
    setEditingId(null)
    setFormData({ section: '', dateTime: '', room: '', subject: '', teacher: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Load Scheduling</h2>
          <p className="text-muted-foreground mt-1">Assign teachers to classes and time slots</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">+ Add Schedule</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Add'} Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Section"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="bg-background"
                />
                <Input
                  placeholder="Date / Time"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  className="bg-background"
                />
                <Input
                  placeholder="Room"
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="bg-background"
                />
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background"
                />
                <Input
                  placeholder="Teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  className="bg-background"
                />
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary text-primary-foreground" onClick={handleConfirm}>
                    Confirm
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => window.print()}>Print</Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Grade Level</label>
            <Select value={gradeLevel} onValueChange={setGradeLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
