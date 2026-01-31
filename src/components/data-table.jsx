'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Edit2, Trash2, Printer as Print } from 'lucide-react'

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onPrint,
  rowsPerPage = 10,
  showActions = true,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = data.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, data.length)} of {data.length} entries
        </p>
        {onPrint && (
          <Button variant="outline" size="sm" onClick={onPrint} className="gap-2 bg-transparent">
            <Print size={16} />
            Print
          </Button>
        )}
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((column) => (
                <TableHead key={column.key} className="font-semibold text-foreground">
                  {column.label}
                </TableHead>
              ))}
              {showActions && (onEdit || onDelete) && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-muted/50 transition-colors">
                  {columns.map((column) => (
                    <TableCell key={column.key} className="py-3">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                  {showActions && (onEdit || onDelete) && (
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(row)}
                            className="text-primary hover:bg-primary/10"
                          >
                            <Edit2 size={16} />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(row)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showActions && (onEdit || onDelete) ? 1 : 0)} className="text-center py-8">
                  <p className="text-muted-foreground">No data available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
