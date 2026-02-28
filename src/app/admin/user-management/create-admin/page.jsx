'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { NewAdminModal } from "@/components/new-admin-modal"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"

const initialAdmins = [
  { id: 1, name: 'John Doe', email: 'john.doe@snhs.edu.ph', role: 'Admin', position: 'Principal' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@snhs.edu.ph', role: 'Staff', position: 'Registrar' },
]

const ADMIN_ROLES = {
  'Super Admin': { permissions: ['user_management', 'system_settings', 'reports', 'all_modules'], color: 'bg-red-100 text-red-800' },
  'Admin': { permissions: ['user_management', 'enrollment', 'registration', 'scheduling'], color: 'bg-blue-100 text-blue-800' },
  'Staff': { permissions: ['enrollment', 'registration', 'reports'], color: 'bg-green-100 text-green-800' },
}

export default function CreateAdminPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [saveMessage, setSaveMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'position', label: 'Position' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value) => {
        const roleInfo = ADMIN_ROLES[value]
        return (
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${roleInfo?.color || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        )
      }
    },
  ]

  const handleAddAdmin = (newAdmin) => {
    // Validate email format
    if (!newAdmin.email.includes('@snhs.edu.ph')) {
      setSaveMessage('Email must end with @snhs.edu.ph')
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    // Check for duplicate email
    const emailExists = admins.some(a => a.email === newAdmin.email && a.id !== editingAdmin?.id)
    if (emailExists) {
      setSaveMessage('Email already exists in the system')
      setMessageType('error')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    if (editingAdmin) {
      setAdmins(admins.map(a => a.id === editingAdmin.id ? { ...newAdmin, id: editingAdmin.id } : a))
      setSaveMessage(`Admin ${newAdmin.name} updated successfully`)
      setEditingAdmin(null)
    } else {
      setAdmins([...admins, { id: admins.length + 1, ...newAdmin }])
      setSaveMessage(`Admin ${newAdmin.name} created successfully`)
    }
    setMessageType('success')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleDelete = (row) => {
    setAdmins(admins.filter(a => a.id !== row.id))
    setSaveMessage(`Admin ${row.name} has been removed from the system`)
    setMessageType('info')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleEdit = (row) => {
    setEditingAdmin(row)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingAdmin(null)
  }

  // Statistics
  const totalAdmins = admins.length
  const superAdminCount = admins.filter(a => a.role === 'Super Admin').length
  const adminCount = admins.filter(a => a.role === 'Admin').length
  const staffCount = admins.filter(a => a.role === 'Staff').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Management"
        description="Create and manage admin accounts with role-based access control"
        action={
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground">
            <Plus size={18} className="mr-2" />
            New Admin
          </Button>
        }
      />

      {/* Messages */}
      {saveMessage && (
        <Card className={`p-4 border-l-4 flex items-center gap-3 ${
          messageType === 'success'
            ? 'border-l-green-500 bg-green-50 text-green-800'
            : messageType === 'error'
            ? 'border-l-red-500 bg-red-50 text-red-800'
            : 'border-l-blue-500 bg-blue-50 text-blue-800'
        }`}>
          {messageType === 'success' || messageType === 'info' ? (
            <CheckCircle2 size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <p className="font-medium">{saveMessage}</p>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Admins</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{totalAdmins}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Admins</p>
          <p className="text-3xl font-bold text-purple-800 mt-1">{adminCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Staff</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{staffCount}</p>
        </Card>
      </div>

      {/* Role Information Box */}
      <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-2">Admin Roles & Permissions:</p>
            <ul className="space-y-1 ml-4">
              <li><strong>Super Admin:</strong> Full system access, user management, settings</li>
              <li><strong>Admin:</strong> Enrollment, registration, scheduling, teacher management</li>
              <li><strong>Staff:</strong> Limited access to enrollment, registration, and reports</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Admins Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Admin Accounts</h3>
          <p className="text-sm text-muted-foreground mt-1">Total: {admins.length} admin(s)</p>
        </div>
        <DataTable
          columns={columns}
          data={admins}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Card>

      {/* Create Admin Modal */}
      <NewAdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddAdmin}
        initialData={editingAdmin}
      />
    </div>
  )
}
