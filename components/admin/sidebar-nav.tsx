'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, Aperture, User, CalendarCheck, MessageSquare, Wallet, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarAdminProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function SidebarAdmin({ className, ...props }: SidebarAdminProps) {
    const pathname = usePathname()

    return (
        <div className={cn("space-y-6", className)} {...props}>
            <div className="h-32 bg-slate-100 rounded-lg"></div>
            <div className="space-y-1">
                <Button variant={pathname === "/admin" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                    <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                </Button>
                <Separator />
                <Button variant={pathname === "/admin/jobs" ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                    <Link href="/admin/jobs"><Aperture className="mr-2 h-4 w-4" />Jobs</Link>
                </Button>
                <Button variant={pathname === "/admin/user" ? "secondary" : "ghost"} className="w-full justify-start" asChild >
                    <Link href="/admin/user"><User className="mr-2 h-4 w-4" />User</Link>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start" disabled >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                    <Wallet className="mr-2 h-4 w-4" />
                    Finance
                </Button>
                <Button variant="ghost" className="w-full justify-start" disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
            </div>
        </div>
    )
}
