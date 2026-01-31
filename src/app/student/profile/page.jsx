'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@school.edu',
    phone: '+63 912 345 6789',
    dateOfBirth: '2009-05-15',
    address: '123 Main St, Metro Manila, PH',
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Profile Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Profile Picture Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              MS
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">Upload New Picture</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-foreground">
            Personal Information
          </h3>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Information'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                handleInputChange('firstName', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                handleInputChange('lastName', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleInputChange('email', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                handleInputChange('phone', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                handleInputChange('dateOfBirth', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Address
            </label>
            <Input
              value={formData.address}
              onChange={(e) =>
                handleInputChange('address', e.target.value)
              }
              disabled={!isEditing}
              className="bg-background"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Current Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              New Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-background"
            />
          </div>

          <Button className="bg-primary text-primary-foreground">
            Update Password
          </Button>
        </div>
      </Card>
    </div>
  )
}
