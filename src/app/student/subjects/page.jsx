'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { Search, BookOpen } from 'lucide-react'

const subjectsData = {
  '2025-2026': [
    {
      id: 1,
      subjectName: 'English 4',
      subjectCode: 'ENG-401',
      credits: 3,
      enrolledDate: '08/15/2025',
      teacher: 'Mr. Johnson',
      status: 'Active',
    },
    {
      id: 2,
      subjectName: 'Mathematics 4',
      subjectCode: 'MATH-401',
      credits: 4,
      enrolledDate: '08/15/2025',
      teacher: 'Ms. Garcia',
      status: 'Active',
    },
    {
      id: 3,
      subjectName: 'Science 4',
      subjectCode: 'SCI-401',
      credits: 4,
      enrolledDate: '08/16/2025',
      teacher: 'Dr. Smith',
      status: 'Active',
    },
    {
      id: 4,
      subjectName: 'Social Studies 4',
      subjectCode: 'SS-401',
      credits: 3,
      enrolledDate: '08/16/2025',
      teacher: 'Mr. Lopez',
      status: 'Active',
    },
    {
      id: 5,
      subjectName: 'Physical Education 4',
      subjectCode: 'PE-401',
      credits: 2,
      enrolledDate: '08/17/2025',
      teacher: 'Coach Martinez',
      status: 'Active',
    },
    {
      id: 6,
      subjectName: 'Filipino 4',
      subjectCode: 'FIL-401',
      credits: 3,
      enrolledDate: '08/17/2025',
      teacher: 'Ms. Santos',
      status: 'Active',
    },
  ],
  '2024-2025': [
    {
      id: 7,
      subjectName: 'English 3',
      subjectCode: 'ENG-301',
      credits: 3,
      enrolledDate: '08/15/2024',
      teacher: 'Mr. Johnson',
      status: 'Completed',
    },
    {
      id: 8,
      subjectName: 'Mathematics 3',
      subjectCode: 'MATH-301',
      credits: 4,
      enrolledDate: '08/15/2024',
      teacher: 'Ms. Garcia',
      status: 'Completed',
    },
    {
      id: 9,
      subjectName: 'Science 3',
      subjectCode: 'SCI-301',
      credits: 4,
      enrolledDate: '08/16/2024',
      teacher: 'Dr. Smith',
      status: 'Completed',
    },
  ],
  '2023-2024': [
    {
      id: 10,
      subjectName: 'English 2',
      subjectCode: 'ENG-201',
      credits: 3,
      enrolledDate: '08/15/2023',
      teacher: 'Mr. Johnson',
      status: 'Completed',
    },
    {
      id: 11,
      subjectName: 'Mathematics 2',
      subjectCode: 'MATH-201',
      credits: 4,
      enrolledDate: '08/15/2023',
      teacher: 'Ms. Garcia',
      status: 'Completed',
    },
  ],
}

export default function StudentSubjectsPage() {
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2025-2026')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSubjects = (subjectsData[selectedSchoolYear] || []).filter(subject =>
    subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enrolled Subjects"
        description="Your registered courses by school year"
      />

      {/* Filters */}
      <Card className="p-6 border">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                School Year
              </label>
              <select
                value={selectedSchoolYear}
                onChange={e => setSelectedSchoolYear(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Search Subject
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or code..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Table */}
      {filteredSubjects.length > 0 ? (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Subject Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Subject Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Subject Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Credits</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Instructor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map(subject => (
                  <tr key={subject.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{subject.subjectCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{subject.subjectName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {subject.credits}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{subject.teacher}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                        subject.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subject.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">No subjects found</p>
          <p className="text-gray-500 text-sm mt-1">Try searching with different terms or change the school year filter</p>
        </Card>
      )}
    </div>
  )
}
