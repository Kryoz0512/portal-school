'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { NewTeacherModal } from "@/components/new-teacher-modal"

const initialTeachers = [
  { id: 1, employeeNo: 'T-001', name: 'Maria Santos', email: 'maria.santos@snhs.edu.ph', gradeLevel: '10', section: 'A', subject: 'Mathematics', position: 'Teacher I' },
  { id: 2, employeeNo: 'T-002', name: 'Pedro Garcia', email: 'pedro.garcia@snhs.edu.ph', gradeLevel: '9', section: 'B', subject: 'Science', position: 'Teacher III' },
]

export default function CreateTeacherPage() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)

  const columns = [
    { key: 'employeeNo', label: 'Employee No.' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'gradeLevel', label: 'Grade Level' },
    { key: 'section', label: 'Section' },
    { key: 'subject', label: 'Subject' },
    { key: 'position', label: 'Position' },
  ]

  const handleAddTeacher = (newTeacher) => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...newTeacher, id: editingTeacher.id } : t))
      setEditingTeacher(null)
    } else {
      setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }])
    }
  }

  const handleDelete = (row) => {
     setTeachers(teachers.filter(t => t.id !== row.id))
  }

  const handleEdit = (row) => {
    setEditingTeacher(row)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTeacher(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Teacher</h1>
          <p className="text-muted-foreground">Manage teacher accounts here</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-fit">
          <Plus size={18} className="mr-2" />
          New Teacher
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={teachers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <NewTeacherModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddTeacher}
        initialData={editingTeacher}
      />
    </div>
  )
}
