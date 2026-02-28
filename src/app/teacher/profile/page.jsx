'use client'

import React from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone, Briefcase, Calendar, BookOpen, MapPin } from 'lucide-react'

export default function TeacherProfilePage() {
  // Mock teacher data
  const teacher = {
    id: 'T001',
    name: 'Mary Jane Smith',
    email: 'maryjane.smith@snhs.edu.ph',
    employeeNo: 'EMP-2024-001',
    phone: '(555) 123-4567',
    position: 'Senior High School Teacher',
    department: 'Science Department',
    specialization: 'Physics',
    subjects: ['Physics 101', 'Physics 102', 'Applied Physics'],
    gradeLevels: ['Grade 11', 'Grade 12'],
    hireDate: 'January 15, 2020',
    status: 'Active',
    certifications: ['Bachelor of Science in Physics', 'Master of Education'],
    room: 'Room 204',
    officeHours: 'Monday to Friday, 2:00 PM - 4:00 PM',
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="View your teacher profile information"
      />

      {/* Profile Header Card */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://avatar.vercel.sh/teacher" alt={teacher.name} />
            <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{teacher.position}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="default" className="bg-green-600">{teacher.status}</Badge>
              <Badge variant="outline">{teacher.specialization}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <Mail className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{teacher.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{teacher.phone}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Office Room</p>
              <p className="font-medium text-gray-900">{teacher.room}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Calendar className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm text-gray-600">Office Hours</p>
              <p className="font-medium text-gray-900">{teacher.officeHours}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Professional Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Employee Number</p>
            <p className="font-medium text-gray-900">{teacher.employeeNo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Department</p>
            <p className="font-medium text-gray-900">{teacher.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Hire Date</p>
            <p className="font-medium text-gray-900">{teacher.hireDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Specialization</p>
            <p className="font-medium text-gray-900">{teacher.specialization}</p>
          </div>
        </div>
      </Card>

      {/* Subjects and Grade Levels */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Assigned Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <BookOpen size={18} />
              Subjects
            </p>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject, idx) => (
                <Badge key={idx} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-3">Grade Levels</p>
            <div className="flex flex-wrap gap-2">
              {teacher.gradeLevels.map((grade, idx) => (
                <Badge key={idx} variant="outline">
                  {grade}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications & Qualifications</h2>
        <div className="space-y-3">
          {teacher.certifications.map((cert, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
              <p className="text-gray-900 font-medium">{cert}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
