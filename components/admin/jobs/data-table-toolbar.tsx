import { z } from "zod"
import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

import { JobStatus } from "@prisma/client"

import { jobSchema } from "./schema"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"
import AddJob from "./add-job"
import { useContext } from "react"
import { Context } from "@/components/context"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    data: TData[]
}
export function DataTableToolbar<TData extends z.infer<typeof jobSchema>>({ table, data }: DataTableToolbarProps<TData>) {

    const { campuses } = useContext(Context)
    const sessions = [1, 2, 3]
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Client Name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("campus") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("campus")}
                        title="Campus"
                        options={campuses.map((campus) => ({
                            key: campus,
                            value: campus,
                        }))}
                    />
                )}
                {table.getColumn("session") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("session")}
                        title="Session"
                        options={sessions.map((session) => ({
                            key: `Session: ${session}`,
                            value: session,
                        }))}
                    />
                )}
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={Object.entries(JobStatus).map(([key, value]) => ({
                            key,
                            value,
                        }))}
                    />
                )}
            </div>
            <DataTableViewOptions table={table} />
            <AddJob />
        </div>
    )
}
