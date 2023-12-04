'use client'
import { useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
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
import { Badge } from "@/components/ui/badge"

import { format } from "date-fns"
import { JobStatus } from "@prisma/client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"


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
    const [isMutating, setIsMutating] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()
    const { toast } = useToast()

    const handleGetJob = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        const res = await axios.post(`http://localhost:3000/api/jobs/${job.id}`, {
            freelanceId: session?.user.id,
        })
        setIsMutating(false)
        setDialogOpen(false)
        toast({
            title: "Success!",
            description: "You have successfully applied for this job!",
            variant: "default",
        })
        router.refresh()
    }

    return (
        <Card className={cn("transition-shadow duration-500 w-56 hover:shadow-lg dark:hover:shadow-primary-foreground", className)}>
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
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="default"
                                className="w-full"
                            >
                                Get
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-medium">
                                    Get Job from Client: <span className="font-bold">{job.name}</span>
                                    <Badge variant="secondary" className="ml-2">
                                        {job.campus}
                                    </Badge>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {format(new Date(job.date), "EEEE, d MMMM yyyy")}, Session: {job.session}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div>
                                <h3 className="text-2xl font-bold">Are you sure you want to get this job?</h3>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <Button onClick={handleGetJob}>
                                    Get
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
    )
}
