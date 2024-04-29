"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";
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
import { faChevronRight, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TopBar = () => {
  const { breadcrumb, addItem, removeItem } = useBreadcrumb();
  const [user, setUser] = useState<undefined | any>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "John Doe",
        email: "contact@adriangrahl.dev"
      });
    }, 2000);
  }, []);

  return (
    <div className="w-full pr-20 h-20 ml-20 fixed bg-white border-b-2">
      <div className="h-20 flex justify-between items-center px-6 ">
        <div className="topLeft flex gap-2 items-center text-2xl">
          <div className={`font-bold text-black`}>
            Dashboard
          </div>
          {breadcrumb.map((item: BCItem, index: number) => (
            <Fragment key={index}>
              <span><FontAwesomeIcon icon={faChevronRight} width={8}  /></span>
              <div className={`font-normal text-lg text-gray-600`}>
                {item.type === "link" ? (
                  <BreadcrumbItem key={index}>
                    <Link href={item.link || '/dashboard'}>
                    {item.icon}
                    {item.title}
                    </Link>
                  </BreadcrumbItem>
                ) : item.type === "dropdown" ? (
                  <BreadcrumbItem key={index}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex breadcrumb-center gap-1">
                        {item.title}
                        <ChevronDownIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {item.items?.map((item: any, index: number) => (
                          <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem key={index}>{item.title}</BreadcrumbItem>
                )}
              </div>
            </Fragment>
          ))}
        </div>

        <UserBadge user={user} />

      </div>
    </div>
  );
};

export default TopBar;
