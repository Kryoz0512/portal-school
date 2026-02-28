'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Search, Trash2, FileText, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const documentsData = [
  { id: 1, studentName: 'Juan Dela Cruz', documentType: 'Birth Certificate', uploadDate: '2025-01-15', status: 'Verified', fileSize: '2.4 MB' },
  { id: 2, studentName: 'Maria Santos', documentType: 'Form 137', uploadDate: '2025-01-20', status: 'Verified', fileSize: '1.8 MB' },
  { id: 3, studentName: 'Carlos Reyes', documentType: 'Medical Certificate', uploadDate: '2025-02-01', status: 'Pending Review', fileSize: '3.1 MB' },
  { id: 4, studentName: 'Ana Cruz', documentType: 'Good Moral Character', uploadDate: '2025-02-10', status: 'Verified', fileSize: '2.2 MB' },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(documentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.documentType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDownload = (doc) => {
    console.log(`Downloading ${doc.documentType} for ${doc.studentName}`)
    alert(`${doc.documentType} for ${doc.studentName} has been downloaded`)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id))
      alert('Document deleted successfully')
    }
  }

  const verifiedCount = documents.filter(d => d.status === 'Verified').length
  const pendingCount = documents.filter(d => d.status === 'Pending Review').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Documents"
        description="Manage student documents, certificates, and official records"
        action={
          <Button onClick={() => setUploadDialogOpen(true)} className="bg-primary text-primary-foreground">
            <Upload size={18} className="mr-2" />
            Upload Document
          </Button>
        }
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Documents</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">{documents.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Verified</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{verifiedCount}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-800 mt-1">{pendingCount}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">Search</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name or document type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="min-w-[200px]">
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Documents</h3>
          <p className="text-sm text-muted-foreground mt-1">Showing {filteredDocuments.length} of {documents.length} documents</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Student Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Document Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">File Size</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Upload Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground">{doc.studentName}</td>
                  <td className="px-4 py-3 text-sm text-foreground flex items-center gap-2">
                    <FileText size={16} className="text-muted-foreground" />
                    {doc.documentType}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{doc.fileSize}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{doc.uploadDate}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'Verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(doc)}
                        className="gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(doc.id)}
                        className="gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Student Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Student Name</label>
              <Input placeholder="Select or type student name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">Document Type</label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground">
                <option>Select document type</option>
                <option>Birth Certificate</option>
                <option>Form 137</option>
                <option>Medical Certificate</option>
                <option>Good Moral Character</option>
                <option>Other</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground">File Upload</label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, PNG, JPG (Max 10MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary" onClick={() => setUploadDialogOpen(false)}>
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
