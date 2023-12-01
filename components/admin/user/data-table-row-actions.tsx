import { Row } from "@tanstack/react-table"
import { userSchema } from "./schema"
import DataTableRowActionView from "./data-table-row-action-view"
import DataTableRowActionDelete from "./data-table-row-action-delete"
import DataTableRowActionEdit from "./data-table-row-action-edit"


interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const user = userSchema.parse(row.original)

    return (
        <div className="flex">
            <DataTableRowActionView user={user} />

            <DataTableRowActionEdit user={user} />

            <DataTableRowActionDelete user={user} />
        </div>
    )
}
