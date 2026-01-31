'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

const advisersData = [
  { id: 1, section: 'Grade 10-A', gradeLevel: '10', adviser: 'Ms. Johnson' },
  { id: 2, section: 'Grade 10-B', gradeLevel: '10', adviser: 'Mr. Smith' },
  { id: 3, section: 'Grade 9-A', gradeLevel: '9', adviser: 'Dr. Garcia' },
]

export default function AdviserAssignmentPage() {
  const [advisers, setAdvisers] = useState(advisersData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAdviser, setSelectedAdviser] = useState('')
  const [editingId, setEditingId] = useState(null)

  const columns = [
    { key: 'section', label: 'Section' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'adviser', label: 'Adviser' },
  ]

  const handleAssignAdviser = () => {
    if (editingId && selectedAdviser) {
      setAdvisers(advisers.map((a) =>
        a.id === editingId ? { ...a, adviser: selectedAdviser } : a
      ))
      setDialogOpen(false)
      setEditingId(null)
      setSelectedAdviser('')
    }
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setSelectedAdviser(row.adviser)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Adviser Assignment</h2>
        <p className="text-muted-foreground mt-1">Assign teachers as section advisers</p>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={advisers}
          onEdit={handleEdit}
          showActions={true}
          customActionLabel="Assign / Change"
        />
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Section Adviser</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Adviser
              </label>
              <Select value={selectedAdviser} onValueChange={setSelectedAdviser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ms. Johnson">Ms. Johnson</SelectItem>
                  <SelectItem value="Mr. Smith">Mr. Smith</SelectItem>
                  <SelectItem value="Dr. Garcia">Dr. Garcia</SelectItem>
                  <SelectItem value="Mr. Lee">Mr. Lee</SelectItem>
                  <SelectItem value="Mrs. Williams">Mrs. Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary text-primary-foreground" onClick={handleAssignAdviser}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
