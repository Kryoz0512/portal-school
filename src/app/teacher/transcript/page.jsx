'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/page-header'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Download, Search, Eye } from 'lucide-react'
import { useState } from 'react'

const transcriptData = [
  {
    id: 1,
    studentName: 'John Garcia',
    lrn: '123456700',
    gradeLevel: 'Grade 10',
    section: 'A',
    schoolYear: '2025-2026',
    status: 'Available',
    dateIssued: '2025-02-28',
  },
  {
    id: 2,
    studentName: 'Maria Santos',
    lrn: '123456701',
    gradeLevel: 'Grade 10',
    section: 'A',
    schoolYear: '2025-2026',
    status: 'Available',
    dateIssued: '2025-02-27',
  },
  {
    id: 3,
    studentName: 'Pedro Lopez',
    lrn: '123456702',
    gradeLevel: 'Grade 9',
    section: 'B',
    schoolYear: '2025-2026',
    status: 'Requested',
    dateIssued: '2025-02-25',
  },
]

export default function TeacherTranscriptPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [schoolYear, setSchoolYear] = useState('2025-2026')

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
    { key: 'schoolYear', label: 'School Year' },
    { key: 'dateIssued', label: 'Date Issued' },
  ]

  const filteredData = transcriptData.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lrn.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesSchoolYear = item.schoolYear === schoolYear
    return matchesSearch && matchesStatus && matchesSchoolYear
  })

  const handleView = (record) => {
    alert(`Viewing transcript for ${record.studentName}`)
  }

  const handleDownload = (record) => {
    alert(`Downloading transcript for ${record.studentName}`)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transcript of Records"
        description="View student transcripts and academic records"
      />

      {/* Filters */}
      <Card className="p-6 border">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Search
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or LRN..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Requested">Requested</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Year
              </label>
              <select
                value={schoolYear}
                onChange={e => setSchoolYear(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Records Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Transcript of Records
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredData.length} of {transcriptData.length} records
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(record => (
                <tr
                  key={record.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-foreground"
                    >
                      {col.render
                        ? col.render(record[col.key])
                        : record[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(record)}
                        title="View transcript"
                      >
                        <Eye size={16} className="mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(record)}
                        title="Download transcript"
                      >
                        <Download size={16} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Printing of transcripts is disabled for teachers. Please contact the registrar's office if you need to print student transcripts.
        </p>
      </Card>
    </div>
  )
}

