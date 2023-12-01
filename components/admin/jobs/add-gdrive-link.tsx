'use client'
import * as z from "zod"
import { useState } from "react"
import { useForm, useFormState } from "react-hook-form"
import { useRouter } from "next/navigation"

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
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, Form, FormMessage } from "@/components/ui/form"
import { jobSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SyntheticEvent } from "react"
import axios from "axios"


const formSchema = z.object({
    id: z.string(),
    drive: z.string().url().startsWith("https://drive.google.com/drive/folders/", {
        message: "Invalid Google Drive Link",
    }),
})

export default function AddGoogleDriveLink({ job }: { job: z.infer<typeof jobSchema> }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            drive: ""
        },
    })

    const { errors, isDirty } = useFormState({
        control: form.control
    })

    const handleDialog = () => {
        form.reset()
        setDialogOpen(!dialogOpen)
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { data } = await axios.patch(`/api/jobs/${job.id}`, {
            drive: form.getValues().drive
        })
        router.refresh()
    }

    return (
        <AlertDialog onOpenChange={handleDialog}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-slate-400"
                >
                    Add Link
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form} >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Add Link Google Drive
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <FormField
                        control={form.control}
                        name="drive"
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input type="text" {...field} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <Button onClick={handleSubmit} disabled={!isDirty || Object.keys(errors).length > 0} >
                            Save
                        </Button>
                    </AlertDialogFooter>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
