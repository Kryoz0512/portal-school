'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState, useMemo } from 'react'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import { ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'

// Dummy data for dropdowns
const gradeLevels = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']

const sectionsByGrade = {
  'Grade 7': ['Grade 7-A', 'Grade 7-B', 'Grade 7-C'],
  'Grade 8': ['Grade 8-A', 'Grade 8-B'],
  'Grade 9': ['Grade 9-A', 'Grade 9-B', 'Grade 9-C'],
  'Grade 10': ['Grade 10-A', 'Grade 10-B'],
}

const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Lab 201', 'Gym']

const timeSlots = [
  '08:00 AM', '09:15 AM', '10:30 AM', '11:45 AM',
  '01:00 PM', '02:15 PM', '03:30 PM'
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const subjects = ['Mathematics', 'Science', 'English', 'Filipino', 'Araling Panlipunan', 'MAPEH']

const teachersBySubject = {
  'Mathematics': [
    { id: 1, name: 'Mr. Smith', gradeLevel: ['Grade 9', 'Grade 10'] },
    { id: 2, name: 'Ms. Davis', gradeLevel: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'] }
  ],
  'Science': [
    { id: 3, name: 'Dr. Garcia', gradeLevel: ['Grade 9', 'Grade 10'] },
    { id: 4, name: 'Mr. White', gradeLevel: ['Grade 7', 'Grade 8'] }
  ],
  'English': [
    { id: 5, name: 'Ms. Johnson', gradeLevel: ['Grade 9', 'Grade 10'] },
    { id: 6, name: 'Mrs. Brown', gradeLevel: ['Grade 7', 'Grade 8'] }
  ],
  'Filipino': [
    { id: 7, name: 'Mr. Cruz', gradeLevel: ['All'] },
    { id: 8, name: 'Ms. Santos', gradeLevel: ['Grade 9', 'Grade 10'] }
  ],
  'Araling Panlipunan': [
    { id: 9, name: 'Mrs. Reyes', gradeLevel: ['All'] },
    { id: 10, name: 'Mr. Lopez', gradeLevel: ['Grade 9', 'Grade 10'] }
  ],
  'MAPEH': [
    { id: 11, name: 'Mr. Lee', gradeLevel: ['All'] },
    { id: 12, name: 'Ms. Clark', gradeLevel: ['All'] }
  ],
}

const initialSchedules = [
  { id: 1, gradeLevel: 'Grade 10', section: 'Grade 10-A', day: 'Monday', time: '08:00 AM', room: 'Room 101', subject: 'English', teacher: 'Ms. Johnson' },
  { id: 2, gradeLevel: 'Grade 10', section: 'Grade 10-A', day: 'Monday', time: '09:15 AM', room: 'Room 102', subject: 'Mathematics', teacher: 'Mr. Smith' },
  { id: 3, gradeLevel: 'Grade 10', section: 'Grade 10-B', day: 'Tuesday', time: '10:30 AM', room: 'Room 103', subject: 'Science', teacher: 'Dr. Garcia' },
  { id: 4, gradeLevel: 'Grade 9', section: 'Grade 9-A', day: 'Wednesday', time: '01:00 PM', room: 'Lab 201', subject: 'Science', teacher: 'Mr. White' },
]

export default function LoadSchedulingPage() {
  const [schedules, setSchedules] = useState(initialSchedules)
  const [gradeLevelFilter, setGradeLevelFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [roomFilter, setRoomFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saveMessage, setSaveMessage] = useState('')
  const [formData, setFormData] = useState({
    gradeLevel: '',
    section: '',
    room: '',
    subject: '',
    teacher: '',
    day: '',
    time: '',
  })

  const columns = [
    { key: 'gradeLevel', label: 'Grade' },
    { key: 'section', label: 'Section' },
    { key: 'day', label: 'Day' },
    { key: 'time', label: 'Time' },
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

  const availableSections = useMemo(() => {
    return formData.gradeLevel ? sectionsByGrade[formData.gradeLevel] || [] : []
  }, [formData.gradeLevel])

  const availableTeachers = useMemo(() => {
    return formData.subject ? teachersBySubject[formData.subject] || [] : []
  }, [formData.subject])

  const handleDelete = (schedule) => {
    setSchedules(schedules.filter((s) => s.id !== schedule.id))
    setSaveMessage('Schedule deleted successfully')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setFormData({
      gradeLevel: row.gradeLevel,
      section: row.section,
      room: row.room,
      subject: row.subject,
      teacher: row.teacher,
      day: row.day,
      time: row.time,
    })
    setDialogOpen(true)
  }

  const validateForm = () => {
    return formData.gradeLevel && formData.section && formData.room && 
           formData.subject && formData.teacher && formData.day && formData.time
  }

  const handleConfirm = () => {
    if (!validateForm()) {
      setSaveMessage('Please complete all required fields')
      return
    }

    if (editingId) {
      setSchedules(
        schedules.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
      )
    } else {
      setSchedules([...schedules, { id: schedules.length + 1, ...formData }])
    }
    setDialogOpen(false)
    setEditingId(null)
    setFormData({ gradeLevel: '', section: '', room: '', subject: '', teacher: '', day: '', time: '' })
    setSaveMessage(editingId ? 'Schedule updated successfully' : 'Schedule added successfully')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const isFormStep1Complete = formData.gradeLevel && formData.section
  const isFormStep2Complete = isFormStep1Complete && formData.room
  const isFormStep3Complete = isFormStep2Complete && formData.subject
  const isFormStep4Complete = isFormStep3Complete && formData.teacher && formData.day && formData.time

  return (
    <div className="space-y-6">
      <PageHeader
        title="Load Scheduling"
        description="Assign teachers to class schedules and manage time slots"
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">+ Add Schedule</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Create'} Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Step 1: Grade Level & Section */}
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">1</div>
                    <h3 className="font-semibold text-foreground">Grade & Section</h3>
                    {isFormStep1Complete && <CheckCircle2 size={20} className="text-green-600 ml-auto" />}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="gradeLevel" className="font-medium">Grade Level <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.gradeLevel} 
                        onValueChange={(value) => setFormData({ ...formData, gradeLevel: value, section: '' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeLevels.map((grade) => (
                            <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="section" className="font-medium">Section <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.section} 
                        onValueChange={(value) => setFormData({ ...formData, section: value })}
                        disabled={!formData.gradeLevel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSections.map((sec) => (
                            <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Room */}
                <div className={`border rounded-lg p-4 ${isFormStep1Complete ? 'bg-blue-50' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${isFormStep1Complete ? 'bg-blue-600' : 'bg-gray-400'}`}>2</div>
                    <h3 className={`font-semibold ${isFormStep1Complete ? 'text-foreground' : 'text-muted-foreground'}`}>Room</h3>
                    {isFormStep2Complete && <CheckCircle2 size={20} className="text-green-600 ml-auto" />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="room" className="font-medium">Select Room <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formData.room} 
                      onValueChange={(value) => setFormData({ ...formData, room: value })}
                      disabled={!isFormStep1Complete}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isFormStep1Complete ? "Select Room" : "Complete previous step first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Step 3: Subject */}
                <div className={`border rounded-lg p-4 ${isFormStep2Complete ? 'bg-blue-50' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${isFormStep2Complete ? 'bg-blue-600' : 'bg-gray-400'}`}>3</div>
                    <h3 className={`font-semibold ${isFormStep2Complete ? 'text-foreground' : 'text-muted-foreground'}`}>Subject</h3>
                    {isFormStep3Complete && <CheckCircle2 size={20} className="text-green-600 ml-auto" />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject" className="font-medium">Select Subject <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData({ ...formData, subject: value, teacher: '' })}
                      disabled={!isFormStep2Complete}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isFormStep2Complete ? "Select Subject" : "Complete previous step first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Step 4: Teacher & Time */}
                <div className={`border rounded-lg p-4 ${isFormStep3Complete ? 'bg-blue-50' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${isFormStep3Complete ? 'bg-blue-600' : 'bg-gray-400'}`}>4</div>
                    <h3 className={`font-semibold ${isFormStep3Complete ? 'text-foreground' : 'text-muted-foreground'}`}>Teacher & Time</h3>
                    {isFormStep4Complete && <CheckCircle2 size={20} className="text-green-600 ml-auto" />}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="grid gap-2">
                      <Label htmlFor="teacher" className="font-medium">Aligned Teachers <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.teacher} 
                        onValueChange={(value) => setFormData({ ...formData, teacher: value })}
                        disabled={!isFormStep3Complete}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isFormStep3Complete ? "Select Teacher" : "Complete previous step first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTeachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.name}>
                              <div className="flex flex-col">
                                <span>{teacher.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                          {availableTeachers.length === 0 && (
                            <div className="p-2 text-sm text-muted-foreground">No teachers available</div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="day" className="font-medium">Day <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.day} 
                        onValueChange={(value) => setFormData({ ...formData, day: value })}
                        disabled={!isFormStep3Complete}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time" className="font-medium">Time <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.time} 
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                        disabled={!isFormStep3Complete}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary text-primary-foreground" 
                    onClick={handleConfirm}
                    disabled={!isFormStep4Complete}
                  >
                    {editingId ? 'Update Schedule' : 'Create Schedule'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Save Message */}
      {saveMessage && (
        <Card className="p-4 border-l-4 border-l-green-500 bg-green-50 flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-600" />
          <p className="text-green-800 font-medium">{saveMessage}</p>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Schedules</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{schedules.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Filtered View</p>
          <p className="text-3xl font-bold text-purple-800 mt-1">{filteredData.length}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Grade Level</label>
            <Select 
              value={gradeLevelFilter} 
              onValueChange={(value) => {
                setGradeLevelFilter(value)
                setSectionFilter('all')
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

      {/* Schedules Table */}
      <Card className="p-6 border">
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
