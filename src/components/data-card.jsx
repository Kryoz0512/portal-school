'use client'

import { Card } from '@/components/ui/card'

export function DataCard({ title, children, action }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      {children}
    </Card>
  )
}
