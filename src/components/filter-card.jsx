'use client'

import { Card } from '@/components/ui/card'

export function FilterCard({ title = 'Filters', children }) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </Card>
  )
}
