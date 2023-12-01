import { Calendar, Clock, MapPin } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { format } from "date-fns"
import { JobStatus } from "@prisma/client"
import Link from "next/link"

interface Job {
    id: string
    name: string
    campus: string
    date: Date
    session: string
    whatsapp: string
    instagram: string
    drive: string | null
    freelance: string | null
    status: JobStatus
}

export default async function Jobs() {
    const { data: jobs } = await axios.get("http://localhost:3000/api/jobs")
    return (
        <div className="space-y-12">
            <h1 className='text-3xl font-bold text-center'>Available Jobs</h1>

            <div className="flex flex-wrap gap-8">
                {jobs.map((job: Job) => (
                    <Card className="transition-shadow duration-500 w-56 hover:shadow-lg hover:cursor-pointer dark:hover:shadow-primary-foreground" key={job.id}>
                        <CardHeader className="text-center">
                            <CardTitle>{job.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <p>{job.campus}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <p>{format(new Date(job.date), "d MMM yy")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <p>Session: {job.session}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Link href={`/jobs/${job.id}`} className="w-full">
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    View
                                </Button>
                            </Link>

                            <Button
                                variant="default"
                                className="w-full"
                            >
                                Get
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

            </div>



        </div>

    )
}
