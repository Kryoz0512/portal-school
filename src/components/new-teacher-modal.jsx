'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle } from 'lucide-react'

const DEFAULT_SUBJECTS = [
  'Mathematics', 'Science', 'English', 'Filipino', 'Araling Panlipunan', 'MAPEH',
  'Technology and Livelihood Education', 'Values Education', 'Physical Education'
]

export function NewTeacherModal({ isOpen, onClose, onSave, initialData = null, validSubjects = DEFAULT_SUBJECTS }) {
  const [formData, setFormData] = useState({
    employeeNo: '',
    name: '',
    email: '',
    gradeLevel: '',
    section: '',
    subject: '',
    position: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        employeeNo: '',
        name: '',
        email: '',
        gradeLevel: '',
        section: '',
        subject: '',
        position: '',
      })
    }
    setErrors({})
  }, [initialData, isOpen])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.employeeNo.trim()) newErrors.employeeNo = 'Employee number is required'
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.includes('@snhs.edu.ph')) newErrors.email = 'Email must end with @snhs.edu.ph'
    if (!formData.gradeLevel) newErrors.gradeLevel = 'Grade level is required'
    if (!formData.section.trim()) newErrors.section = 'Section is required'
    if (!formData.subject) newErrors.subject = 'Subject is required'
    if (!validSubjects.includes(formData.subject)) newErrors.subject = 'Invalid subject selected'
    if (!formData.position) newErrors.position = 'Position is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      
      // Only auto-generate email if NOT in edit mode (initialData is null)
      if (name === 'name' && !initialData) {
        const parts = value.trim().toLowerCase().split(/\s+/)
        if (parts.length >= 2) {
          updated.email = `${parts[0]}.${parts[parts.length - 1]}@snhs.edu.ph`
        } else if (parts.length === 1 && parts[0]) {
          updated.email = `${parts[0]}@snhs.edu.ph`
        } else {
          updated.email = ''
        }
      }
      
      return updated
    })
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleEmailChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, email: value }))
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }))
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Teacher' : 'Create New Teacher'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Employee Number */}
          <div className="grid gap-2">
            <Label htmlFor="employeeNo" className="font-semibold">
              Employee No. <span className="text-red-500">*</span>
            </Label>
            <Input
              id="employeeNo"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              placeholder="e.g., T-001"
              required
            />
            {errors.employeeNo && <p className="text-xs text-red-600">{errors.employeeNo}</p>}
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-semibold">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Maria Santos"
              required
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-semibold">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="auto-generated from name"
              required
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Grade Level & Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gradeLevel" className="font-semibold">
                Grade Level <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) => handleSelectChange('gradeLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Grade 7</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                </SelectContent>
              </Select>
              {errors.gradeLevel && <p className="text-xs text-red-600">{errors.gradeLevel}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="section" className="font-semibold">
                Section <span className="text-red-500">*</span>
              </Label>
              <Input
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g., A, B, C"
                required
              />
              {errors.section && <p className="text-xs text-red-600">{errors.section}</p>}
            </div>
          </div>

          {/* Subject */}
          <div className="grid gap-2">
            <Label htmlFor="subject" className="font-semibold">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleSelectChange('subject', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {validSubjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>
                    {subj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
          </div>

          {/* Position */}
          <div className="grid gap-2">
            <Label htmlFor="position" className="font-semibold">
              Position <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.position}
              onValueChange={(value) => handleSelectChange('position', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Teacher I">Teacher I</SelectItem>
                <SelectItem value="Teacher II">Teacher II</SelectItem>
                <SelectItem value="Teacher III">Teacher III</SelectItem>
                <SelectItem value="Teacher IV">Teacher IV</SelectItem>
                <SelectItem value="Teacher V">Teacher V</SelectItem>
                <SelectItem value="Teacher VI">Teacher VI</SelectItem>
                <SelectItem value="Teacher VII">Teacher VII</SelectItem>
                <SelectItem value="Master Teacher I">Master Teacher I</SelectItem>
                <SelectItem value="Master Teacher II">Master Teacher II</SelectItem>
                <SelectItem value="Master Teacher III">Master Teacher III</SelectItem>
                <SelectItem value="Master Teacher IV">Master Teacher IV</SelectItem>
                <SelectItem value="Master Teacher V">Master Teacher V</SelectItem>
              </SelectContent>
            </Select>
            {errors.position && <p className="text-xs text-red-600">{errors.position}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              {initialData ? 'Update Teacher' : 'Create Teacher'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
