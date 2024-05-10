'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faProjectDiagram, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useEffect } from "react";
import UserBadge from "../user/UserBadge";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

export const SideBar = ({ routes }: { routes: any[] }) => {
  const { user, error, isLoading } = useUser();

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
        <Link href={'/api/auth/logout'} className="flex flex-col justify-center items-center" >
          <FontAwesomeIcon icon={faSignOutAlt} className="mb-2 h-4 w-4" />
          <span className="text-xs">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

