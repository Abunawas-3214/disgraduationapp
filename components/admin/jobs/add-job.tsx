'use client'
import { cn } from "@/lib/utils"
import axios from "axios"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import { format } from "date-fns"
import { useForm, useFormState } from "react-hook-form"
import { Plus, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"
import { Icons } from "@/components/icons"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"

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
    drive: z.string().url().nullable(),
})

export default function AddJob({ campuses }: { campuses: string[] }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)
    const [campusSearch, setCampusSearch] = useState("")
    const [generator, setGenerator] = useState("")

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    })

    const { errors, isDirty } = useFormState({
        control: form.control
    })

    const handleDialog = () => {
        form.reset()
        setDialogOpen(!dialogOpen)
    }

    const dirtyEachFields = () => {
        const field = Object.values(form.watch())
        return field.some(value => value === undefined || value === "")
    }

    const handleGenerate = async (e: SyntheticEvent) => {
        e.preventDefault()

        const namaRegex = /Nama : (\s*\w.*)/;
        const namaKampusRegex = /Nama Kampus \/ Univ : (\w+)/;
        const tanggalRegex = /Tanggal Wisuda : (\d{2}-\d{2}-\d{4})/;
        const paketRegex = /Paket : (\w+)/;
        const sesiRegex = /Sesi : Sesi (\d+)/;
        const instagramRegex = /Instagram : @(\w+)/;

        const namaMatch = generator.match(namaRegex);
        const namaKampusMatch = generator.match(namaKampusRegex);
        const tanggalMatch = generator.match(tanggalRegex);
        const paketMatch = generator.match(paketRegex);
        const sesiMatch = generator.match(sesiRegex);
        const instagramMatch = generator.match(instagramRegex);

        const namaValue = namaMatch ? namaMatch[1].trim() : null;
        const namaKampusValue = namaKampusMatch ? namaKampusMatch[1] : null;
        const tanggalValue = tanggalMatch ? new Date(tanggalMatch[1]) : null;
        const paketValue = paketMatch ? paketMatch[1] : null;
        const sesiValue = sesiMatch ? sesiMatch[1] : null;
        const instagramValue = instagramMatch ? instagramMatch[1] : null;

        console.log("Nama:", namaValue);
        console.log("Nama Kampus:", namaKampusValue);
        console.log("Tanggal Wisuda:", tanggalValue);
        console.log("Paket:", paketValue);
        console.log("Sesi:", sesiValue);
        console.log("Instagram:", instagramValue);

        form.setValue("name", namaValue ?? "")
        form.setValue("campus", namaKampusValue ?? "")
        form.setValue("date", tanggalValue ?? "")
        form.setValue("session", sesiValue ?? "")
        form.setValue("instagram", instagramValue ?? "")
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const data = {
            ...form.getValues(),
            date: new Date(form.getValues("date")).toISOString(),
            session: Number(form.getValues("session"))
        }
        setIsMutating(true)
        const res = await axios.post("http://localhost:3000/api/jobs", data)
        setIsMutating(false)
        handleDialog()
        router.refresh()
    }

    return (
        <AlertDialog onOpenChange={handleDialog} open={dialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="default"
                    size="sm"
                    className="ml-4 h-8 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Job
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Add Job</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col items-center gap-2">
                    <Textarea placeholder="Input job template to generate" onChange={(e) => setGenerator(e.target.value)} />

                    <Button className="w-fit" onClick={handleGenerate}>
                        Generate
                    </Button>
                </div>


                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Name</FormLabel>
                                <FormControl >
                                    <Input type="text" className="col-span-3" placeholder="Client's Name" {...field} disabled={isMutating} />
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
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? `Session: ${field.value}` : "Select Session"}
                                                <Clock className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
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
                                <FormLabel className="text-right">WhatsApp</FormLabel>
                                <FormControl >
                                    <Input type="number" className="col-span-3" placeholder="6200000" {...field} disabled={isMutating} />
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
                                <FormControl >
                                    <Input type="text" className="col-span-3" placeholder="disgradution" {...field} disabled={isMutating} />
                                </FormControl>
                                <FormMessage className="col-start-2 col-span-3" />
                            </FormItem>
                        )}
                    />
                </Form>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isDirty || Object.keys(errors).length > 0 || dirtyEachFields() || isMutating}
                    >
                        {isMutating ? (
                            <>
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <span>Save</span>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
