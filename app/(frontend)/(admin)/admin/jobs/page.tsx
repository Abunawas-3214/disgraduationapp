import axios from "axios"
import { DataTable } from "@/components/admin/jobs/data-table"
import { columns } from "@/components/admin/jobs/columns"

export default async function AdminJobsPage() {
    const { data: jobs } = await axios.get("http://localhost:3000/api/jobs")
    const { data: campuses } = await axios.get("http://localhost:3000/api/campus")
    const { data: freelancers } = await axios.get("http://localhost:3000/api/user?status=APPROVED")

    return (
        <DataTable columns={columns} data={jobs} campuses={campuses} freelancers={freelancers} />
    )
}
