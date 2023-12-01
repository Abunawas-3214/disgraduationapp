import { Eye } from "lucide-react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { userSchema } from "./schema"

const rupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value)
}


export default function DataTableRowActionView({ user }: { user: z.infer<typeof userSchema> }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0"
                >
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            {user.name}
                            <Badge variant="outline" className="ml-2">
                                {user.status}
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        {user.email}
                    </DialogDescription>
                </DialogHeader>
                {user.status !== "NEW" && (
                    <div className="space-y-2 text-sm">
                        <p><span className="font-bold">WhatsApp: </span>
                            <a href={`https://wa.me/${user.whatsapp}`} target="_blank" className="hover:underline ">
                                +{user.whatsapp}↗
                            </a>
                        </p>
                        <p><span className="font-bold">Instagram: </span>
                            <a href={`https://instagram.com/${user.instagram}`} target="_blank" className="hover:underline ">
                                @{user.instagram}↗
                            </a>
                        </p>
                        <p><span className="font-bold">Address: </span>
                            {user.address}
                        </p>
                        <p><span className="font-bold">Price: </span>
                            {user.price && rupiah(user.price)}
                        </p>
                        {user.bankAgency &&
                            (<div className="flex flex-row">
                                <div className="basis-1/2">
                                    <span className="font-bold">Bank: </span> {user.bankAgency}
                                </div>
                                <div className="basis-1/2">
                                    <span className="font-bold">Number: </span> {user.bankNumber}
                                </div>
                            </div>)
                        }
                        {user.description &&
                            (
                                <div className="w-full p-2 rounded-sm bg-secondary">
                                    {user.description}
                                </div>
                            )
                        }
                    </div>
                )}
            </DialogContent>
        </Dialog>

    )
}
