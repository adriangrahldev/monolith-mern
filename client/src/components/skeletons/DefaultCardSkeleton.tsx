import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const DefaultCardSkeleton = ({
  theme = "light",
}: {
  theme?: "dark" | "light";

}) => {
  return (
    <Card className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
            <div className="w-full">
                <Skeleton className="text-xl font-bold h-6 w-1/2"/>
                <Skeleton className="text-sm mt-2 font-semibold h-4 w-1/3"/>
            </div>
            <div className="self-start">
                <Skeleton className="w-6 h-6"/>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span className=" flex flex-col w-full justify-end">
            <Skeleton className="text-sm w-8 h-8 self-end"/>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full rounded-md"/>
      </CardFooter>
    </Card>
  );
};

export default DefaultCardSkeleton;
