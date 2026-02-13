'use client'

import { Card } from '@/components/ui/card'

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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground border border-border bg-muted">
                  Subject
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground border border-border bg-muted">
                  Schedule
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground border border-border bg-muted">
                  Sections & Room
                </th>
                {/* {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-left font-semibold text-foreground border border-border bg-muted text-center"
                  >
                    {day}
                  </th>
                ))} */}
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-foreground border border-border">
                    {item.subject}
                  </td>
                  <td className="px-4 py-3 text-foreground border border-border">
                    {item.day} - {item.time}
                  </td>
                  <td className="px-4 py-3 text-foreground border border-border">
                    {item.room}
                  </td>
                </tr>
              ))}
              {/* {times.map((time) => (
                <tr key={time}>
                  <td className="px-4 py-3 text-foreground border border-border font-medium bg-muted">
                    {time}
                  </td>
                  {days.map((day) => {
                    const scheduleItem = schedule.find((s) => s.time === time && s.day === day)
                    return (
                      <td
                        key={`${day}-${time}`}
                        className="px-4 py-3 text-foreground border border-border"
                      >
                        {scheduleItem ? (
                          <div>
                            <p className="font-medium">{scheduleItem.subject}</p>
                            <p className="text-sm text-muted-foreground">
                              {scheduleItem.room}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
