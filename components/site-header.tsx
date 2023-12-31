import MainNav from "@/components/main-nav"
import UserNav from "@/components/user-nav"
import ModeToggle from "./mode-toggle"
import SiteIdentity from "./site-identity"
export default function Navbar() {
    return (
        <nav className="hidden flex-col md:flex fixed top-0 z-10 backdrop-blur-sm w-full">
            <div className="border-b">
                <div className="flex h-16 items-center px-16 gap-16">
                    <SiteIdentity />
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle />
                        <UserNav />
                    </div>
                </div>
            </div>
        </nav>
    )
}
