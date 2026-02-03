'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export function AddSubjectModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    gradeLevel: '',
    code: '',
    name: '',
    description: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGradeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gradeLevel: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      formData.gradeLevel &&
      formData.code &&
      formData.name &&
      formData.description
    ) {
      onSubmit(formData)
      setFormData({
        gradeLevel: '',
        code: '',
        name: '',
        description: '',
      })
    }
  }

  const isFormValid =
    formData.gradeLevel &&
    formData.code &&
    formData.name &&
    formData.description

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Fill in the subject details below to add a new subject to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Grade Level <span className="text-destructive">*</span>
            </label>
            <Select value={formData.gradeLevel} onValueChange={handleGradeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grade 7">Grade 7</SelectItem>
                <SelectItem value="Grade 8">Grade 8</SelectItem>
                <SelectItem value="Grade 9">Grade 9</SelectItem>
                <SelectItem value="Grade 10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Subject Code <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="code"
              placeholder="e.g., ENG101"
              value={formData.code}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Subject Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="name"
              placeholder="e.g., English Literature"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Subject Description <span className="text-destructive">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter a brief description of the subject"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
            >
              Add Subject
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
