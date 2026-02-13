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
  }
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
                  Sections & Room
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
                    {item.day} - {item.time}
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
