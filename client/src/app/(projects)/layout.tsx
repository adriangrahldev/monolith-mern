import {SideBar} from "@/components/ui/SideBar";
import TopBar from "@/components/ui/TopBar";
import { ReactNode } from "react";
import { routes } from "@/routes";
import { BreadcrumbProvider, useBreadcrumb } from "@/contexts/BreadcrumbContext";
const AdminLayout = ({children} : {children: ReactNode}) =>{
    
    

    return(
        <BreadcrumbProvider>
            <div className="flex">
                <SideBar routes={routes} />
                <main className="w-full">
                    <TopBar/>
                    <div className="p-6  mt-20">   
                        {children}
                    </div>
                </main>
            </div>
        </BreadcrumbProvider>
    )
}

export default AdminLayout;