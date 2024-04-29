"use client"
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const UserBadge = ({ user, className, variant="default" }: { user: any, className: string, variant: string }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleBadgeClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      {user ? (
        <div
          className={`flex gap-2 items-center justify-center rounded-md ${variant === 'default' ? "bg-[#eeeeee] w-[250px] px-4" : "bg-transparent"}  py-2  h-[55px] ${className}`}
          onClick={variant === "minimalist" ? handleBadgeClick : undefined}
        >
          <div className="">
            {variant === "minimalist" ? (
              <div className="w-[43px] h-[43px] bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.name[0] || ""}
                </span>
              </div>
            ) : (
              <div className="w-[43px] h-[43px] bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.name[0] || ""}
                </span>
              </div>
            )}
          </div>
          {variant !== "minimalist" && (
            <div className="flex flex-col -space-y-1">
              <span className="font-bold">{user.name}</span>
              <span className="text-sm">{user.email}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-between rounded-md bg-[#eeeeee] px-4 py-2 w-[250px] h-[55px] ">
          <div className="">
            <Skeleton className="w-[43px] h-[43px] bg-black rounded-full flex items-center justify-center">
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="w-[55px] h-[10px] rounded-full" />
            <Skeleton className="w-[130px] h-[10px] rounded-full" />
          </div>
        </div>
      )}
      {variant === "minimalist" && showPopup && (
        <div className="absolute top-[60px] left-0 bg-white p-4 shadow">
          <span className="font-bold">{user.name}</span>
          <span className="text-sm">{user.email}</span>
        </div>
      )}
    </>
  );
};

export default UserBadge;
