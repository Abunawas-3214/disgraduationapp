import axios from "axios"
import { JobStatus } from "@prisma/client"
import { FaWhatsapp, FaInstagram, FaGoogleDrive } from "react-icons/fa";
import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link";
import { Button } from "@/components/ui/button"


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
        <div className="space-y-12 flex flex-col items-center justify-center">
            <div className="text-center space-y-2">
                <h1 className='text-5xl font-bold'>{job.name}</h1>
                <h3 className="text-sm font-medium">{job.status}</h3>
            </div>

            <div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6" />
                    <h2 className="text-2xl font-medium text-center">{job.campus}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <h2 className="text-2xl font-medium text-center">{format(new Date(job.date), "d MMM yy")}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    <h2 className="text-2xl font-medium text-center">Session: {job.session}</h2>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Link href={`https://wa.me/${job.whatsapp}`} target="_blank" className="flex gap-2 items-center justify-center border border-primary p-2 w-14 h-14 rounded-full hover:cursor-pointer hover:scale-105 transition-transform duration-300">
                    <FaWhatsapp
                        className="h-6 w-6"
                    />
                </Link>
                <Link href={`https://www.instagram.com/${job.instagram}`} target="_blank" className="flex gap-2 items-center justify-center border border-primary p-2 w-14 h-14 rounded-full hover:cursor-pointer hover:scale-105 transition-transform duration-300">
                    <FaInstagram
                        className="h-6 w-6"
                    />
                </Link>
                <Link href={job.drive ?? "#"} target={job.drive ? "_blank" : "_self"}
                    className={`flex gap-2 items-center justify-center border border-primary p-2 w-14 h-14 rounded-full 
                    ${job.drive ? "hover:cursor-pointer hover:scale-105 transition-transform duration-300" : "opacity-30 bg-gray-300"}
                `}>
                    <FaGoogleDrive
                        className="h-6 w-6"
                    />
                </Link>
            </div>
            <Button
                size="lg"
                disabled={job.status === "DONE"}
                className={`w-52 ${!job.drive && "hover:cursor-not-allowed opacity-50"}`}
            >
                {job.status === "DONE" ? "This job is already done 👍" : "Set Job As Done"}
            </Button>
        </div>
    )
}
