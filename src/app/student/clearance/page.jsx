'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'

const clearanceData = [
  {
    id: 1,
    schoolYear: '2024-2025',
    lrn: '123456789012',
    name: 'Maria Santos',
    status: 'No Pending',
  },
  {
    id: 2,
    schoolYear: '2023-2024',
    lrn: '123456789012',
    name: 'Maria Santos',
    status: 'No Pending',
  },
]

export default function StudentClearancePage() {
  const columns = [
    { key: 'schoolYear', label: 'School Year' },
    { key: 'lrn', label: 'Student LRN' },
    { key: 'name', label: 'Student Name' },
    {
      key: 'status',
      label: 'Clearance Status',
      render: (value) => (
        <Badge variant={value === 'No Pending' ? 'default' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Student Clearance</h2>
        <p className="text-muted-foreground mt-1">Check your clearance status</p>
      </div>

      <Card className="p-6">
        <DataTable columns={columns} data={clearanceData} showActions={false} />
      </Card>
    </div>
  )
}
