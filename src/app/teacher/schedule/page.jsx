'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const scheduleData = [
  {
    id: 1,
    day: 'MTF',
    time: '8:00 AM - 9:00 AM',
    subject: 'English',
    section: 'Section A',
    room: 'Room 101',
  },
  {
    id: 2,
    day: 'TTh',
    time: '9:30 AM - 11:00 AM',
    subject: 'Mathematics',
    section: 'Section B',
    room: 'Room 204',
  },
  {
    id: 3,
    day: 'MWF',
    time: '1:00 PM - 2:00 PM',
    subject: 'Science',
    section: 'Section A',
    room: 'Lab 1',
  },
  {
    id: 4,
    day: 'Wed',
    time: '2:00 PM - 4:00 PM',
    subject: 'Physical Education',
    section: 'Section C',
    room: 'Gymnasium',
  },
  {
    id: 5,
    day: 'MTF',
    time: '10:00 AM - 11:00 AM',
    subject: 'History',
    section: 'Section A',
    room: 'Room 105',
  },
  {
    id: 6,
    day: 'TTh',
    time: '1:00 PM - 2:30 PM',
    subject: 'Computer Science',
    section: 'Section B',
    room: 'Computer Lab 2',
  },
]

export default function TeacherSchedulePage() {

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
        <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-(--table-head)">
            <TableRow>
            <TableHead className="px-4 py-3 text-white">Subject</TableHead>
            <TableHead className="px-4 py-3 text-white">Schedule</TableHead>
            <TableHead className="px-4 py-3 text-white">Room & Sections</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-3 text-foreground border border-border">
                  {item.subject}
                </TableCell>
                <TableCell className="px-4 py-3 text-foreground border border-border">
                  {item.day} - {item.time}
                </TableCell>
                <TableCell className="px-4 py-3 text-foreground border border-border">
                  {item.section}/{item.room}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  )
}
