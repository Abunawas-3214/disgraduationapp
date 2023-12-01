'use client'
import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { User } from "@/components/admin/user/schema"
import { DataTableColumnHeader } from "@/components/admin/user/data-table-column-header"
import { DataTableRowActions } from "@/components/admin/user/data-table-row-actions"

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    {row.getValue("email")}
                </div>
            )
        },
        enableSorting: false
    },
    {
        accessorKey: "whatsapp",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Whatsapp" />
        ),
        cell: ({ row }) => {
            const whatsapp = `https://wa.me/${row.getValue("whatsapp")}`
            return (
                <div className="flex hover:underline">
                    <a href={whatsapp} target="_blank">
                        {row.getValue("whatsapp")}
                    </a>
                </div>
            )
        },
        enableSorting: false
    },
    {
        accessorKey: "instagram",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Instagram" />
        ),
        cell: ({ row }) => {
            const instagram = `https://www.instagram.com/${row.getValue("instagram")}`
            return (
                <div className="flex hover:underline">
                    <a href={instagram} target="_blank">
                        {row.getValue("instagram")}
                    </a>
                </div>
            )
        },
        enableSorting: false,
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    {row.getValue("price")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
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
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
] 
