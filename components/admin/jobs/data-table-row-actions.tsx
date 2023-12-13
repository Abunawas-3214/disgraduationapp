import { Row } from "@tanstack/react-table"
import { jobSchema } from "./schema"
import { Eye, Pencil, Trash, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import DataTableRowActionView from "./data-table-row-action-view"
import DataTableRowActionComplete from "./data-table-row-action-complete"
import DataTableRowActionDelete from "./data-table-row-action-delete"
import DataTableRowActionEdit from "./data-table-row-action-edit"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const job = jobSchema.parse(row.original)
    return (
        <div className="flex items-center">
            <DataTableRowActionView job={job} />
            <DataTableRowActionEdit job={job} />
            <DataTableRowActionDelete job={job} />
            <DataTableRowActionComplete job={job} />
        </div>
    )
}