'use client'

import { Card } from '@/components/ui/card'

export function FormCard({ title, children, onSubmit }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </Card>
  )
}
