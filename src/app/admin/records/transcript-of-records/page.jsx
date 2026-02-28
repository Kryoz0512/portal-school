'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Search, Eye, PrinterIcon } from 'lucide-react'

const torData = [
  { id: 1, studentName: 'Juan Dela Cruz', lrn: '123456789', schoolYear: '2025-2026', gradeLevel: 'Grade 10', status: 'Available', dateIssued: '2025-02-28' },
  { id: 2, studentName: 'Maria Santos', lrn: '123456790', schoolYear: '2025-2026', gradeLevel: 'Grade 10', status: 'Available', dateIssued: '2025-02-27' },
  { id: 3, studentName: 'Carlos Reyes', lrn: '123456791', schoolYear: '2025-2026', gradeLevel: 'Grade 9', status: 'Requested', dateIssued: '2025-02-25' },
  { id: 4, studentName: 'Ana Cruz', lrn: '123456792', schoolYear: '2024-2025', gradeLevel: 'Grade 9', status: 'Available', dateIssued: '2024-06-15' },
]

export default function TranscriptOfRecordsPage() {
  const [records, setRecords] = useState(torData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'lrn', label: 'LRN' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'schoolYear', label: 'School Year' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Available'
            ? 'bg-green-100 text-green-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'dateIssued', label: 'Date Issued' },
  ]

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.lrn.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDownload = (record) => {
    console.log(`Downloading TOR for ${record.studentName}`)
    alert(`Transcript of Records for ${record.studentName} has been downloaded`)
  }

  const handleView = (record) => {
    console.log(`Viewing TOR for ${record.studentName}`)
    alert(`Opening TOR for ${record.studentName}`)
  }

  const handlePrint = (record) => {
    console.log(`Printing TOR for ${record.studentName}`)
    window.print()
  }

  const availableCount = records.filter(r => r.status === 'Available').length
  const requestedCount = records.filter(r => r.status === 'Requested').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transcript of Records (TOR)"
        description="Manage and distribute student transcripts and academic records"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Records</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{records.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Available</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{availableCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Requested</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{requestedCount}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name or LRN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="min-w-[200px]">
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Requested">Requested</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Records Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Transcript of Records</h3>
          <p className="text-sm text-muted-foreground mt-1">Showing {filteredRecords.length} of {records.length} records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-foreground">
                      {col.render ? col.render(record[col.key]) : record[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(record)}
                        className="gap-2"
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrint(record)}
                        className="gap-2"
                      >
                        <PrinterIcon size={16} />
                        Print
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(record)}
                        className="gap-2"
                      >
                        <Download size={16} />
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
    </div>
  )
}
