import axios from "axios"
import { JobStatus } from "@prisma/client"
import { FaWhatsapp, FaInstagram, FaGoogleDrive } from "react-icons/fa";

interface Job {
    id: string
    name: string
    campus: string
    date: Date
    session: number
    whatsapp: string
    instagram: string
    drive: string | null
    freelanceId: string | null
    freelance: string | null
    status: JobStatus
}

export default async function JobDetails({ params }: { params: { id: string } }) {
    const { id } = params
    const { data: job }: { data: Job } = await axios.get(`http://localhost:3000/api/jobs/${id}`)

    return (
        <div>
            <h1 className='text-5xl font-bold text-center'>{job.name}</h1>
            <h2 className="text-2xl font-medium text-center">{job.campus}</h2>
        </div>
    )
}
