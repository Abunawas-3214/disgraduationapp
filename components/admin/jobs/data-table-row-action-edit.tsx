'use client'
import { cn } from "@/lib/utils"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Pencil } from "lucide-react"
import { useForm, useFormState } from "react-hook-form"
import { Icons } from "@/components/icons"
import { format } from "date-fns"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { jobSchema } from "./schema"
import { Context } from "@/components/context"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    campus: z.string(),
    date: z.date().or(z.string()),
    session: z.string(),
    whatsapp: z.string().startsWith("62", {
        message: "Whatsapp must start with 62",
    }),
    instagram: z.string(),
    drive: z.string().url(),
    freelanceId: z.string().optional(),
    status: z.string(),
})

export default function DataTableRowActionEdit({ job }: { job: z.infer<typeof jobSchema> }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)
    const [campusSearch, setCampusSearch] = useState("")
    const [freelancerSearch, setFreelancerSearch] = useState("")

    const { campuses, freelancers } = useContext(Context)
    console.log(job.freelanceId)
    console.log(freelancers)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: job.name,
            campus: job.campus,
            date: job.date,
            session: job.session.toString(),
            whatsapp: job.whatsapp ?? "",
            instagram: job.instagram ?? "",
            drive: job.drive ?? "",
            freelanceId: job.freelanceId ?? undefined,
            status: job.status,
        }
    })

    const { errors, isDirty } = useFormState({
        control: form.control
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Job for Client: {job.name}</AlertDialogTitle>
                </AlertDialogHeader>

                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="freelanceId"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Freelance</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isMutating}
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full col-span-3 justify-between",
                                                    !form.getFieldState("freelanceId").isDirty && "bg-secondary text-secondary-foreground/50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ?
                                                    freelancers.find((freelancer) => freelancer.id === field.value)?.name
                                                    : ("Select Freelancer")}
                                                {/* <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search Campus" onValueChange={setFreelancerSearch} />
                                            <CommandEmpty className="p-2 text-center">
                                                No Freelancer Found
                                            </CommandEmpty>
                                            <CommandGroup heading="Freelancers">
                                                {freelancers.map((freelancer) => (
                                                    <CommandItem
                                                        key={freelancer.id}
                                                        onSelect={() => field.onChange(freelancer.id)}
                                                    >
                                                        {freelancer.name}
                                                        <CheckIcon className={cn(
                                                            "ml-auto h-4 w-4",
                                                            freelancer.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            <Separator />
                                            <CommandGroup heading="Actions">
                                                <CommandItem
                                                    onSelect={() => {
                                                        form.setValue("freelanceId", "")
                                                    }}
                                                >
                                                    Set Job as Unassigned
                                                    <Cross2Icon className={cn(
                                                        "ml-auto h-4 w-4 opacity-50",
                                                    )} />
                                                </CommandItem>
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className={`col-span-3 ${!form.getFieldState("name").isDirty && "bg-secondary text-secondary-foreground/50"} `}
                                        placeholder="Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="campus"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Campus</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isMutating}
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full col-span-3 justify-between",
                                                    !form.getFieldState("campus").isDirty && "bg-secondary text-secondary-foreground/50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ?? "Select Campus"}
                                                <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search Campus" onValueChange={setCampusSearch} />
                                            <CommandEmpty className="p-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        field.onChange((campusSearch).toUpperCase())
                                                    }}
                                                >
                                                    Add {campusSearch} as a new Campus
                                                </Button>
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {campuses.map((campus) => (
                                                    <CommandItem
                                                        key={campus}
                                                        onSelect={() => field.onChange(campus)}
                                                    >
                                                        {campus}
                                                        <CheckIcon className={cn(
                                                            "ml-auto h-4 w-4",
                                                            campus === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isMutating}
                                                variant="outline"
                                                className={cn(
                                                    "w-full col-span-3 justify-between",
                                                    !form.getFieldState("date").isDirty && "bg-secondary text-secondary-foreground/50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? format(new Date(field.value), "EEEE, d MMMM yyyy")
                                                    : "Select Date"}
                                                <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value as Date}
                                            onSelect={field.onChange}
                                            disabled={(date) => {
                                                const today = new Date()
                                                return date < today
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="session"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Session</FormLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <FormControl >
                                            <Button
                                                disabled={isMutating}
                                                variant="outline"
                                                className={cn(
                                                    "w-full col-span-3 justify-between",
                                                    !form.getFieldState("session").isDirty && "bg-secondary text-secondary-foreground/50",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? `Session: ${field.value}` : "Select Session"}
                                                <Clock className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuRadioGroup value={field.value} onValueChange={field.onChange}>
                                            <DropdownMenuRadioItem value={'1'}>Session: 1</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={'2'}>Session: 2</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value={'3'}>Session: 3</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Whatsapp</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className={`col-span-3 ${!form.getFieldState("whatsapp").isDirty && "bg-secondary text-secondary-foreground/50"} `}
                                        placeholder="Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3" />
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
                                    <Input
                                        type="text"
                                        className={`col-span-3 ${!form.getFieldState("instagram").isDirty && "bg-secondary text-secondary-foreground/50"} `}
                                        placeholder="Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="drive"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Drive Link</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className={`col-span-3 ${!form.getFieldState("drive").isDirty && "bg-secondary text-secondary-foreground/50"} `}
                                        placeholder="Insert Google Drive Link Here"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                </Form>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Submit</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
