'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { CheckCircle2, AlertCircle, Search } from 'lucide-react'

const advisersData = [
  { id: 1, section: 'Grade 10-A', gradeLevel: '10', adviser: 'Ms. Johnson', studentCount: 35 },
  { id: 2, section: 'Grade 10-B', gradeLevel: '10', adviser: 'Mr. Smith', studentCount: 32 },
  { id: 3, section: 'Grade 9-A', gradeLevel: '9', adviser: 'Dr. Garcia', studentCount: 30 },
  { id: 4, section: 'Grade 9-B', gradeLevel: '9', adviser: 'Mr. Lee', studentCount: 28 },
  { id: 5, section: 'Grade 8-A', gradeLevel: '8', adviser: 'Mrs. Williams', studentCount: 33 },
]

const AVAILABLE_ADVISERS = [
  'Ms. Johnson',
  'Mr. Smith',
  'Dr. Garcia',
  'Mr. Lee',
  'Mrs. Williams',
  'Mr. Davis',
  'Ms. Chen',
  'Mr. Rodriguez',
]

export default function AdviserAssignmentPage() {
  const [advisers, setAdvisers] = useState(advisersData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAdviser, setSelectedAdviser] = useState('')
  const [editingSection, setEditingSection] = useState(null)
  const [message, setMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAdvisers = advisers.filter(a =>
    a.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.adviser.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAssignClick = (row) => {
    setEditingSection(row)
    setSelectedAdviser(row.adviser)
    setDialogOpen(true)
  }

  const handleAssignAdviser = () => {
    if (editingSection && selectedAdviser) {
      setAdvisers(advisers.map(a =>
        a.id === editingSection.id
          ? { ...a, adviser: selectedAdviser }
          : a
      ))
      setMessage({
        type: 'success',
        text: `${editingSection.section} adviser changed to ${selectedAdviser}`,
      })
      setTimeout(() => setMessage(null), 3000)
      setDialogOpen(false)
      setEditingSection(null)
      setSelectedAdviser('')
    }
  }

  const assignedCount = advisers.filter(a => a.adviser).length
  const totalSections = advisers.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Adviser Assignment"
        description="Assign and manage section advisers"
      />

      {/* Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg border flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Sections</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{totalSections}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Assigned Advisers</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{assignedCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Total Students</p>
          <p className="text-3xl font-bold text-purple-800 mt-1">
            {advisers.reduce((sum, a) => sum + a.studentCount, 0)}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6 border">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Search
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by section or adviser name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Advisers Table */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Section Advisers
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredAdvisers.length} of {advisers.length} sections
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Section
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Grade Level
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Current Adviser
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Students
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvisers.map(adviser => (
                <tr
                  key={adviser.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {adviser.section}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      Grade {adviser.gradeLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-medium">
                    {adviser.adviser}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {adviser.studentCount} students
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button
                      size="sm"
                      onClick={() => handleAssignClick(adviser)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Assign Adviser Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Section Adviser</DialogTitle>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Section:</strong> {editingSection.section} ({editingSection.studentCount} students)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Adviser
                </label>
                <Select value={selectedAdviser} onValueChange={setSelectedAdviser}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ADVISERS.map(adviser => (
                      <SelectItem key={adviser} value={adviser}>
                        {adviser}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false)
                    setEditingSection(null)
                    setSelectedAdviser('')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignAdviser}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Assign Adviser
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
