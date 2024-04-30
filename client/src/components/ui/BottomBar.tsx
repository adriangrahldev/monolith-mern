"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomBar = ({ routes }
    : { routes: any[], }
) => {
    const pathname = usePathname();
    const currentPath = "/" + pathname.split("/")[1];

    return (
        <aside className="flex justify-around items-center md:hidden max-w-[calc(100%-2rem)] w-full fixed bottom-4 h-[60px] bg-white border-2 border-gray-300 mx-4 rounded-md">
            <nav className="w-full">
                <ul className="flex justify-around">
                    {routes.map((item) => (
                        <li
                            key={item.title}
                            className={` items-center justify-center  ${currentPath === item.path
                                ? " bg-white text-xl text-black rounded-lg transform translate-y-[-2px]"
                                : "text-gray-400"
                                }`}
                        >
                            <Link className="flex flex-col items-center justify-center w-full h-full cursor-pointer" href={item.path}>
                                <FontAwesomeIcon icon={item.icon} size="lg" />
                                <span className="text-xs mt-2">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
