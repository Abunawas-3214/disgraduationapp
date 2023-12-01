'use client'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const { data: session } = useSession()

    // if (!session) {
    //     return ""
    // }

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {session?.user.status === "APPROVED" && (
                <>
                    <Link
                        href="/jobs"
                        className={pathname.startsWith("/jobs")
                            ? "text-sm font-medium transition-colors hover:text-primary"
                            : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary under"
                        }
                    >
                        Job List
                    </Link>
                    <Link
                        href="/my-jobs"
                        className={pathname.startsWith("/my-jobs")
                            ? "text-sm font-medium transition-colors hover:text-primary"
                            : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary under"
                        }>
                        My Jobs
                    </Link>
                </>
            )}
            {session?.user.status === "NEW" &&
                <Link
                    href="/onboarding"
                    className={pathname === "/onboarding"
                        ? "text-sm font-medium transition-colors hover:text-primary"
                        : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary under"
                    }>
                    On Boarding
                </Link>
            }
            {session?.user.status === "SUBMIT" &&
                <Link
                    href="/status"
                    className={pathname === "/status"
                        ? "text-sm font-medium transition-colors hover:text-primary"
                        : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary under"
                    }>
                    status
                </Link>
            }

        </nav>
    )
}
