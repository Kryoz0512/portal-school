'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CreateAdminPage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Create Admin</h1>
                    <p className="text-muted-foreground">Manage admin accounts here</p>
                </div>
                <Button className="w-fit">
                    <Plus size={18}/>
                    New Admin
                </Button>
            </div>
        </div>
    )
}