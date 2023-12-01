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
import { userSchema } from "./schema"

export default function DataTableRowActionDelete({ user }: { user: z.infer<typeof userSchema> }) {
    const router = useRouter()
    const handleDelete = async (user: z.infer<typeof userSchema>) => {
        await axios.delete(`/api/user/${user.id}`)
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
                        Delete user {user.name}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this user?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(user)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
