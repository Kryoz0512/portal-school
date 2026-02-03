'use client'

import React, { useState, useEffect } from 'react'
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

export function AddRoomModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    room: '',
    capacity: '',
    status: 'Active',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        room: initialData.room,
        capacity: initialData.capacity.toString(),
        status: initialData.status,
      })
    } else {
      setFormData({
        room: '',
        capacity: '',
        status: 'Active',
      })
    }
  }, [initialData, isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.room && formData.capacity && formData.status) {
      onSubmit({
        ...formData,
        capacity: parseInt(formData.capacity, 10),
      })
      setFormData({
        room: '',
        capacity: '',
        status: 'Active',
      })
    }
  }

  const isFormValid = formData.room && formData.capacity && formData.status

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Room' : 'Add New Room'}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? 'Update the room details below.'
              : 'Fill in the room details below to add a new room to the system.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Room Number <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              name="room"
              placeholder="e.g., 101"
              value={formData.room}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Capacity <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              name="capacity"
              placeholder="e.g., 45"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Status <span className="text-destructive">*</span>
            </label>
            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
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
              {initialData ? 'Update Room' : 'Add Room'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
