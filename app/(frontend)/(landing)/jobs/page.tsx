import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import axios from "axios"
import { JobStatus } from "@prisma/client"
import JobCard from "@/components/jobs/job-card"

interface Job {
    id: string
    name: string
    campus: string
    date: Date
    session: string
    whatsapp: string
    instagram: string
    drive: string | null
    freelanceId: string | null
    freelance: string | null
    status: JobStatus
}

export default async function Jobs() {
    const session = await getServerSession(authOptions)

    const { data: jobs } = await axios.get("http://localhost:3000/api/jobs", {
        headers: {
            "user-id": session?.user.id,
        }
    })

    const availableJobs = jobs.filter((job: Job) => job.freelanceId === null)
    return (
        <div className="space-y-12">
            <h1 className='text-3xl font-bold text-center'>Available Jobs</h1>

            <div className="flex flex-wrap gap-8">
                {availableJobs.map((job: Job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        type="get"
                    />
                ))}
            </div>
        </div>

    )
}
