"use client"
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserBadge from "../user/UserBadge";
import { Button } from "./button";
import Image from "next/image";

export const SideBar = ({
  routes,
  toggleSidebar,
  showingSidebar,
}: {
  routes: any[];
  toggleSidebar?: CallableFunction;
  showingSidebar?: boolean;
}) => {
  const pathname = usePathname();
  const currentPath = "/" + pathname.split("/")[1];

  return (
    <aside
      className={`fixed w-48 md:w-20 sm:w-20 bg-white-800 h-screen border-gray-300 border-r-2 bg-white z-10 max-lg:shadow-lg ${
        !showingSidebar ? "max-lg:hidden" : ""
      } `}
    >
      <div className="flex items-center justify-center h-20 bg-white-900 border-b-2">
        <Image
          src="/isologo1.svg"
          alt="Monolith Logo"
          width={32}
          height={32}
          className="max-lg:hidden"
        />
        <div className="hidden max-lg:flex justify-end items-center">
          <Image
            src="/logotipo1.png"
            alt="Monolith Logo"
            width={128}
            height={64}
          />
          <Button
            variant={"ghost"}
            size={"default"}
            onClick={(e) => toggleSidebar!()}
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>
      </div>
      <nav className="flex flex-col">
        <ul className="flex-1">
          {routes.map((item) => (
            <li
              key={item.title}
              className={`flex items-center justify-center max-lg:justify-start h-20 ${
                currentPath === item.path
                  ? "bg-white-700 text-black"
                  : "text-gray-400"
              }`}
            >
              <Link href={item.path}>
                <div className="flex flex-col max-lg:flex-row gap-2 sm:gap-0 md:gap-0  w-full h-full items-center cursor-pointer max-lg:px-8">
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                  <span className="text-xs mt-2">{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full h-28 flex flex-col  justify-center items-center">
        <UserBadge user={{name: "Adrian Grahl",email: "adriangrahldev@gmail.com"}} variant="minimalist" className="hidden max-lg:flex" />
        <Link href={'/user/login'} >
        Sign Out
        </Link>
      </div>
    </aside>
  );
};
