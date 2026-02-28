'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function AssignTeacherModal({ isOpen, onClose, onSave, initialData = null, teachers = [] }) {
  const [formData, setFormData] = useState({
    code: '',
    gradeLevel: '',
    subject: '',
    description: '',
    teacherId: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        gradeLevel: initialData.gradeLevel || '',
        subject: initialData.subject || '',
        description: initialData.description || '',
        teacherId: initialData.teacherId ? String(initialData.teacherId) : '',
      })
    } else {
      setFormData({
        code: '',
        gradeLevel: '',
        subject: '',
        description: '',
        teacherId: '',
      })
    }
    setErrors({})
  }, [initialData, isOpen])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.code.trim()) newErrors.code = 'Subject code is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject name is required'
    if (!formData.gradeLevel) newErrors.gradeLevel = 'Grade level is required'
    if (!formData.teacherId) newErrors.teacherId = 'Teacher assignment is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
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
    if (!validateForm()) return
    onSave(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Subject Assignment' : 'Assign Subject to Teacher'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Subject Code */}
          <div className="grid gap-2">
            <Label htmlFor="code" className="font-semibold">
              Subject Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., ENG 10"
              required
            />
            {errors.code && <p className="text-xs text-red-600">{errors.code}</p>}
          </div>

          {/* Grade Level */}
          <div className="grid gap-2">
            <Label htmlFor="gradeLevel" className="font-semibold">
              Grade Level <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.gradeLevel} onValueChange={(value) => handleSelectChange('gradeLevel', value)}>
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
            {errors.gradeLevel && <p className="text-xs text-red-600">{errors.gradeLevel}</p>}
          </div>

          {/* Subject Name */}
          <div className="grid gap-2">
            <Label htmlFor="subject" className="font-semibold">
              Subject Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., English"
              required
            />
            {errors.subject && <p className="text-xs text-red-600">{errors.subject}</p>}
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description" className="font-semibold">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Basic grammar and communication"
            />
          </div>

          {/* Teacher Selection */}
          <div className="grid gap-2">
            <Label htmlFor="teacherId" className="font-semibold">
              Assign Teacher <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.teacherId} onValueChange={(value) => handleSelectChange('teacherId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={String(teacher.id)}>
                      <div className="flex flex-col">
                        <span>{teacher.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {teacher.specializations?.join(', ') || 'General'}
                        </span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No teachers available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.teacherId && <p className="text-xs text-red-600">{errors.teacherId}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              {initialData ? 'Update Assignment' : 'Assign Subject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
