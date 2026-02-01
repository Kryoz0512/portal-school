'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataTable } from '@/components/data-table'
import { useState } from 'react'

const accreditationData = [
  {
    id: 1,
    schoolCode: 'SNHS-001',
    schoolName: 'Santor National High School',
    schoolType: 'Public',
    schoolAddress: '123 Main St, City, Country',
  },
  {
    id: 2,
    schoolCode: 'PNHS-002',
    schoolName: 'Philippine National High School',
    schoolType: 'Private',
    schoolAddress: '456 Oak Ave, City, Country',
  },
]

export default function AccreditationPage() {
  const [schools, setSchools] = useState(accreditationData)
  const [formData, setFormData] = useState({
    schoolCode: '',
    schoolName: '',
    schoolAddress: '',
    schoolType: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSchool = (e) => {
    e.preventDefault()
    if (formData.schoolCode && formData.schoolName && formData.schoolType && formData.schoolAddress) {
      const newSchool = {
        id: schools.length + 1,
        ...formData,
      }
      setSchools([...schools, newSchool])
      setFormData({
        schoolCode: '',
        schoolName: '',
        schoolAddress: '',
        schoolType: '',
      })
    }
  }

  const columns = [
    { key: 'schoolCode', label: 'School Code' },
    { key: 'schoolName', label: 'School Name' },
    { key: 'schoolType', label: 'School Type' },
    { key: 'schoolAddress', label: 'School Address' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">School Accreditation</h2>
        <p className="text-muted-foreground mt-1">Manage school accreditation information</p>
      </div>

      {/* Form Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Add School</h3>
        <form onSubmit={handleAddSchool} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Code
              </label>
              <Input
                type="text"
                name="schoolCode"
                placeholder="Enter school code"
                value={formData.schoolCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Name
              </label>
              <Input
                type="text"
                name="schoolName"
                placeholder="Enter school name"
                value={formData.schoolName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Type
              </label>
              <Select value={formData.schoolType} onValueChange={(value) => handleSelectChange('schoolType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select school type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Charter">Charter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Address
              </label>
              <Input
                type="text"
                name="schoolAddress"
                placeholder="Enter school address"
                value={formData.schoolAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-primary text-primary-foreground">
              Add
            </Button>
          </div>
        </form>
      </Card>

      {/* Table Card */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Accredited Schools</h3>
        <DataTable columns={columns} data={schools} showActions={false} />
      </Card>
    </div>
  )
}
