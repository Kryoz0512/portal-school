'use client'

import React, { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react'

export default function AdminProfileSettingsPage() {
  // Initial admin data
  const initialFormData = {
    firstName: 'John',
    lastName: 'Administrator',
    email: 'john.admin@snhs.edu.ph',
    phone: '(555) 987-6543',
    role: 'Super Admin',
    department: 'Administration',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [message, setMessage] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Check if form has changes
  const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData)

  // Check if password fields are filled
  const isPasswordFieldsFilled =
    passwordData.currentPassword &&
    passwordData.newPassword &&
    passwordData.confirmPassword

  // Handle form input change
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle password input change
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  // Handle save changes
  const handleSaveChanges = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to save changes. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle change password
  const handleChangePassword = async () => {
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New password and confirm password do not match.',
      })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    // Validate password strength
    if (passwordData.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'New password must be at least 8 characters long.',
      })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    setIsChangingPassword(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setMessage({
        type: 'success',
        text: 'Password changed successfully!',
      })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to change password. Please try again.',
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        description="Manage your admin profile and password"
      />

      {/* Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg border flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {/* Profile Header Card */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://avatar.vercel.sh/admin" alt={`${formData.firstName} ${formData.lastName}`} />
            <AvatarFallback className="bg-blue-600 text-white text-2xl">
              {formData.firstName[0]}{formData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h1>
            <p className="text-lg text-gray-600 mt-1">Administrator</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="default" className="bg-blue-600">{formData.role}</Badge>
              <Badge variant="outline">{formData.department}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={e => handleFormChange('firstName', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={e => handleFormChange('lastName', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                readOnly
                className="mt-2 bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => handleFormChange('phone', e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </Label>
              <Input
                id="role"
                value={formData.role}
                readOnly
                className="mt-2 bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
            </div>
            <div>
              <Label htmlFor="department" className="text-sm font-medium text-gray-700">
                Department
              </Label>
              <Input
                id="department"
                value={formData.department}
                onChange={e => handleFormChange('department', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <Button
            onClick={handleSaveChanges}
            disabled={!hasFormChanges || isSaving}
            className={`w-full md:w-auto ${
              !hasFormChanges
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Password Requirements:</strong> At least 8 characters long. Include uppercase, lowercase, numbers, and special characters for better security.
            </p>
          </div>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={e => handlePasswordChange('newPassword', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={!isPasswordFieldsFilled || isChangingPassword}
            className={`w-full md:w-auto ${
              !isPasswordFieldsFilled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
