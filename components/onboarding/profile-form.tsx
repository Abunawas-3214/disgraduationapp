'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { Rupiah } from "../rupiah"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import { Status } from "@prisma/client"

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
    whatsapp: z.string().startsWith("62", { message: "Must start with 62" }),
    instagram: z.string().min(1, { message: "Instagram is required" }),
    address: z.string(),
    price: z.number().positive().array(),
    description: z.string().optional(),
})

export default function ProfileForm({ className, ...props }: ProfileFormProps) {
    const { update } = useSession()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            price: [100000],
        },
    })
    const onSubmit = async (Values: z.infer<typeof formSchema>) => {
        const id = props.id
        const data = {
            ...Values,
            price: Values.price[0],
            description: Values.description ? Values.description : null,
            status: "SUBMIT"
        }

        setIsLoading(true)
        await axios.patch(`/api/user/${id}`, data)
        update({
            status: Status.SUBMIT,
        })
        setIsLoading(false)
        router.push("/")
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormLabel>Whatsapp</FormLabel>
                                <FormControl>
                                    <Input type="number" min={62} placeholder="6285123456" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormDescription>
                                    This is your whatsapp number
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormLabel>Instagram</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="disgraduation" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormDescription>
                                    This is your instagram username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Jl. Indonesia no. 123, Lowokwaru, Kota Malang" {...field} className="resize-none" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descirption</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Saya telah menjadi fotografer sejak tahun 2010, dan kamera yang paling sering saya gunakan adalah Sony A7ii dengan lensa Zeiss 50mm F/1.4"
                                    {...field}
                                    className="resize-none"
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormDescription className="max-w-md">
                                Tell us about your experience in photography and show the camera or lens that you often use
                                <span className="font-semibold"> *(this field is optional)</span>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <FormLabel>Price per Hour</FormLabel>
                                <span className=" text-sm text-muted-foreground">
                                    {Rupiah(field.value[0])}
                                </span>
                            </div>
                            <FormControl>
                                <Slider defaultValue={field.value} min={100000} max={200000} step={25000} onValueChange={field.onChange} disabled={isLoading} />
                            </FormControl>
                            <FormDescription className="max-w-md">
                                Submit a price for your photography services per hour, this price will be a consideration in determining your fee
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit" className="flex ml-auto">
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                </Button>
            </form>
        </Form >
    )
}
