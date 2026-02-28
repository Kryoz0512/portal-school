'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Search, Eye } from 'lucide-react'

const finalReportsData = [
  { id: 1, studentName: 'Juan Dela Cruz', gradeLevel: 'Grade 10', section: 'A', schoolYear: '2025-2026', status: 'Completed', dateGenerated: '2025-02-28' },
  { id: 2, studentName: 'Maria Santos', gradeLevel: 'Grade 10', section: 'B', schoolYear: '2025-2026', status: 'Completed', dateGenerated: '2025-02-27' },
  { id: 3, studentName: 'Carlos Reyes', gradeLevel: 'Grade 9', section: 'A', schoolYear: '2025-2026', status: 'Pending', dateGenerated: '2025-02-25' },
  { id: 4, studentName: 'Ana Cruz', gradeLevel: 'Grade 9', section: 'C', schoolYear: '2025-2026', status: 'Completed', dateGenerated: '2025-02-24' },
]

export default function FinalReportsPage() {
  const [reports, setReports] = useState(finalReportsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const columns = [
    { key: 'studentName', label: 'Student Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
    { key: 'schoolYear', label: 'School Year' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'dateGenerated', label: 'Date Generated' },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDownload = (report) => {
    console.log(`Downloading final report for ${report.studentName}`)
    // TODO: Implement actual download functionality
    alert(`Final report for ${report.studentName} has been downloaded`)
  }

  const handleView = (report) => {
    console.log(`Viewing final report for ${report.studentName}`)
    // TODO: Implement view/open in modal
    alert(`Opening final report for ${report.studentName}`)
  }

  const completedCount = reports.filter(r => r.status === 'Completed').length
  const pendingCount = reports.filter(r => r.status === 'Pending').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Final Reports"
        description="Generate, view, and download final student reports"
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Reports</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{reports.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Completed</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{completedCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-800 mt-1">{pendingCount}</p>
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
                placeholder="Search by student name or grade..."
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reports Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Final Reports</h3>
          <p className="text-sm text-muted-foreground mt-1">Showing {filteredReports.length} of {reports.length} reports</p>
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
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-muted/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-foreground">
                      {col.render ? col.render(report[col.key]) : report[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(report)}
                        className="gap-2"
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report)}
                        disabled={report.status !== 'Completed'}
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
