'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const transcriptData = [
  {
    id: 1,
    name: 'John Garcia',
    grade: '10',
    section: 'A',
    subject: 'English',
    average: 85,
    remarks: 'Passed',
  },
  {
    id: 2,
    name: 'Maria Santos',
    grade: '10',
    section: 'A',
    subject: 'Mathematics',
    average: 92,
    remarks: 'Passed',
  },
  {
    id: 3,
    name: 'Pedro Lopez',
    grade: '9',
    section: 'B',
    subject: 'Science',
    average: 78,
    remarks: 'Passed',
  },
]

export default function TranscriptPage() {
  const [searchName, setSearchName] = useState('')
  const [schoolYear, setSchoolYear] = useState('2024-2025')

  const columns = [
    { key: 'name', label: 'Student Name' },
    { key: 'grade', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
    { key: 'subject', label: 'Subject' },
    { key: 'average', label: 'Grade' },
    {
      key: 'remarks',
      label: 'Remarks',
      render: (value) => (
        <Badge variant={value === 'Passed' ? 'default' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
  ]

  // Optional: simple name filter
  const filteredData = transcriptData.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Transcript of Records
        </h2>
        <p className="text-muted-foreground mt-1">
          Search and view student transcripts
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Search Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search by Name
            </label>
            <Input
              placeholder="Enter student name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Grade Level
            </label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              School Year
            </label>
            <Select value={schoolYear} onValueChange={setSchoolYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={filteredData}
          onPrint={() => window.print()}
          showActions={false}
        />
      </Card>
    </div>
  )
}
