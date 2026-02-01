'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Form submission logic here
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Student Registration</h2>
        <p className="text-muted-foreground mt-1">Register new students with their information</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Student Status and LRN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Student Status
              </label>
              <Select value={formData.studentStatus} onValueChange={(value) => handleSelectChange('studentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="transferee">Transferee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Student LRN
              </label>
              <Input
                type="text"
                name="lrn"
                placeholder="Enter student LRN"
                value={formData.lrn}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 2: School Year and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Year
              </label>
              <Input
                type="text"
                name="schoolYear"
                placeholder="e.g. SY 2025–2026"
                value={formData.schoolYear}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Gender
              </label>
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>

          {/* Row 4: Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Middle Name
              </label>
              <Input
                type="text"
                name="middleName"
                placeholder="Enter middle name"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Save / Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
