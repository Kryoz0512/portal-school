'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function NewTeacherModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    employeeNo: '',
    name: '',
    email: '',
    gradeLevel: '',
    section: '',
    subject: '',
    position: '',
  })

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
  }, [initialData, isOpen])

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
  }

  const handleEmailChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, email: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Teacher' : 'Create New Teacher'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employeeNo" className="text-right">
              Employee No.
            </Label>
            <Input
              id="employeeNo"
              name="employeeNo"
              value={formData.employeeNo}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gradeLevel" className="text-right">
              Grade Level
            </Label>
            <Select
              value={formData.gradeLevel}
              onValueChange={(value) => handleSelectChange('gradeLevel', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Section
            </Label>
            <Input
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g. A"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g. Mathematics"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Position
            </Label>
            <Select
              value={formData.position}
              onValueChange={(value) => handleSelectChange('position', value)}
            >
              <SelectTrigger className="col-span-3">
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
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
