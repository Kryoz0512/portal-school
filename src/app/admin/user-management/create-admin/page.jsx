'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { NewAdminModal } from "@/components/new-admin-modal"

const initialAdmins = [
  { id: 1, name: 'John Doe', email: 'john@school.edu', role: 'Admin', position: 'Principal' },
  { id: 2, name: 'Jane Smith', email: 'jane@school.edu', role: 'Staff', position: 'Registrar' },
]

export default function CreateAdminPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'position', label: 'Position' },
    { key: 'role', label: 'Role' },
  ]

  const handleAddAdmin = (newAdmin) => {
    if (editingAdmin) {
      setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...newAdmin, id: editingAdmin.id } : a))
      setEditingAdmin(null)
    } else {
      setAdmins([...admins, { id: admins.length + 1, ...newAdmin }])
    }
  }

  const handleDelete = (row) => {
     setAdmins(admins.filter(a => a.id !== row.id))
  }

  const handleEdit = (row) => {
    setEditingAdmin(row)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAdmin(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Admin</h1>
          <p className="text-muted-foreground">Manage admin accounts here</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-fit">
          <Plus size={18} className="mr-2" />
          New Admin
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={admins}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <NewAdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddAdmin}
        initialData={editingAdmin}
      />
    </div>
  )
}
