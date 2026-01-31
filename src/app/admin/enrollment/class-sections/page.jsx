'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

const sectionsData = [
  { id: 1, sectionName: 'Grade 10 - Section A', gradeLevel: '10' },
  { id: 2, sectionName: 'Grade 10 - Section B', gradeLevel: '10' },
  { id: 3, sectionName: 'Grade 9 - Section A', gradeLevel: '9' },
]

export default function ClassSectionsPage() {
  const [sections, setSections] = useState(sectionsData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    sectionName: '',
    gradeLevel: '',
  })

  const columns = [
    { key: 'sectionName', label: 'Section Name' },
    { key: 'gradeLevel', label: 'Grade Level' },
  ]

  const handleAddSection = () => {
    if (formData.sectionName && formData.gradeLevel) {
      setSections([
        ...sections,
        {
          id: sections.length + 1,
          sectionName: formData.sectionName,
          gradeLevel: formData.gradeLevel,
        },
      ])
      setFormData({ sectionName: '', gradeLevel: '' })
      setDialogOpen(false)
    }
  }

  const handleDeleteSection = (section) => {
    setSections(sections.filter((s) => s.id !== section.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Class Sections</h2>
          <p className="text-muted-foreground mt-1">Create and manage class sections</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">+ Create Section</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Section Name
                </label>
                <Input
                  placeholder="e.g., Grade 10 - Section A"
                  value={formData.sectionName}
                  onChange={(e) =>
                    setFormData({ ...formData, sectionName: e.target.value })
                  }
                  className="bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Grade Level (Optional)
                </label>
                <Select
                  value={formData.gradeLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gradeLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSection}
                  className="bg-primary text-primary-foreground"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={sections}
          onEdit={(row) => console.log('Edit:', row)}
          onDelete={handleDeleteSection}
          showActions={true}
        />
      </Card>
    </div>
  )
}
