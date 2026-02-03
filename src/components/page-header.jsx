'use client'

export function PageHeader({ title, description, action }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
