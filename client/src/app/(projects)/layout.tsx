"use client"
import { SideBar } from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import { ReactNode, useState } from "react";
import { routes } from "@/routes";
import { BreadcrumbProvider, useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BottomBar } from "@/components/ui/BottomBar";
const AdminLayout = ({ children }: { children: ReactNode }) => {

    return (
        <BreadcrumbProvider>
            <div className="flex">
                <SideBar routes={routes} />
                <main className="w-full">
                    <TopBar />
                    <div className="p-6 md:ml-20 mb-10 mt-20 overflow-auto">
                        <div className="flex flex-col gap-8">
                            {children}
                        </div>
                    </div>
                    <BottomBar routes={routes} />
                </main>
            </div>
        </BreadcrumbProvider>
    )
}

export default AdminLayout;