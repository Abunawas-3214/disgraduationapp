'use client'
import { useState, SyntheticEvent } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { JobStatus } from "@prisma/client"

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

export default function JobDoneAction({ job }: { job: Job }) {
    const [isMutating, setIsMutating] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const router = useRouter()
    const { toast } = useToast()

    const handleJobDone = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        const res = await axios.patch(`http://localhost:3000/api/jobs/${job.id}`, {
            status: "DONE"
        })
        setIsMutating(false)
        setDialogOpen(false)
        router.push("/my-jobs")
        router.refresh()
        toast({
            title: "Awesome!",
            description: "Thank you for your work at DISGRADUATION!",
        })
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    size="lg"
                    disabled={job.status === "DONE" || !job.drive}
                    className="w-52"
                >
                    {job.status === "DONE" ? "This job is already done 👍" : "Set Job As Done"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to set this job as done?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will set the job as done, Our Team will check your submission.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isMutating}>Cancel</AlertDialogCancel>
                    <Button onClick={handleJobDone} disabled={isMutating} >
                        Done
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
