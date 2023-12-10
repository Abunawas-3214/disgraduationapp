'use client'
import { useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Button } from "@/components/ui/button"
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

export default function JobGetAction({ job }: { job: Job }) {
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
                    <AlertDialogCancel disabled={isMutating}>
                        Cancel
                    </AlertDialogCancel>
                    <Button onClick={handleGetJob} disabled={isMutating}>
                        Get
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
