'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="text-muted-foreground">Welcome! Manage all school operations from the Enrollment menu on the left.</p>
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Announcements</h3>
        <p className="text-foreground text-sm">
          School Year 2024-2025 has officially started. Please update all schedules and rosters.
        </p>
      </Card>
    </div>
  )
}
