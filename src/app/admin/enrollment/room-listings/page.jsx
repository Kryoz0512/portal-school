'use client'

import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const roomsData = [
  { id: 1, room: '101', capacity: 45, status: 'Active' },
  { id: 2, room: '102', capacity: 45, status: 'Active' },
  { id: 3, room: '103', capacity: 50, status: 'Active' },
  { id: 4, room: '104', capacity: 40, status: 'Maintenance' },
]

export default function RoomListingsPage() {
  const [searchRoom, setSearchRoom] = useState('')
  const [capacity, setCapacity] = useState('all')
  const [status, setStatus] = useState('all')

  const columns = [
    { key: 'room', label: 'Room Number' },
    { key: 'capacity', label: 'Capacity' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
  ]

  const filteredData = roomsData.filter((room) => {
    const searchMatch =
      room.room.toLowerCase().includes(searchRoom.toLowerCase())
    const capacityMatch =
      capacity === 'all' ||
      (capacity === '30' && room.capacity >= 30 && room.capacity <= 40) ||
      (capacity === '40' && room.capacity > 40 && room.capacity <= 50) ||
      (capacity === '50' && room.capacity > 50)
    const statusMatch =
      status === 'all' ||
      (status === 'active' && room.status === 'Active') ||
      (status === 'maintenance' && room.status === 'Maintenance')

    return searchMatch && capacityMatch && statusMatch
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Room Listings</h2>
        <p className="text-muted-foreground mt-1">
          Search and filter available rooms
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search by Room Number
            </label>
            <Input
              placeholder="Enter room number..."
              value={searchRoom}
              onChange={(e) => setSearchRoom(e.target.value)}
              className="bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Capacity
            </label>
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="30">30-40</SelectItem>
                <SelectItem value="40">40-50</SelectItem>
                <SelectItem value="50">50+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <DataTable
          columns={columns}
          data={filteredData}
          onEdit={(row) => console.log('Edit:', row)}
          onDelete={(row) => console.log('Delete:', row)}
          showActions={true}
        />
      </Card>
    </div>
  )
}
