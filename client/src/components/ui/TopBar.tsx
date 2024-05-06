"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { BreadcrumbItem as BCItem } from "@/contexts/BreadcrumbItem.interface";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import UserBadge from "../user/UserBadge";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHome
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "./button";

import { useUser } from '@auth0/nextjs-auth0/client';



const TopBar = () => {
  const { user, error, isLoading } = useUser();
  const { breadcrumb, addItem, removeItem } = useBreadcrumb();
  const [showMobileBreadcrumb, setShowMobileBreadcrumb] = useState(false);
  const showMenu = () => {
    //mostrar boton de cerrar sesion
    console.log('show menu')
  }




  useEffect(() => {

    const handleResize = () => {
      setShowMobileBreadcrumb(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full pr-4 md:pr-20 h-20  px-4 md:ml-20 max-lg:shadow-sm fixed bg-white border-b-2">
      <div className="h-20 flex justify-between items-center px-2 md:px-6">
        <div className="topLeft flex gap-2 items-center text-lg md:text-2xl">
          <Link href={"/dashboard"}>
            <FontAwesomeIcon icon={faHome} className="text-lg md:text-2xl" />
          </Link>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item: BCItem, index: number) => {
                if (showMobileBreadcrumb && index > 0) {
                  return null;
                }

                return (
                  <Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem key={index} className={`text-sm md:text-lg ${index === 0 ? 'font-bold text-xl' : 'font-normal text-gray-600'}`}>
                      {item.type === 'link' ? (
                        <Link href={item.link || "/dashboard"}>
                          {item.title}
                        </Link>
                      ) :
                        item.type === 'dropdown' ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                              {item.title}
                              <ChevronDownIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              {item.items?.map((subItem, subIndex) => (
                                <DropdownMenuItem key={subIndex}>{subItem}</DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

        </div>
        <UserBadge
          className={`max-lg:hidden`}
          variant="default"
          user={user}
        />
        <div onClick={showMenu} className="max-md:flex hidden cursor-pointer">
          <UserBadge
            variant="minimalist"
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
