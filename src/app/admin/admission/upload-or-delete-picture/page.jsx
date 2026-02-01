'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Trash2, X } from 'lucide-react'
import { useState } from 'react'

const initialPictures = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Students',
    image: null,
    placeholder: 'JD',
  },
  {
    id: 2,
    name: 'Ms. Johnson',
    type: 'Teachers',
    image: null,
    placeholder: 'MJ',
  },
  {
    id: 3,
    name: 'Mark Administration',
    type: 'Staff',
    image: null,
    placeholder: 'MA',
  },
]

export default function UploadOrDeletePicturePage() {
  const [pictures, setPictures] = useState(initialPictures)
  const [previewImage, setPreviewImage] = useState(null)
  const [previewTitle, setPreviewTitle] = useState('')

  const filteredPictures = pictures

  const handleFileUpload = (e, pictureId) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPictures((prev) =>
          prev.map((pic) =>
            pic.id === pictureId
              ? { ...pic, image: event.target.result }
              : pic
          )
        )
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeletePicture = (pictureId) => {
    setPictures((prev) =>
      prev.map((pic) =>
        pic.id === pictureId
          ? { ...pic, image: null }
          : pic
      )
    )
  }

  const handlePreviewClick = (picture) => {
    if (picture.image) {
      setPreviewImage(picture.image)
      setPreviewTitle(picture.name)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Upload / Delete Picture</h2>
        <p className="text-muted-foreground mt-1">Manage photos for students, teachers, and staff</p>
      </div>

      {/* Pictures Grid */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          All Pictures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPictures.length > 0 ? (
            filteredPictures.map((picture) => (
              <div
                key={picture.id}
                className="border border-border rounded-lg overflow-hidden bg-muted/30 p-4"
              >
                {/* Picture Container */}
                <div className="flex justify-center mb-4">
                  {picture.image ? (
                    <div className="relative">
                      <img
                        src={picture.image}
                        alt={picture.name}
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handlePreviewClick(picture)}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-2xl font-semibold">
                      {picture.placeholder}
                    </div>
                  )}
                </div>

                {/* Name */}
                <p className="text-center font-medium text-foreground mb-4 text-sm">
                  {picture.name}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <label className="block w-full">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, picture.id)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full cursor-pointer"
                      onClick={(e) => {
                        e.currentTarget.parentElement?.querySelector('input')?.click()
                      }}
                    >
                      <Upload size={16} />
                      Upload
                    </Button>
                  </label>

                  {picture.image && (
                    <Button
                      variant="outline"
                      className="w-full text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeletePicture(picture.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No records found for {filterType.toLowerCase()}
            </div>
          )}
        </div>
      </Card>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative bg-background rounded-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-muted hover:bg-muted/80 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {previewTitle}
              </h3>
              <img
                src={previewImage}
                alt={previewTitle}
                className="w-full max-h-96 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
