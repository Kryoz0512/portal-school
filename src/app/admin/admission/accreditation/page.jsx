'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { PageHeader } from '@/components/page-header'
import { FormCard } from '@/components/form-card'
import { DataCard } from '@/components/data-card'
import { FormField } from '@/components/form-field'
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

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      schoolType: value,
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
      <PageHeader
        title="School Accreditation"
        description="Manage school accreditation information"
      />

      <FormCard title="Add School" onSubmit={handleAddSchool}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="School Code"
            name="schoolCode"
            placeholder="Enter school code"
            value={formData.schoolCode}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="School Name"
            name="schoolName"
            placeholder="Enter school name"
            value={formData.schoolName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="School Type"
            value={formData.schoolType}
            onSelectChange={handleSelectChange}
            placeholder="Select school type"
            options={[
              { value: 'Public', label: 'Public' },
              { value: 'Private', label: 'Private' },
              { value: 'Charter', label: 'Charter' },
            ]}
            required
          />
          <FormField
            label="School Address"
            name="schoolAddress"
            placeholder="Enter school address"
            value={formData.schoolAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-primary text-primary-foreground">
            Add
          </Button>
        </div>
      </FormCard>

      <DataCard title="Accredited Schools">
        <DataTable columns={columns} data={schools} showActions={false} />
      </DataCard>
    </div>
  )
}
