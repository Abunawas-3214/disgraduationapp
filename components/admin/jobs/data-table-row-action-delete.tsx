'use client'
import axios from "axios"
import * as z from "zod"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
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


import { useRouter } from "next/navigation"
import { jobSchema } from "./schema"

export default function DataTableRowActionDelete({ job }: { job: z.infer<typeof jobSchema> }) {
    const router = useRouter()

    const handleDelete = async (job: z.infer<typeof jobSchema>) => {
        await axios.delete(`/api/jobs/${job.id}`)
        router.refresh()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Job for Client: {job.name}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this job?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(job)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
