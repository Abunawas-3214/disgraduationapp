'use client'
import { cn } from "@/lib/utils"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { CaretSortIcon } from "@radix-ui/react-icons"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { userSchema } from "./schema"
import { banks } from "@/components/data/bank"

const formSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),
    instagram: z.string(),
    address: z.string(),
    price: z.number().positive().array(),
    description: z.string().optional(),
    bankAgency: z.string(),
    bankNumber: z.string(),
    status: z.string(),
})

const rupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value)
}

export default function DataTableRowActionEdit({ user }: { user: z.infer<typeof userSchema> }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isSelectingBanks, setIsSelectingBanks] = useState(false)

    const handleDialog = () => {
        setDialogOpen(!dialogOpen)
    }

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: "",
            whatsapp: user.whatsapp ? user.whatsapp : "",
            instagram: user.instagram ? user.instagram : "",
            address: user.address ? user.address : "",
            price: user.price ? [user.price] : [100000],
            bankAgency: user.bankAgency ? user.bankAgency : "",
            bankNumber: user.bankNumber ? user.bankNumber : "",
            description: user.description ? user.description : "",
            status: user.status
        }
    })

    const handleUpdate = async (user: any) => {
        const { price, id, ...userData } = user
        const data = Object.entries({ ...userData, price: user.price[0] })
            .filter(([key, value]) => value !== "")
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

        await axios.patch(`/api/user/${id}`, data)
        setDialogOpen(false)
        router.refresh()
    }
    return (
        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0"
                    onClick={() => handleDialog()}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-screen-xl max-h-screen">
                <DialogHeader>
                    <DialogTitle>
                        Update user {user.name}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdate)}>
                        <div className="flex flex-row gap-4 py-2">
                            <div className="space-y-4 w-1/3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={field.value} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} value={field.value} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">New Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} value={field.value} className="col-span-3" placeholder="*******" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />
                            <div className="space-y-4 w-1/3">
                                <FormField
                                    control={form.control}
                                    name="whatsapp"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Whatsapp</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} value={(field.value)} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Instagram</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={field.value} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Address</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={field.value} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} value={field.value} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Separator orientation="vertical" className="h-auto" />
                            <div className="space-y-8 w-1/3">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <FormLabel>Price per Hour</FormLabel>
                                                <span className=" text-sm text-muted-foreground">
                                                    {rupiah(field.value[0])}
                                                </span>
                                            </div>
                                            <FormControl>
                                                <Slider defaultValue={field.value} min={100000} max={200000} step={25000} onValueChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-6 ">
                                    <FormField
                                        control={form.control}
                                        name="bankAgency"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col w-[300px] gap-1">
                                                <FormLabel>Bank Agency</FormLabel>
                                                <Popover open={isSelectingBanks}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                                onClick={() => setIsSelectingBanks(true)}
                                                            >
                                                                {field.value ? banks.find((bank) => bank.code === field.value)?.name : "Select Bank"}
                                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[300px] p-0" align="start">
                                                        <Command>
                                                            <CommandInput placeholder="Select Bank" />
                                                            <CommandEmpty>No Bank Found.</CommandEmpty>
                                                            <ScrollArea className="h-64">
                                                                <CommandGroup>
                                                                    {banks.map((bank) => (
                                                                        <CommandItem key={bank.code} value={bank.name} onSelect={() => { field.onChange(bank.code); setIsSelectingBanks(false) }}>
                                                                            {bank.name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </ScrollArea>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bankNumber"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-1 grow">
                                                <FormLabel>Bank Number</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="1234567890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="NEW">NEW</SelectItem>
                                                    <SelectItem value="SUBMIT">SUBMIT</SelectItem>
                                                    <SelectItem value="APPROVED">APPROVED</SelectItem>
                                                    <SelectItem value="REJECTED">REJECTED</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>

                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
