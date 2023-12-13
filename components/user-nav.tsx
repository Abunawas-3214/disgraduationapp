'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Session } from "inspector"

export default function UserNav() {
    const { data: session } = useSession()
    if (!session) {
        return (
            <Button onClick={() => signIn()}>Login</Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {(session.user.image) ?
                            <>
                                <AvatarImage src={`${session.user.image}`} alt="avatar" />
                                <AvatarFallback>{session.user.name?.slice(0, 1)}</AvatarFallback>
                            </> :
                            <>
                                <AvatarImage src="/avatars/02.png" alt="avatar" />
                                <AvatarFallback>DG</AvatarFallback>
                            </>
                        }

                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">{session.user.name}</p>
                        {(session.user.email) && <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {(session.user.level === "ADMIN") &&
                        <Link href={"/admin"}>
                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                        </Link>
                    }
                    {(session.user.level !== "ADMIN") &&
                        <Link href={"/profile"}>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
