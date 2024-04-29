"use client"
import { SideBar } from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import { ReactNode, useState } from "react";
import { routes } from "@/routes";
import { BreadcrumbProvider, useBreadcrumb } from "@/contexts/BreadcrumbContext";
const AdminLayout = ({ children }: { children: ReactNode }) => {

    const [showingSidebar, setShowingSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowingSidebar(!showingSidebar);
    }

    return (
        <BreadcrumbProvider>
            <div className="flex">
                <SideBar routes={routes} toggleSidebar={toggleSidebar} showingSidebar={showingSidebar} />
                <main className="w-full">
                    <TopBar toggleSidebar={toggleSidebar} />
                    <div className="p-6 ml-20 max-lg:ml-0 mt-20">
                        <div className="flex flex-col gap-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </BreadcrumbProvider>
    )
}

export default AdminLayout;