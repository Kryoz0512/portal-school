'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { AddRoomModal } from '@/components/add-room-modal'
import { useState } from 'react'

const initialRoomsData = [
  { id: 1, room: '101', capacity: 45, status: 'Active' },
  { id: 2, room: '102', capacity: 45, status: 'Active' },
  { id: 3, room: '103', capacity: 50, status: 'Active' },
  { id: 4, room: '104', capacity: 40, status: 'Maintenance' },
]

export default function RoomListingsPage() {
  const [roomsData, setRoomsData] = useState(initialRoomsData)
  const [searchRoom, setSearchRoom] = useState('')
  const [capacity, setCapacity] = useState('all')
  const [status, setStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)

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

  const handleAddRoom = (formData) => {
    if (editingRoom) {
      // Update existing room
      setRoomsData((prev) =>
        prev.map((room) =>
          room.id === editingRoom.id ? { ...room, ...formData } : room
        )
      )
      setEditingRoom(null)
    } else {
      // Add new room
      const newRoom = {
        id: Math.max(...roomsData.map((r) => r.id), 0) + 1,
        ...formData,
      }
      setRoomsData((prev) => [...prev, newRoom])
    }
    setIsModalOpen(false)
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setIsModalOpen(true)
  }

  const handleDeleteRoom = (room) => {
    setRoomsData((prev) => prev.filter((r) => r.id !== room.id))
  }

  const handleOpenModal = () => {
    setEditingRoom(null)
    setIsModalOpen(true)
  }

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
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-foreground">Rooms</h3>
          <Button onClick={handleOpenModal} className="gap-2">
            + Add Room
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          onEdit={handleEditRoom}
          onDelete={handleDeleteRoom}
          showActions={true}
        />
      </Card>

      <AddRoomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingRoom(null)
        }}
        onSubmit={handleAddRoom}
        initialData={editingRoom}
      />
    </div>
  )
}
