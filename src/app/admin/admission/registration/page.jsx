'use client'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { FormCard } from '@/components/form-card'
import { FormField } from '@/components/form-field'
import { useState } from 'react'

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    studentStatus: '',
    lrn: '',
    schoolYear: '',
    gender: '',
    dateOfBirth: '',
    lastName: '',
    firstName: '',
    middleName: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Registration"
        description="Register new students with their information"
      />

      <FormCard title="Register Student" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Student Status"
            value={formData.studentStatus}
            onSelectChange={(value) => handleSelectChange('studentStatus', value)}
            placeholder="Select student status"
            options={[
              { value: 'new', label: 'New' },
              { value: 'transferee', label: 'Transferee' },
            ]}
            required
          />
          <FormField
            label="Student LRN"
            name="lrn"
            placeholder="Enter student LRN"
            value={formData.lrn}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="School Year"
            name="schoolYear"
            placeholder="e.g. SY 2025–2026"
            value={formData.schoolYear}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Gender"
            value={formData.gender}
            onSelectChange={(value) => handleSelectChange('gender', value)}
            placeholder="Select gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            required
          />
        </div>

        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Middle Name"
            name="middleName"
            placeholder="Enter middle name"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-primary-foreground">
            Save / Submit
          </Button>
        </div>
      </FormCard>
    </div>
  )
}
