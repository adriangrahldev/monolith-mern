'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faProjectDiagram, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useEffect } from "react";


const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: faBorderAll },
  { name: "Projects", path: "/projects", icon: faProjectDiagram },
  { name: "Clients", path: "/clients", icon: faUsers },
];

export const SideBar = ({ routes }: { routes: any[] }) => {
  const pathname = usePathname();
  const currentPath = '/' + pathname.split('/')[1];
  const { breadcrumb, addItem, removeItem } = useBreadcrumb();
  useEffect(() => {
    addItem(
      {
        title: 'Dashboard',
        link: '/dashboard',
        icon: 'home',
        items: [
          'Dashboard',
          'Analytics',
          'Reports'
        ]
      }
    );
  }, []);

  return (
    <aside className="fixed w-20 bg-white-800 h-screen border-gray-300 border-r-2">
      <div className="flex items-center justify-center h-20 bg-white-900 border-b-2">
        <Image src="/isologo1.svg" alt="Monolith Logo" width={32} height={32} />
      </div >
      <nav >
        <ul>
          {routes.map((item) => (
            <li key={item.title} className={`flex items-center justify-center h-20 ${currentPath === item.path ? 'bg-white-700 text-black' : 'text-gray-400'}`}>
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
    </aside>
  );
};
