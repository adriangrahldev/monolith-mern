"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { BreadcrumbItem, BreadcrumbSeparator } from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BreadcrumbItem as BCItem } from "@/contexts/BreadcrumbItem.interface";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import UserBadge from "../user/UserBadge";

const TopBar = () => {
  const { breadcrumb, addItem, removeItem } = useBreadcrumb();

  return (
    <div className="w-full">
      <div className="h-20 flex justify-between items-center px-6 ">
        <div className="topLeft flex gap-2 text-2xl">
          {breadcrumb.map((item: BCItem, index: number) => (
            <div key={index} className={`${index === 0 ? 'font-bold':'' }`}>
              {item.type === "link" ? (
                <BreadcrumbItem key={index}>
                  {item.icon}
                  {item.title}
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
              {index < breadcrumb.length - 1 && <>/</>}
            </div>
          ))}
        </div>
        <div className="topRight">
          <UserBadge user={
            {
              name: "John Doe",
              email: "contact@adriangrahl.dev"
            }
          } />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
