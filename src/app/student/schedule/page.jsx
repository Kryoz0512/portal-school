'use client'

import { Card } from '@/components/ui/card'
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

const schedule = [
  {
    id: 1,
    day: 'MTF',
    time: '8:00 AM - 9:00 AM',
    subject: 'English',
    room: 'Room 101',
  },
  {
    id: 2,
    day: 'MTHF',
    time: '9:15 AM - 10:15 AM',
    subject: 'Mathematics',
    room: 'Room 102',
  },
  {
    id: 3,
    day: 'TTHF',
    time: '10:30 AM - 11:30 AM',
    subject: 'Science',
    room: 'Lab 201',
  },
  {
    id: 4,
    day: 'MTWF',
    time: '1:00 PM - 2:00 PM',
    subject: 'History',
    room: 'Room 305',
  },
  {
    id: 5,
    day: 'MTHF',
    time: '2:15 PM - 3:15 PM',
    subject: 'Computer Science',
    room: 'IT Lab 1',
  },
  {
    id: 6,
    day: 'TTHF',
    time: '8:00 AM - 9:30 AM',
    subject: 'Art Appreciation',
    room: 'Studio A',
  },
  {
    id: 7,
    day: 'MTF',
    time: '11:00 AM - 12:00 PM',
    subject: 'Physical Education',
    room: 'Gymnasium',
  },
  {
    id: 8,
    day: 'WTHF',
    time: '3:30 PM - 4:30 PM',
    subject: 'Social Studies',
    room: 'Room 202',
  },
]

export default function StudentSchedulePage() {

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Class Schedule
        </h2>
        <p className="text-muted-foreground mt-1">
          Your timetable for this school year
        </p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-(--table-head)">
              <TableRow>
                <TableHead className="px-4 py-3 text-white">
                  Subject
                </TableHead>
                <TableHead className="px-4 py-3 text-white">
                  Schedule
                </TableHead>
                <TableHead className="px-4 py-3 text-white">
                    Room
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-foreground border border-border">
                    {item.subject}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-foreground border border-border">
                     {item.day}<br/>
                     {item.time}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-foreground border border-border">
                    {item.room}
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
