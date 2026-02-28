'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, File } from 'lucide-react'

const documents = [
  {
    id: 1,
    name: 'Grading Template (PDF)',
    description: 'Standard grading sheet template',
    type: 'PDF',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 2,
    name: 'Class List Template (DOCX)',
    description: 'Class attendance and list template',
    type: 'DOCX',
    icon: <File className="w-8 h-8" />,
  },
  {
    id: 3,
    name: 'Lesson Plan Template (DOCX)',
    description: 'Standard lesson planning document',
    type: 'DOCX',
    icon: <File className="w-8 h-8" />,
  },
  {
    id: 4,
    name: 'Student Report Card (PDF)',
    description: 'Report card format and template',
    type: 'PDF',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 5,
    name: 'Enrollment Form (DOCX)',
    description: 'Student enrollment documentation',
    type: 'DOCX',
    icon: <File className="w-8 h-8" />,
  },
  {
    id: 6,
    name: 'Teacher Evaluation Form (PDF)',
    description: 'Teacher performance evaluation template',
    type: 'PDF',
    icon: <FileText className="w-8 h-8" />,
  },
]

export default function DocumentsPage() {
  const handleDownload = (docName) => {
    console.log(`Downloading: ${docName}`)
    // Implement actual download logic
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground mt-1">
          Download useful templates and forms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-primary opacity-70">{doc.icon}</div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {doc.type}
              </span>
            </div>

            <h3 className="font-semibold text-foreground mb-1">
              {doc.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {doc.description}
            </p>

            <Button
              onClick={() => handleDownload(doc.name)}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download size={16} />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
