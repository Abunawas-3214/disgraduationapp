'use client'
import * as z from "zod"
import type { User } from "@prisma/client"
import axios from "axios"
import { Pencil, Quote } from "lucide-react"
import { useState, SyntheticEvent } from "react"
import { useForm, useFormState } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    description: z.string(),
})


export default function DescriptionEdit({ user }: { user: User }) {
    const [dialogOpen, setDialogOpen] = useState(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        defaultValues: {
            description: user.description ?? "",
        },
    })

    const { isDirty } = useFormState({
        control: form.control,
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const { data: res }: { data: User } = await axios.patch(`http://localhost:3000/api/user/${user.id}`, form.getValues())
        form.reset({
            description: res.description ?? "",
        })
        router.refresh()
        handleDialog()
    }

    const handleDialog = () => {
        form.reset()
        setDialogOpen(!dialogOpen)
    }

    return (
        <AlertDialog onOpenChange={handleDialog} open={dialogOpen}>
            <AlertDialogTrigger asChild>
                {user.description ? (
                    <div className="ml-auto my-auto">
                        <Button
                            className="hover:bg-secondary-foreground/10"
                            variant="ghost"
                        >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="default"
                    >
                        <Quote className="h-4 w-4 mr-2" />
                        Add Description
                    </Button>

                )}

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add Description
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Tell us about your experience in photography and show the camera or lens that you often use
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Saya telah menjadi fotografer sejak tahun 2010, dan kamera yang paling sering saya gunakan adalah Sony A7ii dengan lensa Zeiss 50mm F/1.4"
                                            className="h-36"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} disabled={!isDirty}>
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
