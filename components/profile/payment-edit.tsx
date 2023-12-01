'use client'
import * as z from "zod"
import { cn } from "@/lib/utils"
import type { User } from "@prisma/client"
import axios from "axios"
import { Pencil, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, SyntheticEvent } from "react"
import { useForm, useFormState } from "react-hook-form"
import { banks } from "@/components/data/bank"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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

const formSchema = z.object({
    bankAgency: z.string(),
    bankNumber: z.string(),
})

function PaymentEdit({ user }: { user: User }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isSelectingBanks, setIsSelectingBanks] = useState(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        defaultValues: {
            bankAgency: user.bankAgency ?? "",
            bankNumber: user.bankNumber ?? "",
        }
    })

    const { isDirty } = useFormState({
        control: form.control
    })

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const { data: res }: { data: User } = await axios.patch(`http://localhost:3000/api/user/${user.id}`, form.getValues())
        form.reset({
            bankAgency: res.bankAgency ?? "",
            bankNumber: res.bankNumber ?? "",
        })
        router.refresh()
        handleDialog()
    }
    const handleDialog = () => {
        form.reset()
        setIsSelectingBanks(false)
        setDialogOpen(!dialogOpen)
    }

    return (
        <AlertDialog open={dialogOpen} onOpenChange={handleDialog}>
            <AlertDialogTrigger asChild>
                {(user.bankAgency || user.bankNumber) ? (
                    <Button
                        variant="ghost"
                    >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        className="relative"
                    >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Add Payment Account
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                            </span>
                        </div>
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {(user.bankAgency || user.bankNumber) ? "Edit Yout Payment Account" : "Add Your Payment Account"}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="bankAgency"
                        render={({ field }) => (
                            <FormItem className="w-full gap-1">
                                <FormLabel>Bank Agency</FormLabel>
                                <Popover open={isSelectingBanks && dialogOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                onClick={() => setIsSelectingBanks(!isSelectingBanks)}
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
                            <FormItem className="w-full gap-1">
                                <FormLabel>Bank Number</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Bank Number"
                                    {...field}
                                />
                            </FormItem>
                        )}
                    />
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!isDirty} onClick={handleSubmit}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    )
}

export default PaymentEdit