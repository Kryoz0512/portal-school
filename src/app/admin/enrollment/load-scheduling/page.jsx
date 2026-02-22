'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState, useMemo } from 'react'
import { Label } from '@/components/ui/label'

// Dummy data for dropdowns
const gradeLevels = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']

const sectionsByGrade = {
  'Grade 7': ['Grade 7-A', 'Grade 7-B', 'Grade 7-C'],
  'Grade 8': ['Grade 8-A', 'Grade 8-B'],
  'Grade 9': ['Grade 9-A', 'Grade 9-B', 'Grade 9-C'],
  'Grade 10': ['Grade 10-A', 'Grade 10-B'],
}

const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Lab 201', 'Gym']

const subjects = ['Mathematics', 'Science', 'English', 'Filipino', 'Araling Panlipunan', 'MAPEH']

const teachersBySubject = {
  'Mathematics': ['Mr. Smith', 'Ms. Davis'],
  'Science': ['Dr. Garcia', 'Mr. White'],
  'English': ['Ms. Johnson', 'Mrs. Brown'],
  'Filipino': ['Mr. Cruz', 'Ms. Santos'],
  'Araling Panlipunan': ['Mrs. Reyes', 'Mr. Lopez'],
  'MAPEH': ['Mr. Lee', 'Ms. Clark'],
}

const initialSchedules = [
  { id: 1, gradeLevel: 'Grade 10', section: 'Grade 10-A', dateTime: 'Mon 08:00 AM', room: '101', subject: 'English', teacher: 'Ms. Johnson' },
  { id: 2, gradeLevel: 'Grade 10', section: 'Grade 10-A', dateTime: 'Mon 09:15 AM', room: '102', subject: 'Mathematics', teacher: 'Mr. Smith' },
  { id: 3, gradeLevel: 'Grade 10', section: 'Grade 10-B', dateTime: 'Tue 10:30 AM', room: '103', subject: 'Science', teacher: 'Dr. Garcia' },
  { id: 4, gradeLevel: 'Grade 9', section: 'Grade 9-A', dateTime: 'Wed 01:00 PM', room: 'Lab 201', subject: 'Science', teacher: 'Mr. White' },
]

export default function LoadSchedulingPage() {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [gradeLevelFilter, setGradeLevelFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [roomFilter, setRoomFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    gradeLevel: '',
    section: '',
    dateTime: '',
    room: '',
    subject: '',
    teacher: '',
  })

  const columns = [
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
    { key: 'dateTime', label: 'Date / Time' },
    { key: 'room', label: 'Room' },
    { key: 'subject', label: 'Subject' },
    { key: 'teacher', label: 'Teacher' },
  ]

  const filteredData = schedules.filter((item) => {
    const gradeMatch = gradeLevelFilter === 'all' || item.gradeLevel === gradeLevelFilter
    const sectionMatch = sectionFilter === 'all' || item.section === sectionFilter
    const roomMatch = roomFilter === 'all' || item.room === roomFilter
    const subjectMatch = subjectFilter === 'all' || item.subject === subjectFilter
    return gradeMatch && sectionMatch && roomMatch && subjectMatch
  })

  const availableSectionsFilter = useMemo(() => {
    return gradeLevelFilter !== 'all' ? sectionsByGrade[gradeLevelFilter] || [] : []
  }, [gradeLevelFilter])

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id))
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setFormData({
      gradeLevel: row.gradeLevel,
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
    setFormData({ gradeLevel: '', section: '', dateTime: '', room: '', subject: '', teacher: '' })
  }

  const availableSections = useMemo(() => {
    return formData.gradeLevel ? sectionsByGrade[formData.gradeLevel] || [] : []
  }, [formData.gradeLevel])

  const availableTeachers = useMemo(() => {
    return formData.subject ? teachersBySubject[formData.subject] || [] : []
  }, [formData.subject])

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
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Add'} Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gradeLevel" className="text-right">
                    Grade Level
                  </Label>
                  <Select 
                    value={formData.gradeLevel} 
                    onValueChange={(value) => setFormData({ ...formData, gradeLevel: value, section: '' })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section" className="text-right">
                    Section
                  </Label>
                  <Select 
                    value={formData.section} 
                    onValueChange={(value) => setFormData({ ...formData, section: value })}
                    disabled={!formData.gradeLevel}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSections.map((sec) => (
                        <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Select 
                    value={formData.room} 
                    onValueChange={(value) => setFormData({ ...formData, room: value })}
                    disabled={!formData.section}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>{room}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData({ ...formData, subject: value, teacher: '' })}
                    disabled={!formData.room}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subj) => (
                        <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    Teacher
                  </Label>
                  <Select 
                    value={formData.teacher} 
                    onValueChange={(value) => setFormData({ ...formData, teacher: value })}
                    disabled={!formData.subject}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTeachers.map((teacher) => (
                        <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateTime" className="text-right">
                    Date / Time
                  </Label>
                  <Input
                    id="dateTime"
                    placeholder="e.g. Mon 08:00 AM"
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="col-span-3"
                  />
                </div>

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Grade Level</label>
            <Select 
              value={gradeLevelFilter} 
              onValueChange={(value) => {
                setGradeLevelFilter(value)
                setSectionFilter('all') // Reset section when grade changes
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {gradeLevels.map((grade) => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Section</label>
            <Select 
              value={sectionFilter} 
              onValueChange={setSectionFilter}
              disabled={gradeLevelFilter === 'all'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {availableSectionsFilter.map((sec) => (
                  <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Room</label>
            <Select value={roomFilter} onValueChange={setRoomFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room}>{room}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
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
