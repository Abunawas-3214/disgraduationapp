import SidebarAdmin from "@/components/admin/sidebar-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="hiden md:block">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 ">
                    <aside className=" lg:w-52 h-screen border-r border-1">
                        <SidebarAdmin className="p-4" />
                    </aside>
                    <div className="flex-1 lg:max-w-full p-12 ">{children}</div>
                </div>
            </div>
        </>
    )
}
