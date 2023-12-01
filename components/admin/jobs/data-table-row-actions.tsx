import { Row } from "@tanstack/react-table"
import { jobSchema } from "./schema"
import { Eye, Pencil, Trash, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import DataTableRowActionView from "./data-table-row-action-view"
import DataTableRowActionComplete from "./data-table-row-action-complete"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const job = jobSchema.parse(row.original)
    return (
        <div className="flex items-center">
            <DataTableRowActionView job={job} />
            <Button
                variant="ghost"
                className="flex w-8 h-8 p-0"
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Button
                variant="ghost"
                className="flex w-8 h-8 p-0"
            >
                <Trash className="w-4 h-4" />
            </Button>
            <DataTableRowActionComplete job={job} />
        </div>
    )
}