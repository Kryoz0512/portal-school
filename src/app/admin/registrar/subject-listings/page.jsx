'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AddSubjectModal } from '@/components/add-subject-modal'

export default function SubjectListingsPage() {
  const [gradeFilter, setGradeFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      code: 'ENG101',
      name: 'English Literature',
      gradeLevel: 'Grade 7',
      description: 'Introduction to English literature and writing skills',
    },
    {
      id: 2,
      code: 'MATH101',
      name: 'Basic Mathematics',
      gradeLevel: 'Grade 7',
      description: 'Fundamentals of algebra and geometry',
    },
  ])

  const handleAddSubject = (newSubject) => {
    const subjectWithId = {
      ...newSubject,
      id: Math.max(...subjects.map((s) => s.id), 0) + 1,
    }
    setSubjects([...subjects, subjectWithId])
    setIsModalOpen(false)
  }

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const filteredSubjects =
    gradeFilter && gradeFilter !== 'all'
      ? subjects.filter((subject) => subject.gradeLevel === gradeFilter)
      : subjects

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Subject Listings</h1>
          <p className="text-muted-foreground">Manage school subjects by grade level</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 w-fit"
        >
          <Plus size={18} />
          Add Subject
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by Grade Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="Grade 7">Grade 7</SelectItem>
            <SelectItem value="Grade 8">Grade 8</SelectItem>
            <SelectItem value="Grade 9">Grade 9</SelectItem>
            <SelectItem value="Grade 10">Grade 10</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground">
          Showing {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Subject Code</TableHead>
              <TableHead className="font-semibold">Subject Name</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Description</TableHead>
              <TableHead className="font-semibold">Grade Level</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium text-foreground">
                    {subject.code}
                  </TableCell>
                  <TableCell className="text-foreground">{subject.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {subject.description}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {subject.gradeLevel}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Edit2 size={16} />
                        <span className="sr-only">Edit subject</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDeleteSubject(subject.id)}
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete subject</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="h-24 text-center text-muted-foreground">
                  No subjects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSubject}
      />
    </div>
  )
}
