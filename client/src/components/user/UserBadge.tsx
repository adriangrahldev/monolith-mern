import { Skeleton } from "../ui/skeleton";

const UserBadge = ({ user, className }: { user: any, className: string }) => {
  return (
    <>
      {user ? (
        <div className={`flex gap-2 items-center justify-center rounded-md bg-[#eeeeee] px-4 py-2 w-[250px] h-[55px] ${className}`}>
          <div className="">
            <div className="w-[43px] h-[43px] bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user?.name[0] || ""}
              </span>
            </div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-bold">{user.name}</span>
            <span className="text-sm">{user.email}</span>
          </div>
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
    </>
  );
};

export default UserBadge;
