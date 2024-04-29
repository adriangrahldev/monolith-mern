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
import {
  faBars,
  faChevronRight,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "./button";

const TopBar = ({ toggleSidebar }: { toggleSidebar: CallableFunction }) => {
  const { breadcrumb, addItem, removeItem } = useBreadcrumb();
  const [user, setUser] = useState<undefined | any>(undefined);
  const [showMobileBreadcrumb, setShowMobileBreadcrumb] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "John Doe",
        email: "contact@adriangrahl.dev",
      });
    }, 2000);

    const handleResize = () => {
      setShowMobileBreadcrumb(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full pr-4 md:pr-20 h-20 ml-4 md:ml-20 fixed bg-white border-b-2">
      <div className="h-20 flex justify-between items-center px-2 md:px-6">
        <div className="topLeft flex gap-2 items-center text-lg md:text-2xl">
          <div
            className={`font-bold text-black md:hidden sm:hidden flex items-center`}
          >
            <Button
              variant={"ghost"}
              className="p-0 m-0"
              onClick={(e) => toggleSidebar()}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </div>
          <div className={`font-bold text-black`}>Dashboard</div>
          {breadcrumb.map((item: BCItem, index: number) => (
            <Fragment key={index}>
              {showMobileBreadcrumb && index > 0 ? null : (
                <Fragment>
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} width={8} />
                  </span>
                  <div
                    className={`font-normal text-sm md:text-lg text-gray-600`}
                  >
                    {item.type === "link" ? (
                      <BreadcrumbItem key={index}>
                        <Link href={item.link || "/dashboard"}>
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
                              <DropdownMenuItem key={index}>
                                {item}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </BreadcrumbItem>
                    ) : (
                      <BreadcrumbItem key={index}>{item.title}</BreadcrumbItem>
                    )}
                  </div>
                </Fragment>
              )}
            </Fragment>
          ))}
        </div>

        <UserBadge
          className={`hidden sm:flex `}
          variant="minimalist"
          user={user}
        />
      </div>
    </div>
  );
};

export default TopBar;
