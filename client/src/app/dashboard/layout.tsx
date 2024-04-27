import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { ReactNode } from "react";
import { routes } from "@/routes";
import { BreadcrumbProvider, useBreadcrumb } from "@/contexts/BreadcrumbContext";
const AdminLayout = ({children} : {children: ReactNode}) =>{
    
    

    return(
        <BreadcrumbProvider>
            <div className="flex">
                <Sidebar routes={routes} />
                <main className="w-full mx-20">
                    <TopBar/>
                    <div className="p-6">   
                        {children}
                    </div>
                </main>
            </div>
        </BreadcrumbProvider>
    )
}

export default AdminLayout;