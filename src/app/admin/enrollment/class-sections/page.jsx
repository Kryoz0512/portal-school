'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PageHeader } from '@/components/page-header'
import { DataCard } from '@/components/data-card'
import { FormField } from '@/components/form-field'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gradeLevel: value,
    }))
  }

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
      <PageHeader
        title="Class Sections"
        description="Create and manage class sections"
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">+ Create Section</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <FormField
                  label="Section Name"
                  name="sectionName"
                  placeholder="e.g., Grade 10 - Section A"
                  value={formData.sectionName}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Grade Level"
                  value={formData.gradeLevel}
                  onSelectChange={handleSelectChange}
                  placeholder="Select grade level"
                  options={[
                    { value: '7', label: 'Grade 7' },
                    { value: '8', label: 'Grade 8' },
                    { value: '9', label: 'Grade 9' },
                    { value: '10', label: 'Grade 10' },
                  ]}
                />
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
        }
      />

      <DataCard title="Sections">
        <DataTable
          columns={columns}
          data={sections}
          onEdit={(row) => console.log('Edit:', row)}
          onDelete={handleDeleteSection}
          showActions={true}
        />
      </DataCard>
    </div>
  )
}
