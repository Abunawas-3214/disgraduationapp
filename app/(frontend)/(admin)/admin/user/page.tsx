import axios from "axios"
import { DataTable } from "@/components/admin/user/data-table"
import { columns } from "@/components/admin/user/columns"

export default async function AdminUserPage() {
    const { data: users } = await axios.get("http://localhost:3000/api/user")
    return (
        <DataTable columns={columns} data={users} />
    )
}
