'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faProjectDiagram, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useEffect } from "react";
import UserBadge from "../user/UserBadge";

export const SideBar = ({ routes }: { routes: any[] }) => {
  const pathname = usePathname();
  const currentPath = "/" + pathname.split("/")[1];


  return (
    <aside className="hidden md:block fixed w-20 h-screen border-gray-300 border-r-2">
      <div className="flex items-center justify-center h-20  border-b-2">
        <Image src="/isologo1.svg" alt="Monolith Logo" width={32} height={32} />
      </div >
      <nav >
        <ul>
          {routes.map((item) => (
            <li key={item.title} className={`flex items-center justify-center h-20 ${currentPath === item.path ? 'text-black' : 'text-gray-400'}`}>
              <Link href={item.path}>
                <div className="flex flex-col items-center w-full h-full justify-center cursor-pointer">
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                  <span className="text-xs mt-2">{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full h-28 flex flex-col  justify-center items-center">
        <UserBadge user={{ name: "Adrian Grahl", email: "adriangrahldev@gmail.com" }} variant="minimalist" className="hidden max-lg:flex" />
        <Link href={'/user/login'} >
          Sign Out
        </Link>
      </div>
    </aside>
  );
};