'use client'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { FormCard } from '@/components/form-card'
import { FormField } from '@/components/form-field'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function RegistrationPage() {
  const router = useRouter()
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
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const validateForm = () => {
    const newErrors = {}
    if (!formData.studentStatus) newErrors.studentStatus = 'Student status is required'
    if (!formData.lrn) newErrors.lrn = 'LRN is required'
    if (!formData.lrn.match(/^\d{12}$/)) newErrors.lrn = 'LRN must be 12 digits'
    if (!formData.schoolYear) newErrors.schoolYear = 'School year is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSelectChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setMessage('Please fix the errors above')
      return
    }

    setLoading(true)
    try {
      // Simulate API call to save student
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/admin/students/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      setSuccess(true)
      setMessage(`Student ${formData.firstName} ${formData.lastName} registered successfully!`)
      
      // Clear form
      setFormData({
        studentStatus: '',
        lrn: '',
        schoolYear: '',
        gender: '',
        dateOfBirth: '',
        lastName: '',
        firstName: '',
        middleName: '',
      })

      // Redirect to students not enrolled after 2 seconds
      setTimeout(() => {
        router.push('/admin/enrollment/not-enrolled-students')
      }, 2000)
    } catch (error) {
      setSuccess(false)
      setMessage('Failed to register student. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Registration"
        description="Register new students with their information"
      />

      {message && (
        <Card className={`p-4 border-l-4 flex items-start gap-3 ${
          success
            ? 'border-l-green-500 bg-green-50 text-green-800'
            : 'border-l-red-500 bg-red-50 text-red-800'
        }`}>
          {success ? (
            <CheckCircle size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
          ) : (
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-600" />
          )}
          <div className="flex-1">
            <p className="font-medium">{message}</p>
            {success && <p className="text-sm mt-1">Redirecting to Students Not Enrolled...</p>}
          </div>
        </Card>
      )}

      <FormCard title="Register Student" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormField
              label="Student Status"
              value={formData.studentStatus}
              onSelectChange={(value) => handleSelectChange('studentStatus', value)}
              placeholder="Select student status"
              options={[
                { value: 'new', label: 'New' },
                { value: 'transferee', label: 'Transferee' },
                { value: 'current', label: 'Current' },
              ]}
              required
            />
            {errors.studentStatus && (
              <p className="text-xs text-red-600 mt-1">{errors.studentStatus}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormField
              label="Student LRN"
              name="lrn"
              placeholder="Enter 12-digit LRN"
              value={formData.lrn}
              onChange={handleInputChange}
              required
            />
            {errors.lrn && (
              <p className="text-xs text-red-600 mt-1">{errors.lrn}</p>
            )}
          </div>
          <div>
            <FormField
              label="School Year"
              name="schoolYear"
              placeholder="e.g. SY 2025–2026"
              value={formData.schoolYear}
              onChange={handleInputChange}
              required
            />
            {errors.schoolYear && (
              <p className="text-xs text-red-600 mt-1">{errors.schoolYear}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
            {errors.gender && (
              <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <FormField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
            {errors.dateOfBirth && (
              <p className="text-xs text-red-600 mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <FormField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && (
              <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <FormField
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && (
              <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>
          <FormField
            label="Middle Name"
            name="middleName"
            placeholder="Enter middle name (optional)"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            type="button"
            disabled={loading}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-primary text-primary-foreground"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Register Student'
            )}
          </Button>
        </div>
      </FormCard>
    </div>
  )
}
