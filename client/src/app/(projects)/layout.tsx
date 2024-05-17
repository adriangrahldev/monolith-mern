"use client"
import { SideBar } from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import { ReactNode, useState } from "react";
import { routes } from "@/routes";
import { BreadcrumbProvider, useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { BottomBar } from "@/components/ui/BottomBar";
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation'
import Image from "next/image";



const AdminLayout = ({ children }: { children: ReactNode }) => {
    const { user, error, isLoading } = useUser();
    if (isLoading) return (
        <div className="flex animate-zoom-repeat justify-center flex-col items-center w-screen h-screen">
        <Image src="/isologo1.svg" alt="Monolith Logo" width={200} height={200} priority={true} />
        Loading...
    </div>)
    if (error) return <div>{error.message}</div>
    if (!user) redirect('/api/auth/login')


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