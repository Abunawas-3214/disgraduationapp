'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Job } from "@/components/admin/jobs/schema"

import { DataTableColumnHeader } from "@/components/admin/jobs/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import AddGoogleDriveLink from "./add-gdrive-link"

export const columns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex font-medium">
                    {row.getValue("name")}
                </div>
            )
        }
    },
    {
        accessorKey: "campus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Campus" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    {row.getValue("campus")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            const formattedDate = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            return (
                <div className="flex">
                    {formattedDate}
                </div>
            )
        }
    },
    {
        accessorKey: "session",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Session" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    {row.getValue("session")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
    },
    {
        accessorKey: "drive",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Google Drive Link" />
        ),
        cell: ({ row }) => {
            const drive: string = row.getValue("drive")
            return (
                <div className="flex justify-center">
                    {drive ?
                        <a href={drive} target="_blank">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex items-center p-2 space-x-2"
                            >
                                <span>Open</span>
                                <Image src="/icons/google-drive.svg" alt="Google Drive" width={20} height={20} />
                            </Button>
                        </a>
                        :
                        <AddGoogleDriveLink job={row.original} />
                    }
                </div>
            )
        },
        enableSorting: false
    },
    {
        accessorKey: "freelance",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Freelance" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    {
                        row.getValue("freelance")
                        ?? <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-400"
                        >
                            Add Freelance
                        </Button>
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    {row.getValue("status")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" className="text-center" />
        ),
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
]