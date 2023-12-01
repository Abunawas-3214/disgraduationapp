'use client'
import { CheckCircle } from "lucide-react"
import { useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
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
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { jobSchema } from "./schema"
import { format } from "date-fns"
import axios from "axios"

export default function DataTableRowActionComplete({ job }: { job: z.infer<typeof jobSchema> }) {
    const router = useRouter()

    const [dialogOpen, setDialogOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const handleComplete = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)

        const { data } = await axios.put(`http://localhost:3000/api/jobs/${job.id}`)
        console.log(data)

        setIsMutating(false)

        router.refresh()
        setDialogOpen(false)
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="secondary"
                    className="flex ml-2 space-x-1"
                >
                    <span>Complete</span>
                    <CheckCircle className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <div className="flex items-center">
                            {job.name}
                            <Badge variant="outline" className="ml-2">
                                {job.campus}
                            </Badge>
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {format(new Date(job.date), "EEEE, d MMMM yyyy")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <h1 className="text-lg font-bold">Are you sure you want to set this job as completed?</h1>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isMutating}>Cancel</AlertDialogCancel>
                    <Button onClick={handleComplete} disabled={isMutating}>
                        {isMutating ? (
                            <Icons.spinner className="h-4 w-4 animate-spin" />
                        ) : (
                            <span>Yes</span>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
