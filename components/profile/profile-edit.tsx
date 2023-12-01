'use client'
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "@prisma/client"
import { SyntheticEvent } from "react"

const formSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    whatsapp: z.string().startsWith("62", { message: "Must start with 62" }),
    instagram: z.string().min(1, { message: "Instagram cannot be empty" }),
    address: z.string().min(1, { message: "Address cannot be empty" }),
})


export default function ProfileEdit({ user }: { user: User }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: user.name,
            whatsapp: user.whatsapp ?? "",
            instagram: user.instagram ?? "",
            address: user.address ?? "",
        },
    })

    const { isDirty, isValid, isSubmitting } = useFormState({
        control: form.control,
    })

    const handleDialog = () => {
        form.reset()
        setDialogOpen(!dialogOpen)
    }

    const onSubmit = async (Values: z.infer<typeof formSchema>) => {
        const { data: res }: { data: User } = await axios.patch(`http://localhost:3000/api/user/${user.id}`, Values)
        form.reset({
            name: res.name,
            whatsapp: res.whatsapp ?? "",
            instagram: res.instagram ?? "",
            address: res.address ?? "",
        })
        router.refresh()
        handleDialog()
    }
    return (
        <AlertDialog onOpenChange={handleDialog} open={dialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Edit Profile
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                                    <FormLabel className="text-right">Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value} className="col-span-3" disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-end-4" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                                    <FormLabel className="text-right">Whatsapp</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={(field.value)} className="col-span-3" disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-end-4" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                                    <FormLabel className="text-right">Instagram</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value} className="col-span-3" disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-end-4" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                                    <FormLabel className="text-right">Address</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value} className="col-span-3" disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage className="col-start-2 col-end-4" />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)} disabled={!(isDirty && isValid) || isSubmitting}>
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}
