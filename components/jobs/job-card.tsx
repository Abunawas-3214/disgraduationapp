import { Check, Asterisk, Clock4 as ClockIcon, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import { JobStatus } from "@prisma/client"
import JobGetAction from "./job-get-action"


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


export default function JobCard({ className, job, type }: { className?: React.ComponentProps<typeof Card>; job: Job; type: "get" | "view" }) {
    let iconPoint

    if (job.status === "ONGOING" && !job.freelance) {
        iconPoint = (
            <div className="absolute flex items-center justify-center group-hover:scale-150 ease-in-out duration-500 transition-transform -top-2 -right-2 w-5 h-5 rounded-full bg-primary">
                <Asterisk className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500  h-3 w-3 text-secondary" />
            </div>
        )
    } else if (job.status === "ONGOING" && job.freelance) {
        iconPoint = (
            <div className="absolute flex items-center justify-center group-hover:scale-150 ease-in-out duration-500 transition-transform -top-2 -right-2 w-5 h-5 rounded-full bg-primary">
                <ClockIcon className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500  h-3 w-3 text-secondary" />
            </div>
        )
    } else if (job.status === "DOING") {
        iconPoint = (
            <div className="absolute flex items-center justify-center group-hover:scale-150 ease-in-out duration-500 transition-transform -top-2 -right-2 w-5 h-5 rounded-full bg-primary">
                <PlayCircle className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500  h-3 w-3 text-secondary" />
            </div>
        )
    } else if (job.status === "DONE") {
        iconPoint = (
            <div className="absolute flex items-center justify-center group-hover:scale-150 ease-in-out duration-500 transition-transform -top-2 -right-2 w-5 h-5 rounded-full bg-secondary">
                <Check className="opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500  h-3 w-3 text-primary" />
            </div>
        )
    } else {
        iconPoint = ""
    }

    return (
        <div className="relative group transition-all duration-500 w-56 hover:shadow-lg dark:hover:shadow-primary-foreground">
            <Card className={cn("", className)}>
                <CardHeader className="text-center">
                    <CardTitle>{job.name}</CardTitle>
                </CardHeader>
                <CardContent className="mb-8">
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
                <CardFooter>
                    {type === "get" ? (
                        <JobGetAction job={job} />
                    ) : (
                        <Link href={`/my-jobs/${job.id}`} className="w-full">
                            <Button
                                variant="secondary"
                                className="w-full"
                            >
                                View
                            </Button>
                        </Link>
                    )
                    }
                </CardFooter>
            </Card>
            {
                iconPoint
            }
        </div>

    )
}
