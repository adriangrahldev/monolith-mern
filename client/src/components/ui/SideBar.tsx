'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faProjectDiagram, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: faBorderAll },
    { name: "Projects", path: "/projects", icon: faProjectDiagram }, 
    { name: "Clients", path: "/clients", icon: faUsers }, 
  ];

  return (
    <aside className="w-20 bg-white-800 h-screen">
      <div className="flex items-center justify-center h-16 bg-white-900">
        <Image src="/isologo1.png" alt="Monolith Logo" width={32} height={32} />
      </div>
      <div className="border-t border-gray-500 my" />
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className={`flex items-center justify-center h-20 ${pathname === item.path ? 'bg-white-700 text-black' : 'text-gray-400'}`}>
              <Link href={item.path}>
                <div className="flex flex-col items-center w-full h-full justify-center cursor-pointer">
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                  <span className="text-xs mt-2">{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
